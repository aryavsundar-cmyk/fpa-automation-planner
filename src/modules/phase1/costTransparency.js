/**
 * Phase 1, Feature 3: Cost Transparency & Financial Visualization
 * Waterfall cost breakdown, scenario comparison, ROI analysis
 */

class CostTransparency {
    constructor() {
        this.scenarios = {
            conservative: { variance: 0.80, label: 'Conservative (20% probability)' },
            base: { variance: 1.0, label: 'Base Case (60% probability)' },
            aggressive: { variance: 0.70, label: 'Aggressive (20% probability)' }
        };
        this.charts = {};
        this.init();
    }

    init() {
        this.createWaterfallChart();
        this.createScenarioComparison();
        this.attachEventListeners();
        console.log('✓ Cost Transparency module initialized');
    }

    /**
     * Calculate cost components based on current state
     */
    calculateCosts(variance = 1.0) {
        const moduleCount = appState.get('selectedModules').size;
        const pricing = DATA.pricing;
        const teamSize = appState.get('teamSize');
        const duration = appState.get('duration');

        const implCost = Math.round(pricing.implementation[teamSize] * variance);
        const techCost = Math.round(moduleCount * pricing.perModule * variance);
        const changeCost = Math.round(pricing.changeManagement[teamSize] * variance);
        const supportCost = Math.round(pricing.supportPerMonth * duration * variance);

        const totalCost = implCost + techCost + changeCost + supportCost;

        // ROI calculations
        const annualSavings = Math.round(
            moduleCount * 125000 +
            (teamSize === 'large' ? 500000 : teamSize === 'medium' ? 250000 : 100000)
        );
        const threeYearROI = Math.round(((annualSavings * 3 - totalCost) / totalCost) * 100);
        const paybackMonths = Math.round(totalCost / (annualSavings / 12));

        return {
            implementation: implCost,
            technology: techCost,
            changeManagement: changeCost,
            support: supportCost,
            total: totalCost,
            annualSavings,
            threeYearROI,
            paybackMonths,
            variance
        };
    }

    /**
     * Create waterfall chart showing cost breakdown
     */
    createWaterfallChart() {
        const container = document.querySelector('#cost') || document.querySelector('[data-section="cost"]');
        if (!container) return;

        // Check if chart container already exists
        if (document.getElementById('costWaterfallContainer')) {
            return;
        }

        // Create chart container
        const chartDiv = document.createElement('div');
        chartDiv.id = 'costWaterfallContainer';
        chartDiv.className = 'mt-8 p-6 bg-slate-900/50 border border-slate-800 rounded-lg';
        chartDiv.innerHTML = `
            <h3 class="text-xl font-semibold text-white mb-4">Cost Breakdown Waterfall</h3>
            <div class="relative h-96 bg-slate-800/30 rounded-lg p-4">
                <canvas id="waterfallChart"></canvas>
            </div>
        `;

        container.appendChild(chartDiv);
        this.renderWaterfallChart();
    }

