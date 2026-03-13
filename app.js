// ============================================================
// FP&A AUTOMATION — APPLICATION LOGIC
// ============================================================

let state = {
    industry: 'agency',
    selectedModules: new Set(),
    teamSize: 'medium',
    duration: 9,
    deliveryModel: 'onshore',
    licenseModel: 'saas',
    generatedFrom: null,
    expandedModules: new Set()
};

// ----------------------------------------------------------
// INITIALIZATION
// ----------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    setIndustry('agency');
    setTeamSize('medium');
    applyPreset('standard');
    initScrollEffects();
    initKeyboardShortcuts();
});

// ----------------------------------------------------------
// INDUSTRY TOGGLE
// ----------------------------------------------------------
function setIndustry(industry) {
    state.industry = industry;
    state.generatedFrom = null;
    state.expandedModules = new Set();
    hideGeneratedFromBanner();

    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.industry === industry);
    });

    document.getElementById('heroIndustryText').textContent = DATA.context[industry].heroText;
    document.getElementById('heroSubtitle').textContent = DATA.context[industry].heroSubtitle;
    document.getElementById('useCaseIndustryLabel').textContent = industry === 'agency' ? 'Agencies' : 'Publishers';

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
    const items = DATA.context[state.industry].contextItems;
    const grid = document.getElementById('contextGrid');
    grid.innerHTML = items.map(item => `
        <div class="context-item">
            <span class="context-icon">${item.icon}</span>
            <div class="context-text">
                <span class="context-label">${item.label}</span>
                <span class="context-value">${item.value}</span>
            </div>
        </div>
    `).join('');
}

