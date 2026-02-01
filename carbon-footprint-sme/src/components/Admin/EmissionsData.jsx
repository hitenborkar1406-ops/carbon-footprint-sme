import { useState } from 'react';

const EMISSIONS_DATA = [
    { industry: 'Manufacturing', total: 12450, electricity: 4200, fuel: 5800, travel: 2450 },
    { industry: 'Technology', total: 3200, electricity: 2100, fuel: 600, travel: 500 },
    { industry: 'Retail', total: 5600, electricity: 3200, fuel: 1200, travel: 1200 },
    { industry: 'Logistics', total: 8900, electricity: 1200, fuel: 6200, travel: 1500 },
];

export default function EmissionsData() {
    const [dateRange, setDateRange] = useState('Last 30 Days');

    const totalEmissions = EMISSIONS_DATA.reduce((sum, item) => sum + item.total, 0);

    return (
        <div className="emissions-data">
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-2" style={{ color: '#1f2937' }}>Emissions Data</h1>
                <p className="text-sm" style={{ color: '#6b7280' }}>View aggregated emissions across all SMEs (read-only)</p>
            </div>

            {/* Filters */}
            <div className="mb-6 flex items-center gap-4 p-4 rounded-xl" style={{ background: '#fffbeb', border: '1px solid #fde68a' }}>
                <i className="ri-information-line text-xl" style={{ color: '#d97706' }} />
                <span className="text-sm font-medium" style={{ color: '#92400e' }}>
                    This data is read-only. Emissions are automatically calculated from SME inputs.
                </span>
            </div>

            <div className="mb-6 flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium" style={{ color: '#4b5563' }}>Date Range:</span>
                    <select
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        className="px-4 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        style={{ borderColor: '#e5e7eb', background: '#ffffff' }}
                    >
                        <option>Last 7 Days</option>
                        <option>Last 30 Days</option>
                        <option>Last 90 Days</option>
                        <option>Last Year</option>
                    </select>
                </div>
                <button className="ml-auto px-4 py-2 rounded-lg font-medium transition-colors"
                    style={{ background: '#f3f4f6', color: '#4b5563' }}>
                    <i className="ri-download-line mr-2" />
                    Export CSV
                </button>
            </div>

            {/* Total Summary */}
            <div className="mb-6 p-6 rounded-xl"
                style={{ background: 'linear-gradient(135deg, #dbeafe, #ede9fe)', border: '1px solid #bfdbfe' }}>
                <div className="text-sm font-medium mb-2" style={{ color: '#1e40af' }}>Total Emissions Tracked</div>
                <div className="text-4xl font-bold" style={{ color: '#1f2937' }}>{totalEmissions.toLocaleString()} tCO₂e</div>
            </div>

            {/* Emissions by Industry */}
            <div className="rounded-xl overflow-hidden" style={{ background: '#ffffff', border: '1px solid #e5e7eb' }}>
                <table className="w-full">
                    <thead style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#6b7280' }}>Industry</th>
                            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider" style={{ color: '#6b7280' }}>Total</th>
                            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider" style={{ color: '#6b7280' }}>Electricity</th>
                            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider" style={{ color: '#6b7280' }}>Fuel</th>
                            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider" style={{ color: '#6b7280' }}>Travel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {EMISSIONS_DATA.map((item, index) => (
                            <tr key={item.industry} className="border-b border-gray-100">
                                <td className="px-6 py-4 font-medium" style={{ color: '#1f2937' }}>{item.industry}</td>
                                <td className="px-6 py-4 text-right font-bold" style={{ color: '#1f2937' }}>{item.total.toLocaleString()}</td>
                                <td className="px-6 py-4 text-right" style={{ color: '#4b5563' }}>{item.electricity.toLocaleString()}</td>
                                <td className="px-6 py-4 text-right" style={{ color: '#4b5563' }}>{item.fuel.toLocaleString()}</td>
                                <td className="px-6 py-4 text-right" style={{ color: '#4b5563' }}>{item.travel.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
