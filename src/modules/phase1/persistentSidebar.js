/**
 * Phase 1, Feature 1: Persistent Navigation Sidebar
 * Foundation for all other UI improvements
 * 280px fixed sidebar on desktop, hamburger on mobile
 */

class PersistentSidebar {
    constructor() {
        // Load sidebar state from localStorage, default to true (open)
        this.isOpen = localStorage.getItem('fpa_sidebar_open') !== 'false';
        this.init();
    }

    init() {
        this.createSidebar();
        this.attachEventListeners();
        this.subscribeToStateChanges();
        this.setupResponsive();
        this.applyInitialState();
    }

    createSidebar() {
        // Check if sidebar already exists
        if (document.getElementById('persistent-sidebar')) {
            return;
        }

        const sidebar = document.createElement('div');
        sidebar.id = 'persistent-sidebar';
        sidebar.className = 'fixed left-0 top-0 z-40 w-80 h-screen bg-slate-900 border-r border-slate-800 flex flex-col shadow-lg overflow-y-auto hidden lg:flex pt-20';

        sidebar.innerHTML = `
            <!-- Navigation Section -->
            <div class="px-6 py-4 border-b border-slate-800">
                <h3 class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Navigation</h3>
                <nav class="space-y-2">
                    <button onclick="scrollToSection('use-cases')" class="w-full text-left px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors text-sm">
                        📊 Use Cases
                    </button>
                    <button onclick="scrollToSection('architecture')" class="w-full text-left px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors text-sm">
                        🏗️ Architecture
                    </button>
                    <button onclick="scrollToSection('scope')" class="w-full text-left px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors text-sm">
                        🎯 Scope & Team
                    </button>
                    <button onclick="scrollToSection('cost')" class="w-full text-left px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors text-sm">
                        💰 Pricing
                    </button>
                    <button onclick="scrollToSection('timeline')" class="w-full text-left px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors text-sm">
                        📅 Timeline
                    </button>
                    <button onclick="scrollToSection('techstack')" class="w-full text-left px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors text-sm">
                        ⚙️ Technology
                    </button>
                    <button onclick="scrollToSection('summary')" class="w-full text-left px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors text-sm">
                        📋 Summary
                    </button>
                </nav>
            </div>

            <!-- Current State Section -->
            <div class="px-6 py-4 border-b border-slate-800">
                <h3 class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Current State</h3>
                <div class="space-y-3 text-sm">
                    <div>
                        <span class="text-slate-500 text-xs">Industry</span>
                        <p id="sidebar-industry" class="text-slate-100 font-semibold">Agency</p>
                    </div>
                    <div>
                        <span class="text-slate-500 text-xs">Team Size</span>
                        <p id="sidebar-teamsize" class="text-slate-100 font-semibold">Medium (11.5 FTE)</p>
                    </div>
                    <div>
                        <span class="text-slate-500 text-xs">Duration</span>
                        <p id="sidebar-duration" class="text-slate-100 font-semibold">9 months</p>
                    </div>
                    <div>
                        <span class="text-slate-500 text-xs">Modules Selected</span>
                        <p id="sidebar-modules" class="text-slate-100 font-semibold">0 modules</p>
                    </div>
                    <div>
                        <span class="text-slate-500 text-xs">Total Cost</span>
                        <p id="sidebar-cost" class="text-indigo-400 font-bold text-lg">$450K</p>
                    </div>
                </div>
            </div>

            <!-- Scenarios Section -->
            <div class="px-6 py-4 border-b border-slate-800">
                <h3 class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Scenarios</h3>
                <div class="space-y-2 mb-3">
                    <select id="scenario-selector" class="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 text-sm" onchange="loadSelectedScenario(this.value)">
                        <option value="">Load saved scenario...</option>
                    </select>
                </div>
                <div class="flex gap-2">
                    <button onclick="saveCurrentScenario()" class="flex-1 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white text-xs font-medium transition-colors">
                        💾 Save
                    </button>
                    <button onclick="compareScenarios()" class="flex-1 px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white text-xs font-medium transition-colors">
                        ⚖️ Compare
                    </button>
                </div>
            </div>

            <!-- Export Section -->
            <div class="px-6 py-4 border-b border-slate-800">
                <h3 class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Export</h3>
                <div class="space-y-2">
                    <button onclick="generateProposal()" class="w-full px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white text-xs font-medium transition-colors">
                        📄 Generate Proposal
                    </button>
                    <button onclick="prepareGammaExport()" class="w-full px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white text-xs font-medium transition-colors">
                        🎯 Export to Gamma
                    </button>
                    <button onclick="exportJSON()" class="w-full px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white text-xs font-medium transition-colors">
                        📥 Download JSON
                    </button>
                </div>
            </div>

            <!-- Settings Section -->
            <div class="px-6 py-4 mt-auto border-t border-slate-800">
                <h3 class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Settings</h3>
                <div class="space-y-2">
                    <label class="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
                        <input type="checkbox" id="dark-mode-toggle" checked class="w-4 h-4 rounded bg-slate-700 border-slate-600">
                        <span>Dark Mode</span>
                    </label>
                    <label class="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
                        <input type="checkbox" id="compact-mode-toggle" class="w-4 h-4 rounded bg-slate-700 border-slate-600">
                        <span>Compact View</span>
                    </label>
                </div>
            </div>
        `;

        document.body.appendChild(sidebar);
    }