// ----------------------------------------------------------
// USE CASES (Clickable → auto-configure project)
// ----------------------------------------------------------
function renderUseCases() {
    const cases = DATA.useCases[state.industry];
    const grid = document.getElementById('useCaseGrid');
    grid.innerHTML = cases.map((uc, i) => `
        <div class="use-case-card" style="animation-delay: ${i * 0.05}s" onclick="selectUseCaseProject(${i})">
            <div class="uc-header">
                <span class="uc-icon">${uc.icon}</span>
                <span class="uc-complexity complexity-${uc.complexity}">${uc.complexity}</span>
            </div>
            <h3 class="uc-title">${uc.title}</h3>
            <p class="uc-desc">${uc.description}</p>
            <div class="uc-section">
                <h4 class="uc-section-title pain-title">Pain Points</h4>
                <ul class="uc-list">${uc.painPoints.map(p => `<li>${p}</li>`).join('')}</ul>
            </div>
            <div class="uc-section">
                <h4 class="uc-section-title value-title">Automation Value</h4>
                <ul class="uc-list">${uc.automationValue.map(v => `<li>${v}</li>`).join('')}</ul>
            </div>
            <div class="uc-kpis">
                ${uc.kpis.map(k => `<span class="kpi-tag">${k}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

function selectUseCaseProject(idx) {
    const uc = DATA.useCases[state.industry][idx];
    if (!uc || !uc.projectPlan) return;

    const plan = uc.projectPlan;
    state.selectedModules = new Set(plan.moduleIndices);
    const teamSize = plan.recommendedTeamSize || plan.teamSize;
    const duration = plan.recommendedDuration || plan.duration;
    state.teamSize = teamSize;
    state.duration = duration;
    state.generatedFrom = uc.title;

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
    document.getElementById('generatedFromName').textContent = name;
    banner.style.display = 'flex';
}

function hideGeneratedFromBanner() {
    document.getElementById('generatedFromBanner').style.display = 'none';
}

function clearGeneratedFrom() {
    state.generatedFrom = null;
    hideGeneratedFromBanner();
}

// ----------------------------------------------------------
// ARCHITECTURE (Clickable → detail modal)
// ----------------------------------------------------------
function renderArchitecture() {
    const arch = DATA.architecture[state.industry];
    const layerLabels = { sources: 'Data Sources', platform: 'Data Platform', apps: 'Application Layer', outputs: 'Outputs' };

    ['sources', 'platform', 'apps', 'outputs'].forEach(layer => {
        const capitalizedId = 'arch' + layer.charAt(0).toUpperCase() + layer.slice(1);
        const el = document.getElementById(capitalizedId);
        el.innerHTML = arch[layer].map((item, idx) => `
            <div class="arch-item" onclick="openArchDetail('${layer}', ${idx})">
                <span class="arch-item-name">${item.name}</span>
                <span class="arch-item-sub">${item.sub}</span>
            </div>
        `).join('');
    });

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
            <div class="tech-card tech-card-${tech.criticality.toLowerCase()}"
                 style="opacity: ${opacity}; border-color: ${borderColor};"
                 onclick="openTechDetail(${idx})">
                <div class="tech-relevance-badge" style="width: ${scorePercent}%; background: ${borderColor};"></div>
                <div class="tech-card-header">
                    <span class="tech-category">${tech.category}</span>
                    <span class="tech-criticality-badge ${tech.criticality.toLowerCase()}">${tech.criticality}</span>
                </div>
                <span class="tech-recommended">${tech.recommended}</span>
                <div class="tech-options">${tech.options.map(o => `<span class="tech-option">${o}</span>`).join('')}</div>
                ${matchedModules.length > 0 ? `<div class="tech-modules-matched">${matchedModules.length} module${matchedModules.length !== 1 ? 's' : ''}</div>` : ''}
                <div class="tech-click-hint">↗ Click for details</div>
            </div>
        `;
    }).join('');
}

function scoreAndFilterTechStack() {
    const modules = DATA.scopeModules[state.industry];
    const selectedCount = state.selectedModules.size;

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
        for (let modIdx of state.selectedModules) {
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

        // 3. Check delivery model compatibility
        if (tech.deliveryModels && tech.deliveryModels.includes(state.deliveryModel)) {
            score += 0.1;
        }

        // 4. Criticality boost
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
    const modules = DATA.scopeModules[state.industry];

    const moduleList = matchedModules.map(modIdx =>
        `<li><strong>${modules[modIdx]?.name || 'Unknown'}</strong> — ${modules[modIdx]?.description || ''}</li>`
    ).join('');

    const architectureConnections = tech.architectureLayers
        ? tech.architectureLayers.map(layer => {
            const layerNames = { 'sources': 'Data Sources', 'platform': 'Data Platform', 'apps': 'Application Layer', 'outputs': 'Outputs' };
            return `<span class="arch-connection-tag">${layerNames[layer]}</span>`;
        }).join('')
        : '';

    const scorePercent = Math.round(score * 100);

    document.getElementById('techDetailCategory').textContent = tech.category;
    document.getElementById('techDetailRecommended').textContent = tech.recommended;
    document.getElementById('techDetailCriticality').textContent = tech.criticality;
    document.getElementById('techDetailRelevanceBar').style.width = scorePercent + '%';
    document.getElementById('techDetailRelevancePercent').textContent = scorePercent + '%';
    document.getElementById('techDetailRelevancePercent').parentElement.style.borderColor = scorePercent >= 80 ? '#7c5cff' : scorePercent >= 50 ? '#4f46e5' : '#6b7280';

    document.getElementById('techDetailOptions').innerHTML = tech.options
        .map(o => `<span class="tech-option">${o}</span>`).join('');

    document.getElementById('techDetailReason').innerHTML = `
        <p><strong>Why for your project:</strong> ${tech.reason}</p>
        <p><strong>Cost impact:</strong> ${tech.costImpact}</p>
        ${matchedModules.length > 0 ? `
            <p><strong>Used by your selected modules (${matchedModules.length}):</strong></p>
            <ul style="margin: 0.5rem 0 0 1.5rem; padding: 0; font-size: 0.9rem;">${moduleList}</ul>
        ` : '<p style="color: #9ca3af; font-style: italic;">Not directly used by your selected modules, but part of the recommended foundation.</p>'}
    `;

    document.getElementById('techDetailArchitecture').innerHTML = architectureConnections
        ? `<p><strong>Architecture layers:</strong></p><div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">${architectureConnections}</div>`
        : '';

    document.getElementById('techDetailModal').classList.add('active');
}

function closeTechDetail() {
    document.getElementById('techDetailModal').classList.remove('active');
}

function openArchDetail(layer, idx) {
    const arch = DATA.architecture[state.industry];
    const item = arch[layer][idx];
    if (!item) return;

    const layerLabels = { sources: 'Data Sources', platform: 'Data Platform', apps: 'Application Layer', outputs: 'Outputs' };

    document.getElementById('archModalLayer').textContent = layerLabels[layer];
    document.getElementById('archModalTitle').textContent = item.name;
    document.getElementById('archModalSub').textContent = item.sub;
    document.getElementById('archModalTech').textContent = item.techDescription || 'Technical description not available.';
    document.getElementById('archModalBusiness').textContent = item.businessDescription || 'Business description not available.';
    document.getElementById('archModalCurrentName').textContent = item.name;

    const upstream = item.connections?.upstream || [];
    const downstream = item.connections?.downstream || [];

    document.getElementById('archModalUpstream').innerHTML = upstream.length > 0
        ? upstream.map(u => `<span class="conn-tag">${u}</span>`).join('')
        : '<span class="conn-empty">No upstream sources</span>';

    document.getElementById('archModalDownstream').innerHTML = downstream.length > 0
        ? downstream.map(d => `<span class="conn-tag">${d}</span>`).join('')
        : '<span class="conn-empty">End consumer</span>';

    document.getElementById('archDetailModal').classList.add('active');
}

function closeArchDetail() {
    document.getElementById('archDetailModal').classList.remove('active');
}

// ----------------------------------------------------------
// SCOPE MODULES (with detail expansion)
// ----------------------------------------------------------
function renderScopeModules() {
    const modules = DATA.scopeModules[state.industry];
    const container = document.getElementById('scopeModules');
    const categories = { core: 'Core Modules', analytics: 'Analytics Modules', advanced: 'Advanced Modules' };

    let html = '';
    Object.entries(categories).forEach(([cat, label]) => {
        const catModules = modules.filter(m => m.category === cat);
        html += `<div class="module-category">
            <h3 class="module-cat-title">${label}</h3>
            <div class="module-list">
                ${catModules.map(m => {
                    const globalIdx = modules.indexOf(m);
                    const isSelected = state.selectedModules.has(globalIdx);
                    const isExpanded = state.expandedModules.has(globalIdx);
                    return `<div class="module-card ${isSelected ? 'selected' : ''} ${isExpanded ? 'detail-expanded' : ''}" onclick="toggleModule(${globalIdx})">
                        <div class="module-check">${isSelected ? '✓' : ''}</div>
                        <div class="module-info">
                            <div style="display:flex;justify-content:space-between;align-items:flex-start;">
                                <span class="module-name">${m.name}</span>
                                <button class="module-detail-toggle" onclick="toggleModuleDetail(${globalIdx}, event)" title="View details">ℹ</button>
                            </div>
                            <span class="module-desc">${m.description}</span>
                            <div class="module-meta">
                                <span class="meta-tag">Effort: ${m.effort} weeks</span>
                                <span class="meta-tag">Integrations: ${m.integrations}</span>
                                <span class="meta-tag phase-tag">Phase ${m.phase}</span>
                            </div>
                            ${renderModuleDetailPanel(m, globalIdx)}
                        </div>
                    </div>`;
                }).join('')}
            </div>
        </div>`;
    });

    container.innerHTML = html;
    updateScopeSummary();
}

function renderModuleDetailPanel(m, idx) {
    const deps = m.dependencies && m.dependencies.length > 0
        ? m.dependencies.map(depId => {
            const depMod = DATA.scopeModules[state.industry].find(mod => mod.id === depId);
            return depMod ? depMod.name : depId;
        })
        : ['None — standalone module'];

    return `<div class="module-detail-panel">
        ${m.deliverables ? `<div class="detail-section">
            <div class="detail-section-title dt-deliverables">Key Deliverables</div>
            <ul class="detail-list">${m.deliverables.map(d => `<li>${d}</li>`).join('')}</ul>
        </div>` : ''}
        ${m.requiredSkills ? `<div class="detail-section">
            <div class="detail-section-title dt-skills">Required Skills</div>
            <div class="detail-tags">${m.requiredSkills.map(s => `<span class="detail-tag">${s}</span>`).join('')}</div>
        </div>` : ''}
        ${m.dependencies ? `<div class="detail-section">
            <div class="detail-section-title dt-deps">Dependencies</div>
            <div class="detail-tags">${deps.map(d => `<span class="detail-tag">${d}</span>`).join('')}</div>
        </div>` : ''}
        ${m.successCriteria ? `<div class="detail-section">
            <div class="detail-section-title dt-success">Success Criteria</div>
            <ul class="detail-list">${m.successCriteria.map(s => `<li>${s}</li>`).join('')}</ul>
        </div>` : ''}
        ${m.riskFactors ? `<div class="detail-section">
            <div class="detail-section-title dt-risks">Risk Factors</div>
            <ul class="detail-list">${m.riskFactors.map(r => `<li>${r}</li>`).join('')}</ul>
        </div>` : ''}
    </div>`;
}

function toggleModuleDetail(idx, event) {
    event.stopPropagation();
    if (state.expandedModules.has(idx)) {
        state.expandedModules.delete(idx);
    } else {
        state.expandedModules.add(idx);
    }
    renderScopeModules();
}

function toggleModule(idx) {
    if (state.selectedModules.has(idx)) {
        state.selectedModules.delete(idx);
    } else {
        state.selectedModules.add(idx);
    }
    renderScopeModules();
    updateCosts();
    renderExportSummary();
    renderTechStack(); // Re-render tech stack with new relevance scores
}

function updateScopeSummary() {
    const modules = DATA.scopeModules[state.industry];
    const count = state.selectedModules.size;
    document.getElementById('moduleCount').textContent = count;

    let totalIntegrations = 0;
    state.selectedModules.forEach(idx => {
        if (modules[idx]) totalIntegrations += modules[idx].integrations;
    });
    document.getElementById('integrationCount').textContent = totalIntegrations;

    let complexity = '—';
    if (count <= 3) complexity = 'Low';
    else if (count <= 6) complexity = 'Medium';
    else if (count <= 8) complexity = 'High';
    else complexity = 'Enterprise';
    document.getElementById('complexityLevel').textContent = complexity;
}

function applyPreset(preset) {
    const p = DATA.presets[preset];
    state.selectedModules = new Set(p.modules);
    state.teamSize = p.teamSize;
    state.duration = p.duration;

    document.getElementById('durationSlider').value = p.duration;
    document.getElementById('durationDisplay').textContent = `${p.duration} months`;

    setTeamSize(p.teamSize);
    renderScopeModules();
    updateCosts();
    renderExportSummary();

    document.querySelectorAll('.preset-btn').forEach(btn => btn.classList.remove('active'));
    if (event && event.target) event.target.classList.add('active');
}

// ----------------------------------------------------------
// TEAM BUILDER
// ----------------------------------------------------------
function setTeamSize(size) {
    state.teamSize = size;
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.size === size);
    });
    renderTeamRoster();
    updateCosts();
    renderExportSummary();
}

