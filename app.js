// ============================================================
// FP&A AUTOMATION — APPLICATION LOGIC
// ============================================================

// State is now managed by StateManager (appState)
// All state access: appState.get(key)
// All state mutations: appState.set(key, value)

// ----------------------------------------------------------
// INITIALIZATION
// ----------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    initializeSubscriptions();
    setIndustry('agency');
    setTeamSize('medium');
    applyPreset('standard');
    initScrollEffects();
    initKeyboardShortcuts();
});

/**
 * Register all render subscriptions with StateManager
 * Enables reactive updates when state changes after page load
 */
function initializeSubscriptions() {
    // Industry changes trigger these renders
    appState.subscribe('industry', () => renderContextBanner());
    appState.subscribe('industry', () => renderUseCases());
    appState.subscribe('industry', () => renderArchitecture());
    appState.subscribe('industry', () => renderTechStack());
    appState.subscribe('industry', () => renderTimeline());
    appState.subscribe('industry', () => renderDeliverables());
    appState.subscribe('industry', () => renderExportSummary());

    // Module selection changes trigger these renders
    appState.subscribe('selectedModules', () => renderScopeModules());
    appState.subscribe('selectedModules', () => renderTechStack());
    appState.subscribe('selectedModules', () => updateCosts());
    appState.subscribe('selectedModules', () => updateScopeSummary());
    appState.subscribe('selectedModules', () => renderDeliverables());
    appState.subscribe('selectedModules', () => renderExportSummary());

    // Expanded modules affect scope display
    appState.subscribe('expandedModules', () => renderScopeModules());

    // Team size changes trigger roster and cost updates
    appState.subscribe('teamSize', () => renderTeamRoster());
    appState.subscribe('teamSize', () => updateCosts());
    appState.subscribe('teamSize', () => renderDeliverables());

    // Duration (set via updateCosts) affects timeline and costs
    appState.subscribe('duration', () => updateCosts());
    appState.subscribe('duration', () => renderTimeline());

    // Pricing mode changes affect cost display
    appState.subscribe('pricingMode', () => updateCosts());

    // Calculator roles changes affect costs
    appState.subscribe('calculatorRoles', () => updateCalculatorCosts());
    appState.subscribe('calculatorRoles', () => updateCosts());

    console.log('✓ State subscriptions initialized');
}

// ----------------------------------------------------------
// INDUSTRY TOGGLE
// ----------------------------------------------------------
function setIndustry(industry) {
    appState.set('industry', industry);
    appState.set('generatedFrom', null);
    appState.set('expandedModules', new Set());
    hideGeneratedFromBanner();

    // Update toggle buttons using specific IDs
    const agencyBtn = document.getElementById('agencyBtn');
    const publisherBtn = document.getElementById('publisherBtn');

    if (agencyBtn) agencyBtn.classList.toggle('active', industry === 'agency');
    if (publisherBtn) publisherBtn.classList.toggle('active', industry === 'publisher');

    const heroText = document.getElementById('heroIndustryText');
    if (heroText) heroText.textContent = DATA.context[industry].heroText;

    const heroSubtitle = document.getElementById('heroSubtitle');
    if (heroSubtitle) heroSubtitle.textContent = DATA.context[industry].heroSubtitle;

    const useCaseLabel = document.getElementById('useCaseIndustryLabel');
    if (useCaseLabel) useCaseLabel.textContent = industry === 'agency' ? 'Agencies' : 'Publishers';

    renderContextBanner();
    renderUseCases();
    renderArchitecture();
    renderScopeModules();
    renderTimeline();
    renderTechStack();
    updateCosts();
    renderExportSummary();
}

// ----------------------------------------------------------
// CONTEXT BANNER
// ----------------------------------------------------------
function renderContextBanner() {
    const items = DATA.context[appState.get('industry')].contextItems;
    const banner = document.getElementById('contextBanner');
    banner.innerHTML = items.map(item => `
        <div class="flex flex-col items-center gap-2 p-4 bg-slate-800/30 rounded-lg border border-slate-700">
            <span class="text-2xl">${item.icon}</span>
            <div class="text-center">
                <span class="block text-slate-400 text-sm">${item.label}</span>
                <span class="block text-slate-100 font-semibold">${item.value}</span>
            </div>
        </div>
    `).join('');
}

