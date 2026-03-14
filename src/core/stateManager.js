/**
 * FP&A Automation — State Management System
 * Supports all 5 phases with simple pub/sub pattern
 * Persistent across page reloads via localStorage
 */

class StateManager {
    constructor() {
        this.state = {
            // Current Configuration
            industry: 'agency',
            selectedModules: new Set(),
            teamSize: 'medium',
            duration: 9,
            pricingMode: 'package',

            // UI State
            currentSection: 'hero',
            stakeholderView: 'executive', // executive | technical | financial
            sidebarOpen: true,

            // Generated Content
            generatedFrom: null,
            expandedModules: new Set(),

            // Scenarios & Saved Configurations
            scenarios: {},
            currentScenario: 'default',

            // Phase 4: AI Features
            aiGeneratedUseCases: [],
            integrationAssessments: {},

            // Phase 5: Analytics
            userInteractions: [],
        };

        this.subscribers = {};
        this.loadFromStorage();
    }

    /**
     * Get current state value
     */
    get(key) {
        return this.state[key];
    }

    /**
     * Set state value and notify subscribers
     */
    set(key, value) {
        const oldValue = this.state[key];
        this.state[key] = value;

        // Handle Sets specially for storage
        if (value instanceof Set) {
            this.state[key] = value;
        }

        this.notify(key, value, oldValue);
        this.saveToStorage();
    }

    /**
     * Subscribe to state changes
     */
    subscribe(key, callback) {
        if (!this.subscribers[key]) {
            this.subscribers[key] = [];
        }
        this.subscribers[key].push(callback);

        // Return unsubscribe function
        return () => {
            this.subscribers[key] = this.subscribers[key].filter(cb => cb !== callback);
        };
    }

    /**
     * Notify all subscribers of a change
     */
    notify(key, newValue, oldValue) {
        if (this.subscribers[key]) {
            this.subscribers[key].forEach(callback => {
                try {
                    callback(newValue, oldValue);
                } catch (error) {
                    console.error(`Error in subscriber for ${key}:`, error);
                }
            });
        }
    }

    /**
     * Save current state to localStorage
     */
    saveToStorage() {
        try {
            const toStore = {
                ...this.state,
                selectedModules: Array.from(this.state.selectedModules || []),
                expandedModules: Array.from(this.state.expandedModules || []),
            };
            localStorage.setItem('fpa_state', JSON.stringify(toStore));
        } catch (error) {
            console.warn('Failed to save state to localStorage:', error);
        }
    }

    /**
     * Load state from localStorage
     */
    loadFromStorage() {
        try {
            const stored = localStorage.getItem('fpa_state');
            if (stored) {
                const data = JSON.parse(stored);
                this.state = {
                    ...this.state,
                    ...data,
                    selectedModules: new Set(data.selectedModules || []),
                    expandedModules: new Set(data.expandedModules || []),
                };
            }
        } catch (error) {
            console.warn('Failed to load state from localStorage:', error);
        }
    }

    /**
     * Save current configuration as a named scenario
     */
    saveScenario(name) {
        const scenario = {
            name,
            industry: this.state.industry,
            selectedModules: Array.from(this.state.selectedModules || []),
            teamSize: this.state.teamSize,
            duration: this.state.duration,
            pricingMode: this.state.pricingMode,
            timestamp: new Date().toISOString(),
        };

        this.state.scenarios[name] = scenario;
        this.saveToStorage();
        this.notify('scenarios', this.state.scenarios);
        return scenario;
    }

    /**
     * Load a saved scenario
     */
    loadScenario(name) {
        const scenario = this.state.scenarios[name];
        if (!scenario) {
            console.error(`Scenario ${name} not found`);
            return null;
        }

        this.set('industry', scenario.industry);
        this.set('selectedModules', new Set(scenario.selectedModules));
        this.set('teamSize', scenario.teamSize);
        this.set('duration', scenario.duration);
        this.set('pricingMode', scenario.pricingMode);
        this.set('currentScenario', name);

        return scenario;
    }

    /**
     * Get all saved scenarios
     */
    getScenarios() {
        return Object.values(this.state.scenarios || {});
    }

    /**
     * Compare two scenarios
     */
    compareScenarios(name1, name2) {
        const s1 = this.state.scenarios[name1];
        const s2 = this.state.scenarios[name2];

        if (!s1 || !s2) {
            console.error('One or both scenarios not found');
            return null;
        }

        return {
            scenario1: s1,
            scenario2: s2,
            differences: {
                industry: s1.industry !== s2.industry ? { s1: s1.industry, s2: s2.industry } : null,
                teamSize: s1.teamSize !== s2.teamSize ? { s1: s1.teamSize, s2: s2.teamSize } : null,
                duration: s1.duration !== s2.duration ? { s1: s1.duration, s2: s2.duration } : null,
                moduleCount: {
                    s1: s1.selectedModules.length,
                    s2: s2.selectedModules.length,
                },
            },
        };
    }

    /**
     * Reset state to defaults
     */
    reset() {
        this.state = {
            industry: 'agency',
            selectedModules: new Set(),
            teamSize: 'medium',
            duration: 9,
            pricingMode: 'package',
            currentSection: 'hero',
            stakeholderView: 'executive',
            sidebarOpen: true,
            generatedFrom: null,
            expandedModules: new Set(),
            scenarios: this.state.scenarios, // Keep scenarios
            currentScenario: 'default',
            aiGeneratedUseCases: [],
            integrationAssessments: {},
            userInteractions: [],
        };
        this.saveToStorage();
        this.notify('*', this.state); // Notify all
    }
}

// Global instance
const appState = new StateManager();
