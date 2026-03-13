// ============================================================
// FP&A AUTOMATION — COMPLETE DATA MODEL
// ============================================================

const DATA = {
    // ----------------------------------------------------------
    // INDUSTRY CONTEXT
    // ----------------------------------------------------------
    context: {
        agency: {
            heroText: "Agency FP&A",
            heroSubtitle: "End-to-end automation for financial planning, forecasting, and analysis — purpose-built for agencies managing complex client portfolios, multi-entity operations, and project-based revenue models.",
            contextItems: [
                { icon: "📊", label: "Revenue Model", value: "Retainer + Project-Based + Performance Fees" },
                { icon: "👥", label: "Entity Structure", value: "Multi-brand holding company with shared services" },
                { icon: "⏱", label: "Close Cycle", value: "Monthly client reporting + quarterly forecasts" },
                { icon: "🔗", label: "Key Systems", value: "ERP, Billing/Time Tracking, CRM, Project Mgmt" }
            ]
        },
        publisher: {
            heroText: "Publisher FP&A",
            heroSubtitle: "Intelligent automation for revenue forecasting, yield optimization, and content monetization analytics — designed for publishers navigating multi-stream digital revenue models.",
            contextItems: [
                { icon: "📊", label: "Revenue Model", value: "Advertising (Programmatic + Direct) + Subscriptions + Licensing" },
                { icon: "👥", label: "Entity Structure", value: "Multi-title portfolio with shared ad operations" },
                { icon: "⏱", label: "Close Cycle", value: "Daily yield reporting + monthly close + quarterly guidance" },
                { icon: "🔗", label: "Key Systems", value: "Ad Server, DMP/CDP, CMS, Subscription Platform, ERP" }
            ]
        }
    },

    // ----------------------------------------------------------
    // BUSINESS USE CASES
    // ----------------------------------------------------------
    useCases: {
        agency: [
            {
                id: "rev-forecast",
                title: "Revenue Forecasting",
                icon: "📈",
                description: "Automated revenue forecasting across client accounts, service lines, and geographies with rolling 12-18 month projections.",
                painPoints: [
                    "Manual spreadsheet consolidation across 20+ entities",
                    "Inconsistent forecast methodologies across teams",
                    "2-3 week lag in revenue visibility"
                ],
                automationValue: [
                    "Real-time pipeline-to-revenue conversion modeling",
                    "ML-based forecast with 95%+ accuracy",
                    "Automated scenario planning (best/base/worst)"
                ],
                kpis: ["Forecast accuracy ↑ 30%", "Close cycle ↓ 60%", "Revenue leakage ↓ 15%"],
                complexity: "high",
                projectPlan: { moduleIndices: [0, 1, 2], teamSize: "medium", duration: 9 }
            },
            {
                id: "resource-util",
                title: "Resource & Utilization Planning",
                icon: "👥",
                description: "Optimize staffing and utilization rates across client engagements with demand-driven capacity planning.",
                painPoints: [
                    "Over/under-staffing on client accounts",
                    "No visibility into forward utilization",
                    "Manual resource allocation in spreadsheets"
                ],
                automationValue: [
                    "Demand forecasting tied to pipeline and contracts",
                    "Automated utilization dashboards by role/team/office",
                    "Bench optimization and redeployment alerts"
                ],
                kpis: ["Utilization ↑ 8-12%", "Bench cost ↓ 25%", "Staffing time ↓ 50%"],
                complexity: "high",
                projectPlan: { moduleIndices: [0, 4, 2], teamSize: "small", duration: 6 }
            },
            {
                id: "client-profit",
                title: "Client Profitability Analysis",
                icon: "💰",
                description: "Granular P&L visibility at the client, project, and campaign level with automated cost allocation.",
                painPoints: [
                    "Indirect costs allocated by gut feel, not data",
                    "Profitability known only at quarter-end",
                    "No real-time margin alerts"
                ],
                automationValue: [
                    "Activity-based costing with automated allocation",
                    "Real-time client margin dashboards",
                    "Automated alerts when margins fall below threshold"
                ],
                kpis: ["Margin visibility from quarterly → daily", "Unprofitable client actions ↑ 40%", "Average margin ↑ 3-5pp"],
                complexity: "medium",
                projectPlan: { moduleIndices: [0, 3, 2], teamSize: "small", duration: 6 }
            },
            {
                id: "cash-flow",
                title: "Cash Flow Management",
                icon: "💵",
                description: "Automated cash flow forecasting incorporating retainer billing cycles, project milestones, and vendor payments.",
                painPoints: [
                    "Unpredictable cash position due to mixed billing",
                    "Manual AR/AP reconciliation",
                    "Media pass-through timing mismatches"
                ],
                automationValue: [
                    "13-week rolling cash flow forecast",
                    "Automated AR aging alerts and collection triggers",
                    "Media float optimization engine"
                ],
                kpis: ["Cash forecast accuracy ↑ 40%", "DSO ↓ 8-12 days", "Working capital ↑ 15%"],
                complexity: "medium",
                projectPlan: { moduleIndices: [0, 5, 2], teamSize: "small", duration: 6 }
            },
            {
                id: "budget-variance",
                title: "Budget vs. Actual Variance",
                icon: "📊",
                description: "Automated BvA reporting with drill-down capabilities from consolidated to entity to client level.",
                painPoints: [
                    "3+ weeks to produce monthly BvA reports",
                    "No root-cause drill-down capability",
                    "Inconsistent chart of accounts across entities"
                ],
                automationValue: [
                    "Real-time BvA dashboards with auto-commentary",
                    "Automated variance explanation using AI/NLP",
                    "Standardized COA mapping across entities"
                ],
                kpis: ["BvA report time ↓ 80%", "Variance resolution ↓ 50%", "COA consistency 100%"],
                complexity: "medium",
                projectPlan: { moduleIndices: [0, 2, 9], teamSize: "small", duration: 6 }
            },
            {
                id: "consolidation",
                title: "Multi-Entity Consolidation",
                icon: "🏢",
                description: "Automated intercompany eliminations, currency translation, and consolidation across holding company entities.",
                painPoints: [
                    "Manual intercompany reconciliation taking 5+ days",
                    "Currency translation errors",
                    "Consolidation adjustments tracked in offline spreadsheets"
                ],
                automationValue: [
                    "Automated IC matching and elimination",
                    "Real-time currency translation with rate feeds",
                    "Audit-ready consolidation trail"
                ],
                kpis: ["Consolidation time ↓ 70%", "IC exceptions ↓ 90%", "Audit prep ↓ 50%"],
                complexity: "high",
                projectPlan: { moduleIndices: [0, 2, 6, 9], teamSize: "medium", duration: 9 }
            },
            {
                id: "commission",
                title: "Commission & Incentive Comp",
                icon: "🎯",
                description: "Automated commission calculations tied to revenue recognition, client retention, and performance metrics.",
                painPoints: [
                    "Manual commission spreadsheets with frequent errors",
                    "Disputes due to lack of transparency",
                    "No real-time visibility into earned commissions"
                ],
                automationValue: [
                    "Rule-based commission engine with audit trail",
                    "Self-service portal for reps to track earnings",
                    "Automated accrual calculations"
                ],
                kpis: ["Calc errors ↓ 95%", "Disputes ↓ 80%", "Processing time ↓ 70%"],
                complexity: "low",
                projectPlan: { moduleIndices: [0, 7], teamSize: "small", duration: 4 }
            },
            {
                id: "scenario-plan",
                title: "Scenario & Strategic Planning",
                icon: "🔮",
                description: "Driver-based financial modeling with Monte Carlo simulation for strategic decision support.",
                painPoints: [
                    "Scenario analysis limited to 2-3 manual cases",
                    "No linkage between operational and financial plans",
                    "Board decks take weeks to prepare"
                ],
                automationValue: [
                    "1000+ scenario Monte Carlo simulation",
                    "Driver-based models linked to operational KPIs",
                    "Automated board-ready output generation"
                ],
                kpis: ["Scenarios per cycle ↑ 100x", "Planning cycle ↓ 40%", "Decision speed ↑ 3x"],
                complexity: "high",
                projectPlan: { moduleIndices: [0, 1, 8, 9], teamSize: "medium", duration: 9 }
            }
        ],
        publisher: [
            {
                id: "ad-rev-forecast",
                title: "Ad Revenue Forecasting",
                icon: "📈",
                description: "ML-driven ad revenue forecasting across programmatic, direct-sold, and sponsored content with yield optimization signals.",
                painPoints: [
                    "Programmatic revenue highly volatile and hard to predict",
                    "Direct-sold pipeline not integrated with finance forecasts",
                    "Seasonality and market shifts cause 20%+ forecast misses"
                ],
                automationValue: [
                    "ML models trained on historical fill rates, CPM trends, and seasonality",
                    "Pipeline integration for direct-sold booking signals",
                    "Real-time pacing dashboards with variance alerts"
                ],
                kpis: ["Forecast accuracy ↑ 35%", "Revenue leakage ↓ 12%", "Pacing visibility from weekly → real-time"],
                complexity: "high",
                projectPlan: { moduleIndices: [0, 1, 6], teamSize: "medium", duration: 9 }
            },
            {
                id: "sub-revenue",
                title: "Subscription Revenue Modeling",
                icon: "🔄",
                description: "Cohort-based subscription analytics with churn prediction, LTV modeling, and renewal forecasting.",
                painPoints: [
                    "No cohort-level visibility into subscriber behavior",
                    "Churn detected after the fact, not predicted",
                    "Revenue recognition complex across tiers and promotions"
                ],
                automationValue: [
                    "Automated cohort analysis with behavioral segmentation",
                    "ML churn prediction model with intervention triggers",
                    "Rev rec automation per ASC 606 / IFRS 15"
                ],
                kpis: ["Churn prediction ↑ 40%", "LTV accuracy ↑ 25%", "Rev rec close ↓ 3 days"],
                complexity: "high",
                projectPlan: { moduleIndices: [0, 3, 9], teamSize: "medium", duration: 9 }
            },
            {
                id: "content-roi",
                title: "Content ROI Analysis",
                icon: "📝",
                description: "Measure financial return on content investment by linking production costs to monetization outcomes.",
                painPoints: [
                    "Content costs tracked in production systems, revenue in ad systems",
                    "No financial attribution at the content-piece level",
                    "Editorial decisions made without financial context"
                ],
                automationValue: [
                    "Automated cost-to-revenue attribution per content piece",
                    "Real-time content P&L dashboards",
                    "AI-powered content investment recommendations"
                ],
                kpis: ["Content ROI visibility from 0% → 100%", "Underperforming content ↓ 30%", "Revenue per content ↑ 20%"],
                complexity: "medium",
                projectPlan: { moduleIndices: [0, 4, 6], teamSize: "small", duration: 6 }
            },
            {
                id: "audience-monetize",
                title: "Audience Monetization Planning",
                icon: "👁",
                description: "Unified audience value analytics across advertising, subscriptions, and commerce with segment-level monetization.",
                painPoints: [
                    "Audience data siloed across ad, sub, and commerce systems",
                    "No unified view of audience value",
                    "Monetization strategy decisions based on incomplete data"
                ],
                automationValue: [
                    "Unified audience value scoring across revenue streams",
                    "Segment-level ARPU and monetization mix optimization",
                    "Automated data clean room integration for audience insights"
                ],
                kpis: ["ARPU ↑ 15-20%", "Cross-sell revenue ↑ 25%", "Audience insight latency ↓ 80%"],
                complexity: "high",
                projectPlan: { moduleIndices: [0, 5, 1, 6], teamSize: "medium", duration: 9 }
            },
            {
                id: "yield-opt",
                title: "Yield Optimization",
                icon: "⚡",
                description: "Real-time ad yield optimization with automated floor price management and demand partner evaluation.",
                painPoints: [
                    "Floor prices managed manually across hundreds of placements",
                    "No financial model for demand partner selection",
                    "Yield optimization disconnected from finance forecasts"
                ],
                automationValue: [
                    "Dynamic floor price optimization using ML",
                    "Automated demand partner ROI analysis",
                    "Yield-to-forecast integration for real-time financial impact"
                ],
                kpis: ["eCPM ↑ 10-15%", "Fill rate optimization ↑ 8%", "Floor price updates from weekly → real-time"],
                complexity: "medium",
                projectPlan: { moduleIndices: [0, 1, 2], teamSize: "medium", duration: 9 }
            },
            {
                id: "multi-platform",
                title: "Multi-Platform Revenue Consolidation",
                icon: "🏢",
                description: "Automated revenue consolidation across web, mobile, OTT, social, and syndication platforms.",
                painPoints: [
                    "Revenue data scattered across 10+ platforms",
                    "Manual reconciliation takes 5+ days per close",
                    "Inconsistent revenue classification across platforms"
                ],
                automationValue: [
                    "Automated data ingestion from all platform APIs",
                    "Standardized revenue taxonomy and mapping",
                    "Real-time cross-platform revenue dashboards"
                ],
                kpis: ["Consolidation time ↓ 75%", "Data accuracy ↑ 99%", "Platform coverage 100%"],
                complexity: "medium",
                projectPlan: { moduleIndices: [0, 6, 9], teamSize: "small", duration: 6 }
            },
            {
                id: "adv-churn",
                title: "Advertiser Churn Prediction",
                icon: "🎯",
                description: "Predict advertiser churn and lifetime value to prioritize retention and optimize sales strategy.",
                painPoints: [
                    "Advertiser churn discovered at renewal time",
                    "No data-driven retention prioritization",
                    "Sales team reactive, not proactive"
                ],
                automationValue: [
                    "ML churn prediction with 90-day lead time",
                    "Automated health scoring for advertiser accounts",
                    "Proactive retention playbook triggers"
                ],
                kpis: ["Advertiser retention ↑ 15%", "Churn prediction accuracy 85%+", "Sales response time ↓ 60%"],
                complexity: "medium",
                projectPlan: { moduleIndices: [0, 7, 1], teamSize: "medium", duration: 9 }
            },
            {
                id: "pub-scenario",
                title: "Scenario & Strategic Planning",
                icon: "🔮",
                description: "Driver-based models linking audience growth, ad market conditions, and subscription trends to financial outcomes.",
                painPoints: [
                    "Planning disconnected from audience and market data",
                    "Limited ability to model regulatory impacts (cookie deprecation, privacy)",
                    "Annual planning cycle too slow for digital media"
                ],
                automationValue: [
                    "Monte Carlo simulation across key revenue drivers",
                    "Market scenario library (cookie changes, AI, regulation)",
                    "Continuous planning with monthly reforecast automation"
                ],
                kpis: ["Planning cycle from annual → continuous", "Scenario capacity ↑ 50x", "Strategic decision speed ↑ 3x"],
                complexity: "high",
                projectPlan: { moduleIndices: [0, 1, 8, 9], teamSize: "medium", duration: 12 }
            }
        ]
    },

    // ----------------------------------------------------------
    // ARCHITECTURE
    // ----------------------------------------------------------
    architecture: {
        agency: {
            sources: [
                {
                    name: "ERP", sub: "SAP / Oracle / NetSuite",
                    techDescription: "Core transactional system housing general ledger, accounts payable/receivable, fixed assets, and financial close processes. Serves as the system of record for all financial transactions and chart of accounts master data.",
                    businessDescription: "The financial backbone of the organization, providing the authoritative source for all monetary transactions, ensuring compliance with accounting standards, and enabling statutory reporting.",
                    connections: { upstream: [], downstream: ["Data Warehouse", "ETL Engine"] }
                },
                {
                    name: "Time & Billing", sub: "Workday / Maconomy",
                    techDescription: "Captures employee time entries, project hours, billing rates, and generates client invoices. Integrates with project management for WIP tracking and revenue recognition triggers.",
                    businessDescription: "Critical for measuring billable utilization, calculating client fees, and ensuring accurate revenue recognition. Directly impacts profitability measurement and resource efficiency.",
                    connections: { upstream: [], downstream: ["Data Warehouse", "ETL Engine"] }
                },
                {
                    name: "CRM", sub: "Salesforce / HubSpot",
                    techDescription: "Manages client relationships, sales pipeline stages, deal values, and probability-weighted forecasts. Provides leading indicators for revenue through pipeline velocity and conversion rate data.",
                    businessDescription: "Primary source for forward-looking revenue signals. Pipeline data drives revenue forecasting accuracy and informs resource planning decisions across the organization.",
                    connections: { upstream: [], downstream: ["Data Warehouse", "ETL Engine"] }
                },
                {
                    name: "Project Mgmt", sub: "Workfront / Monday",
                    techDescription: "Tracks project timelines, task dependencies, resource assignments, deliverable status, and milestone completion. Provides real-time project health metrics and capacity utilization data.",
                    businessDescription: "Enables project-level P&L tracking and resource allocation optimization. Links operational execution to financial outcomes for better margin management.",
                    connections: { upstream: [], downstream: ["Data Warehouse", "ETL Engine"] }
                },
                {
                    name: "HRIS", sub: "Workday / ADP",
                    techDescription: "Employee master data including compensation, benefits, department hierarchy, and headcount. Provides cost center mappings and fully-loaded labor rate calculations for allocation models.",
                    businessDescription: "Drives labor cost calculations that form 60-70% of agency cost structure. Essential for accurate profitability analysis and capacity planning.",
                    connections: { upstream: [], downstream: ["Data Warehouse", "ETL Engine"] }
                },
                {
                    name: "Media Buying", sub: "Mediaocean / Prisma",
                    techDescription: "Manages media planning, buying, trafficking, and reconciliation across channels. Tracks committed spend, actual spend, and client pass-through billing for media float management.",
                    businessDescription: "Controls the largest expense category in many agencies. Media pass-through timing directly impacts cash flow and working capital requirements.",
                    connections: { upstream: [], downstream: ["Data Warehouse", "ETL Engine"] }
                }
            ],
            platform: [
                {
                    name: "Data Warehouse", sub: "Snowflake / BigQuery",
                    techDescription: "Cloud-native columnar storage optimized for analytical queries. Houses the unified enterprise data model with conformed dimensions, fact tables, and materialized views for reporting.",
                    businessDescription: "The single source of truth for all financial and operational data. Eliminates data silos and enables cross-functional analytics that were previously impossible with fragmented spreadsheets.",
                    connections: { upstream: ["ERP", "Time & Billing", "CRM", "Project Mgmt", "HRIS", "Media Buying"], downstream: ["Forecast Engine", "Planning Hub", "Allocation Engine", "Executive Dashboards"] }
                },
                {
                    name: "Data Lake", sub: "S3 / Azure Data Lake",
                    techDescription: "Raw data storage layer for unstructured and semi-structured data including email metadata, document repositories, and external market data feeds. Supports exploratory analytics and ML feature engineering.",
                    businessDescription: "Captures data that does not fit traditional structured models but provides valuable context for advanced analytics — market trends, competitive intelligence, and behavioral patterns.",
                    connections: { upstream: ["ERP", "Time & Billing", "CRM", "Project Mgmt", "HRIS", "Media Buying"], downstream: ["ETL Engine", "Forecast Engine"] }
                },
                {
                    name: "ETL Engine", sub: "dbt / Fivetran / Airflow",
                    techDescription: "Orchestrates data extraction from source systems, applies business rule transformations using dbt models, and loads clean data into the warehouse. Handles incremental loads, change data capture, and data lineage tracking.",
                    businessDescription: "The automated pipeline that replaces manual data gathering, ensuring data freshness, consistency, and audit-readiness. Reduces close cycle time by eliminating manual data manipulation.",
                    connections: { upstream: ["Data Lake"], downstream: ["Data Warehouse", "Data Quality"] }
                },
                {
                    name: "Data Quality", sub: "Great Expectations / Monte Carlo",
                    techDescription: "Continuous monitoring framework that validates data completeness, accuracy, freshness, and schema conformance. Implements automated testing on every pipeline run with alerting for anomaly detection.",
                    businessDescription: "Builds trust in automated outputs. Finance teams will only adopt automated reporting if they trust the underlying data quality — this module provides that assurance.",
                    connections: { upstream: ["ETL Engine", "Data Warehouse"], downstream: ["Forecast Engine", "Planning Hub"] }
                }
            ],
            apps: [
                {
                    name: "Forecast Engine", sub: "Prophet / Custom ML",
                    techDescription: "Statistical and ML-based forecasting service using Prophet, ARIMA, and custom gradient-boosted models. Ingests historical actuals, pipeline signals, seasonality patterns, and external indicators to produce rolling 12-18 month forecasts.",
                    businessDescription: "Transforms forecasting from a manual, assumption-heavy exercise into a data-driven capability. Delivers 95%+ accuracy and enables the CFO to provide confident guidance to stakeholders.",
                    connections: { upstream: ["Data Warehouse", "Data Quality"], downstream: ["Executive Dashboards", "Board Packs", "Planning Hub"] }
                },
                {
                    name: "Planning Hub", sub: "Anaplan / Pigment",
                    techDescription: "Enterprise planning platform (Anaplan/Pigment) hosting connected financial models — P&L, balance sheet, cash flow, and workforce plans. Supports multi-dimensional analysis and driver-based planning with version control.",
                    businessDescription: "Replaces disconnected spreadsheet models with a unified planning environment. Enables connected planning where changes in one area (e.g., headcount) automatically cascade through all financial statements.",
                    connections: { upstream: ["Data Warehouse", "Forecast Engine"], downstream: ["Executive Dashboards", "Board Packs"] }
                },
                {
                    name: "Allocation Engine", sub: "Custom Rules Engine",
                    techDescription: "Rules-based cost allocation service implementing activity-based costing methodologies. Distributes shared costs (overhead, management, facilities) to clients, projects, and service lines using configurable allocation drivers.",
                    businessDescription: "Enables accurate client and project-level profitability by fairly distributing shared costs. Provides the granularity needed for pricing decisions and portfolio optimization.",
                    connections: { upstream: ["Data Warehouse"], downstream: ["Client P&L Reports", "Executive Dashboards"] }
                },
                {
                    name: "Workflow Automation", sub: "Power Automate / Airflow",
                    techDescription: "Orchestration layer automating repetitive FP&A workflows — journal entry approvals, report distribution, variance threshold alerts, data refresh scheduling, and close checklist management.",
                    businessDescription: "Eliminates manual, error-prone process steps in the financial close and reporting cycle. Frees FP&A professionals to focus on analysis and business partnering rather than data wrangling.",
                    connections: { upstream: ["Data Warehouse", "Forecast Engine", "Planning Hub"], downstream: ["Executive Dashboards", "Client P&L Reports", "Board Packs"] }
                }
            ],
            outputs: [
                {
                    name: "Executive Dashboards", sub: "Tableau / Power BI",
                    techDescription: "Interactive visualization layer built on Tableau/Power BI with row-level security, drill-through navigation, embedded analytics, and mobile-responsive design. Connected live to the data warehouse.",
                    businessDescription: "Self-service analytics for executives and FP&A teams. Replaces static monthly reports with real-time, interactive views that enable faster decision-making and ad-hoc analysis.",
                    connections: { upstream: ["Data Warehouse", "Forecast Engine", "Allocation Engine"], downstream: [] }
                },
                {
                    name: "Client P&L Reports", sub: "Automated Report Gen",
                    techDescription: "Automated report generation engine producing client-level P&L statements with configurable templates, scheduled distribution, and role-based access controls.",
                    businessDescription: "Provides granular profitability visibility at the client level, enabling data-driven decisions about pricing, resource allocation, and portfolio management.",
                    connections: { upstream: ["Allocation Engine", "Data Warehouse"], downstream: [] }
                },
                {
                    name: "Board Packs", sub: "Automated Narratives",
                    techDescription: "Automated narrative generation combining data visualizations, AI-generated commentary, and structured templates to produce board-ready financial summaries.",
                    businessDescription: "Reduces board pack preparation from 2-3 weeks to 2-3 days. Ensures consistency, accuracy, and professional presentation for governance and investor communications.",
                    connections: { upstream: ["Forecast Engine", "Planning Hub"], downstream: [] }
                },
                {
                    name: "API Layer", sub: "REST / GraphQL",
                    techDescription: "RESTful and GraphQL API service exposing financial data and forecasts to downstream systems, partner integrations, and custom applications with authentication and rate limiting.",
                    businessDescription: "Enables integration with external tools and custom workflows. Future-proofs the platform by making financial data programmably accessible.",
                    connections: { upstream: ["Data Warehouse", "Forecast Engine"], downstream: [] }
                }
            ]
        },
        publisher: {
            sources: [
                {
                    name: "Ad Server", sub: "GAM / SpringServe",
                    techDescription: "Primary ad delivery and decisioning engine managing impression delivery, campaign targeting, frequency capping, and competitive separation. Produces granular impression-level data with creative, placement, and advertiser dimensions.",
                    businessDescription: "The core revenue engine for ad-supported publishing. Every impression served generates data that feeds into yield optimization, revenue forecasting, and advertiser relationship management.",
                    connections: { upstream: [], downstream: ["Data Warehouse", "ETL Engine"] }
                },
                {
                    name: "SSP / Exchange", sub: "Prebid / Index / Magnite",
                    techDescription: "Programmatic supply-side platforms managing real-time auction dynamics, demand partner integrations, and header bidding orchestration. Provides bid landscape, win rates, and floor price performance data.",
                    businessDescription: "Drives programmatic revenue — often 50-70% of total ad revenue. Understanding SSP performance directly impacts yield optimization and revenue maximization strategies.",
                    connections: { upstream: [], downstream: ["Data Warehouse", "ETL Engine"] }
                },
                {
                    name: "DMP / CDP", sub: "Permutive / Segment",
                    techDescription: "Audience data management platform collecting first-party behavioral signals, segment definitions, and identity resolution across touchpoints. Provides audience taxonomy and targeting capabilities.",
                    businessDescription: "First-party data is the publisher's most valuable asset. The CDP enables audience-based monetization strategies that command premium pricing and differentiate against competitors.",
                    connections: { upstream: [], downstream: ["Data Warehouse", "ETL Engine"] }
                },
                {
                    name: "CMS", sub: "WordPress / Arc / Chorus",
                    techDescription: "Content management system housing article metadata, editorial taxonomy, author information, publication dates, and content performance metrics (page views, time on page, scroll depth).",
                    businessDescription: "Links content production investment to audience engagement and monetization outcomes. Essential for understanding which content drives the most valuable audiences and revenue.",
                    connections: { upstream: [], downstream: ["Data Warehouse", "ETL Engine"] }
                },
                {
                    name: "Subscription Platform", sub: "Piano / Zuora",
                    techDescription: "Manages subscriber lifecycle from acquisition through retention — handling paywalls, entitlements, payment processing, plan management, and churn events with full event stream data.",
                    businessDescription: "Provides the complete subscriber journey data needed for cohort analysis, churn prediction, and lifetime value modeling. Subscription revenue stability balances ad revenue volatility.",
                    connections: { upstream: [], downstream: ["Data Warehouse", "ETL Engine"] }
                },
                {
                    name: "ERP", sub: "SAP / Oracle / NetSuite",
                    techDescription: "General ledger and financial close system managing revenue recognition, expense tracking, accounts receivable for direct-sold campaigns, and statutory financial reporting.",
                    businessDescription: "Provides the financial system of record. All revenue streams must reconcile to the GL, making the ERP the ultimate source of truth for recognized revenue.",
                    connections: { upstream: [], downstream: ["Data Warehouse", "ETL Engine"] }
                }
            ],
            platform: [
                {
                    name: "Data Warehouse", sub: "Snowflake / BigQuery",
                    techDescription: "Cloud-native analytical database optimized for time-series ad data at massive scale. Houses unified revenue data model spanning impressions, subscriptions, and content with sub-second query performance.",
                    businessDescription: "Eliminates the data chaos of 10+ disconnected revenue platforms. Provides a single view of revenue across all streams, enabling cross-platform analytics and accurate financial reporting.",
                    connections: { upstream: ["Ad Server", "SSP / Exchange", "DMP / CDP", "CMS", "Subscription Platform", "ERP"], downstream: ["Revenue Forecast", "Yield Optimizer", "Audience Analytics", "Revenue Dashboards"] }
                },
                {
                    name: "Real-Time Pipeline", sub: "Kafka / Pub/Sub",
                    techDescription: "Event streaming infrastructure (Kafka/Pub-Sub) processing millions of impression and bidding events per second. Enables sub-minute latency for yield signals, pacing alerts, and real-time revenue monitoring.",
                    businessDescription: "Real-time data enables real-time decisions. Pacing dashboards, yield alerts, and dynamic floor pricing all depend on seeing data in near-real-time rather than waiting for next-day batch reports.",
                    connections: { upstream: ["Ad Server", "SSP / Exchange"], downstream: ["Data Warehouse", "Yield Optimizer"] }
                },
                {
                    name: "ETL Engine", sub: "dbt / Fivetran / Airflow",
                    techDescription: "Transformation layer normalizing data from diverse ad tech APIs, subscription webhooks, and CMS feeds into a unified revenue taxonomy. Handles complex mappings between impression-level and revenue-level data.",
                    businessDescription: "Translates the technical language of ad tech into the financial language of revenue reporting. Ensures that every dollar of revenue can be traced from source system to the general ledger.",
                    connections: { upstream: ["Real-Time Pipeline"], downstream: ["Data Warehouse", "Data Quality"] }
                },
                {
                    name: "Data Quality", sub: "Great Expectations / Monte Carlo",
                    techDescription: "Automated validation framework ensuring impression counts reconcile across ad server and SSPs, subscription events are complete, and revenue figures balance to the GL.",
                    businessDescription: "Revenue reconciliation accuracy is critical for advertiser trust and financial compliance. This module catches discrepancies before they become billing disputes or audit findings.",
                    connections: { upstream: ["ETL Engine", "Data Warehouse"], downstream: ["Revenue Forecast", "Revenue Dashboards"] }
                }
            ],
            apps: [
                {
                    name: "Revenue Forecast", sub: "Prophet / Custom ML",
                    techDescription: "ML ensemble model combining time-series decomposition, seasonal patterns, market indicators, and pipeline signals to forecast ad and subscription revenue. Supports multiple forecast horizons from daily pacing to quarterly guidance.",
                    businessDescription: "Provides confident revenue guidance to leadership and investors. Reduces forecast variance from 20%+ to under 5%, enabling better resource allocation and strategic planning.",
                    connections: { upstream: ["Data Warehouse", "Data Quality"], downstream: ["Revenue Dashboards", "Investor Packs"] }
                },
                {
                    name: "Yield Optimizer", sub: "Custom ML Models",
                    techDescription: "Real-time optimization engine using reinforcement learning to set optimal floor prices per placement, geography, and device. A/B tests pricing strategies and evaluates demand partner performance.",
                    businessDescription: "Directly increases revenue per impression by 10-15% through intelligent pricing. Replaces manual floor price management with automated optimization that runs 24/7.",
                    connections: { upstream: ["Real-Time Pipeline", "Data Warehouse"], downstream: ["Revenue Dashboards", "Revenue Forecast"] }
                },
                {
                    name: "Audience Analytics", sub: "Custom / Amplitude",
                    techDescription: "Audience intelligence platform computing segment-level metrics including ARPU, engagement scores, content affinity, and monetization mix analysis. Powers lookalike modeling for advertiser targeting.",
                    businessDescription: "Transforms anonymous traffic into understood audience segments with quantified value. Enables premium pricing for high-value audiences and informs content strategy with monetization data.",
                    connections: { upstream: ["Data Warehouse"], downstream: ["Revenue Dashboards", "Revenue Forecast"] }
                },
                {
                    name: "Churn Prediction", sub: "Custom ML Pipeline",
                    techDescription: "ML classification model predicting subscriber and advertiser churn using behavioral signals, payment patterns, engagement decay, and competitive indicators. Generates risk scores with 90-day prediction horizon.",
                    businessDescription: "Shifts retention from reactive to proactive. By identifying at-risk subscribers and advertisers 90 days in advance, teams can intervene before revenue is lost.",
                    connections: { upstream: ["Data Warehouse"], downstream: ["Revenue Dashboards", "Investor Packs"] }
                }
            ],
            outputs: [
                {
                    name: "Revenue Dashboards", sub: "Tableau / Looker",
                    techDescription: "Real-time interactive dashboards showing revenue by stream, platform, format, and audience segment with drill-through from consolidated to individual placement level.",
                    businessDescription: "The daily command center for Revenue Ops and FP&A teams. Provides the real-time visibility needed to manage a fast-moving digital revenue business.",
                    connections: { upstream: ["Data Warehouse", "Revenue Forecast", "Yield Optimizer", "Audience Analytics"], downstream: [] }
                },
                {
                    name: "Yield Reports", sub: "Real-Time Monitors",
                    techDescription: "Automated real-time monitoring dashboards showing fill rates, eCPMs, bid density, floor price effectiveness, and demand partner performance with configurable alerting thresholds.",
                    businessDescription: "Enables Ad Ops teams to identify and respond to yield issues in real-time rather than discovering them in next-day reports. Directly protects and optimizes revenue.",
                    connections: { upstream: ["Yield Optimizer", "Data Warehouse"], downstream: [] }
                },
                {
                    name: "Investor Packs", sub: "Automated Narratives",
                    techDescription: "Automated narrative generation producing investor-ready financial summaries with market context, growth metrics, cohort analyses, and forward-looking guidance with supporting data.",
                    businessDescription: "Reduces investor reporting cycle from weeks to days. Produces professional, data-backed narratives that build investor confidence with consistent, accurate financial storytelling.",
                    connections: { upstream: ["Revenue Forecast", "Churn Prediction"], downstream: [] }
                },
                {
                    name: "API Layer", sub: "REST / GraphQL",
                    techDescription: "RESTful API service exposing revenue data, forecasts, and audience analytics to downstream systems including clean rooms, advertiser dashboards, and custom reporting tools.",
                    businessDescription: "Enables programmatic access to financial data for partners, advertisers, and internal tools. Supports the growing need for automated data sharing in the ad tech ecosystem.",
                    connections: { upstream: ["Data Warehouse", "Revenue Forecast"], downstream: [] }
                }
            ]
        }
    },

    // ----------------------------------------------------------
    // TECHNOLOGY STACK
    // ----------------------------------------------------------
    techStack: [
        {
            category: "Data Warehouse",
            options: ["Snowflake", "BigQuery", "Redshift"],
            recommended: "Snowflake",
            moduleIndices: [0, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
            minComplexity: "Low",
            deliveryModels: ["onshore", "offshore", "hybrid"],
            architectureLayers: ["platform", "sources", "apps"],
            costImpact: "$200K-$500K/yr",
            reason: "Foundation for all data integration and analytics",
            criticality: "Critical"
        },
        {
            category: "Cloud Platform",
            options: ["AWS", "Azure", "GCP"],
            recommended: "AWS or GCP",
            moduleIndices: [0, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
            minComplexity: "Low",
            deliveryModels: ["onshore", "offshore", "hybrid"],
            architectureLayers: ["platform"],
            costImpact: "$150K-$400K/yr",
            reason: "Cloud infrastructure for scalable data and analytics platform",
            criticality: "Critical"
        },
        {
            category: "Data Ingestion",
            options: ["Fivetran", "Airbyte", "Stitch"],
            recommended: "Fivetran",
            moduleIndices: [0, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
            minComplexity: "Low",
            deliveryModels: ["onshore", "offshore", "hybrid"],
            architectureLayers: ["sources", "platform"],
            costImpact: "$50K-$150K/yr",
            reason: "Automated connector framework from ERP, billing, CRM systems",
            criticality: "Critical"
        },
        {
            category: "Transformation",
            options: ["dbt", "Dataform", "Matillion"],
            recommended: "dbt Core/Cloud",
            moduleIndices: [0, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
            minComplexity: "Low",
            deliveryModels: ["onshore", "offshore", "hybrid"],
            architectureLayers: ["platform"],
            costImpact: "$0-$100K/yr",
            reason: "SQL-based data transformation and model governance",
            criticality: "Critical"
        },
        {
            category: "Orchestration",
            options: ["Airflow", "Dagster", "Prefect"],
            recommended: "Airflow or Dagster",
            moduleIndices: [0, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
            minComplexity: "Low",
            deliveryModels: ["onshore", "offshore", "hybrid"],
            architectureLayers: ["platform"],
            costImpact: "$50K-$150K/yr",
            reason: "Data pipeline orchestration and dependency management",
            criticality: "Critical"
        },
        {
            category: "ML / AI",
            options: ["Python/scikit", "Prophet", "Vertex AI"],
            recommended: "Prophet + Custom Python",
            moduleIndices: [1, 2, 5, 6, 10, 11, 13],
            minComplexity: "Medium",
            deliveryModels: ["onshore", "offshore", "hybrid"],
            architectureLayers: ["platform", "apps"],
            costImpact: "$75K-$200K/yr",
            reason: "Time series forecasting (Revenue, Subscriber) and predictive analytics",
            criticality: "Optional"
        },
        {
            category: "Visualization",
            options: ["Tableau", "Power BI", "Looker"],
            recommended: "Tableau or Power BI",
            moduleIndices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
            minComplexity: "Low",
            deliveryModels: ["onshore", "offshore", "hybrid"],
            architectureLayers: ["apps", "outputs"],
            costImpact: "$100K-$300K/yr",
            reason: "Interactive dashboards and executive reporting",
            criticality: "Critical"
        },
        {
            category: "Planning / Simulation",
            options: ["Anaplan", "Pigment", "Planful"],
            recommended: "Anaplan or Pigment",
            moduleIndices: [2, 5, 6, 9, 11, 12, 13, 14],
            minComplexity: "Medium",
            deliveryModels: ["onshore", "offshore", "hybrid"],
            architectureLayers: ["apps"],
            costImpact: "$100K-$250K/yr",
            reason: "Scenario planning, financial modeling, and what-if analysis",
            criticality: "Optional"
        },
        {
            category: "Data Quality",
            options: ["Monte Carlo", "Great Expectations", "Soda"],
            recommended: "Monte Carlo",
            moduleIndices: [0, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
            minComplexity: "Low",
            deliveryModels: ["onshore", "offshore", "hybrid"],
            architectureLayers: ["platform"],
            costImpact: "$50K-$100K/yr",
            reason: "Data quality monitoring and anomaly detection",
            criticality: "Critical"
        },
        {
            category: "Metadata & Governance",
            options: ["Collibra", "Alation", "Apache Atlas"],
            recommended: "Alation",
            moduleIndices: [0, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
            minComplexity: "Medium",
            deliveryModels: ["onshore", "offshore", "hybrid"],
            architectureLayers: ["platform"],
            costImpact: "$75K-$150K/yr",
            reason: "Data catalog, lineage tracking, and governance framework",
            criticality: "Optional"
        }
    ],

    // ----------------------------------------------------------
    // SCOPE MODULES
    // ----------------------------------------------------------
    scopeModules: {
        agency: [
            {
                id: "data-foundation", name: "Data Foundation & Integration", description: "Unified data model, source integrations, ETL pipelines, data quality framework", effort: 8, integrations: 6, phase: 1, category: "core",
                deliverables: ["Unified enterprise data model with conformed dimensions", "Source-to-target mapping documentation for all integrations", "Automated ETL/ELT pipeline suite with monitoring", "Data quality monitoring framework with automated alerting", "Data governance policies and stewardship model"],
                requiredSkills: ["Data Engineering", "ETL/dbt", "Cloud Architecture (Snowflake/BQ)", "Data Governance"],
                dependencies: [],
                successCriteria: ["All source systems connected with < 4hr data latency", "Data quality score > 95% across all critical fields", "Zero manual data transfers in production"],
                riskFactors: ["Source system API limitations or rate throttling", "Inconsistent data formats across legacy entities", "Organizational resistance to data governance policies"]
            },
            {
                id: "rev-forecast-mod", name: "Revenue Forecasting Engine", description: "ML-based forecasting with pipeline integration, scenario modeling, rolling forecasts", effort: 10, integrations: 4, phase: 2, category: "core",
                deliverables: ["ML forecast model with backtested accuracy metrics", "CRM pipeline integration for leading indicator signals", "Rolling 12-18 month forecast dashboard", "Automated model retraining pipeline", "Scenario modeling interface (best/base/worst)"],
                requiredSkills: ["ML Engineering (Python/Prophet)", "Statistical Modeling", "Data Engineering", "BI Development"],
                dependencies: ["data-foundation"],
                successCriteria: ["Forecast accuracy > 95% at consolidated level", "Model retraining automated on monthly cadence", "Forecast available within 24hr of period close"],
                riskFactors: ["Insufficient historical data for model training", "Rapid business model changes reducing model relevance", "Resistance from FP&A team to trust ML-generated forecasts"]
            },
            {
                id: "bva-reporting", name: "BvA & Management Reporting", description: "Automated budget vs actual, variance analysis, executive dashboards", effort: 6, integrations: 3, phase: 1, category: "core",
                deliverables: ["Automated BvA dashboards at consolidated, entity, and client level", "Variance analysis drill-down from summary to transaction", "AI-powered variance commentary engine", "Standardized chart of accounts mapping", "Automated report distribution schedule"],
                requiredSkills: ["BI Development (Tableau/Power BI)", "FP&A Domain Knowledge", "dbt/SQL", "NLP/AI"],
                dependencies: ["data-foundation"],
                successCriteria: ["BvA reports available within 2 days of period close", "Variance explanations auto-generated for items > threshold", "100% COA consistency across all entities"],
                riskFactors: ["Complex COA harmonization across acquired entities", "User adoption of self-service dashboards", "Commentary quality may require human review initially"]
            },
            {
                id: "client-profitability", name: "Client Profitability Module", description: "Activity-based costing, real-time margin tracking, profitability alerts", effort: 8, integrations: 5, phase: 2, category: "analytics",
                deliverables: ["Activity-based costing methodology and allocation rules", "Real-time client margin tracking dashboard", "Automated profitability alerts when margins breach thresholds", "Client P&L report generation engine", "Historical profitability trend analysis"],
                requiredSkills: ["FP&A Domain Expertise", "Cost Accounting", "BI Development", "Rules Engine Development"],
                dependencies: ["data-foundation", "bva-reporting"],
                successCriteria: ["Client margins visible within 24hr of time entry", "Cost allocation accuracy validated by finance", "Automated alerts triggering for < 20% margin clients"],
                riskFactors: ["Debate over allocation methodology across teams", "Time tracking data quality and completeness", "Resistance to transparency in client-level margins"]
            },
            {
                id: "resource-planning", name: "Resource & Capacity Planning", description: "Utilization tracking, demand forecasting, bench optimization", effort: 7, integrations: 4, phase: 2, category: "analytics",
                deliverables: ["Utilization tracking dashboards by role, team, and office", "Demand forecast model tied to sales pipeline", "Bench optimization alerts and redeployment recommendations", "Capacity planning scenario tool", "Resource allocation recommendation engine"],
                requiredSkills: ["Data Engineering", "ML Engineering", "BI Development", "Workforce Planning"],
                dependencies: ["data-foundation"],
                successCriteria: ["Utilization data refreshed daily", "Demand forecast accuracy > 85% at 30-day horizon", "Bench redeployment time reduced by 50%"],
                riskFactors: ["Time tracking discipline varies across teams", "Pipeline data quality affects forecast accuracy", "Privacy concerns with individual utilization tracking"]
            },
            {
                id: "cash-mgmt", name: "Cash Flow Management", description: "13-week cash forecast, AR/AP automation, working capital optimization", effort: 6, integrations: 3, phase: 2, category: "analytics",
                deliverables: ["13-week rolling cash flow forecast model", "Automated AR aging dashboards with collection alerts", "AP payment optimization recommendations", "Working capital KPI dashboard", "Media float tracking and optimization engine"],
                requiredSkills: ["Treasury/Cash Management", "FP&A Domain", "Data Engineering", "BI Development"],
                dependencies: ["data-foundation", "bva-reporting"],
                successCriteria: ["Cash forecast accuracy within 5% at 4-week horizon", "AR collection alerts automated for 60+ day items", "Working capital improvement of 10%+ in first year"],
                riskFactors: ["Client payment behavior changes due to economic conditions", "Media pass-through timing complexity", "Integration with banking systems may be limited"]
            },
            {
                id: "consolidation-mod", name: "Multi-Entity Consolidation", description: "IC elimination, currency translation, consolidation automation", effort: 9, integrations: 4, phase: 3, category: "advanced",
                deliverables: ["Automated intercompany transaction matching engine", "Multi-currency translation with live rate feeds", "Consolidation elimination rules and hierarchy", "Audit-ready consolidation trail with full lineage", "Minority interest and complex ownership calculations"],
                requiredSkills: ["Technical Accounting", "Data Engineering", "Multi-Currency Systems", "Audit/Compliance"],
                dependencies: ["data-foundation", "bva-reporting"],
                successCriteria: ["IC matching automated for 95%+ of transactions", "Consolidation completed within 1 day of entity close", "Zero currency translation adjustments in audit"],
                riskFactors: ["Complex ownership structures with partial ownership", "Frequent entity acquisitions/dispositions", "Regulatory changes in consolidation standards"]
            },
            {
                id: "commission-engine", name: "Commission & Incentive Engine", description: "Rule-based commission calc, self-service portal, accrual automation", effort: 5, integrations: 3, phase: 3, category: "advanced",
                deliverables: ["Configurable commission rules engine", "Self-service commission tracking portal for employees", "Automated commission accrual calculations", "Commission plan modeling and what-if analysis", "Audit trail for all commission calculations"],
                requiredSkills: ["Compensation/HR Domain", "Rules Engine Development", "Web Development", "Data Engineering"],
                dependencies: ["data-foundation"],
                successCriteria: ["Commission calculations 100% automated", "Employee disputes reduced by 80%+", "Accruals accurate within 2% of actuals"],
                riskFactors: ["Complex commission structures with exceptions", "Frequent plan changes requiring rule updates", "Integration with payroll systems"]
            },
            {
                id: "scenario-planning", name: "Scenario & Strategic Planning", description: "Monte Carlo simulation, driver-based models, board pack automation", effort: 9, integrations: 3, phase: 3, category: "advanced",
                deliverables: ["Driver-based financial model with 20+ configurable drivers", "Monte Carlo simulation engine (1000+ iterations)", "Scenario library (M&A, downturn, growth, restructuring)", "Board-ready output template automation", "What-if analysis self-service interface"],
                requiredSkills: ["Financial Modeling", "Statistical Simulation", "Planning Platform (Anaplan/Pigment)", "Executive Communication"],
                dependencies: ["data-foundation", "rev-forecast-mod"],
                successCriteria: ["Models linked to operational KPIs end-to-end", "Scenario analysis completed in hours, not weeks", "Board pack generation automated to < 2 days"],
                riskFactors: ["Executive alignment on key business drivers", "Model complexity may exceed planning tool capabilities", "Maintaining model relevance as business evolves"]
            },
            {
                id: "ai-narratives", name: "AI-Powered Narratives", description: "Auto-generated commentary, variance explanations, executive summaries", effort: 6, integrations: 2, phase: 3, category: "advanced",
                deliverables: ["AI variance commentary engine for monthly reporting", "Automated executive summary generation", "Natural language query interface for financial data", "Template-based narrative library", "Human-in-the-loop review workflow"],
                requiredSkills: ["NLP/LLM Engineering", "FP&A Domain Knowledge", "Technical Writing", "ML Engineering"],
                dependencies: ["data-foundation", "bva-reporting"],
                successCriteria: ["Commentary generated automatically for 80%+ of variances", "Executive summaries produced within 1hr of data refresh", "Quality score > 4/5 in user satisfaction surveys"],
                riskFactors: ["LLM hallucination risk with financial data", "Regulatory concerns about AI-generated financial statements", "Quality consistency across different reporting periods"]
            }
        ],
        publisher: [
            {
                id: "data-foundation", name: "Data Foundation & Integration", description: "Unified data model, ad tech + subscription integrations, real-time pipelines", effort: 9, integrations: 8, phase: 1, category: "core",
                deliverables: ["Unified revenue data model spanning ad, subscription, and content", "Real-time and batch ingestion pipelines for all platforms", "Automated data quality monitoring with freshness SLAs", "Revenue taxonomy and dimension standardization", "Data governance framework for audience and financial data"],
                requiredSkills: ["Data Engineering", "Ad Tech Data Models", "Stream Processing (Kafka)", "Cloud Architecture"],
                dependencies: [],
                successCriteria: ["All revenue platforms connected with agreed SLAs", "Revenue reconciliation automated to GL within $100 variance", "Data freshness < 1hr for programmatic, < 4hr for others"],
                riskFactors: ["Ad tech API changes and deprecations", "Scale of impression-level data (billions of rows)", "Complex revenue taxonomy across platforms"]
            },
            {
                id: "ad-rev-engine", name: "Ad Revenue Forecast Engine", description: "ML-based programmatic + direct-sold forecasting, pacing dashboards", effort: 10, integrations: 5, phase: 2, category: "core",
                deliverables: ["ML revenue forecast model for programmatic and direct-sold", "Real-time pacing dashboards with variance alerts", "Seasonal pattern library and market indicator integration", "Forecast accuracy backtesting framework", "Pipeline-to-revenue conversion model for direct sales"],
                requiredSkills: ["ML Engineering", "Ad Tech Domain", "Time Series Modeling", "BI Development"],
                dependencies: ["data-foundation"],
                successCriteria: ["Forecast accuracy > 92% at monthly grain", "Pacing alerts triggered within 2hr of variance threshold", "Direct-sold pipeline conversion model > 85% accuracy"],
                riskFactors: ["Programmatic market volatility exceeds model capacity", "Insufficient direct-sold pipeline data", "Ad market disruptions (e.g., cookie deprecation)"]
            },
            {
                id: "yield-module", name: "Yield Optimization Module", description: "Dynamic floor pricing, demand partner analysis, fill rate optimization", effort: 8, integrations: 4, phase: 2, category: "core",
                deliverables: ["Dynamic floor price optimization engine", "Demand partner performance evaluation framework", "A/B testing infrastructure for pricing strategies", "Fill rate optimization dashboards", "Yield-to-forecast feedback integration"],
                requiredSkills: ["ML Engineering (Reinforcement Learning)", "Ad Ops Domain", "A/B Testing", "Real-Time Systems"],
                dependencies: ["data-foundation", "ad-rev-engine"],
                successCriteria: ["eCPM improvement of 10-15% within 3 months", "Floor price updates automated across all placements", "Demand partner ROI visible in real-time"],
                riskFactors: ["Aggressive floor pricing may reduce fill rates", "Demand partner terms may limit optimization", "Real-time latency requirements for pricing decisions"]
            },
            {
                id: "sub-analytics", name: "Subscription Analytics", description: "Cohort analysis, churn prediction, LTV modeling, rev rec automation", effort: 8, integrations: 4, phase: 2, category: "analytics",
                deliverables: ["Subscriber cohort tracking and analysis framework", "ML churn prediction model with intervention triggers", "Lifetime value calculation engine with configurable methodology", "Revenue recognition automation per ASC 606/IFRS 15", "Subscription health dashboards with retention KPIs"],
                requiredSkills: ["ML Engineering", "Subscription Business Domain", "Revenue Recognition", "BI Development"],
                dependencies: ["data-foundation"],
                successCriteria: ["Churn prediction accuracy > 80% at 90-day horizon", "LTV models validated within 10% of actuals", "Rev rec automation eliminates manual adjustments"],
                riskFactors: ["Subscriber behavior shifts with market changes", "Complex promotional structures complicate rev rec", "Insufficient historical data for new subscription tiers"]
            },
            {
                id: "content-roi-mod", name: "Content ROI Engine", description: "Content-level P&L, production cost attribution, investment optimization", effort: 7, integrations: 4, phase: 2, category: "analytics",
                deliverables: ["Content-level P&L attribution model", "Production cost tracking and categorization", "Content investment scoring and recommendation engine", "Editorial ROI dashboards", "Content performance-to-revenue correlation analysis"],
                requiredSkills: ["Attribution Modeling", "Content Analytics", "Cost Accounting", "BI Development"],
                dependencies: ["data-foundation", "ad-rev-engine"],
                successCriteria: ["P&L attribution coverage for 90%+ of content", "Production costs tracked within 48hr of publication", "Editorial team actively using ROI data for planning"],
                riskFactors: ["Multi-touch attribution complexity for content", "Production cost data may be incomplete or inconsistent", "Editorial pushback on financial metrics driving content decisions"]
            },
            {
                id: "audience-value", name: "Audience Monetization Analytics", description: "Unified audience value, segment ARPU, cross-stream monetization", effort: 8, integrations: 5, phase: 2, category: "analytics",
                deliverables: ["Unified audience value scoring across all revenue streams", "Segment-level ARPU dashboards", "Cross-stream monetization mix optimizer", "Clean room integration for privacy-safe audience enrichment", "Audience investment and yield recommendations"],
                requiredSkills: ["Audience Analytics", "CDP/DMP Integration", "Privacy Engineering", "ML Engineering"],
                dependencies: ["data-foundation", "ad-rev-engine"],
                successCriteria: ["Audience value scores available for 80%+ of segments", "ARPU metrics updated daily across all streams", "Clean room partnerships operational"],
                riskFactors: ["Privacy regulations limiting audience data usage", "Identity resolution complexity across platforms", "Audience taxonomy alignment across siloed teams"]
            },
            {
                id: "platform-consol", name: "Multi-Platform Consolidation", description: "Cross-platform revenue consolidation, taxonomy standardization", effort: 7, integrations: 6, phase: 1, category: "core",
                deliverables: ["Cross-platform revenue consolidation pipeline", "Standardized revenue taxonomy and mapping rules", "Automated reconciliation between platforms and GL", "Multi-format revenue dashboards (display, video, native, sponsored)", "Platform performance comparison analytics"],
                requiredSkills: ["Data Engineering", "Ad Tech Domain", "Financial Reconciliation", "BI Development"],
                dependencies: ["data-foundation"],
                successCriteria: ["100% platform revenue coverage in consolidated view", "Reconciliation variance < 0.5% to GL", "Revenue classification standardized across all platforms"],
                riskFactors: ["Platform API changes requiring pipeline updates", "Revenue classification ambiguity across formats", "Currency and timezone handling for global operations"]
            },
            {
                id: "adv-churn-mod", name: "Advertiser Churn Prediction", description: "ML health scoring, retention triggers, sales prioritization", effort: 6, integrations: 3, phase: 3, category: "advanced",
                deliverables: ["Advertiser health scoring model using spend and engagement data", "ML churn prediction with 90-day horizon", "Automated retention alert and playbook system", "Advertiser lifetime value calculation", "CRM integration for sales team action triggers"],
                requiredSkills: ["ML Engineering", "Sales/CRM Domain", "Data Engineering", "CRM Integration"],
                dependencies: ["data-foundation"],
                successCriteria: ["Health scores available for 95%+ of active advertisers", "Churn prediction accuracy > 82% at 90-day horizon", "Retention alerts integrated with sales team workflow"],
                riskFactors: ["Advertiser behavior driven by external factors (budgets, strategy)", "Small advertiser sample size for ML training", "CRM integration complexity and adoption"]
            },
            {
                id: "pub-scenario", name: "Scenario & Strategic Planning", description: "Market scenario models, privacy impact analysis, continuous planning", effort: 9, integrations: 3, phase: 3, category: "advanced",
                deliverables: ["Driver-based planning model linking audience, ad market, and subscriptions", "Market scenario library (privacy regulation, AI disruption, recession)", "Continuous planning framework with monthly automated reforecast", "Investor guidance scenario tool", "Board-ready output automation"],
                requiredSkills: ["Financial Modeling", "Media Industry Domain", "Planning Platform", "Statistical Simulation"],
                dependencies: ["data-foundation", "ad-rev-engine"],
                successCriteria: ["Connected model spanning all revenue streams", "Monthly reforecast automated within 2 days of close", "Scenario analysis completed in hours, not weeks"],
                riskFactors: ["Rapid market changes outpacing model assumptions", "Executive alignment on key revenue drivers", "Model complexity exceeding planning tool capabilities"]
            },
            {
                id: "ai-narratives", name: "AI-Powered Narratives", description: "Auto-generated revenue commentary, investor narrative automation", effort: 6, integrations: 2, phase: 3, category: "advanced",
                deliverables: ["AI revenue commentary engine for daily/weekly/monthly reports", "Automated investor narrative generation", "Natural language query interface for revenue data", "Anomaly detection with automated explanations", "Template library for different reporting audiences"],
                requiredSkills: ["NLP/LLM Engineering", "Publishing Domain", "Technical Writing", "ML Engineering"],
                dependencies: ["data-foundation"],
                successCriteria: ["Commentary auto-generated for 80%+ of revenue variances", "Investor narratives produced within 2hr of data refresh", "User satisfaction score > 4/5"],
                riskFactors: ["LLM accuracy with financial figures", "Regulatory concerns about AI-generated financial content", "Voice/tone consistency across automated narratives"]
            }
        ]
    },

    // ----------------------------------------------------------
    // TEAM ROLES
    // ----------------------------------------------------------
    teamRoles: {
        small: [
            { role: "Project Lead / Engagement Manager", count: 1, rate: 275, category: "leadership", responsibilities: "Overall delivery, client relationship, scope management" },
            { role: "FP&A Domain Consultant", count: 1, rate: 250, category: "domain", responsibilities: "Business requirements, process design, domain expertise" },
            { role: "Data Engineer", count: 1, rate: 200, category: "technical", responsibilities: "ETL pipelines, data modeling, integration development" },
            { role: "Analytics / ML Engineer", count: 1, rate: 225, category: "technical", responsibilities: "Forecast models, ML pipeline, analytics development" },
            { role: "BI Developer", count: 1, rate: 185, category: "technical", responsibilities: "Dashboards, reporting, visualization development" },
            { role: "Change Management Lead", count: 0.5, rate: 200, category: "change", responsibilities: "Training, adoption, stakeholder communication" }
        ],
        medium: [
            { role: "Engagement Director", count: 1, rate: 350, category: "leadership", responsibilities: "Executive sponsorship, strategic direction, escalation" },
            { role: "Project Manager", count: 1, rate: 225, category: "leadership", responsibilities: "Day-to-day delivery, sprint management, risk tracking" },
            { role: "FP&A Domain Lead", count: 1, rate: 275, category: "domain", responsibilities: "Business architecture, process redesign, requirements" },
            { role: "FP&A Business Analyst", count: 1, rate: 175, category: "domain", responsibilities: "Requirements documentation, testing, UAT coordination" },
            { role: "Lead Data Engineer", count: 1, rate: 225, category: "technical", responsibilities: "Data architecture, pipeline design, technical leadership" },
            { role: "Data Engineer", count: 2, rate: 200, category: "technical", responsibilities: "ETL development, integration, data quality" },
            { role: "ML Engineer", count: 1, rate: 250, category: "technical", responsibilities: "ML model development, training, deployment" },
            { role: "BI Developer", count: 1, rate: 185, category: "technical", responsibilities: "Dashboard and report development" },
            { role: "Solution Architect", count: 0.5, rate: 300, category: "technical", responsibilities: "Technical architecture, vendor evaluation, design reviews" },
            { role: "Change Management Lead", count: 1, rate: 200, category: "change", responsibilities: "Training program, change strategy, adoption tracking" },
            { role: "QA / Test Lead", count: 1, rate: 175, category: "technical", responsibilities: "Test strategy, automation, quality assurance" }
        ],
        large: [
            { role: "Engagement Director", count: 1, rate: 375, category: "leadership", responsibilities: "Executive sponsorship, C-suite relationship, strategic oversight" },
            { role: "Program Manager", count: 1, rate: 275, category: "leadership", responsibilities: "Cross-workstream coordination, governance, reporting" },
            { role: "Project Manager (x2 workstreams)", count: 2, rate: 225, category: "leadership", responsibilities: "Workstream delivery, sprint management" },
            { role: "FP&A Domain Lead", count: 1, rate: 300, category: "domain", responsibilities: "Enterprise business architecture, process transformation" },
            { role: "FP&A Senior Consultant", count: 2, rate: 250, category: "domain", responsibilities: "Workstream business design, stakeholder management" },
            { role: "FP&A Business Analyst", count: 2, rate: 175, category: "domain", responsibilities: "Requirements, process mapping, testing" },
            { role: "Lead Data Architect", count: 1, rate: 275, category: "technical", responsibilities: "Enterprise data architecture, governance framework" },
            { role: "Lead Data Engineer", count: 1, rate: 225, category: "technical", responsibilities: "Pipeline architecture, performance, reliability" },
            { role: "Data Engineer", count: 3, rate: 200, category: "technical", responsibilities: "ETL/ELT development, integration, data quality" },
            { role: "Senior ML Engineer", count: 1, rate: 275, category: "technical", responsibilities: "ML architecture, model strategy, MLOps" },
            { role: "ML Engineer", count: 1, rate: 225, category: "technical", responsibilities: "Model development, training, feature engineering" },
            { role: "BI Developer", count: 2, rate: 185, category: "technical", responsibilities: "Dashboard and report development, self-service BI" },
            { role: "Solution Architect", count: 1, rate: 325, category: "technical", responsibilities: "Enterprise architecture, security, compliance" },
            { role: "DevOps / Platform Engineer", count: 1, rate: 210, category: "technical", responsibilities: "CI/CD, infrastructure, monitoring, MLOps" },
            { role: "Change Management Director", count: 1, rate: 250, category: "change", responsibilities: "Enterprise change strategy, executive alignment" },
            { role: "Training Lead", count: 1, rate: 175, category: "change", responsibilities: "Training curriculum, delivery, adoption metrics" },
            { role: "QA Lead", count: 1, rate: 185, category: "technical", responsibilities: "Test strategy, automation, performance testing" }
        ]
    },

    // ----------------------------------------------------------
    // COST MULTIPLIERS
    // ----------------------------------------------------------
    costMultipliers: {
        delivery: { onshore: 1.0, hybrid: 0.72, offshore: 0.45 },
        license: {
            saas: { base: 15000, perModule: 8000, label: "Monthly SaaS" },
            onprem: { base: 250000, perModule: 75000, label: "Perpetual License" },
            hybrid: { base: 20000, perModule: 10000, label: "Hybrid Cloud Monthly" }
        }
    },

    // ----------------------------------------------------------
    // TIMELINE PHASES
    // ----------------------------------------------------------
    phases: {
        agency: [
            {
                name: "Phase 1 — Foundation",
                duration: "Months 1-3",
                color: "#3b82f6",
                deliverables: [
                    { name: "Current State Assessment", description: "Document existing FP&A processes, systems, pain points, and data flows", howTo: "Conduct stakeholder interviews (CFO, Controllers, FP&A leads), process mining workshops, system inventory audit. Produce process maps, gap analysis, and maturity assessment.", weeks: 3 },
                    { name: "Data Architecture Design", description: "Design unified data model, source-to-target mappings, integration architecture", howTo: "Map all source systems, define conformed dimensions (clients, entities, accounts), design star/snowflake schema in warehouse. Peer review with data governance team.", weeks: 3 },
                    { name: "ETL Pipeline Development", description: "Build core data pipelines from ERP, billing, and CRM systems", howTo: "Configure Fivetran connectors for source extraction, build dbt transformation models, implement data quality checks with Great Expectations. Deploy to staging environment.", weeks: 4 },
                    { name: "BvA Reporting MVP", description: "Deploy automated budget vs actual dashboards at consolidated level", howTo: "Build Tableau/Power BI dashboards connected to warehouse, implement variance calculation logic in dbt, configure automated refresh schedules. UAT with finance team.", weeks: 3 }
                ]
            },
            {
                name: "Phase 2 — Core Analytics",
                duration: "Months 4-6",
                color: "#8b5cf6",
                deliverables: [
                    { name: "Revenue Forecast Model", description: "Deploy ML-based revenue forecasting with pipeline integration", howTo: "Train Prophet/custom models on 3+ years of historical revenue data. Integrate CRM pipeline as leading indicator. Build backtesting framework to validate accuracy. Deploy to production with automated retraining.", weeks: 4 },
                    { name: "Client Profitability Engine", description: "Implement activity-based costing and real-time margin tracking", howTo: "Define cost allocation methodology with FP&A team. Build allocation rules engine (direct costs, time-based, revenue-based). Create client P&L data model. Deploy margin dashboards with alerting.", weeks: 4 },
                    { name: "Resource Utilization Module", description: "Build utilization tracking and demand forecasting capabilities", howTo: "Integrate time tracking system data. Build utilization calculations by role/team/office. Develop demand forecast model tied to pipeline. Create capacity planning dashboards.", weeks: 3 },
                    { name: "Cash Flow Automation", description: "Deploy 13-week cash flow forecast with AR/AP integration", howTo: "Build cash flow model incorporating billing schedules, payment terms, and historical patterns. Integrate AR aging data. Implement automated collection alerts. Validate against actual cash positions.", weeks: 3 }
                ]
            },
            {
                name: "Phase 3 — Advanced Capabilities",
                duration: "Months 7-9",
                color: "#ec4899",
                deliverables: [
                    { name: "Multi-Entity Consolidation", description: "Automate IC eliminations, currency translation, and group consolidation", howTo: "Map intercompany transaction flows. Build IC matching engine with tolerance rules. Implement multi-currency translation using live rate feeds. Create consolidation hierarchy and elimination rules. Test against prior period actuals.", weeks: 4 },
                    { name: "Scenario Planning Platform", description: "Deploy driver-based models with Monte Carlo simulation", howTo: "Identify key business drivers with executive team. Build driver-based financial model in Anaplan/Pigment. Implement Monte Carlo simulation engine. Create scenario library (M&A, market downturn, growth). Build board-ready output templates.", weeks: 4 },
                    { name: "AI Narrative Generation", description: "Implement automated commentary and variance explanations", howTo: "Fine-tune LLM on financial commentary patterns. Build variance-to-narrative pipeline. Implement quality checks and human-in-the-loop review. Deploy for monthly management reporting.", weeks: 3 },
                    { name: "UAT & Hypercare", description: "Full system testing, training, and production go-live", howTo: "Execute comprehensive test plan covering all modules. Run parallel processing vs legacy for one full close cycle. Conduct role-based training for all users. Establish hypercare support model for first 3 months post-launch.", weeks: 3 }
                ]
            }
        ],
        publisher: [
            {
                name: "Phase 1 — Foundation",
                duration: "Months 1-3",
                color: "#3b82f6",
                deliverables: [
                    { name: "Current State Assessment", description: "Audit existing revenue ops, ad tech stack, and financial processes", howTo: "Interview Revenue Ops, Ad Ops, FP&A, and Subscription teams. Map data flows from ad server to GL. Document monetization strategies per platform. Identify integration gaps and data quality issues.", weeks: 3 },
                    { name: "Data Architecture Design", description: "Design unified revenue data model spanning ad, subscription, and content", howTo: "Map all ad tech and subscription platform data models. Design unified revenue taxonomy (impressions → revenue). Build conformed dimension model for audience, content, and advertiser. Establish real-time pipeline architecture.", weeks: 3 },
                    { name: "ETL Pipeline Development", description: "Build data pipelines from ad server, SSPs, subscription platform, and CMS", howTo: "Configure API connectors for GAM, SSP reporting APIs, subscription platform. Build real-time ingestion for programmatic data via Kafka. Transform and standardize in dbt. Implement data freshness monitoring.", weeks: 5 },
                    { name: "Cross-Platform Revenue Dashboard", description: "Deploy unified revenue view across all platforms and streams", howTo: "Build Looker/Tableau dashboards showing revenue by platform, stream, and format. Implement daily automated reconciliation checks. Create drill-down from consolidated to platform-level. UAT with Revenue Ops team.", weeks: 3 }
                ]
            },
            {
                name: "Phase 2 — Revenue Intelligence",
                duration: "Months 4-7",
                color: "#8b5cf6",
                deliverables: [
                    { name: "Ad Revenue Forecast Model", description: "Deploy ML-based ad revenue forecasting with pacing dashboards", howTo: "Train models on historical impression, fill rate, and CPM data. Incorporate seasonality, market indices, and pipeline data. Build pacing dashboards comparing forecast to actual in real-time. Implement automated alerting for pacing variances.", weeks: 5 },
                    { name: "Yield Optimization Engine", description: "Build dynamic floor pricing and demand partner optimization", howTo: "Develop ML models for optimal floor pricing per placement/geo/device. Build A/B testing framework for price optimization. Create demand partner evaluation scorecard. Integrate yield signals into revenue forecast.", weeks: 4 },
                    { name: "Subscription Analytics Module", description: "Deploy cohort analysis, churn prediction, and LTV modeling", howTo: "Build subscriber cohort tracking infrastructure. Train churn prediction model on behavioral + payment data. Implement LTV calculation engine with discount rate methodology. Create subscription health dashboards with intervention triggers.", weeks: 4 },
                    { name: "Content ROI Engine", description: "Link content production costs to monetization outcomes", howTo: "Integrate CMS content metadata with production cost data. Build attribution model mapping content to ad + sub revenue. Create content P&L dashboards. Implement content investment scoring for editorial planning.", weeks: 4 }
                ]
            },
            {
                name: "Phase 3 — Strategic Capabilities",
                duration: "Months 8-10",
                color: "#ec4899",
                deliverables: [
                    { name: "Audience Value Platform", description: "Unified audience monetization analytics with segment-level insights", howTo: "Integrate first-party data from CDP with revenue data from all streams. Build audience value scoring model. Create segment-level ARPU dashboards. Implement monetization mix optimizer. Connect to clean room for privacy-safe enrichment.", weeks: 4 },
                    { name: "Advertiser Health & Churn", description: "Deploy ML-based advertiser health scoring and retention system", howTo: "Build advertiser health score using spend trends, engagement, and contract data. Train churn prediction model with 90-day horizon. Create automated alert and retention playbook system. Integrate with CRM for sales team action.", weeks: 3 },
                    { name: "Scenario Planning Platform", description: "Driver-based planning with market scenario modeling", howTo: "Build models linking audience growth, ad market conditions, and sub trends to financials. Create scenario library for privacy regulation, AI disruption, market changes. Implement continuous planning with monthly automated reforecast.", weeks: 4 },
                    { name: "UAT & Hypercare", description: "Full system testing, parallel run, training, and production launch", howTo: "Execute end-to-end testing across all modules. Run parallel processing alongside existing tools for one full month. Role-based training for Ad Ops, Rev Ops, FP&A, and Executive users. 90-day hypercare with dedicated support team.", weeks: 3 }
                ]
            }
        ]
    },

    // ----------------------------------------------------------
    // PRESET CONFIGURATIONS
    // ----------------------------------------------------------
    presets: {
        mvp: { modules: [0, 1, 2], teamSize: "small", duration: 6, label: "MVP — Core FP&A" },
        standard: { modules: [0, 1, 2, 3, 4, 5, 6], teamSize: "medium", duration: 9, label: "Standard — Full Suite" },
        enterprise: { modules: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], teamSize: "large", duration: 12, label: "Enterprise — All Modules" }
    },

    // ----------------------------------------------------------
    // PROPOSAL TEMPLATES
    // ----------------------------------------------------------
    proposalTemplates: {
        agency: {
            executiveSummary: (c) => {
                const complexityIntro = c.complexity === 'high'
                    ? `The scope and ambition of this transformation reflect the reality that ${c.industryLabel} organizations operating at scale require a fundamentally different approach to financial planning and analysis. The current landscape — characterized by fragmented data sources, manual consolidation processes, and reactive reporting cycles — represents not merely an operational inefficiency but a strategic constraint on the organization's ability to compete, grow, and deliver value to clients.`
                    : c.complexity === 'medium'
                        ? `This engagement addresses a critical inflection point for ${c.industryLabel} finance operations. As client portfolios grow in complexity and stakeholder expectations for real-time financial visibility intensify, the limitations of legacy FP&A processes become increasingly untenable. The proposed solution delivers targeted automation and analytical capabilities that will fundamentally reshape how the finance organization operates.`
                        : `This focused engagement delivers high-impact FP&A automation for ${c.industryLabel} operations, targeting the specific pain points that constrain financial visibility and operational efficiency. By concentrating on the highest-value capabilities first, the organization can realize meaningful returns quickly while establishing the foundation for future expansion.`;

                const moduleNarrative = c.moduleCount > 6
                    ? `The proposed solution encompasses ${c.moduleCount} integrated modules — ${c.moduleNames.join(', ')} — forming a comprehensive FP&A transformation platform. This breadth of scope ensures that improvements in one area (e.g., revenue forecasting) cascade through connected capabilities (e.g., scenario planning, management reporting), creating a multiplier effect on the overall value delivered.`
                    : c.moduleCount > 3
                        ? `The engagement delivers ${c.moduleCount} carefully selected modules — ${c.moduleNames.join(', ')} — chosen to address the most impactful opportunities for automation and analytical advancement. Each module is designed to deliver standalone value while contributing to an integrated analytical ecosystem.`
                        : `The engagement focuses on ${c.moduleCount} foundational modules — ${c.moduleNames.join(', ')} — representing the highest-priority capabilities for immediate impact. This targeted approach ensures rapid time-to-value while establishing the technical and organizational foundation for future capability expansion.`;

                const closingParagraph = `Our delivery methodology, refined through dozens of similar ${c.industryLabel} engagements, emphasizes rapid value realization through phased implementation, rigorous change management, and deep domain expertise in ${c.industryLabel} financial operations. The ${c.headcount}-person delivery team brings specialized skills spanning data engineering, machine learning, FP&A domain knowledge, and organizational change management — the precise combination required to ensure that technical excellence translates into sustained business adoption.`;

                const roiClose = `The financial case for this investment is compelling: a projected ${c.roiPercent} return on investment with a ${c.paybackMonths}-month payback period, driven by ${c.fteHoursSaved}+ hours of annual FP&A capacity freed through automation and an estimated ${c.annualSavings} in annual efficiency gains. Beyond the quantifiable returns, the transformation positions the finance organization as a strategic partner to the business — delivering forward-looking insights rather than backward-looking reports.`;

                return `${complexityIntro}\n\n${moduleNarrative}\n\n${closingParagraph}\n\n${roiClose}`;
            },

            scopeNarrative: (c) => {
                const intro = `The proposed scope encompasses ${c.moduleCount} integrated delivery modules, each designed to address a specific dimension of ${c.industryLabel} FP&A operations while contributing to a unified analytical platform. The modules selected — ${c.moduleNames.join(', ')} — represent a deliberate sequencing that prioritizes foundational data capabilities before layering advanced analytics and planning tools.`;

                const dataFoundation = `At the core of the solution lies a robust data foundation that unifies data from across the ${c.industryLabel}'s technology ecosystem — ERP, time and billing, CRM, project management, HRIS, and media buying systems — into a single, governed data warehouse. This foundational layer eliminates the manual data gathering and reconciliation that currently consumes a disproportionate share of FP&A team capacity, while establishing the data quality and freshness standards required for trustworthy automated reporting.`;

                const analyticsLayer = c.moduleCount > 3
                    ? `Building upon this foundation, the analytical modules deliver capabilities spanning revenue forecasting, profitability analysis, resource optimization, and management reporting. Each module leverages the unified data layer to produce insights that were previously impossible when data remained siloed across disconnected systems and spreadsheets. Machine learning models, where deployed, are trained on the organization's own historical data and continuously refined to improve accuracy over time.`
                    : `The analytical capabilities built upon this foundation are specifically designed to address the highest-priority pain points identified during the scoping process. Each module leverages the unified data layer to deliver automated, trustworthy outputs that replace manual processes and enable the FP&A team to shift from data gathering to strategic analysis.`;

                const deliveryModel = `All modules will be delivered using a ${c.deliveryModel} resourcing model with a ${c.teamSizeLabel} team of ${c.headcount} professionals over a ${c.duration}-month engagement timeline. The phased delivery approach ensures that foundational capabilities are validated and adopted before more advanced modules are introduced, reducing implementation risk and accelerating time-to-value.`;

                return `${intro}\n\n${dataFoundation}\n\n${analyticsLayer}\n\n${deliveryModel}`;
            },

            approachNarrative: (c) => {
                const intro = `Our implementation methodology follows a proven three-phase approach refined through extensive experience delivering FP&A transformation programs for ${c.industryLabel} organizations. This approach balances the need for rapid value delivery against the imperative of building robust, sustainable capabilities that will serve the organization for years to come.`;

                const phase1 = `Phase 1 — Foundation (Months 1-3) focuses on establishing the data infrastructure and core reporting capabilities. This phase begins with a comprehensive current-state assessment that documents existing processes, data flows, and pain points, followed by the design and implementation of the unified data architecture. By the end of Phase 1, the organization will have automated data pipelines replacing manual data gathering, a governed data warehouse serving as the single source of truth, and initial management reporting dashboards delivering real-time financial visibility.`;

                const phase2 = c.duration > 6
                    ? `Phase 2 — Core Analytics (Months 4-${Math.min(c.duration - 2, 7)}) layers advanced analytical capabilities onto the data foundation. This phase delivers the revenue forecasting engine, profitability analytics, and operational planning modules that transform the FP&A function from reactive reporting to proactive business partnering. Machine learning models are trained, backtested, and validated against historical data before deployment, ensuring confidence in automated outputs from day one.`
                    : `Phase 2 — Analytics & Delivery (Months 4-${c.duration - 1}) builds the core analytical capabilities on the established data foundation, with each module progressing through design, build, test, and deploy stages within focused sprint cycles.`;

                const phase3 = c.duration > 6
                    ? `Phase 3 — Advanced Capabilities & Go-Live (Months ${Math.min(c.duration - 2, 7) + 1}-${c.duration}) delivers the remaining advanced modules and ensures full organizational adoption. This phase includes comprehensive user acceptance testing, parallel processing against legacy methods, role-based training, and the establishment of a hypercare support model. The goal is not merely technical deployment but sustained operational adoption that delivers the projected ROI.`
                    : `The final weeks of the engagement are dedicated to user acceptance testing, training, and hypercare support to ensure sustained adoption and value realization.`;

                const changeManagement = `Throughout all phases, a dedicated change management workstream operates in parallel to the technical delivery. This workstream encompasses stakeholder alignment, communication planning, training curriculum development, and adoption tracking — recognizing that the most sophisticated technology delivers zero value if the organization does not embrace and sustain the new ways of working.`;

                return `${intro}\n\n${phase1}\n\n${phase2}\n\n${phase3}\n\n${changeManagement}`;
            },

            investmentNarrative: (c) => {
                const intro = `The total investment for this ${c.duration}-month engagement is ${c.totalCost}, structured across four investment categories that reflect the comprehensive nature of an enterprise FP&A transformation. This investment profile is consistent with market benchmarks for ${c.industryLabel} organizations undertaking similar transformations and has been calibrated to the specific scope, complexity, and timeline of this engagement.`;

                const breakdown = `Implementation services represent ${c.implCost} of the total investment, encompassing the ${c.headcount}-person delivery team across the ${c.duration}-month engagement. Technology platform costs of ${c.techCost} cover the cloud infrastructure, data platform licensing, visualization tools, and ML/AI services required to power the solution. Change management and training investment of ${c.changeCost} ensures organizational readiness and sustained adoption. Post-go-live support of ${c.supportCost} provides a safety net during the critical transition period.`;

                const value = `It is important to contextualize this investment against the value it unlocks. At a projected ${c.roiPercent} ROI and ${c.paybackMonths}-month payback period, the engagement generates ${c.annualSavings} in annual recurring value through efficiency gains, improved decision-making, and reduced operational risk. The ${c.fteHoursSaved}+ hours of annual FP&A capacity freed through automation represent not merely a cost reduction but a strategic reallocation — enabling your most talented finance professionals to focus on analysis and business partnering rather than data wrangling and manual reporting.`;

                const flexibility = `The investment structure supports flexible payment terms aligned to delivery milestones, ensuring that fees are tied to demonstrated progress and value delivery. We are committed to a partnership model where our financial incentives are aligned with your transformation outcomes.`;

                return `${intro}\n\n${breakdown}\n\n${value}\n\n${flexibility}`;
            },

            roiNarrative: (c) => {
                const intro = `The business case for this FP&A transformation is grounded in both quantifiable efficiency gains and strategic value creation that, while harder to measure precisely, often represents the more significant long-term impact. Our ROI methodology draws on benchmarks from comparable ${c.industryLabel} transformations and has been validated against the specific operational context of this engagement.`;

                const quantitative = `On the quantitative side, the projected ${c.roiPercent} return on investment is driven by three primary value levers. First, the automation of manual data gathering, reconciliation, and reporting processes frees an estimated ${c.fteHoursSaved}+ hours of annual FP&A capacity — equivalent to significant headcount that can be redeployed to higher-value analytical work. Second, improved forecast accuracy and real-time financial visibility enable faster, better-informed decisions that directly impact revenue realization and cost management. Third, the reduction of close cycle time and elimination of manual errors reduce operational risk and compliance exposure.`;

                const payback = `The ${c.paybackMonths}-month payback period reflects the phased delivery approach, where foundational modules begin generating value within the first quarter while more advanced capabilities compound returns over subsequent phases. By month ${c.paybackMonths}, the cumulative value generated exceeds the total investment, with annual recurring benefits of approximately ${c.annualSavings} continuing to accrue in perpetuity.`;

                const strategic = `Beyond the quantifiable returns, this transformation delivers strategic value that compounds over time: the ability to provide confident revenue guidance to stakeholders, real-time client profitability visibility that informs pricing and portfolio decisions, and a finance organization that operates as a genuine strategic partner to the business. In our experience with ${c.industryLabel} organizations, these strategic benefits ultimately dwarf the operational efficiency gains — but they require the operational foundation this engagement delivers.`;

                return `${intro}\n\n${quantitative}\n\n${payback}\n\n${strategic}`;
            }
        },

        publisher: {
            executiveSummary: (c) => {
                const complexityIntro = c.complexity === 'high'
                    ? `The digital publishing landscape demands a fundamentally reimagined approach to financial planning and analysis. With revenue streams spanning programmatic advertising, direct-sold campaigns, subscriptions, and content licensing — each governed by distinct market dynamics and data ecosystems — ${c.industryLabel} organizations face an FP&A challenge of extraordinary complexity. The current reliance on disconnected systems, manual reconciliation, and backward-looking reporting creates a strategic blind spot that this transformation is designed to eliminate.`
                    : c.complexity === 'medium'
                        ? `This engagement targets the critical intersection of revenue operations and financial planning for ${c.industryLabel} organizations. As digital revenue models grow in complexity — spanning programmatic, direct-sold, subscription, and content monetization — the limitations of legacy FP&A processes become a meaningful constraint on growth and decision-making agility. The proposed solution delivers targeted automation and intelligence that will transform how the finance and revenue operations teams collaborate and plan.`
                        : `This focused engagement delivers high-impact FP&A automation for ${c.industryLabel} revenue operations, concentrating on the specific capabilities that will drive the greatest immediate value. By targeting the highest-priority pain points first, the organization can achieve rapid returns while building the data and analytical foundation for future expansion.`;

                const moduleNarrative = c.moduleCount > 6
                    ? `The proposed solution encompasses ${c.moduleCount} integrated modules — ${c.moduleNames.join(', ')} — forming a comprehensive revenue intelligence platform that spans the full spectrum of ${c.industryLabel} financial operations. This end-to-end approach ensures that insights from yield optimization flow into revenue forecasts, subscriber analytics inform strategic planning, and content ROI data shapes editorial investment decisions — creating an integrated intelligence layer that was previously impossible with siloed tools and manual processes.`
                    : c.moduleCount > 3
                        ? `The engagement delivers ${c.moduleCount} strategically selected modules — ${c.moduleNames.join(', ')} — each targeting a critical dimension of ${c.industryLabel} revenue intelligence. The modules are designed to function independently while contributing to an integrated analytical ecosystem that grows more powerful as additional capabilities are deployed.`
                        : `The engagement focuses on ${c.moduleCount} foundational modules — ${c.moduleNames.join(', ')} — representing the highest-impact opportunities for immediate value creation. This targeted scope enables rapid delivery while establishing the technical and organizational foundation for a broader transformation.`;

                const closingParagraph = `Our delivery approach leverages deep domain expertise in ${c.industryLabel} revenue operations, ad technology, and financial planning — a rare combination that is essential for bridging the gap between the technical complexity of digital revenue systems and the financial rigor required for accurate forecasting and reporting. The ${c.headcount}-person team has been structured to deliver across the full technology and business stack, from real-time data pipelines to executive-ready dashboards.`;

                const roiClose = `The projected ${c.roiPercent} return on investment, with a ${c.paybackMonths}-month payback period, reflects both the direct efficiency gains — ${c.fteHoursSaved}+ hours of annual capacity freed — and the revenue uplift potential from improved yield optimization, reduced churn, and better-informed strategic decisions. The estimated ${c.annualSavings} in annual value creation positions this investment as one of the highest-returning capital allocation decisions available to the organization.`;

                return `${complexityIntro}\n\n${moduleNarrative}\n\n${closingParagraph}\n\n${roiClose}`;
            },

            scopeNarrative: (c) => {
                const intro = `The proposed scope encompasses ${c.moduleCount} delivery modules designed specifically for the unique data architecture and revenue model complexity of ${c.industryLabel} organizations. The selected modules — ${c.moduleNames.join(', ')} — address the full lifecycle from raw data ingestion through to executive-ready insights and strategic planning capabilities.`;

                const dataFoundation = `The engagement begins with a comprehensive data foundation that unifies the fragmented ${c.industryLabel} technology ecosystem — ad servers, SSPs, DMPs/CDPs, content management systems, subscription platforms, and the ERP — into a single, governed analytical platform. This includes both batch and real-time data pipelines, recognizing that programmatic revenue operations demand sub-minute data latency while financial reporting requires daily or monthly precision. The unified revenue taxonomy established in this phase becomes the Rosetta Stone that translates ad tech metrics into financial language.`;

                const analyticsLayer = c.moduleCount > 3
                    ? `The analytical modules build upon this foundation to deliver capabilities spanning revenue forecasting, yield optimization, subscriber analytics, content ROI measurement, and audience monetization intelligence. Each module is purpose-built for the ${c.industryLabel} context — for example, the revenue forecast engine accounts for the unique characteristics of programmatic revenue (fill rate volatility, seasonal CPM patterns, demand partner concentration) alongside the more predictable dynamics of subscription revenue (cohort behavior, churn patterns, promotional impacts).`
                    : `The analytical capabilities are specifically architected for ${c.industryLabel} revenue models, accounting for the unique characteristics of multi-stream digital revenue — programmatic volatility, subscription cohort dynamics, and content monetization patterns that traditional FP&A tools are not equipped to handle.`;

                const deliveryModel = `The ${c.teamSizeLabel} team of ${c.headcount} professionals will deliver across a ${c.duration}-month timeline using a ${c.deliveryModel} resourcing model. The phased approach ensures that the data foundation is validated and operational before advanced analytical modules are deployed, reducing risk and enabling early wins that build organizational momentum for the broader transformation.`;

                return `${intro}\n\n${dataFoundation}\n\n${analyticsLayer}\n\n${deliveryModel}`;
            },

            approachNarrative: (c) => {
                const intro = `Our implementation methodology is specifically adapted for ${c.industryLabel} FP&A transformations, reflecting the unique challenges of unifying ad tech data ecosystems with financial reporting requirements. The three-phase approach balances the urgency of real-time revenue visibility against the necessity of building a robust, scalable analytical platform.`;

                const phase1 = `Phase 1 — Foundation (Months 1-3) establishes the unified data infrastructure that underpins all subsequent capabilities. This phase begins with a thorough assessment of the existing revenue operations technology stack, data flows, and financial processes, followed by the design and implementation of the unified revenue data model. A critical deliverable in this phase is the real-time data pipeline for programmatic revenue data, which enables the pacing visibility and yield monitoring that revenue operations teams require. By the end of Phase 1, the organization will have a cross-platform revenue dashboard providing the first-ever unified view of all revenue streams in a single interface.`;

                const phase2 = c.duration > 6
                    ? `Phase 2 — Revenue Intelligence (Months 4-${Math.min(c.duration - 2, 7)}) delivers the advanced analytical capabilities that transform raw data into actionable intelligence. The ad revenue forecast engine, yield optimization module, subscription analytics, and content ROI capabilities are deployed in coordinated sprints that allow for cross-module integration and feedback loops. Machine learning models are trained on the organization's historical data, backtested rigorously, and deployed with human-in-the-loop validation to build confidence before full automation.`
                    : `Phase 2 — Analytics & Delivery (Months 4-${c.duration - 1}) deploys the core analytical modules with each capability progressing through focused design-build-test-deploy cycles that leverage the data foundation established in Phase 1.`;

                const phase3 = c.duration > 6
                    ? `Phase 3 — Strategic Capabilities & Go-Live (Months ${Math.min(c.duration - 2, 7) + 1}-${c.duration}) extends the platform with advanced capabilities including audience monetization analytics, advertiser churn prediction, and scenario planning tools. This phase culminates in comprehensive user acceptance testing, parallel processing validation, and role-based training for Ad Ops, Revenue Ops, FP&A, and executive stakeholders. A 90-day hypercare period ensures sustained adoption and rapid resolution of any post-launch issues.`
                    : `The final phase encompasses user acceptance testing, parallel validation against existing tools, and comprehensive training to ensure the organization is fully equipped to operate and evolve the new capabilities independently.`;

                const changeManagement = `A dedicated change management workstream runs throughout the engagement, recognizing that ${c.industryLabel} FP&A transformations require alignment across traditionally siloed teams — Ad Ops, Revenue Ops, Finance, and Editorial. The change program encompasses stakeholder alignment, cross-functional workflow design, training delivery, and adoption measurement to ensure the technology investment translates into sustained operational improvement.`;

                return `${intro}\n\n${phase1}\n\n${phase2}\n\n${phase3}\n\n${changeManagement}`;
            },

            investmentNarrative: (c) => {
                const intro = `The total investment for this ${c.duration}-month ${c.industryLabel} FP&A transformation is ${c.totalCost}, reflecting the scope, complexity, and strategic importance of unifying a multi-stream digital revenue operation into a cohesive analytical platform. This investment level is consistent with comparable ${c.industryLabel} transformations and has been calibrated to deliver maximum impact within the defined timeline and scope.`;

                const breakdown = `The investment is structured across four categories. Implementation services of ${c.implCost} cover the ${c.headcount}-person delivery team combining data engineering, machine learning, ad tech domain, and FP&A expertise. Technology platform costs of ${c.techCost} encompass cloud infrastructure, real-time streaming services, data warehouse, visualization tools, and ML/AI platforms — with architecture designed for the scale of impression-level data processing that ${c.industryLabel} operations demand. Change management investment of ${c.changeCost} funds the cross-functional alignment and training program critical for adoption across Ad Ops, Revenue Ops, and Finance teams. Post-go-live support of ${c.supportCost} ensures stability during the transition period.`;

                const value = `The projected returns significantly outweigh the investment. At ${c.roiPercent} ROI with a ${c.paybackMonths}-month payback period, the engagement delivers ${c.annualSavings} in annual recurring value. The ${c.fteHoursSaved}+ hours of freed capacity allow revenue operations and finance teams to shift from data reconciliation to revenue optimization — a reallocation that, in our experience with ${c.industryLabel} clients, generates returns that far exceed the direct efficiency savings.`;

                const flexibility = `Investment milestones are aligned to delivery phases, ensuring that payments correspond to demonstrated progress and validated capabilities. This milestone-based approach reflects our commitment to a partnership model where value delivery — not simply activity completion — drives the engagement economics.`;

                return `${intro}\n\n${breakdown}\n\n${value}\n\n${flexibility}`;
            },

            roiNarrative: (c) => {
                const intro = `The return on investment for this ${c.industryLabel} FP&A transformation is projected at ${c.roiPercent}, driven by a combination of direct operational efficiencies, revenue uplift from improved yield management, and strategic value from enhanced decision-making capabilities. This projection is grounded in benchmarks from comparable ${c.industryLabel} transformations and has been conservatively calibrated to the specific scope of this engagement.`;

                const quantitative = `The quantitative value case rests on three pillars. First, automation of manual data gathering, reconciliation, and reporting across ${c.moduleCount} functional areas liberates an estimated ${c.fteHoursSaved}+ hours of annual capacity from revenue operations and FP&A teams. Second, yield optimization capabilities — including dynamic floor pricing and demand partner evaluation — are projected to increase eCPM by 10-15%, representing a direct revenue uplift with no incremental traffic required. Third, improved forecast accuracy reduces the financial planning variance that leads to sub-optimal inventory pricing, missed revenue targets, and misallocated resources.`;

                const payback = `The ${c.paybackMonths}-month payback timeline reflects the phased value realization inherent in the delivery approach. Early wins from the data foundation and reporting automation begin generating returns within the first quarter, while more advanced capabilities — yield optimization, churn prediction, scenario planning — compound the value in subsequent phases. Annual recurring benefits of ${c.annualSavings} continue to accrue and grow as the platform matures and additional use cases are deployed.`;

                const strategic = `The strategic dimension of the ROI — while less precisely quantifiable — is arguably more significant for ${c.industryLabel} organizations navigating a period of unprecedented industry disruption. The ability to model the financial impact of privacy regulation changes, simulate AI-driven content disruption scenarios, and provide confident investor guidance in a volatile ad market represents a qualitative transformation in organizational capability that defies simple ROI calculation but fundamentally strengthens competitive positioning and stakeholder confidence.`;

                return `${intro}\n\n${quantitative}\n\n${payback}\n\n${strategic}`;
            }
        }
    }
};