function renderTeamRoster() {
    const roles = DATA.teamRoles[state.teamSize];
    const roster = document.getElementById('teamRoster');
    const categoryLabels = { leadership: 'Leadership & Delivery', domain: 'Domain Expertise', technical: 'Technical Team', change: 'Change Management' };
    const categoryColors = { leadership: '#3b82f6', domain: '#8b5cf6', technical: '#06b6d4', change: '#f59e0b' };

    let html = '';
    const categories = ['leadership', 'domain', 'technical', 'change'];

    categories.forEach(cat => {
        const catRoles = roles.filter(r => r.category === cat);
        if (catRoles.length === 0) return;
        html += `<div class="roster-category">
            <h4 class="roster-cat-title" style="border-left: 3px solid ${categoryColors[cat]}; padding-left: 10px;">${categoryLabels[cat]}</h4>
            ${catRoles.map(r => `
                <div class="roster-role">
                    <div class="role-info">
                        <span class="role-name">${r.role}</span>
                        <span class="role-resp">${r.responsibilities}</span>
                    </div>
                    <div class="role-meta">
                        <span class="role-count">${r.count}x</span>
                        <span class="role-rate">$${r.rate}/hr</span>
                    </div>
                </div>
            `).join('')}
        </div>`;
    });

    roster.innerHTML = html;

    const allocationBars = document.getElementById('allocationBars');
    const totalHeadcount = roles.reduce((sum, r) => sum + r.count, 0);
    const catTotals = {};
    categories.forEach(cat => {
        catTotals[cat] = roles.filter(r => r.category === cat).reduce((sum, r) => sum + r.count, 0);
    });

    allocationBars.innerHTML = categories.map(cat => {
        const pct = Math.round((catTotals[cat] / totalHeadcount) * 100);
        return `<div class="alloc-row">
            <span class="alloc-label">${categoryLabels[cat]}</span>
            <div class="alloc-bar-container">
                <div class="alloc-bar" style="width: ${pct}%; background: ${categoryColors[cat]}"></div>
            </div>
            <span class="alloc-pct">${pct}%</span>
        </div>`;
    }).join('') + `<div class="alloc-total">Total Team: ${totalHeadcount} FTEs</div>`;
}

