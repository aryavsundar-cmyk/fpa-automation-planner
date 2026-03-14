/**
 * Phase 1, Feature 2: Stakeholder-Specific Views
 * Executive | Technical | Financial views tailored to different personas
 */

class StakeholderViews {
    constructor() {
        this.currentView = 'executive';
        this.viewDefinitions = {
            executive: {
                label: 'Executive View',
                icon: '👔',
                description: 'High-level strategy, ROI, and decision focus',
                sections: ['hero', 'financial_impact', 'timeline', 'risk_summary', 'cta_approve'],
            },
            technical: {
                label: 'Technical View',
                icon: '🔧',
                description: 'Architecture, integration, and technical details',
                sections: ['architecture', 'integration_complexity', 'tech_rationale', 'data_model', 'security', 'risks'],
            },
            financial: {
                label: 'Financial View',
                icon: '💰',
                description: 'Cost, benefits, and financial scenarios',
                sections: ['cost_breakdown', 'operating_costs', 'benefit_timeline', 'headcount_impact', 'scenarios', 'sensitivity'],
            },
        };

        this.init();
    }

    init() {
        this.createViewSelector();
        this.attachEventListeners();
        this.applyView('executive');
    }

    createViewSelector() {
        // Check if selector already exists
        if (document.getElementById('view-selector-container')) {
            return;
        }

        const nav = document.querySelector('nav .flex.items-center.justify-between');
        if (!nav) return;

        const selector = document.createElement('div');
        selector.id = 'view-selector-container';
        selector.className = 'hidden md:flex items-center gap-2 ml-auto';
        selector.innerHTML = `
            <span class="text-slate-400 text-sm mr-2">View:</span>
            <div class="flex gap-1 bg-slate-900/50 rounded-lg p-1 border border-slate-800">
                <button onclick="appViewSelector.switchView('executive')" class="view-toggle-btn px-3 py-1.5 text-sm font-medium rounded-md transition-all active" data-view="executive" title="Executive Summary">👔 Exec</button>
                <button onclick="appViewSelector.switchView('technical')" class="view-toggle-btn px-3 py-1.5 text-sm font-medium rounded-md transition-all" data-view="technical" title="Technical Details">🔧 Tech</button>
                <button onclick="appViewSelector.switchView('financial')" class="view-toggle-btn px-3 py-1.5 text-sm font-medium rounded-md transition-all" data-view="financial" title="Financial Analysis">💰 Finance</button>
            </div>
        `;

        // Insert before industry toggle
        const industryToggle = nav.querySelector('[class*="gap-2 bg-slate-900/50"]');
        if (industryToggle) {
            industryToggle.parentNode.insertBefore(selector, industryToggle);
        }
    }

    attachEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.view-toggle-btn')) {
                const view = e.target.closest('.view-toggle-btn').dataset.view;
                this.switchView(view);
            }
        });
    }

    switchView(view) {
        if (Object.keys(this.viewDefinitions).includes(view)) {
            this.currentView = view;
            appState.set('stakeholderView', view);
            this.applyView(view);

            // Update active button
            document.querySelectorAll('.view-toggle-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.view === view);
                btn.classList.toggle('bg-indigo-600', btn.dataset.view === view);
                btn.classList.toggle('text-white', btn.dataset.view === view);
                btn.classList.toggle('text-slate-300', btn.dataset.view !== view);
            });
        }
    }

    applyView(view) {
        const definition = this.viewDefinitions[view];

        // Show/hide sections based on view
        this.hideAllSections();
        this.showSectionsForView(view, definition.sections);

        // Add view-specific content overlays
        this.injectViewSpecificContent(view);

        // Track analytics
        console.log(`Switched to ${view} view`);
    }

    hideAllSections() {
        // Hide sections not relevant to current view
        const allSections = document.querySelectorAll('[data-section]');
        allSections.forEach(section => {
            section.style.display = 'none';
        });
    }

    showSectionsForView(view, sections) {
        sections.forEach(sectionName => {
            const section = document.querySelector(`[data-section="${sectionName}"]`);
            if (section) {
                section.style.display = 'block';
            }
        });

        // Always show core sections
        const coreElements = [
            'navbar',
            'hero',
            'generated-from-banner',
            'use-cases',
            'architecture',
            'scope',
            'cost',
            'timeline',
            'techstack',
            'summary',
        ];

        coreElements.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = 'block';
        });
    }

    injectViewSpecificContent(view) {
        switch (view) {
            case 'executive':
                this.injectExecutiveContent();
                break;
            case 'technical':
                this.injectTechnicalContent();
                break;
            case 'financial':
                this.injectFinancialContent();
                break;
        }
    }

    injectExecutiveContent() {
        // Highlight key metrics
        const heroSection = document.querySelector('[id="hero"]') || document.querySelector('section:first-child');
        if (heroSection) {
            // Add executive summary banner
            if (!heroSection.querySelector('.executive-summary-banner')) {
                const banner = document.createElement('div');
                banner.className = 'executive-summary-banner bg-indigo-600/20 border border-indigo-500/30 rounded-lg p-6 mb-8 mt-8';
                banner.innerHTML = `
                    <div class="grid grid-cols-3 gap-6">
                        <div>
                            <div class="text-slate-400 text-sm mb-2">3-Year ROI</div>
                            <div class="text-3xl font-bold text-indigo-400" id="exec-roi">340%</div>
                        </div>
                        <div>
                            <div class="text-slate-400 text-sm mb-2">Payback Period</div>
                            <div class="text-3xl font-bold text-green-400" id="exec-payback">6 months</div>
                        </div>
                        <div>
                            <div class="text-slate-400 text-sm mb-2">Time Freed</div>
                            <div class="text-3xl font-bold text-blue-400" id="exec-timesaved">70%</div>
                        </div>
                    </div>
                `;
                heroSection.appendChild(banner);
            }
        }

        // Hide detailed technical content
        document.querySelectorAll('[data-technical-detail]').forEach(el => {
            el.style.display = 'none';
        });
    }

    injectTechnicalContent() {
        // Show architecture in detail
        const archSection = document.getElementById('architecture');
        if (archSection) {
            archSection.style.display = 'block';
        }

        // Add technical deep-dive banner
        if (!document.querySelector('.technical-deepdive-banner')) {
            const banner = document.createElement('div');
            banner.className = 'technical-deepdive-banner bg-slate-800/50 border border-slate-700 rounded-lg p-6 mb-8 mt-8';
            banner.innerHTML = `
                <h3 class="text-lg font-semibold text-white mb-4">Technical Implementation Details</h3>
                <div class="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <span class="text-slate-400">Integration Complexity:</span>
                        <p class="text-slate-200 font-medium">High (8+ systems)</p>
                    </div>
                    <div>
                        <span class="text-slate-400">Data Volume:</span>
                        <p class="text-slate-200 font-medium">500M+ daily transactions</p>
                    </div>
                </div>
            `;
            document.querySelector('[data-section="architecture"]')?.prepend(banner);
        }

        // Hide executive summaries
        document.querySelectorAll('[data-executive-only]').forEach(el => {
            el.style.display = 'none';
        });
    }

    injectFinancialContent() {
        // Highlight cost section
        const costSection = document.getElementById('cost');
        if (costSection) {
            costSection.style.display = 'block';
            costSection.scrollIntoView({ behavior: 'smooth' });
        }

        // Add financial sensitivity analysis banner
        if (!document.querySelector('.financial-sensitivity-banner')) {
            const banner = document.createElement('div');
            banner.className = 'financial-sensitivity-banner bg-emerald-600/20 border border-emerald-500/30 rounded-lg p-6 mb-8 mt-8';
            banner.innerHTML = `
                <h3 class="text-lg font-semibold text-white mb-4">Scenario Analysis</h3>
                <div class="space-y-3 text-sm">
                    <div class="flex justify-between">
                        <span class="text-slate-300">Conservative (20% probability)</span>
                        <span class="text-emerald-300">$250K | 18 months | 4 mo payback</span>
                    </div>
                    <div class="flex justify-between font-semibold">
                        <span class="text-slate-200">Base Case (60% probability)</span>
                        <span class="text-emerald-400">$225K | 12 months | 6 mo payback</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-slate-300">Aggressive (20% probability)</span>
                        <span class="text-emerald-300">$200K | 9 months | 4 mo payback</span>
                    </div>
                </div>
            `;
            document.getElementById('cost')?.prepend(banner);
        }

        // Hide non-financial sections
        document.querySelectorAll('[data-non-financial]').forEach(el => {
            el.style.display = 'none';
        });
    }

    /**
     * Generate view-specific PDF export
     */
    generateViewSpecificPDF(view) {
        const definition = this.viewDefinitions[view];
        console.log(`Generating ${view} PDF...`, definition);
        // PDF generation implemented in Phase 2
    }

    /**
     * Get current view configuration
     */
    getCurrentViewConfig() {
        return this.viewDefinitions[this.currentView];
    }
}

// Global instance
const appViewSelector = new StakeholderViews();

// Helper function for sidebar buttons
function downloadViewPDF(view) {
    appViewSelector.generateViewSpecificPDF(view || appViewSelector.currentView);
}
