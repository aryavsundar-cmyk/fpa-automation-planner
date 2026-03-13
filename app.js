// ============================================================
// FP&A AUTOMATION — APPLICATION LOGIC
// ============================================================

let state = {
    industry: 'agency',
    selectedModules: new Set(),
    teamSize: 'medium',
    duration: 9,
    deliveryModel: 'onshore',
    licenseModel: 'saas'
};

// ----------------------------------------------------------
// INITIALIZATION
// ----------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    setIndustry('agency');
    setTeamSize('medium');
    applyPreset('standard');
    initScrollEffects();
});

// ----------------------------------------------------------
// INDUSTRY TOGGLE
// ----------------------------------------------------------
function setIndustry(industry) {
    state.industry = industry;

    // Toggle buttons
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.industry === industry);
    });

    // Hero
    document.getElementById('heroIndustryText').textContent = DATA.context[industry].heroText;
    document.getElementById('heroSubtitle').textContent = DATA.context[industry].heroSubtitle;
    document.getElementById('useCaseIndustryLabel').textContent = industry === 'agency' ? 'Agencies' : 'Publishers';

    renderContextBanner();
    renderUseCases();
    renderArchitecture();
    renderScopeModules();
    renderTimeline();
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
// USE CASES
// ----------------------------------------------------------
function renderUseCases() {
    const cases = DATA.useCases[state.industry];
    const grid = document.getElementById('useCaseGrid');
    grid.innerHTML = cases.map((uc, i) => `
        <div class="use-case-card" style="animation-delay: ${i * 0.05}s">
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

// ----------------------------------------------------------
// ARCHITECTURE
// ----------------------------------------------------------
function renderArchitecture() {
    const arch = DATA.architecture[state.industry];

    ['sources', 'platform', 'apps', 'outputs'].forEach(layer => {
        const container = document.getElementById(`arch${layer.charAt(0).toUpperCase() + layer.slice(1)}`);
        const capitalizedId = layer === 'apps' ? 'archApps' :
                              layer === 'sources' ? 'archSources' :
                              layer === 'platform' ? 'archPlatform' : 'archOutputs';
        const el = document.getElementById(capitalizedId);
        el.innerHTML = arch[layer].map(item => `
            <div class="arch-item">
                <span class="arch-item-name">${item.name}</span>
                <span class="arch-item-sub">${item.sub}</span>
            </div>
        `).join('');
    });

    // Tech stack
    const techGrid = document.getElementById('techGrid');
    techGrid.innerHTML = DATA.techStack.map(tech => `
        <div class="tech-card">
            <span class="tech-category">${tech.category}</span>
            <span class="tech-recommended">${tech.recommended}</span>
            <div class="tech-options">${tech.options.map(o => `<span class="tech-option">${o}</span>`).join('')}</div>
        </div>
    `).join('');
}

// ----------------------------------------------------------
// SCOPE MODULES
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
                ${catModules.map((m, i) => {
                    const globalIdx = modules.indexOf(m);
                    const isSelected = state.selectedModules.has(globalIdx);
                    return `<div class="module-card ${isSelected ? 'selected' : ''}" onclick="toggleModule(${globalIdx})">
                        <div class="module-check">${isSelected ? '✓' : ''}</div>
                        <div class="module-info">
                            <span class="module-name">${m.name}</span>
                            <span class="module-desc">${m.description}</span>
                            <div class="module-meta">
                                <span class="meta-tag">Effort: ${m.effort} weeks</span>
                                <span class="meta-tag">Integrations: ${m.integrations}</span>
                                <span class="meta-tag phase-tag">Phase ${m.phase}</span>
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

function toggleModule(idx) {
    if (state.selectedModules.has(idx)) {
        state.selectedModules.delete(idx);
    } else {
        state.selectedModules.add(idx);
    }
    renderScopeModules();
    updateCosts();
    renderExportSummary();
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

    // Highlight active preset
    document.querySelectorAll('.preset-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
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

    const categoryLabels = {
        leadership: 'Leadership & Delivery',
        domain: 'Domain Expertise',
        technical: 'Technical Team',
        change: 'Change Management'
    };

    const categoryColors = {
        leadership: '#3b82f6',
        domain: '#8b5cf6',
        technical: '#06b6d4',
        change: '#f59e0b'
    };

    let html = '';
    const categories = ['leadership', 'domain', 'technical', 'change'];

    categories.forEach(cat => {
        const catRoles = roles.filter(r => r.category === cat);
        if (catRoles.length === 0) return;
        html += `<div class="roster-category">
            <h4 class="roster-cat-title" style="border-left: 3px solid ${categoryColors[cat]}; padding-left: 10px;">
                ${categoryLabels[cat]}
            </h4>
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

    // Allocation bars
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

    // Implementation cost: team rate * hours * duration * delivery multiplier
    const monthlyTeamCost = roles.reduce((sum, r) => sum + (r.count * r.rate * 160), 0);
    const implCost = Math.round(monthlyTeamCost * duration * deliveryMult);

    // Technology cost
    let techCost;
    if (state.licenseModel === 'onprem') {
        techCost = licenseCfg.base + (moduleCount * licenseCfg.perModule);
    } else {
        techCost = (licenseCfg.base + (moduleCount * licenseCfg.perModule)) * duration;
    }
    techCost = Math.round(techCost);

    // Change management: ~12% of impl cost
    const changeCost = Math.round(implCost * 0.12);

    // Support: ~20% of annual impl cost
    const supportCost = Math.round((implCost / duration * 12) * 0.18);

    const totalCost = implCost + techCost + changeCost;

    // Update DOM
    document.getElementById('implCost').textContent = formatCurrency(implCost);
    document.getElementById('techCost').textContent = formatCurrency(techCost);
    document.getElementById('changeCost').textContent = formatCurrency(changeCost);
    document.getElementById('supportCost').textContent = formatCurrency(supportCost) + '/yr';
    document.getElementById('totalCost').textContent = formatCurrency(totalCost);
    document.getElementById('totalCostRange').textContent = `Range: ${formatCurrency(Math.round(totalCost * 0.85))} — ${formatCurrency(Math.round(totalCost * 1.2))}`;

    // ROI calculations
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
                ${phase.deliverables.map((d, di) => `
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

    // Deliverables how-to table
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
        scope: {
            modules: selectedModulesArr,
            totalModules: state.selectedModules.size,
            complexity: document.getElementById('complexityLevel').textContent
        },
        team: {
            size: state.teamSize,
            roles: DATA.teamRoles[state.teamSize],
            totalHeadcount: DATA.teamRoles[state.teamSize].reduce((s, r) => s + r.count, 0)
        },
        financials: {
            duration: state.duration + ' months',
            deliveryModel: state.deliveryModel,
            licenseModel: state.licenseModel,
            totalInvestment: document.getElementById('totalCost').textContent,
            implementation: document.getElementById('implCost').textContent,
            technology: document.getElementById('techCost').textContent,
            changeManagement: document.getElementById('changeCost').textContent,
            annualSupport: document.getElementById('supportCost').textContent
        },
        roi: {
            threeYearROI: document.getElementById('roiPercent').textContent,
            paybackMonths: document.getElementById('paybackMonths').textContent,
            annualSavings: document.getElementById('annualSavings').textContent,
            fteHoursSaved: document.getElementById('fteReduction').textContent
        },
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
// SCROLL EFFECTS
// ----------------------------------------------------------
function initScrollEffects() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Smooth scroll for nav links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}