    /**
     * Render the actual waterfall chart using Chart.js
     */
    renderWaterfallChart() {
        const costs = this.calculateCosts();
        const ctx = document.getElementById('waterfallChart');
        if (!ctx) return;

        // Destroy existing chart if it exists
        if (this.charts.waterfall) {
            this.charts.waterfall.destroy();
        }

        const labels = [
            'Implementation',
            'Technology',
            'Change Mgmt',
            'Support',
            'Total Cost'
        ];

        const values = [
            costs.implementation,
            costs.technology,
            costs.changeManagement,
            costs.support,
            costs.total
        ];

        this.charts.waterfall = new Chart(ctx, {
            type: 'bar',
            data: {
                labels,
                datasets: [{
                    label: 'Cost Components',
                    data: values,
                    backgroundColor: [
                        'rgba(99, 102, 241, 0.6)',    // indigo
                        'rgba(139, 92, 246, 0.6)',    // violet
                        'rgba(236, 72, 153, 0.6)',    // pink
                        'rgba(34, 197, 94, 0.6)',     // green
                        'rgba(239, 68, 68, 0.8)'      // red for total
                    ],
                    borderColor: [
                        'rgba(99, 102, 241, 1)',
                        'rgba(139, 92, 246, 1)',
                        'rgba(236, 72, 153, 1)',
                        'rgba(34, 197, 94, 1)',
                        'rgba(239, 68, 68, 1)'
                    ],
                    borderWidth: 2,
                    borderRadius: 6,
                    barPercentage: 0.7
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        padding: 12,
                        titleColor: '#fff',
                        bodyColor: '#e2e8f0',
                        callbacks: {
                            label: function(context) {
                                return '$' + context.parsed.y.toLocaleString();
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: '#94a3b8',
                            callback: function(value) {
                                return '$' + (value / 1000).toFixed(0) + 'K';
                            }
                        },
                        grid: {
                            color: 'rgba(148, 163, 184, 0.1)',
                            drawBorder: false
                        }
                    },
                    x: {
                        ticks: {
                            color: '#94a3b8'
                        },
                        grid: {
                            display: false,
                            drawBorder: false
                        }
                    }
                }
            }
        });
    }

    /**
     * Create scenario comparison table
     */
    createScenarioComparison() {
        const container = document.querySelector('#cost') || document.querySelector('[data-section="cost"]');
        if (!container) return;

        // Check if comparison container already exists
        if (document.getElementById('scenarioComparisonContainer')) {
            return;
        }

        // Create comparison container
        const compDiv = document.createElement('div');
        compDiv.id = 'scenarioComparisonContainer';
        compDiv.className = 'mt-8 p-6 bg-slate-900/50 border border-slate-800 rounded-lg';
        compDiv.innerHTML = `
            <h3 class="text-xl font-semibold text-white mb-4">Scenario Comparison</h3>
            <div class="overflow-x-auto">
                <table class="w-full text-sm text-slate-300">
                    <thead class="border-b border-slate-700">
                        <tr>
                            <th class="px-4 py-3 text-left font-semibold text-slate-100">Scenario</th>
                            <th class="px-4 py-3 text-right">Total Cost</th>
                            <th class="px-4 py-3 text-right">Annual Savings</th>
                            <th class="px-4 py-3 text-right">3-Year ROI</th>
                            <th class="px-4 py-3 text-right">Payback</th>
                        </tr>
                    </thead>
                    <tbody id="scenarioTableBody" class="divide-y divide-slate-700/50">
                    </tbody>
                </table>
            </div>
        `;

        container.appendChild(compDiv);
        this.renderScenarioComparison();
    }

    /**
     * Render scenario comparison table
     */
    renderScenarioComparison() {
        const tbody = document.getElementById('scenarioTableBody');
        if (!tbody) return;

        tbody.innerHTML = '';

        Object.entries(this.scenarios).forEach(([key, scenario]) => {
            const costs = this.calculateCosts(scenario.variance);
            const roiClass = costs.threeYearROI >= 300 ? 'text-emerald-400' : 'text-amber-400';
            const row = document.createElement('tr');
            row.className = 'hover:bg-slate-800/30 transition-colors';
            row.innerHTML = `
                <td class="px-4 py-3 font-medium text-slate-100">${scenario.label}</td>
                <td class="px-4 py-3 text-right text-slate-100">$${costs.total.toLocaleString()}</td>
                <td class="px-4 py-3 text-right text-emerald-400">$${costs.annualSavings.toLocaleString()}</td>
                <td class="px-4 py-3 text-right ${roiClass}">${costs.threeYearROI}%</td>
                <td class="px-4 py-3 text-right text-slate-100">${costs.paybackMonths} months</td>
            `;
            tbody.appendChild(row);
        });
    }

    /**
     * Calculate and display cost by module
     */
    calculateCostByModule() {
        const selectedModules = appState.get('selectedModules');
        if (selectedModules.size === 0) return null;

        const pricing = DATA.pricing;
        const costPerModule = pricing.perModule;
        const moduleCosts = {};

        selectedModules.forEach(idx => {
            const module = DATA.scopeModules[idx];
            if (module) {
                moduleCosts[module.name] = costPerModule;
            }
        });

        return moduleCosts;
    }

    /**
     * Interactive ROI calculator
     */
    calculateROI(investmentAmount, annualBenefits, implementationMonths) {
        const paybackMonths = investmentAmount / (annualBenefits / 12);
        const threeYearBenefits = annualBenefits * 3;
        const threeYearROI = ((threeYearBenefits - investmentAmount) / investmentAmount) * 100;
        const fiveYearBenefits = annualBenefits * 5;
        const fiveYearROI = ((fiveYearBenefits - investmentAmount) / investmentAmount) * 100;

        return {
            paybackMonths: Math.round(paybackMonths),
            threeYearROI: Math.round(threeYearROI),
            fiveYearROI: Math.round(fiveYearROI),
            threeYearNetBenefit: Math.round(threeYearBenefits - investmentAmount),
            fiveYearNetBenefit: Math.round(fiveYearBenefits - investmentAmount)
        };
    }

    /**
     * Attach event listeners for interactive features
     */
    attachEventListeners() {
        // Listen for state changes to update charts
        appState.subscribe('selectedModules', () => this.updateCharts());
        appState.subscribe('teamSize', () => this.updateCharts());
        appState.subscribe('duration', () => this.updateCharts());
    }

    /**
     * Update all charts when state changes
     */
    updateCharts() {
        this.renderWaterfallChart();
        this.renderScenarioComparison();
    }

    /**
     * Export financial model to Excel (placeholder for Phase 2)
     */
    exportFinancialModel() {
        const costs = this.calculateCosts();
        const scenarios = Object.entries(this.scenarios).map(([key, scenario]) => ({
            name: scenario.label,
            ...this.calculateCosts(scenario.variance)
        }));

        console.log('Financial Model Export:', {
            costs,
            scenarios,
            timestamp: new Date().toISOString()
        });

        alert('Excel export will be available in Phase 2 with full spreadsheet generation');
    }

    /**
     * Get current view configuration
     */
    getCurrentConfig() {
        return {
            baseCosts: this.calculateCosts(),
            scenarios: Object.entries(this.scenarios).map(([key, scenario]) => ({
                name: scenario.label,
                ...this.calculateCosts(scenario.variance)
            })),
            costByModule: this.calculateCostByModule()
        };
    }
}

// Initialize Cost Transparency on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.costTransparency = new CostTransparency();
    });
} else {
    window.costTransparency = new CostTransparency();
}
