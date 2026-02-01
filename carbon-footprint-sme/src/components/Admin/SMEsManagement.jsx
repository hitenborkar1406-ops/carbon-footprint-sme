import { useState } from 'react';

const MOCK_SMES = [
    { id: 1, name: 'TechCorp Solutions', industry: 'Technology', size: 'Medium', footprint: '1,245 tCO₂e', status: 'Active' },
    { id: 2, name: 'Green Manufacturing Ltd.', industry: 'Manufacturing', size: 'Small', footprint: '3,420 tCO₂e', status: 'Active' },
    { id: 3, name: 'RetailPlus Inc.', industry: 'Retail', size: 'Medium', footprint: '892 tCO₂e', status: 'Active' },
    { id: 4, name: 'Swift Logistics', industry: 'Logistics', size: 'Small', footprint: '2,156 tCO₂e', status: 'Active' },
    { id: 5, name: 'EcoTech Industries', industry: 'Technology', size: 'Micro', footprint: '456 tCO₂e', status: 'Active' },
];

export default function SMEsManagement() {
    const [smes, setSmes] = useState(MOCK_SMES);
    const [filterIndustry, setFilterIndustry] = useState('All');

    const filteredSmes = filterIndustry === 'All'
        ? smes
        : smes.filter(sme => sme.industry === filterIndustry);

    const industries = ['All', ...new Set(MOCK_SMES.map(s => s.industry))];

    return (
        <div className="smes-management">
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-2" style={{ color: '#1f2937' }}>SMEs Management</h1>
                <p className="text-sm" style={{ color: '#6b7280' }}>View and manage registered SME organizations</p>
            </div>

            {/* Filters */}
            <div className="mb-6 flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium" style={{ color: '#4b5563' }}>Industry:</span>
                    <select
                        value={filterIndustry}
                        onChange={(e) => setFilterIndustry(e.target.value)}
                        className="px-4 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        style={{ borderColor: '#e5e7eb', background: '#ffffff' }}
                    >
                        {industries.map(industry => (
                            <option key={industry} value={industry}>{industry}</option>
                        ))}
                    </select>
                </div>
                <button className="ml-auto px-4 py-2 rounded-lg font-medium text-white transition-colors hover:opacity-90"
                    style={{ background: '#2563eb' }}>
                    <i className="ri-building-add-line mr-2" />
                    Add SME
                </button>
            </div>

            {/* SMEs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSmes.map((sme) => (
                    <div key={sme.id} className="sme-card p-6 rounded-xl hover:shadow-lg transition-all"
                        style={{ background: '#ffffff', border: '1px solid #e5e7eb' }}>
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-12 h-12 rounded-lg grid place-items-center"
                                style={{ background: '#dbeafe', color: '#2563eb' }}>
                                <i className="ri-building-line text-xl" />
                            </div>
                            <span className="px-2 py-1 rounded text-xs font-medium"
                                style={{ background: '#d1fae5', color: '#065f46' }}>
                                {sme.status}
                            </span>
                        </div>

                        <h3 className="font-bold mb-1" style={{ color: '#1f2937' }}>{sme.name}</h3>
                        <p className="text-xs mb-4" style={{ color: '#6b7280' }}>{sme.industry} • {sme.size}</p>

                        <div className="mb-4 p-3 rounded-lg" style={{ background: '#f9fafb' }}>
                            <div className="text-xs mb-1" style={{ color: '#6b7280' }}>Carbon Footprint</div>
                            <div className="text-lg font-bold" style={{ color: '#1f2937' }}>{sme.footprint}</div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button className="flex-1 py-2 rounded-lg text-sm font-medium transition-colors"
                                style={{ background: '#f3f4f6', color: '#4b5563' }}>
                                <i className="ri-edit-line mr-1" />
                                Edit
                            </button>
                            <button className="flex-1 py-2 rounded-lg text-sm font-medium transition-colors"
                                style={{ background: '#fef2f2', color: '#dc2626' }}>
                                <i className="ri-delete-bin-line mr-1" />
                                Reset
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 text-sm" style={{ color: '#6b7280' }}>
                Showing {filteredSmes.length} of {smes.length} SMEs
            </div>
        </div>
    );
}