// ----------------------------------------------------------
// USE CASES (Clickable → auto-configure project)
// ----------------------------------------------------------
function renderUseCases() {
    const cases = DATA.useCases[appState.get('industry')];
    const grid = document.getElementById('useCasesGrid');
    grid.innerHTML = cases.map((uc, i) => `
        <div class="rounded-lg border border-slate-800 p-6 hover:border-slate-700 transition-colors bg-slate-900/50 cursor-pointer hover:bg-slate-700/50 hover:shadow-lg hover:shadow-slate-900/50 transition-all" style="animation-delay: ${i * 0.05}s" onclick="selectUseCaseProject(${i})">
            <div class="flex justify-between items-start gap-4 mb-4">
                <span class="text-3xl">${uc.icon}</span>
                <span class="inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    uc.complexity === 'Low' ? 'bg-green-500/20 text-green-300' :
                    uc.complexity === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
                    uc.complexity === 'High' ? 'bg-orange-500/20 text-orange-300' :
                    'bg-red-500/20 text-red-300'
                }">${uc.complexity}</span>
            </div>
            <h3 class="text-slate-100 font-bold text-lg mb-2">${uc.title}</h3>
            <p class="text-slate-400 text-sm mb-4">${uc.description}</p>
            <div class="mb-4">
                <h4 class="text-slate-300 text-sm font-semibold mb-2">Pain Points</h4>
                <ul class="list-disc list-inside text-slate-400 text-sm space-y-1">${uc.painPoints.map(p => `<li>${p}</li>`).join('')}</ul>
            </div>
            <div class="mb-4">
                <h4 class="text-slate-300 text-sm font-semibold mb-2">Automation Value</h4>
                <ul class="list-disc list-inside text-slate-400 text-sm space-y-1">${uc.automationValue.map(v => `<li>${v}</li>`).join('')}</ul>
            </div>
            <div class="flex flex-wrap gap-2">
                ${uc.kpis.map(k => `<span class="inline-block px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/20 text-indigo-300">${k}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

function selectUseCaseProject(idx) {
    const uc = DATA.useCases[appState.get('industry')][idx];
    if (!uc || !uc.projectPlan) return;

    const plan = uc.projectPlan;
    appState.set('selectedModules', new Set(plan.moduleIndices));
    const teamSize = plan.recommendedTeamSize || plan.teamSize;
    const duration = plan.recommendedDuration || plan.duration;
    appState.set('teamSize', teamSize);
    appState.set('duration', duration);
    appState.set('generatedFrom', uc.title);

    document.getElementById('durationSlider').value = duration;
    document.getElementById('durationDisplay').textContent = `${duration} months`;

    setTeamSize(teamSize);
    renderScopeModules();
    updateCosts();
    renderExportSummary();
    showGeneratedFromBanner(uc.title);

    document.getElementById('scope').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function showGeneratedFromBanner(name) {
    const banner = document.getElementById('generatedFromBanner');
    const nameEl = document.getElementById('generatedFromName');
    if (banner && nameEl) {
        nameEl.textContent = name;
        banner.classList.remove('hidden');
    }
}

function hideGeneratedFromBanner() {
    const banner = document.getElementById('generatedFromBanner');
    if (banner) {
        banner.classList.add('hidden');
    }
}

function clearGeneratedFrom() {
    appState.set('generatedFrom', null);
    hideGeneratedFromBanner();
}

// ----------------------------------------------------------
// ARCHITECTURE (Clickable → detail modal)
// ----------------------------------------------------------
function renderArchitecture() {
    const arch = DATA.architecture[appState.get('industry')];
    const archContainer = document.getElementById('archContainer');

    const layerLabels = {
        sources: 'Data Sources',
        platform: 'Data Platform',
        apps: 'Application Layer',
        outputs: 'Outputs'
    };

    let html = '';

    ['sources', 'platform', 'apps', 'outputs'].forEach(layer => {
        html += `
            <div class="space-y-6 mb-6">
                <div class="bg-slate-800/30 rounded-lg border border-slate-700 p-4">
                    <h4 class="text-slate-100 font-semibold mb-4">${layerLabels[layer]}</h4>
                    <div class="space-y-2">
                        ${arch[layer].map((item, idx) => `
                            <div class="rounded-lg border border-slate-700/50 p-3 hover:bg-slate-700/50 cursor-pointer transition-colors" onclick="openArchDetail('${layer}', ${idx})">
                                <span class="block text-slate-100 font-medium">${item.name}</span>
                                <span class="block text-slate-400 text-sm">${item.sub}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    });

    archContainer.innerHTML = html;
    renderTechStack();
}

function renderTechStack() {
    const techGrid = document.getElementById('techGrid');
    const scoredTech = scoreAndFilterTechStack();

    techGrid.innerHTML = scoredTech.map((item, idx) => {
        const { tech, score, isRelevant, matchedModules } = item;
        const scorePercent = Math.round(score * 100);
        const opacity = isRelevant ? 1 : 0.5;
        const borderColor = score >= 0.8 ? '#7c5cff' : score >= 0.5 ? '#4f46e5' : '#6b7280';

        return `
            <div class="rounded-lg border border-slate-800 p-4 hover:border-slate-700 transition-colors bg-slate-900/50 cursor-pointer hover:bg-slate-700/50 hover:shadow-lg hover:shadow-slate-900/50 transition-all"
                 style="opacity: ${opacity};"
                 onclick="openTechDetail(${idx})">
                <div style="height: 3px; background: ${borderColor}; border-radius: 2px; width: ${scorePercent}%; margin-bottom: 1rem;"></div>
                <div class="flex justify-between items-start gap-2 mb-3">
                    <span class="text-slate-300 text-sm font-medium">${tech.category}</span>
                    <span class="inline-block px-2 py-1 rounded text-xs font-medium ${
                        tech.criticality === 'Critical' ? 'bg-red-500/20 text-red-300' :
                        tech.criticality === 'Optional' ? 'bg-slate-500/20 text-slate-300' :
                        'bg-blue-500/20 text-blue-300'
                    }">${tech.criticality}</span>
                </div>
                <span class="block text-slate-100 font-semibold mb-3">${tech.recommended}</span>
                <div class="flex flex-wrap gap-2 mb-3">
                    ${tech.options.map(o => `<span class="inline-block px-2 py-1 rounded text-xs bg-slate-700/50 text-slate-300">${o}</span>`).join('')}
                </div>
                ${matchedModules.length > 0 ? `<div class="text-slate-400 text-xs">${matchedModules.length} module${matchedModules.length !== 1 ? 's' : ''}</div>` : ''}
                <div class="text-slate-500 text-xs mt-3">↗ Click for details</div>
            </div>
        `;
    }).join('');
}

function scoreAndFilterTechStack() {
    const modules = DATA.scopeModules[appState.get('industry')];
    const selectedCount = appState.get('selectedModules').size;

    // Calculate complexity based on module count
    let complexity = 'Low';
    if (selectedCount <= 3) complexity = 'Low';
    else if (selectedCount <= 6) complexity = 'Medium';
    else if (selectedCount <= 8) complexity = 'High';
    else complexity = 'Enterprise';

    return DATA.techStack.map((tech, idx) => {
        let score = 0;
        const matchedModules = [];

        // 1. Check if tech supports selected modules
        for (let modIdx of appState.get('selectedModules')) {
            if (tech.moduleIndices && tech.moduleIndices.includes(modIdx)) {
                score += 0.3;
                matchedModules.push(modIdx);
            }
        }

        // 2. Check complexity alignment
        const complexityLevel = { 'Low': 1, 'Medium': 2, 'High': 3, 'Enterprise': 4 };
        const techComplexity = complexityLevel[tech.minComplexity] || 1;
        const selectedComplexity = complexityLevel[complexity] || 1;
        if (techComplexity <= selectedComplexity) {
            score += 0.2;
        }

        // 3. Criticality boost
        if (tech.criticality === 'Critical') {
            score += 0.2;
        }

        // Normalize score (0-1)
        score = Math.min(score, 1);

        const isRelevant = score >= 0.3 || (tech.criticality === 'Critical' && selectedCount > 0);

        return { tech, idx, score, isRelevant, matchedModules };
    }).sort((a, b) => {
        // Sort by relevance, then criticality, then score
        if (a.isRelevant !== b.isRelevant) return b.isRelevant - a.isRelevant;
        const criticalityScore = { 'Critical': 3, 'Optional': 2, 'Alternative': 1 };
        if (criticalityScore[b.tech.criticality] !== criticalityScore[a.tech.criticality]) {
            return criticalityScore[b.tech.criticality] - criticalityScore[a.tech.criticality];
        }
        return b.score - a.score;
    });
}

function openTechDetail(idx) {
    const scoredTech = scoreAndFilterTechStack();
    const { tech, score, matchedModules } = scoredTech[idx];
    const modules = DATA.scopeModules[appState.get('industry')];

    const moduleList = matchedModules.map(modIdx =>
        `<li><strong>${modules[modIdx]?.name || 'Unknown'}</strong></li>`
    ).join('');

    const architectureConnections = tech.architectureLayers
        ? tech.architectureLayers.map(layer => {
            const layerNames = { 'sources': 'Data Sources', 'platform': 'Data Platform', 'apps': 'Application Layer', 'outputs': 'Outputs' };
            return `<span class="inline-block px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/20 text-indigo-300">${layerNames[layer]}</span>`;
        }).join('')
        : '';

    const scorePercent = Math.round(score * 100);
    const borderColor = scorePercent >= 80 ? 'indigo-500' : scorePercent >= 50 ? 'indigo-400' : 'slate-500';

    const html = `
        <div>
            <h3 class="text-slate-100 font-bold text-2xl mb-2">${tech.recommended}</h3>
            <div class="flex gap-4 mb-4 flex-wrap">
                <div>
                    <span class="text-slate-400 text-xs">Category</span>
                    <p class="text-slate-100 font-medium">${tech.category}</p>
                </div>
                <div>
                    <span class="text-slate-400 text-xs">Criticality</span>
                    <p class="text-slate-100 font-medium">${tech.criticality}</p>
                </div>
            </div>

            <div class="mb-4">
                <div class="flex justify-between items-center mb-2">
                    <span class="text-slate-400 text-sm">Relevance</span>
                    <span class="text-slate-100 font-semibold">${scorePercent}%</span>
                </div>
                <div class="h-2 bg-slate-800 rounded-full overflow-hidden border-2" style="border-color: var(--tw-${borderColor}-500)">
                    <div class="h-full" style="width: ${scorePercent}%; background: currentColor;" class="bg-indigo-500"></div>
                </div>
            </div>

            <div class="mb-4">
                <h4 class="text-slate-300 font-semibold mb-2">Options</h4>
                <div class="flex flex-wrap gap-2">
                    ${tech.options.map(o => `<span class="inline-block px-2 py-1 rounded text-xs bg-slate-700/50 text-slate-300">${o}</span>`).join('')}
                </div>
            </div>

            <div class="mb-4">
                <h4 class="text-slate-300 font-semibold mb-2">Why This Technology</h4>
                <p class="text-slate-400 text-sm mb-2">${tech.reason}</p>
                <p class="text-slate-400 text-sm"><strong>Cost impact:</strong> ${tech.costImpact}</p>
            </div>

            ${matchedModules.length > 0 ? `
                <div class="mb-4">
                    <h4 class="text-slate-300 font-semibold mb-2">Used by ${matchedModules.length} module(s)</h4>
                    <ul class="text-slate-400 text-sm space-y-1">${moduleList}</ul>
                </div>
            ` : `
                <div class="mb-4 p-3 rounded bg-slate-800/50 border border-slate-700/50">
                    <p class="text-slate-400 text-sm italic">Not directly used by your selected modules, but part of the recommended foundation.</p>
                </div>
            `}

            ${architectureConnections ? `
                <div>
                    <h4 class="text-slate-300 font-semibold mb-2">Architecture Layers</h4>
                    <div class="flex flex-wrap gap-2">
                        ${architectureConnections}
                    </div>
                </div>
            ` : ''}
        </div>
    `;

    const content = document.getElementById('techDetailContent');
    if (content) {
        content.innerHTML = html;
    }

    const modal = document.getElementById('techDetailModal');
    if (modal) {
        modal.classList.remove('hidden');
    }
}

function closeTechDetail() {
    const modal = document.getElementById('techDetailModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function openArchDetail(layer, idx) {
    const arch = DATA.architecture[appState.get('industry')];
    const item = arch[layer][idx];
    if (!item) return;

    const layerLabels = { sources: 'Data Sources', platform: 'Data Platform', apps: 'Application Layer', outputs: 'Outputs' };

    const upstream = item.connections?.upstream || [];
    const downstream = item.connections?.downstream || [];

    const html = `
        <div>
            <div class="text-slate-400 text-sm mb-2">${layerLabels[layer]}</div>
            <h3 class="text-slate-100 font-bold text-2xl mb-2">${item.name}</h3>
            <p class="text-slate-400 text-sm mb-6">${item.sub}</p>

            <div class="grid grid-cols-2 gap-6 mb-6">
                <div>
                    <h4 class="text-slate-300 font-semibold mb-2">Technical Details</h4>
                    <p class="text-slate-400 text-sm">${item.techDescription || 'Technical description not available.'}</p>
                </div>
                <div>
                    <h4 class="text-slate-300 font-semibold mb-2">Business Impact</h4>
                    <p class="text-slate-400 text-sm">${item.businessDescription || 'Business description not available.'}</p>
                </div>
            </div>

            <div class="grid grid-cols-2 gap-6">
                <div>
                    <h4 class="text-slate-300 font-semibold mb-3">Upstream Sources</h4>
                    <div class="flex flex-wrap gap-2">
                        ${upstream.length > 0
                            ? upstream.map(u => `<span class="inline-block px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/20 text-indigo-300">${u}</span>`).join('')
                            : '<span class="text-slate-400 text-sm">No upstream sources</span>'}
                    </div>
                </div>
                <div>
                    <h4 class="text-slate-300 font-semibold mb-3">Downstream Consumers</h4>
                    <div class="flex flex-wrap gap-2">
                        ${downstream.length > 0
                            ? downstream.map(d => `<span class="inline-block px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/20 text-indigo-300">${d}</span>`).join('')
                            : '<span class="text-slate-400 text-sm">End consumer</span>'}
                    </div>
                </div>
            </div>
        </div>
    `;

    const content = document.getElementById('archDetailContent');
    if (content) {
        content.innerHTML = html;
    }

    const modal = document.getElementById('archDetailModal');
    if (modal) {
        modal.classList.remove('hidden');
    }
}

function closeArchDetail() {
    const modal = document.getElementById('archDetailModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

// ----------------------------------------------------------
// SCOPE MODULES (with detail expansion)
// ----------------------------------------------------------
function renderScopeModules() {
    const modules = DATA.scopeModules[appState.get('industry')];
    const container = document.getElementById('modulesContainer');
    const categories = { core: 'Core Modules', analytics: 'Analytics Modules', advanced: 'Advanced Modules' };

    let html = '';
    Object.entries(categories).forEach(([cat, label]) => {
        const catModules = modules.filter(m => m.category === cat);
        html += `<div class="mb-8">
            <h3 class="text-slate-100 font-bold text-lg mb-4">${label}</h3>
            <div class="space-y-3">
                ${catModules.map(m => {
                    const globalIdx = modules.indexOf(m);
                    const isSelected = appState.get('selectedModules').has(globalIdx);
                    const isExpanded = appState.get('expandedModules').has(globalIdx);
                    return `<div class="rounded-lg border ${isSelected ? 'border-indigo-600 bg-indigo-500/10' : 'border-slate-800 bg-slate-900/50'} p-4 cursor-pointer hover:border-slate-700 transition-colors" onclick="toggleModule(${globalIdx})">
                        <div class="flex gap-4">
                            <div class="flex items-center justify-center w-6 h-6 rounded border ${isSelected ? 'bg-indigo-600 border-indigo-500' : 'border-slate-700'}">${isSelected ? '<span style="color: white; font-weight: bold;">✓</span>' : ''}</div>
                            <div class="flex-1">
                                <div class="flex justify-between items-start gap-4 mb-2">
                                    <span class="text-slate-100 font-semibold">${m.name}</span>
                                    <button class="text-slate-400 hover:text-slate-200 transition-colors" onclick="toggleModuleDetail(${globalIdx}, event)" title="View details">ℹ</button>
                                </div>
                                <span class="block text-slate-400 text-sm mb-3">${m.description}</span>
                                <div class="flex flex-wrap gap-2 mb-3">
                                    <span class="inline-block px-2 py-1 rounded text-xs bg-slate-700/50 text-slate-300">Effort: ${m.effort} weeks</span>
                                    <span class="inline-block px-2 py-1 rounded text-xs bg-slate-700/50 text-slate-300">Integrations: ${m.integrations}</span>
                                    <span class="inline-block px-2 py-1 rounded text-xs bg-slate-700/50 text-slate-300">Phase ${m.phase}</span>
                                </div>
                                ${renderModuleDetailPanel(m, globalIdx, isExpanded)}
                            </div>
                        </div>
                    </div>`;
                }).join('')}
            </div>
        </div>`;
    });

    container.innerHTML = html;
    updateScopeSummary();
}

function renderModuleDetailPanel(m, idx, isExpanded) {
    if (!isExpanded) return '';

    const deps = m.dependencies && m.dependencies.length > 0
        ? m.dependencies.map(depId => {
            const depMod = DATA.scopeModules[appState.get('industry')].find(mod => mod.id === depId);
            return depMod ? depMod.name : depId;
        })
        : ['None — standalone module'];

    return `<div class="border-t border-slate-700/50 pt-3 mt-3 space-y-3">
        ${m.deliverables ? `<div>
            <div class="text-slate-300 text-sm font-semibold mb-2">Key Deliverables</div>
            <ul class="list-disc list-inside text-slate-400 text-sm space-y-1">${m.deliverables.map(d => `<li>${d}</li>`).join('')}</ul>
        </div>` : ''}
        ${m.requiredSkills ? `<div>
            <div class="text-slate-300 text-sm font-semibold mb-2">Required Skills</div>
            <div class="flex flex-wrap gap-2">${m.requiredSkills.map(s => `<span class="inline-block px-2 py-1 rounded text-xs bg-slate-700/50 text-slate-300">${s}</span>`).join('')}</div>
        </div>` : ''}
        ${m.dependencies ? `<div>
            <div class="text-slate-300 text-sm font-semibold mb-2">Dependencies</div>
            <div class="flex flex-wrap gap-2">${deps.map(d => `<span class="inline-block px-2 py-1 rounded text-xs bg-slate-700/50 text-slate-300">${d}</span>`).join('')}</div>
        </div>` : ''}
        ${m.successCriteria ? `<div>
            <div class="text-slate-300 text-sm font-semibold mb-2">Success Criteria</div>
            <ul class="list-disc list-inside text-slate-400 text-sm space-y-1">${m.successCriteria.map(s => `<li>${s}</li>`).join('')}</ul>
        </div>` : ''}
        ${m.riskFactors ? `<div>
            <div class="text-slate-300 text-sm font-semibold mb-2">Risk Factors</div>
            <ul class="list-disc list-inside text-slate-400 text-sm space-y-1">${m.riskFactors.map(r => `<li>${r}</li>`).join('')}</ul>
        </div>` : ''}
    </div>`;
}

function toggleModuleDetail(idx, event) {
    event.stopPropagation();
    const expanded = new Set(appState.get('expandedModules'));
    if (expanded.has(idx)) {
        expanded.delete(idx);
    } else {
        expanded.add(idx);
    }
    appState.set('expandedModules', expanded);
    renderScopeModules();
}

function toggleModule(idx) {
    const selected = new Set(appState.get('selectedModules'));
    if (selected.has(idx)) {
        selected.delete(idx);
    } else {
        selected.add(idx);
    }
    appState.set('selectedModules', selected);
    renderScopeModules();
    updateCosts();
    renderExportSummary();
    renderTechStack();
}

function updateScopeSummary() {
    const modules = DATA.scopeModules[appState.get('industry')];
    const count = appState.get('selectedModules').size;

    const moduleCountEl = document.getElementById('moduleCount');
    if (moduleCountEl) moduleCountEl.textContent = count;

    let totalIntegrations = 0;
    appState.get('selectedModules').forEach(idx => {
        if (modules[idx]) totalIntegrations += modules[idx].integrations;
    });

    const integrationCountEl = document.getElementById('integrationCount');
    if (integrationCountEl) integrationCountEl.textContent = totalIntegrations;

    let complexity = '—';
    if (count <= 3) complexity = 'Low';
    else if (count <= 6) complexity = 'Medium';
    else if (count <= 8) complexity = 'High';
    else complexity = 'Enterprise';

    const complexityLevelEl = document.getElementById('complexityLevel');
    if (complexityLevelEl) complexityLevelEl.textContent = complexity;
}

function applyPreset(preset) {
    const p = DATA.presets[preset];
    appState.set('selectedModules', new Set(p.modules));
    appState.set('teamSize', p.teamSize);
    appState.set('duration', p.duration);

    document.getElementById('durationSlider').value = p.duration;
    document.getElementById('durationDisplay').textContent = `${p.duration} months`;

    setTeamSize(p.teamSize);
    renderScopeModules();
    renderTechStack();
    updateCosts();
    renderExportSummary();
}

// ----------------------------------------------------------
// TEAM BUILDER
// ----------------------------------------------------------
function setTeamSize(size) {
    appState.set('teamSize', size);
    renderTeamRoster();

    // Update costs based on pricing mode
    if (appState.get('pricingMode') === 'calculator') {
        appState.set('calculatorRoles', {});
        initializeCalculator();
    } else {
        updateCosts();
    }
    renderScopeModules();
    renderTechStack();
    renderExportSummary();
}

function renderTeamRoster() {
    const roles = DATA.teamRoles[appState.get('teamSize')];
    const roster = document.getElementById('teamRoster');
    const categoryLabels = { leadership: 'Leadership & Delivery', domain: 'Domain Expertise', technical: 'Technical Team', change: 'Change Management' };
    const categoryColors = { leadership: '#3b82f6', domain: '#8b5cf6', technical: '#06b6d4', change: '#f59e0b' };

    let html = '';
    const categories = ['leadership', 'domain', 'technical', 'change'];

    categories.forEach(cat => {
        const catRoles = roles.filter(r => r.category === cat);
        if (catRoles.length === 0) return;
        html += `<div class="mb-6">
            <h4 class="text-slate-100 font-semibold mb-3" style="border-left: 3px solid ${categoryColors[cat]}; padding-left: 10px;">${categoryLabels[cat]}</h4>
            <div class="space-y-2">
            ${catRoles.map(r => `
                <div class="rounded-lg border border-slate-800 p-3 bg-slate-900/50 hover:bg-slate-800/50 transition-colors">
                    <div class="flex justify-between items-start gap-4">
                        <div>
                            <span class="block text-slate-100 font-medium">${r.role}</span>
                            <span class="block text-slate-400 text-sm">${r.responsibilities}</span>
                        </div>
                        <div class="text-right">
                            <span class="block text-slate-100 font-semibold">${r.count}x</span>
                            <span class="block text-slate-400 text-sm">$${r.rate}/hr</span>
                        </div>
                    </div>
                </div>
            `).join('')}
            </div>
        </div>`;
    });

    roster.innerHTML = html;

    const allocationBars = document.getElementById('allocationBars');
    if (allocationBars) {
        const totalHeadcount = roles.reduce((sum, r) => sum + r.count, 0);
        const catTotals = {};
        categories.forEach(cat => {
            catTotals[cat] = roles.filter(r => r.category === cat).reduce((sum, r) => sum + r.count, 0);
        });

        allocationBars.innerHTML = categories.map(cat => {
            const pct = Math.round((catTotals[cat] / totalHeadcount) * 100);
            return `<div class="mb-4">
                <div class="flex justify-between items-center mb-2">
                    <span class="text-slate-400 text-sm">${categoryLabels[cat]}</span>
                    <span class="text-slate-300 text-sm font-medium">${pct}%</span>
                </div>
                <div class="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div class="h-full transition-all" style="width: ${pct}%; background: ${categoryColors[cat]}"></div>
                </div>
            </div>`;
        }).join('') + `<div class="text-slate-400 text-sm border-t border-slate-700 pt-4 mt-4">Total Team: ${totalHeadcount} FTEs</div>`;
    }
}

// ----------------------------------------------------------
// COST CALCULATOR
// ----------------------------------------------------------

function updateCosts() {
    const duration = parseInt(document.getElementById('durationSlider').value);
    appState.set('duration', duration);
    document.getElementById('durationDisplay').textContent = `${duration} months`;

    const moduleCount = appState.get('selectedModules').size;
    const pricing = DATA.pricing;

    // Base implementation cost for the team size
    const implCost = pricing.implementation[appState.get('teamSize')];

    // Technology cost per module (one-time)
    const techCost = moduleCount * pricing.perModule;

    // Change management cost based on team size
    const changeCost = pricing.changeManagement[appState.get('teamSize')];

    // Monthly support cost across project duration
    const supportCost = pricing.supportPerMonth * duration;

    // Total project investment
    const totalCost = implCost + techCost + changeCost + supportCost;

    document.getElementById('implCost').textContent = formatCurrency(implCost);
    document.getElementById('techCost').textContent = formatCurrency(techCost);
    document.getElementById('changeCost').textContent = formatCurrency(changeCost);
    document.getElementById('supportCost').textContent = formatCurrency(supportCost);
    document.getElementById('totalCost').textContent = formatCurrency(totalCost);
    document.getElementById('totalCostRange').textContent = `Range: ${formatCurrency(Math.round(totalCost * 0.90))} — ${formatCurrency(Math.round(totalCost * 1.15))}`;

    // ROI calculations based on module count and team size
    const annualSavings = Math.round(moduleCount * 125000 + (appState.get('teamSize') === 'large' ? 500000 : appState.get('teamSize') === 'medium' ? 250000 : 100000));
    const threeYearROI = Math.round(((annualSavings * 3 - totalCost) / totalCost) * 100);
    const paybackMonths = Math.round(totalCost / (annualSavings / 12));
    const fteHours = Math.round(moduleCount * 2400 + (appState.get('teamSize') === 'large' ? 8000 : appState.get('teamSize') === 'medium' ? 4000 : 2000));

    document.getElementById('roiPercent').textContent = threeYearROI + '%';
    document.getElementById('paybackMonths').textContent = paybackMonths;
    document.getElementById('annualSavings').textContent = formatCurrency(annualSavings);
    document.getElementById('fteReduction').textContent = fteHours.toLocaleString();
}

// ----------------------------------------------------------
// PRICING MODE & CALCULATOR
// ----------------------------------------------------------
function setPricingMode(mode) {
    appState.set('pricingMode', mode);

    // Update button states
    document.getElementById('packagePricingBtn').classList.toggle('active', mode === 'package');
    document.getElementById('calculatorPricingBtn').classList.toggle('active', mode === 'calculator');

    // Toggle visibility
    document.getElementById('packagePricingControls').classList.toggle('hidden', mode !== 'package');
    document.getElementById('calculatorPricingControls').classList.toggle('hidden', mode !== 'calculator');

    // Initialize calculator on first use
    if (mode === 'calculator' && Object.keys(appState.get('calculatorRoles')).length === 0) {
        initializeCalculator();
    }

    // Update costs based on mode
    if (mode === 'package') {
        updateCosts();
    } else {
        updateCalculatorCosts();
    }
}

function initializeCalculator() {
    const roles = DATA.teamRoles[appState.get('teamSize')];
    const rolesList = document.getElementById('calculatorRolesList');
    const calculatorRoles = {};

    rolesList.innerHTML = roles.map((role, idx) => {
        const key = `${appState.get('teamSize')}-${idx}`;
        calculatorRoles[key] = { selected: false, hoursPerWeek: 40, rate: role.rate, role: role.role };

        return `
            <div class="flex items-center gap-3 p-3 rounded-lg border border-slate-800 bg-slate-900/50 hover:bg-slate-800/50 transition-colors">
                <input type="checkbox" id="calc-role-${key}" onchange="toggleCalculatorRole('${key}')" class="w-4 h-4 cursor-pointer" />
                <label for="calc-role-${key}" class="flex-1 text-slate-100 font-medium cursor-pointer">${role.role}</label>
                <input type="number" class="w-16 px-2 py-1 rounded border border-slate-700 bg-slate-800 text-slate-100 text-sm" min="0" max="60" value="40"
                       onchange="updateCalculatorRoleHours('${key}', this.value)"
                       placeholder="hrs/wk" />
                <span class="text-slate-400 text-sm w-20 text-right">$${role.rate}/hr</span>
                <span class="text-slate-100 font-medium w-24 text-right" id="revenue-${key}">$0</span>
            </div>
        `;
    }).join('');
    appState.set('calculatorRoles', calculatorRoles);
}

function toggleCalculatorRole(key) {
    const checkbox = document.getElementById(`calc-role-${key}`);
    const calculatorRoles = appState.get('calculatorRoles');
    calculatorRoles[key].selected = checkbox.checked;
    appState.set('calculatorRoles', calculatorRoles);
    updateCalculatorCosts();
}

function updateCalculatorRoleHours(key, hours) {
    const calculatorRoles = appState.get('calculatorRoles');
    calculatorRoles[key].hoursPerWeek = parseInt(hours) || 0;
    appState.set('calculatorRoles', calculatorRoles);
    updateCalculatorCosts();
}

function updateCalculatorCosts() {
    const durationWeeks = parseInt(document.getElementById('calcDurationWeeks').value) || 36;
    let totalRevenue = 0;

    Object.entries(appState.get('calculatorRoles')).forEach(([key, roleConfig]) => {
        const hours = roleConfig.hoursPerWeek * durationWeeks;
        const revenue = Math.round(hours * roleConfig.rate);

        if (roleConfig.selected) {
            totalRevenue += revenue;
        }

        // Update revenue display
        const revenueEl = document.getElementById(`revenue-${key}`);
        if (revenueEl) {
            revenueEl.textContent = roleConfig.selected ? formatCurrency(revenue) : '—';
        }
    });

    // Update cost display
    document.getElementById('implCost').textContent = formatCurrency(totalRevenue);
    document.getElementById('techCost').textContent = '$0';
    document.getElementById('changeCost').textContent = '$0';
    document.getElementById('supportCost').textContent = '$0';
    document.getElementById('totalCost').textContent = formatCurrency(totalRevenue);
    document.getElementById('totalCostRange').textContent = `Range: ${formatCurrency(Math.round(totalRevenue * 0.90))} — ${formatCurrency(Math.round(totalRevenue * 1.15))}`;

    // ROI based on calculator
    const roiSavings = Math.round(totalRevenue * 0.25);
    const threeYearROI = Math.round(((roiSavings * 3 - totalRevenue) / totalRevenue) * 100);
    const paybackMonths = Math.round((totalRevenue / roiSavings) * 12);

    document.getElementById('roiPercent').textContent = threeYearROI + '%';
    document.getElementById('paybackMonths').textContent = paybackMonths;
    document.getElementById('annualSavings').textContent = formatCurrency(roiSavings);
    document.getElementById('fteReduction').textContent = '—';
}

function formatCurrency(num) {
    if (num >= 1000000) return '$' + (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return '$' + (num / 1000).toFixed(0) + 'K';
    return '$' + num;
}

// ----------------------------------------------------------
// TIMELINE
// ----------------------------------------------------------
function renderTimeline() {
    const phases = DATA.phases[appState.get('industry')];
    const container = document.getElementById('timelineContainer');

    container.innerHTML = phases.map((phase, pi) => `
        <div class="mb-8">
            <div class="rounded-lg border-l-4 border-slate-800 bg-slate-900/50 p-6 mb-6" style="border-left-color: ${phase.color}">
                <div class="flex items-center gap-4 mb-4">
                    <div class="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style="background: ${phase.color}">${pi + 1}</div>
                    <div>
                        <h3 class="text-slate-100 font-bold text-lg">${phase.name}</h3>
                        <span class="text-slate-400 text-sm">${phase.duration}</span>
                    </div>
                </div>
            </div>
            <div class="space-y-3">
                ${phase.deliverables.map(d => `
                    <div class="rounded-lg border border-slate-800 p-4 bg-slate-900/50 hover:bg-slate-800/50 transition-colors">
                        <div class="flex justify-between items-start gap-4 mb-2">
                            <span class="text-slate-100 font-semibold">${d.name}</span>
                            <span class="text-slate-400 text-sm">${d.weeks} weeks</span>
                        </div>
                        <p class="text-slate-400 text-sm mb-3">${d.description}</p>
                        <div class="h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div class="h-full transition-all" style="width: ${(d.weeks / 5) * 100}%; background: ${phase.color}"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');

    renderDeliverables();
}

function renderDeliverables() {
    const phases = DATA.phases[appState.get('industry')];
    const table = document.getElementById('deliverablesTable');
    if (!table) return;

    let html = `<div class="grid grid-cols-4 gap-4 mb-4 pb-4 border-b border-slate-700">
        <span class="text-slate-300 font-semibold">Deliverable</span>
        <span class="text-slate-300 font-semibold">Duration</span>
        <span class="text-slate-300 font-semibold">Phase</span>
        <span class="text-slate-300 font-semibold">How to Complete</span>
    </div>`;

    phases.forEach((phase, pi) => {
        phase.deliverables.forEach(d => {
            html += `<div class="grid grid-cols-4 gap-4 py-3 border-b border-slate-800 hover:bg-slate-900/50 transition-colors">
                <span class="text-slate-100">${d.name}</span>
                <span class="text-slate-400">${d.weeks} weeks</span>
                <span><span class="inline-block px-2 py-1 rounded text-xs font-medium text-white" style="background: ${phase.color}">${pi + 1}</span></span>
                <span class="text-slate-400 text-sm">${d.howTo}</span>
            </div>`;
        });
    });

    table.innerHTML = html;
}

// ----------------------------------------------------------
// PROPOSAL GENERATOR
// ----------------------------------------------------------
function getProposalConfig() {
    const modules = DATA.scopeModules[appState.get('industry')];
    const selectedModulesArr = [];
    const moduleNames = [];
    appState.get('selectedModules').forEach(idx => {
        if (modules[idx]) {
            selectedModulesArr.push(modules[idx]);
            moduleNames.push(modules[idx].name);
        }
    });

    const roles = DATA.teamRoles[appState.get('teamSize')];
    const headcount = roles.reduce((sum, r) => sum + r.count, 0);
    const count = appState.get('selectedModules').size;
    let complexity = 'Low';
    if (count <= 3) complexity = 'Low';
    else if (count <= 6) complexity = 'Medium';
    else if (count <= 8) complexity = 'High';
    else complexity = 'Enterprise';

    return {
        industry: appState.get('industry'),
        industryLabel: appState.get('industry') === 'agency' ? 'Agency' : 'Publisher',
        moduleCount: count,
        moduleNames,
        selectedModules: selectedModulesArr,
        teamSize: appState.get('teamSize'),
        teamSizeLabel: appState.get('teamSize').charAt(0).toUpperCase() + appState.get('teamSize').slice(1),
        headcount,
        duration: appState.get('duration'),
        complexity,
        totalCost: document.getElementById('totalCost').textContent,
        implCost: document.getElementById('implCost').textContent,
        techCost: document.getElementById('techCost').textContent,
        changeCost: document.getElementById('changeCost').textContent,
        supportCost: document.getElementById('supportCost').textContent,
        roiPercent: document.getElementById('roiPercent').textContent,
        paybackMonths: document.getElementById('paybackMonths').textContent,
        annualSavings: document.getElementById('annualSavings').textContent,
        fteHoursSaved: document.getElementById('fteReduction').textContent,
        roles,
        phases: DATA.phases[appState.get('industry')],
        generatedFrom: appState.get('generatedFrom')
    };
}

function generateProposal() {
    const c = getProposalConfig();
    const templates = DATA.proposalTemplates?.[appState.get('industry')];

    if (!templates || c.moduleCount === 0) {
        alert('Please select at least one module before generating a proposal.');
        return;
    }

    const content = document.getElementById('proposalContent');
    document.getElementById('proposalDate').textContent = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    let html = '';

    // Executive Summary
    html += `<div class="mb-8">
        <h3 class="text-slate-100 font-bold text-xl mb-4">Executive Summary</h3>
        <div class="text-slate-400 leading-relaxed">${templates.executiveSummary(c)}</div>
    </div>`;

    // Scope of Work
    html += `<div class="mb-8">
        <h3 class="text-slate-100 font-bold text-xl mb-4">Scope of Work</h3>
        <div class="text-slate-400 leading-relaxed mb-4">${templates.scopeNarrative(c)}</div>
        <div class="grid grid-cols-2 gap-3">
            ${c.moduleNames.map(n => `<div class="rounded-lg border border-slate-800 bg-slate-900/50 p-3 text-slate-100">${n}</div>`).join('')}
        </div>
    </div>`;

    // Implementation Approach
    html += `<div class="mb-8">
        <h3 class="text-slate-100 font-bold text-xl mb-4">Implementation Approach</h3>
        <div class="text-slate-400 leading-relaxed">${templates.approachNarrative(c)}</div>
    </div>`;

    // Team Composition
    html += `<div class="mb-8">
        <h3 class="text-slate-100 font-bold text-xl mb-4">Team Composition</h3>
        <div class="text-slate-400 leading-relaxed mb-4"><strong>${c.teamSizeLabel} team</strong> of <strong>${c.headcount} FTEs</strong> over <strong>${c.duration} months</strong>.</div>
        <table class="w-full border-collapse">
            <thead>
                <tr class="border-b border-slate-700">
                    <th class="text-left text-slate-300 font-semibold py-2">Role</th>
                    <th class="text-left text-slate-300 font-semibold py-2">Count</th>
                    <th class="text-left text-slate-300 font-semibold py-2">Focus</th>
                </tr>
            </thead>
            <tbody>${c.roles.map(r => `<tr class="border-b border-slate-800"><td class="py-2 text-slate-100">${r.role}</td><td class="py-2 text-slate-100">${r.count}</td><td class="py-2 text-slate-400">${r.responsibilities}</td></tr>`).join('')}</tbody>
        </table>
    </div>`;

    // Investment Summary
    html += `<div class="mb-8">
        <h3 class="text-slate-100 font-bold text-xl mb-4">Investment Summary</h3>
        <div class="text-slate-400 leading-relaxed mb-4">${templates.investmentNarrative(c)}</div>
        <div class="grid grid-cols-2 gap-4">
            <div class="rounded-lg border border-slate-800 p-4 bg-slate-900/50">
                <div class="text-slate-400 text-sm">Implementation</div>
                <div class="text-slate-100 font-bold text-lg">${c.implCost}</div>
            </div>
            <div class="rounded-lg border border-slate-800 p-4 bg-slate-900/50">
                <div class="text-slate-400 text-sm">Technology</div>
                <div class="text-slate-100 font-bold text-lg">${c.techCost}</div>
            </div>
            <div class="rounded-lg border border-slate-800 p-4 bg-slate-900/50">
                <div class="text-slate-400 text-sm">Change Mgmt</div>
                <div class="text-slate-100 font-bold text-lg">${c.changeCost}</div>
            </div>
            <div class="rounded-lg border border-indigo-600 p-4 bg-indigo-500/10">
                <div class="text-slate-400 text-sm">Total Investment</div>
                <div class="text-indigo-300 font-bold text-lg">${c.totalCost}</div>
            </div>
        </div>
    </div>`;

    // ROI Projection
    html += `<div class="mb-8">
        <h3 class="text-slate-100 font-bold text-xl mb-4">ROI Projection</h3>
        <div class="text-slate-400 leading-relaxed mb-4">${templates.roiNarrative(c)}</div>
        <div class="grid grid-cols-2 gap-4">
            <div class="rounded-lg border border-slate-800 p-4 bg-slate-900/50">
                <div class="text-slate-400 text-sm">3-Year ROI</div>
                <div class="text-green-400 font-bold text-lg">${c.roiPercent}</div>
            </div>
            <div class="rounded-lg border border-slate-800 p-4 bg-slate-900/50">
                <div class="text-slate-400 text-sm">Payback</div>
                <div class="text-slate-100 font-bold text-lg">${c.paybackMonths} mo</div>
            </div>
            <div class="rounded-lg border border-slate-800 p-4 bg-slate-900/50">
                <div class="text-slate-400 text-sm">Annual Savings</div>
                <div class="text-green-400 font-bold text-lg">${c.annualSavings}</div>
            </div>
            <div class="rounded-lg border border-slate-800 p-4 bg-slate-900/50">
                <div class="text-slate-400 text-sm">FTE Hours Saved</div>
                <div class="text-slate-100 font-bold text-lg">${c.fteHoursSaved}/yr</div>
            </div>
        </div>
    </div>`;

    content.innerHTML = html;
    const modal = document.getElementById('proposalModal');
    if (modal) {
        modal.classList.remove('hidden');
    }
}

function closeProposal() {
    const modal = document.getElementById('proposalModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function copyProposal() {
    const content = document.getElementById('proposalContent');
    const text = content.innerText;
    navigator.clipboard.writeText(text).then(() => {
        const btn = document.querySelector('.proposal-actions button');
        const orig = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => btn.textContent = orig, 2000);
    });
}

function printProposal() {
    window.print();
}

// ----------------------------------------------------------
// GAMMA EXPORT
// ----------------------------------------------------------
function prepareGammaExport() {
    const c = getProposalConfig();
    const templates = DATA.proposalTemplates?.[appState.get('industry')];

    if (!templates || c.moduleCount === 0) {
        alert('Please select at least one module before exporting.');
        return;
    }

    const execSummary = templates.executiveSummary(c).replace(/<[^>]+>/g, '');
    const scopeText = templates.scopeNarrative(c).replace(/<[^>]+>/g, '');
    const approachText = templates.approachNarrative(c).replace(/<[^>]+>/g, '');

    let payload = `# FP&A Automation Proposal — ${c.industryLabel}\n\n`;
    payload += `## Executive Summary\n${execSummary}\n\n`;
    payload += `## Scope of Work\n${scopeText}\n\n`;
    payload += `### Selected Modules (${c.moduleCount})\n`;
    c.moduleNames.forEach(n => payload += `- ${n}\n`);
    payload += `\n## Implementation Approach\n${approachText}\n\n`;
    payload += `## Team\n- Size: ${c.teamSizeLabel} (${c.headcount} FTEs)\n- Duration: ${c.duration} months\n\n`;
    payload += `## Investment\n- Implementation: ${c.implCost}\n- Technology: ${c.techCost}\n- Change Management: ${c.changeCost}\n- **Total: ${c.totalCost}**\n\n`;
    payload += `## ROI Projection\n- 3-Year ROI: ${c.roiPercent}\n- Payback: ${c.paybackMonths} months\n- Annual Savings: ${c.annualSavings}\n- FTE Hours Saved: ${c.fteHoursSaved}/yr\n\n`;
    payload += `## Timeline\n`;
    c.phases.forEach(phase => {
        payload += `### ${phase.name} (${phase.duration})\n`;
        phase.deliverables.forEach(d => {
            payload += `- **${d.name}** (${d.weeks} weeks): ${d.description}\n`;
        });
        payload += '\n';
    });

    // Store for external access
    window.__gammaExportPayload = payload;

    const textEl = document.getElementById('gammaExportText');
    if (textEl) {
        textEl.value = payload;
    }

    const modal = document.getElementById('gammaExportModal');
    if (modal) {
        modal.classList.remove('hidden');
    }
}

function closeGammaExport() {
    const modal = document.getElementById('gammaExportModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function copyGammaExport() {
    const textarea = document.getElementById('gammaExportText');
    navigator.clipboard.writeText(textarea.value).then(() => {
        const btn = document.querySelector('.gamma-actions button');
        const orig = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => btn.textContent = orig, 2000);
    });
}

// ----------------------------------------------------------
// EXPORT SUMMARY
// ----------------------------------------------------------
function renderExportSummary() {
    const modules = DATA.scopeModules[appState.get('industry')];
    const selectedNames = [];
    appState.get('selectedModules').forEach(idx => {
        if (modules[idx]) selectedNames.push(modules[idx].name);
    });

    const roles = DATA.teamRoles[appState.get('teamSize')];
    const totalHeadcount = roles.reduce((sum, r) => sum + r.count, 0);

    const el = document.getElementById('exportSummary');
    if (!el) return;

    el.innerHTML = `
        <div class="mb-4">
            <h4 class="text-slate-300 text-sm font-semibold mb-2">Industry</h4>
            <p class="text-slate-100">${appState.get('industry') === 'agency' ? 'Agency' : 'Publisher'}</p>
        </div>
        ${appState.get('generatedFrom') ? `<div class="mb-4"><h4 class="text-slate-300 text-sm font-semibold mb-2">Generated From</h4><p class="text-slate-100">${appState.get('generatedFrom')}</p></div>` : ''}
        <div class="mb-4">
            <h4 class="text-slate-300 text-sm font-semibold mb-2">Selected Modules (${appState.get('selectedModules').size})</h4>
            <div class="flex flex-wrap gap-2">${selectedNames.map(n => `<span class="inline-block px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/20 text-indigo-300">${n}</span>`).join('')}</div>
        </div>
        <div class="mb-4">
            <h4 class="text-slate-300 text-sm font-semibold mb-2">Team</h4>
            <p class="text-slate-100">${appState.get('teamSize').charAt(0).toUpperCase() + appState.get('teamSize').slice(1)} (${totalHeadcount} FTEs)</p>
        </div>
        <div class="mb-4">
            <h4 class="text-slate-300 text-sm font-semibold mb-2">Duration</h4>
            <p class="text-slate-100">${appState.get('duration')} months</p>
        </div>
    `;
}

function exportPlan() {
    const modules = DATA.scopeModules[appState.get('industry')];
    const selectedModulesArr = [];
    appState.get('selectedModules').forEach(idx => {
        if (modules[idx]) selectedModulesArr.push(modules[idx]);
    });

    const plan = {
        industry: appState.get('industry'),
        generatedAt: new Date().toISOString(),
        generatedFrom: appState.get('generatedFrom'),
        scope: { modules: selectedModulesArr, totalModules: appState.get('selectedModules').size, complexity: document.getElementById('complexityLevel')?.textContent || '—' },
        team: { size: appState.get('teamSize'), roles: DATA.teamRoles[appState.get('teamSize')], totalHeadcount: DATA.teamRoles[appState.get('teamSize')].reduce((s, r) => s + r.count, 0) },
        financials: { duration: appState.get('duration') + ' months', totalInvestment: document.getElementById('totalCost')?.textContent || '$0', implementation: document.getElementById('implCost')?.textContent || '$0', technology: document.getElementById('techCost')?.textContent || '$0', changeManagement: document.getElementById('changeCost')?.textContent || '$0', support: document.getElementById('supportCost')?.textContent || '$0' },
        roi: { threeYearROI: document.getElementById('roiPercent')?.textContent || '0%', paybackMonths: document.getElementById('paybackMonths')?.textContent || '0', annualSavings: document.getElementById('annualSavings')?.textContent || '$0', fteHoursSaved: document.getElementById('fteReduction')?.textContent || '0' },
        timeline: DATA.phases[appState.get('industry')]
    };

    const blob = new Blob([JSON.stringify(plan, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fpa-automation-plan-${appState.get('industry')}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

// Alias for HTML onclick
function exportJSON() {
    exportPlan();
}

// ----------------------------------------------------------
// SCROLL EFFECTS & KEYBOARD
// ----------------------------------------------------------
function initScrollEffects() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeArchDetail();
            closeTechDetail();
            closeProposal();
            closeGammaExport();
        }
    });
}