    attachEventListeners() {
        // Sidebar toggle for mobile
        const toggleBtn = document.getElementById('sidebar-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => this.toggleSidebar());
        }

        // Sidebar toggle for desktop
        const desktopToggleBtn = document.getElementById('desktop-sidebar-toggle');
        if (desktopToggleBtn) {
            desktopToggleBtn.addEventListener('click', () => this.toggleSidebar());
        }

        // Settings
        const darkModeToggle = document.getElementById('dark-mode-toggle');
        if (darkModeToggle) {
            darkModeToggle.addEventListener('change', (e) => {
                document.documentElement.classList.toggle('dark', !e.target.checked);
                localStorage.setItem('fpa_dark_mode', !e.target.checked);
            });
        }

        const compactToggle = document.getElementById('compact-mode-toggle');
        if (compactToggle) {
            compactToggle.addEventListener('change', (e) => {
                document.body.classList.toggle('compact-view', e.target.checked);
                localStorage.setItem('fpa_compact_view', e.target.checked);
            });
        }
    }

    subscribeToStateChanges() {
        // Update sidebar when state changes
        appState.subscribe('industry', (newValue) => {
            const el = document.getElementById('sidebar-industry');
            if (el) el.textContent = newValue === 'agency' ? 'Agency' : 'Publisher';
        });

        appState.subscribe('teamSize', (newValue) => {
            const sizes = { small: 'Small (5.5 FTE)', medium: 'Medium (11.5 FTE)', large: 'Large (24 FTE)' };
            const el = document.getElementById('sidebar-teamsize');
            if (el) el.textContent = sizes[newValue] || newValue;
        });

        appState.subscribe('duration', (newValue) => {
            const el = document.getElementById('sidebar-duration');
            if (el) el.textContent = `${newValue} months`;
        });

        appState.subscribe('selectedModules', (newValue) => {
            const el = document.getElementById('sidebar-modules');
            if (el) el.textContent = `${newValue.size} module${newValue.size !== 1 ? 's' : ''}`;
        });

        // Listen for cost updates from app state or cost transparency module
        const updateCostDisplay = () => {
            const totalCostEl = document.getElementById('sidebar-cost');
            if (totalCostEl) {
                const costText = document.getElementById('totalCost')?.textContent || '$450K';
                totalCostEl.textContent = costText;
            }
        };

        appState.subscribe('selectedModules', updateCostDisplay);
        appState.subscribe('teamSize', updateCostDisplay);
        appState.subscribe('duration', updateCostDisplay);

        // Listen for overall state changes to update scenarios list
        appState.subscribe('*', () => {
            this.updateScenariosList();
        });
    }