// ----------------------------------------------------------
// COST CALCULATOR
// ----------------------------------------------------------
function setDeliveryModel(model) {
    state.deliveryModel = model;
    document.querySelectorAll('.delivery-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.model === model);
    });
    updateCosts();
    renderExportSummary();
    renderTechStack(); // Re-render tech stack based on delivery model
}

function setLicenseModel(model) {
    state.licenseModel = model;
    document.querySelectorAll('.license-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.license === model);
    });
    updateCosts();
    renderExportSummary();
}

function updateCosts() {
    const duration = parseInt(document.getElementById('durationSlider').value);
    state.duration = duration;
    document.getElementById('durationDisplay').textContent = `${duration} months`;

    const roles = DATA.teamRoles[state.teamSize];
    const deliveryMult = DATA.costMultipliers.delivery[state.deliveryModel];
    const licenseCfg = DATA.costMultipliers.license[state.licenseModel];
    const moduleCount = state.selectedModules.size;

    const monthlyTeamCost = roles.reduce((sum, r) => sum + (r.count * r.rate * 160), 0);
    const implCost = Math.round(monthlyTeamCost * duration * deliveryMult);

    let techCost;
    if (state.licenseModel === 'onprem') {
        techCost = licenseCfg.base + (moduleCount * licenseCfg.perModule);
    } else {
        techCost = (licenseCfg.base + (moduleCount * licenseCfg.perModule)) * duration;
    }
    techCost = Math.round(techCost);

    const changeCost = Math.round(implCost * 0.12);
    const supportCost = Math.round((implCost / duration * 12) * 0.18);
    const totalCost = implCost + techCost + changeCost;

    document.getElementById('implCost').textContent = formatCurrency(implCost);
    document.getElementById('techCost').textContent = formatCurrency(techCost);
    document.getElementById('changeCost').textContent = formatCurrency(changeCost);
    document.getElementById('supportCost').textContent = formatCurrency(supportCost) + '/yr';
    document.getElementById('totalCost').textContent = formatCurrency(totalCost);
    document.getElementById('totalCostRange').textContent = `Range: ${formatCurrency(Math.round(totalCost * 0.85))} — ${formatCurrency(Math.round(totalCost * 1.2))}`;

    const annualSavings = Math.round(moduleCount * 125000 + (state.teamSize === 'large' ? 500000 : state.teamSize === 'medium' ? 250000 : 100000));
    const threeYearROI = Math.round(((annualSavings * 3 - totalCost) / totalCost) * 100);
    const paybackMonths = Math.round(totalCost / (annualSavings / 12));
    const fteHours = Math.round(moduleCount * 2400 + (state.teamSize === 'large' ? 8000 : state.teamSize === 'medium' ? 4000 : 2000));

    document.getElementById('roiPercent').textContent = threeYearROI + '%';
    document.getElementById('paybackMonths').textContent = paybackMonths;
    document.getElementById('annualSavings').textContent = formatCurrency(annualSavings);
    document.getElementById('fteReduction').textContent = fteHours.toLocaleString();
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
    const phases = DATA.phases[state.industry];
    const container = document.getElementById('timelineContainer');

    container.innerHTML = phases.map((phase, pi) => `
        <div class="timeline-phase">
            <div class="phase-header" style="border-color: ${phase.color}">
                <div class="phase-marker" style="background: ${phase.color}">${pi + 1}</div>
                <div class="phase-title-group">
                    <h3 class="phase-name">${phase.name}</h3>
                    <span class="phase-duration">${phase.duration}</span>
                </div>
            </div>
            <div class="phase-deliverables">
                ${phase.deliverables.map(d => `
                    <div class="deliverable-card">
                        <div class="del-header">
                            <span class="del-name">${d.name}</span>
                            <span class="del-weeks">${d.weeks} weeks</span>
                        </div>
                        <p class="del-desc">${d.description}</p>
                        <div class="del-bar">
                            <div class="del-bar-fill" style="width: ${(d.weeks / 5) * 100}%; background: ${phase.color}"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');

    renderDeliverables();
}

function renderDeliverables() {
    const phases = DATA.phases[state.industry];
    const table = document.getElementById('deliverablesTable');

    let html = `<div class="del-table-header">
        <span class="del-th">Deliverable</span>
        <span class="del-th">Duration</span>
        <span class="del-th">Phase</span>
        <span class="del-th del-th-wide">How to Complete</span>
    </div>`;

    phases.forEach((phase, pi) => {
        phase.deliverables.forEach(d => {
            html += `<div class="del-table-row">
                <span class="del-td del-td-name">${d.name}</span>
                <span class="del-td">${d.weeks} weeks</span>
                <span class="del-td"><span class="phase-badge" style="background: ${phase.color}">${pi + 1}</span></span>
                <span class="del-td del-td-wide del-td-howto">${d.howTo}</span>
            </div>`;
        });
    });

    table.innerHTML = html;
}

// ----------------------------------------------------------
// PROPOSAL GENERATOR
// ----------------------------------------------------------
function getProposalConfig() {
    const modules = DATA.scopeModules[state.industry];
    const selectedModulesArr = [];
    const moduleNames = [];
    state.selectedModules.forEach(idx => {
        if (modules[idx]) {
            selectedModulesArr.push(modules[idx]);
            moduleNames.push(modules[idx].name);
        }
    });

    const roles = DATA.teamRoles[state.teamSize];
    const headcount = roles.reduce((sum, r) => sum + r.count, 0);
    const count = state.selectedModules.size;
    let complexity = 'Low';
    if (count <= 3) complexity = 'Low';
    else if (count <= 6) complexity = 'Medium';
    else if (count <= 8) complexity = 'High';
    else complexity = 'Enterprise';

    return {
        industry: state.industry,
        industryLabel: state.industry === 'agency' ? 'Agency' : 'Publisher',
        moduleCount: count,
        moduleNames,
        selectedModules: selectedModulesArr,
        teamSize: state.teamSize,
        teamSizeLabel: state.teamSize.charAt(0).toUpperCase() + state.teamSize.slice(1),
        headcount,
        duration: state.duration,
        deliveryModel: state.deliveryModel,
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
        phases: DATA.phases[state.industry],
        generatedFrom: state.generatedFrom
    };
}

function generateProposal() {
    const c = getProposalConfig();
    const templates = DATA.proposalTemplates?.[state.industry];

    if (!templates || c.moduleCount === 0) {
        alert('Please select at least one module before generating a proposal.');
        return;
    }

    const content = document.getElementById('proposalContent');
    document.getElementById('proposalDate').textContent = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    let html = '';

    // Executive Summary
    html += `<div class="proposal-section">
        <h3>Executive Summary</h3>
        <div class="proposal-exec-summary">${templates.executiveSummary(c)}</div>
    </div>`;

    // Scope of Work
    html += `<div class="proposal-section">
        <h3>Scope of Work</h3>
        <div class="proposal-text">${templates.scopeNarrative(c)}</div>
        <div class="proposal-module-grid">
            ${c.moduleNames.map(n => `<div class="proposal-module-item">${n}</div>`).join('')}
        </div>
    </div>`;

    // Implementation Approach
    html += `<div class="proposal-section">
        <h3>Implementation Approach</h3>
        <div class="proposal-text">${templates.approachNarrative(c)}</div>
    </div>`;

    // Team Composition
    html += `<div class="proposal-section">
        <h3>Team Composition</h3>
        <div class="proposal-text"><strong>${c.teamSizeLabel} team</strong> of <strong>${c.headcount} FTEs</strong> with ${c.deliveryModel} delivery model.</div>
        <table class="proposal-team-table">
            <thead><tr><th>Role</th><th>Count</th><th>Focus</th></tr></thead>
            <tbody>${c.roles.map(r => `<tr><td>${r.role}</td><td>${r.count}</td><td>${r.responsibilities}</td></tr>`).join('')}</tbody>
        </table>
    </div>`;

    // Investment Summary
    html += `<div class="proposal-section">
        <h3>Investment Summary</h3>
        <div class="proposal-text">${templates.investmentNarrative(c)}</div>
        <div class="proposal-cost-grid">
            <div class="proposal-cost-item"><div class="pcl">Implementation</div><div class="pcv">${c.implCost}</div></div>
            <div class="proposal-cost-item"><div class="pcl">Technology</div><div class="pcv">${c.techCost}</div></div>
            <div class="proposal-cost-item"><div class="pcl">Change Mgmt</div><div class="pcv">${c.changeCost}</div></div>
            <div class="proposal-cost-item" style="border-color: var(--accent);">
                <div class="pcl">Total Investment</div><div class="pcv" style="color: var(--accent-light);">${c.totalCost}</div>
            </div>
        </div>
    </div>`;

    // ROI Projection
    html += `<div class="proposal-section">
        <h3>ROI Projection</h3>
        <div class="proposal-text">${templates.roiNarrative(c)}</div>
        <div class="proposal-cost-grid">
            <div class="proposal-cost-item"><div class="pcl">3-Year ROI</div><div class="pcv" style="color:var(--green);">${c.roiPercent}</div></div>
            <div class="proposal-cost-item"><div class="pcl">Payback</div><div class="pcv">${c.paybackMonths} mo</div></div>
            <div class="proposal-cost-item"><div class="pcl">Annual Savings</div><div class="pcv" style="color:var(--green);">${c.annualSavings}</div></div>
            <div class="proposal-cost-item"><div class="pcl">FTE Hours Saved</div><div class="pcv">${c.fteHoursSaved}/yr</div></div>
        </div>
    </div>`;

    content.innerHTML = html;
    document.getElementById('proposalModal').classList.add('active');
}

function closeProposal() {
    document.getElementById('proposalModal').classList.remove('active');
}

function copyProposal() {
    const content = document.getElementById('proposalContent');
    const text = content.innerText;
    navigator.clipboard.writeText(text).then(() => {
        const btn = document.querySelector('.proposal-actions .btn-primary');
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
    const templates = DATA.proposalTemplates?.[state.industry];

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
    payload += `## Team\n- Size: ${c.teamSizeLabel} (${c.headcount} FTEs)\n- Model: ${c.deliveryModel}\n- Duration: ${c.duration} months\n\n`;
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

    document.getElementById('gammaExportText').value = payload;
    document.getElementById('gammaExportModal').classList.add('active');
}

function closeGammaExport() {
    document.getElementById('gammaExportModal').classList.remove('active');
}

function copyGammaExport() {
    const textarea = document.getElementById('gammaExportText');
    navigator.clipboard.writeText(textarea.value).then(() => {
        const btn = document.querySelector('.gamma-actions .btn-primary');
        const orig = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => btn.textContent = orig, 2000);
    });
}

// ----------------------------------------------------------
// EXPORT SUMMARY
// ----------------------------------------------------------
function renderExportSummary() {
    const modules = DATA.scopeModules[state.industry];
    const selectedNames = [];
    state.selectedModules.forEach(idx => {
        if (modules[idx]) selectedNames.push(modules[idx].name);
    });

    const roles = DATA.teamRoles[state.teamSize];
    const totalHeadcount = roles.reduce((sum, r) => sum + r.count, 0);

    const el = document.getElementById('exportSummary');
    el.innerHTML = `
        <div class="export-section">
            <h4>Industry</h4>
            <p>${state.industry === 'agency' ? 'Agency' : 'Publisher'}</p>
        </div>
        ${state.generatedFrom ? `<div class="export-section"><h4>Generated From</h4><p>${state.generatedFrom}</p></div>` : ''}
        <div class="export-section">
            <h4>Selected Modules (${state.selectedModules.size})</h4>
            <div class="export-tags">${selectedNames.map(n => `<span class="export-tag">${n}</span>`).join('')}</div>
        </div>
        <div class="export-section">
            <h4>Team</h4>
            <p>${state.teamSize.charAt(0).toUpperCase() + state.teamSize.slice(1)} (${totalHeadcount} FTEs)</p>
        </div>
        <div class="export-section">
            <h4>Duration</h4>
            <p>${state.duration} months</p>
        </div>
        <div class="export-section">
            <h4>Delivery Model</h4>
            <p>${state.deliveryModel.charAt(0).toUpperCase() + state.deliveryModel.slice(1)}</p>
        </div>
        <div class="export-section">
            <h4>License Model</h4>
            <p>${state.licenseModel === 'saas' ? 'SaaS' : state.licenseModel === 'onprem' ? 'On-Premises' : 'Hybrid Cloud'}</p>
        </div>
    `;
}

function exportPlan() {
    const modules = DATA.scopeModules[state.industry];
    const selectedModulesArr = [];
    state.selectedModules.forEach(idx => {
        if (modules[idx]) selectedModulesArr.push(modules[idx]);
    });

    const plan = {
        industry: state.industry,
        generatedAt: new Date().toISOString(),
        generatedFrom: state.generatedFrom,
        scope: { modules: selectedModulesArr, totalModules: state.selectedModules.size, complexity: document.getElementById('complexityLevel').textContent },
        team: { size: state.teamSize, roles: DATA.teamRoles[state.teamSize], totalHeadcount: DATA.teamRoles[state.teamSize].reduce((s, r) => s + r.count, 0) },
        financials: { duration: state.duration + ' months', deliveryModel: state.deliveryModel, licenseModel: state.licenseModel, totalInvestment: document.getElementById('totalCost').textContent, implementation: document.getElementById('implCost').textContent, technology: document.getElementById('techCost').textContent, changeManagement: document.getElementById('changeCost').textContent, annualSupport: document.getElementById('supportCost').textContent },
        roi: { threeYearROI: document.getElementById('roiPercent').textContent, paybackMonths: document.getElementById('paybackMonths').textContent, annualSavings: document.getElementById('annualSavings').textContent, fteHoursSaved: document.getElementById('fteReduction').textContent },
        timeline: DATA.phases[state.industry]
    };

    const blob = new Blob([JSON.stringify(plan, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fpa-automation-plan-${state.industry}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
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
            closeProposal();
            closeGammaExport();
        }
    });
}
