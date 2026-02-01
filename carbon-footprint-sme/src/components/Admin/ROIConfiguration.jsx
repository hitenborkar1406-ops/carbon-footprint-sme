import { useState } from 'react';

const DEFAULT_CONFIG = {
    electricityCost: 0.12, // $/kWh
    fuelCost: 1.50, // $/L
    averageTravelCost: 0.55, // $/km
    roiPeriod: 12, // months
    inflationRate: 2.5, // %
    currency: 'USD',
};

export default function ROIConfiguration() {
    const [config, setConfig] = useState(DEFAULT_CONFIG);
    const [isDirty, setIsDirty] = useState(false);

    const handleChange = (key, value) => {
        setConfig(prev => ({ ...prev, [key]: parseFloat(value) }));
        setIsDirty(true);
    };

    const handleSave = () => {
        // API call to save config would go here
        setIsDirty(false);
        alert('Configuration saved successfully. All ROI calculations will be updated.');
    };

    return (
        <div className="roi-configuration">
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-2" style={{ color: '#1f2937' }}>ROI Configuration</h1>
                <p className="text-sm" style={{ color: '#6b7280' }}>Configure global assumptions for ROI calculations</p>
            </div>

            {/* Critical Warning */}
            <div className="mb-8 p-4 rounded-xl border-l-4 flex items-start gap-4"
                style={{ background: '#fff7ed', borderColor: '#ea580c' }}>
                <i className="ri-alert-fill text-xl" style={{ color: '#ea580c' }} />
                <div>
                    <h3 className="font-bold text-sm mb-1" style={{ color: '#9a3412' }}>Critical System Settings</h3>
                    <p className="text-sm" style={{ color: '#c2410c' }}>
                        These values are used as defaults for all ROI calculations across the platform.
                        Changing these will affect all new and existing cost estimations unless manually overridden by the SME.
                        Please proceed with caution.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Cost Assumptions */}
                <div className="p-6 rounded-xl" style={{ background: '#ffffff', border: '1px solid #e5e7eb' }}>
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2" style={{ color: '#1f2937' }}>
                        <i className="ri-money-dollar-circle-line text-xl" style={{ color: '#2563eb' }} />
                        Cost Assumptions
                    </h3>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
                                Electricity Cost (per kWh)
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={config.electricityCost}
                                    onChange={(e) => handleChange('electricityCost', e.target.value)}
                                    className="w-full pl-8 pr-4 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-blue-500 transition-all font-mono"
                                    style={{ borderColor: '#e5e7eb' }}
                                />
                            </div>
                            <p className="text-xs mt-1" style={{ color: '#6b7280' }}>National average commercial rate</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
                                Fuel Cost (per Liter)
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={config.fuelCost}
                                    onChange={(e) => handleChange('fuelCost', e.target.value)}
                                    className="w-full pl-8 pr-4 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-blue-500 transition-all font-mono"
                                    style={{ borderColor: '#e5e7eb' }}
                                />
                            </div>
                            <p className="text-xs mt-1" style={{ color: '#6b7280' }}>Average diesel/gasoline price</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
                                Business Travel (per km)
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={config.averageTravelCost}
                                    onChange={(e) => handleChange('averageTravelCost', e.target.value)}
                                    className="w-full pl-8 pr-4 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-blue-500 transition-all font-mono"
                                    style={{ borderColor: '#e5e7eb' }}
                                />
                            </div>
                            <p className="text-xs mt-1" style={{ color: '#6b7280' }}>Standard mileage reimbursement rate</p>
                        </div>
                    </div>
                </div>

                {/* Calculation Parameters */}
                <div className="p-6 rounded-xl" style={{ background: '#ffffff', border: '1px solid #e5e7eb' }}>
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2" style={{ color: '#1f2937' }}>
                        <i className="ri-calculator-line text-xl" style={{ color: '#10b981' }} />
                        Calculation Settings
                    </h3>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
                                Default ROI Period (Months)
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={config.roiPeriod}
                                    onChange={(e) => handleChange('roiPeriod', e.target.value)}
                                    className="w-full pl-4 pr-12 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-blue-500 transition-all font-mono"
                                    style={{ borderColor: '#e5e7eb' }}
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">Mo</span>
                            </div>
                            <p className="text-xs mt-1" style={{ color: '#6b7280' }}>Standard projection timeline</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
                                Inflation Rate Assumption
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    step="0.1"
                                    value={config.inflationRate}
                                    onChange={(e) => handleChange('inflationRate', e.target.value)}
                                    className="w-full pl-4 pr-12 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-blue-500 transition-all font-mono"
                                    style={{ borderColor: '#e5e7eb' }}
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">%</span>
                            </div>
                            <p className="text-xs mt-1" style={{ color: '#6b7280' }}>Annual inflation adjustment</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
                                Base Currency
                            </label>
                            <select
                                value={config.currency}
                                onChange={(e) => handleChange('currency', e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                style={{ borderColor: '#e5e7eb', background: '#ffffff' }}
                            >
                                <option value="USD">USD ($)</option>
                                <option value="EUR">EUR (€)</option>
                                <option value="GBP">GBP (£)</option>
                                <option value="AUD">AUD ($)</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex items-center justify-end gap-4 pb-12">
                <button
                    onClick={() => {
                        setConfig(DEFAULT_CONFIG);
                        setIsDirty(false);
                    }}
                    className="px-6 py-2 rounded-lg font-medium transition-colors hover:text-gray-900"
                    style={{ color: '#6b7280' }}
                >
                    Reset to Defaults
                </button>
                <button
                    onClick={handleSave}
                    disabled={!isDirty}
                    className={`px-8 py-2 rounded-lg font-medium text-white transition-all ${isDirty
                            ? 'opacity-100 hover:opacity-90 shadow-lg hover:shadow-xl'
                            : 'opacity-50 cursor-not-allowed'
                        }`}
                    style={{ background: '#2563eb' }}
                >
                    <i className="ri-save-line mr-2" />
                    Save Changes
                </button>
            </div>
        </div>
    );
}
