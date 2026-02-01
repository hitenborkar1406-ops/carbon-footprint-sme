// Solution-specific execution plans for ROI calculations

export const EXECUTION_PLANS = {
    led: {
        id: 'led',
        name: 'LED Retrofit',
        icon: 'ri-lightbulb-flash-line',
        summary: 'Achievable through systematic fixture replacement and immediate electricity savings',

        executionSteps: [
            {
                step: 1,
                title: 'Energy Audit',
                description: 'Conduct comprehensive audit of all lighting fixtures',
                timeline: 'Week 1-2',
                cost: '₹5,000',
                outcome: 'Complete fixture inventory with current wattage consumption'
            },
            {
                step: 2,
                title: 'Calculate Savings Potential',
                description: 'Analyze energy consumption patterns and identify high-impact fixtures',
                timeline: 'Week 2',
                cost: '₹0',
                outcome: 'Detailed savings projection per fixture'
            },
            {
                step: 3,
                title: 'Procure LED Fixtures',
                description: 'Source quality LED fixtures with 60% wattage reduction',
                timeline: 'Week 3-4',
                cost: 'Investment Amount',
                outcome: 'LED fixtures ready for installation'
            },
            {
                step: 4,
                title: 'Install & Replace',
                description: 'Systematic replacement of existing fixtures with LEDs',
                timeline: 'Month 2',
                cost: '₹10,000 (labor)',
                outcome: 'All fixtures operational with reduced wattage'
            },
            {
                step: 5,
                title: 'Monitor & Verify',
                description: 'Track electricity consumption and verify savings',
                timeline: 'Month 3+',
                cost: '₹0',
                outcome: 'Monthly savings accumulation begins'
            }
        ],

        timeline: [
            { month: 'Month 1', activity: 'Audit & Procurement', savings: 0, cumulative: 0 },
            { month: 'Month 2', activity: 'Installation', savings: 0, cumulative: 0 },
            { month: 'Month 3', activity: 'Savings Start', savings: 'Monthly Savings', cumulative: 'Monthly Savings' },
            { month: 'Month 4', activity: 'Accumulation', savings: 'Monthly Savings', cumulative: '2x Monthly Savings' },
            { month: 'Month 5+', activity: 'ROI Recovery', savings: 'Monthly Savings', cumulative: 'Continues until breakeven' },
        ],

        assumptions: [
            'Operating hours: 8 hours/day, 20 days/month',
            'Electricity rate: ₹8 per kWh',
            'LED wattage reduction: 60% compared to current fixtures',
            'LED lifespan: 50,000 hours (5+ years)',
            'No fixture failures during warranty period',
        ],

        accelerators: [
            'Higher operating hours → Faster ROI',
            'Rising electricity rates → Better savings',
            'Bulk procurement discounts → Lower investment',
        ],

        risks: [
            {
                risk: 'Installation Delays',
                impact: 'ROI timeline extends',
                mitigation: 'Pre-schedule installation teams; use in-house electricians'
            },
            {
                risk: 'Usage Pattern Changes',
                impact: 'Savings lower than projected',
                mitigation: 'Monitor consumption monthly; adjust projections'
            },
            {
                risk: 'Electricity Rate Changes',
                impact: 'Savings calculation variance',
                mitigation: 'Use conservative estimates; track rates quarterly'
            },
            {
                risk: 'LED Quality Issues',
                impact: 'Replacement costs',
                mitigation: 'Source from certified vendors with 2+ year warranty'
            }
        ]
    },

    route: {
        id: 'route',
        name: 'Route Optimization',
        icon: 'ri-road-map-line',
        summary: 'Fast ROI through AI-powered route efficiency and immediate fuel savings',

        executionSteps: [
            {
                step: 1,
                title: 'Platform Subscription',
                description: 'Subscribe to AI route optimization platform',
                timeline: 'Week 1',
                cost: 'Monthly Subscription',
                outcome: 'Access to route planning dashboard'
            },
            {
                step: 2,
                title: 'Route Data Import',
                description: 'Upload current route data, vehicle info, and delivery schedules',
                timeline: 'Week 1',
                cost: '₹0',
                outcome: 'All routes mapped in system'
            },
            {
                step: 3,
                title: 'AI Analysis & Optimization',
                description: 'Platform analyzes routes and generates optimized alternatives',
                timeline: 'Week 2',
                cost: '₹0',
                outcome: '30% average mileage reduction projected'
            },
            {
                step: 4,
                title: 'Implement Optimized Routes',
                description: 'Roll out new routes to drivers with training',
                timeline: 'Week 3-4',
                cost: '₹5,000 (training)',
                outcome: 'All drivers following optimized routes'
            },
            {
                step: 5,
                title: 'Monitor & Refine',
                description: 'Track actual savings and continuously optimize',
                timeline: 'Month 2+',
                cost: '₹0',
                outcome: 'Monthly fuel and time savings realized'
            }
        ],

        timeline: [
            { month: 'Week 1', activity: 'Setup & Import', savings: 0, cumulative: 0 },
            { month: 'Week 2-4', activity: 'Optimization', savings: 'Partial Savings', cumulative: '50% Monthly Savings' },
            { month: 'Month 2', activity: 'Full Implementation', savings: 'Monthly Savings', cumulative: '1.5x Monthly Savings' },
            { month: 'Month 3+', activity: 'ROI Recovery', savings: 'Monthly Savings', cumulative: 'Continues until breakeven' },
        ],

        assumptions: [
            'Baseline mileage: 1,000 km/month per vehicle',
            'Fuel efficiency: 10 km/L',
            'Fuel cost: ₹100 per liter',
            'Mileage reduction: 30% via optimized routes',
            'Driver adherence rate: 90%',
            'Monthly subscription: Investment amount',
        ],

        accelerators: [
            'Higher baseline mileage → Greater savings',
            'Rising fuel prices → Faster ROI',
            'Fleet size increase → Better cost-per-vehicle ratio',
        ],

        risks: [
            {
                risk: 'Driver Non-Adherence',
                impact: 'Savings not realized',
                mitigation: 'Track GPS; implement incentive program for route adherence'
            },
            {
                risk: 'Unexpected Route Changes',
                impact: 'Optimization less effective',
                mitigation: 'Real-time route adjustment; dynamic re-optimization'
            },
            {
                risk: 'Fuel Price Volatility',
                impact: 'Savings amount fluctuates',
                mitigation: 'Calculate savings in liters, not currency; hedge costs'
            },
            {
                risk: 'Platform Downtime',
                impact: 'Temporary loss of optimization',
                mitigation: 'Export route data locally; use fallback routes'
            }
        ]
    },

    virtual: {
        id: 'virtual',
        name: 'Virtual Policy',
        icon: 'ri-vidicon-line',
        summary: 'Immediate ROI through zero-cost virtual meetings replacing physical travel',

        executionSteps: [
            {
                step: 1,
                title: 'Define Virtual-First Policy',
                description: 'Establish clear guidelines for when virtual meetings are mandatory',
                timeline: 'Week 1',
                cost: '₹0',
                outcome: 'Written policy with approval criteria for travel'
            },
            {
                step: 2,
                title: 'Team Training',
                description: 'Train all employees on Zoom/Teams best practices',
                timeline: 'Week 1-2',
                cost: '₹3,000',
                outcome: 'Team confident in virtual collaboration'
            },
            {
                step: 3,
                title: 'Platform Setup',
                description: 'Ensure all employees have Zoom/Teams access',
                timeline: 'Week 1',
                cost: '₹0 (using free tier or existing subscriptions)',
                outcome: 'All employees onboarded'
            },
            {
                step: 4,
                title: 'Track Travel Reduction',
                description: 'Monitor trip cancellations and replacement with virtual meetings',
                timeline: 'Week 2+',
                cost: '₹0',
                outcome: '80% travel successfully replaced'
            },
            {
                step: 5,
                title: 'Measure Savings',
                description: 'Calculate savings from avoided travel, accommodation, and time',
                timeline: 'Month 1+',
                cost: '₹0',
                outcome: 'Immediate cost savings verification'
            }
        ],

        timeline: [
            { month: 'Week 1', activity: 'Policy & Training', savings: 'Savings Start Immediately', cumulative: 'Partial Savings' },
            { month: 'Week 2-4', activity: 'Full Adoption', savings: 'Monthly Savings', cumulative: 'Monthly Savings' },
            { month: 'Month 2+', activity: 'Continued Savings', savings: 'Monthly Savings', cumulative: 'Accumulates monthly' },
        ],

        assumptions: [
            'Baseline travel: 10 trips per month',
            'Average trip cost: ₹5,000 (transport + accommodation + meals)',
            'Virtual replacement rate: 80% of trips',
            'Meeting effectiveness: 90% compared to in-person',
            'Internet connectivity: Reliable for all participants',
        ],

        accelerators: [
            'Higher baseline travel frequency → Greater savings',
            'Rising travel costs → More attractive savings',
            'Remote work culture → Easier adoption',
        ],

        risks: [
            {
                risk: 'Meeting Effectiveness',
                impact: 'Virtual meetings less productive than in-person',
                mitigation: 'Train on virtual facilitation; use breakout rooms; record for review'
            },
            {
                risk: 'Client Expectations',
                impact: 'Clients prefer face-to-face meetings',
                mitigation: 'Educate clients on benefits; offer hybrid model for key meetings'
            },
            {
                risk: 'Connectivity Issues',
                impact: 'Meetings disrupted by poor internet',
                mitigation: 'Invest in backup connectivity; use mobile hotspots; record sessions'
            },
            {
                risk: 'Team Resistance',
                impact: 'Employees prefer travel',
                mitigation: 'Highlight time savings; show environmental impact; recognize adopters'
            }
        ]
    }
};

export default EXECUTION_PLANS;