    setupResponsive() {
        // Add mobile hamburger toggle button to navbar
        if (!document.getElementById('sidebar-toggle')) {
            const nav = document.querySelector('nav');
            if (nav) {
                const toggle = document.createElement('button');
                toggle.id = 'sidebar-toggle';
                toggle.className = 'lg:hidden px-3 py-2 text-slate-300 hover:text-white';
                toggle.innerHTML = '☰';
                toggle.onclick = () => this.toggleSidebar();
                const navContainer = nav.querySelector('.flex.items-center.justify-between');
                if (navContainer) {
                    navContainer.insertBefore(toggle, navContainer.firstChild);
                }
            }
        }
    }

    applyInitialState() {
        // Apply initial sidebar state based on localStorage
        const sidebar = document.getElementById('persistent-sidebar');
        if (sidebar) {
            // On desktop, sidebar should be visible by default unless user explicitly closed it
            const desktopToggle = document.getElementById('desktop-sidebar-toggle');
            if (this.isOpen) {
                sidebar.style.display = 'flex';
                if (window.innerWidth >= 1024) {
                    document.body.classList.add('sidebar-expanded');
                    if (desktopToggle) desktopToggle.innerHTML = '◀';
                }
            } else {
                sidebar.style.display = 'none';
                if (window.innerWidth >= 1024) {
                    document.body.classList.remove('sidebar-expanded');
                    if (desktopToggle) desktopToggle.innerHTML = '▶';
                }
            }
        }
    }

    toggleSidebar() {
        const sidebar = document.getElementById('persistent-sidebar');
        if (sidebar) {
            this.isOpen = !this.isOpen;

            // Toggle visibility using inline styles
            sidebar.style.display = this.isOpen ? 'flex' : 'none';

            // On desktop, also adjust body margin
            if (window.innerWidth >= 1024) {
                if (this.isOpen) {
                    document.body.classList.add('sidebar-expanded');
                } else {
                    document.body.classList.remove('sidebar-expanded');
                }

                // Update toggle button icon
                const desktopToggle = document.getElementById('desktop-sidebar-toggle');
                if (desktopToggle) {
                    desktopToggle.innerHTML = this.isOpen ? '◀' : '▶';
                }
            }

            localStorage.setItem('fpa_sidebar_open', this.isOpen);
        }
    }

    updateScenariosList() {
        const selector = document.getElementById('scenario-selector');
        if (!selector) return;

        const scenarios = appState.getScenarios();
        const currentOptions = Array.from(selector.options).slice(1); // Skip placeholder
        const currentNames = currentOptions.map(o => o.value);

        // Add new scenarios
        scenarios.forEach(scenario => {
            if (!currentNames.includes(scenario.name)) {
                const option = document.createElement('option');
                option.value = scenario.name;
                option.textContent = scenario.name;
                selector.appendChild(option);
            }
        });
    }
}

// Global helper functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function saveCurrentScenario() {
    const name = prompt('Enter scenario name:', 'Scenario_' + new Date().toISOString().slice(0, 10));
    if (name) {
        appState.saveScenario(name);
        alert('Scenario saved: ' + name);
        document.querySelector('.persistent-sidebar')?.updateScenariosList?.();
    }
}

function loadSelectedScenario(name) {
    if (name) {
        appState.loadScenario(name);
        alert('Scenario loaded: ' + name);
        // Trigger full re-render
        setIndustry(appState.get('industry'));
    }
}

function compareScenarios() {
    const selector = document.getElementById('scenario-selector');
    if (!selector || selector.value === '') {
        alert('Select a scenario to compare');
        return;
    }

    const current = appState.get('currentScenario');
    const selected = selector.value;
    const comparison = appState.compareScenarios(current, selected);

    if (comparison) {
        console.log('Scenario Comparison:', comparison);
        alert(`Comparing "${current}" vs "${selected}"\nSee console for details`);
    }
}

// Initialize sidebar when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.persistentSidebar = new PersistentSidebar();
    });
} else {
    window.persistentSidebar = new PersistentSidebar();
}
