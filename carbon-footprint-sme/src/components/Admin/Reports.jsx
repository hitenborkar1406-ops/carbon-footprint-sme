import { useState } from 'react';

const REPORT_TYPES = [
    { id: 'emissions', name: 'Emissions Summary', desc: 'Aggregated carbon footprint data by industry and scope.' },
    { id: 'roi', name: 'ROI Performance', desc: 'Financial impact analysis and cost savings projections.' },
    { id: 'adoption', name: 'Platform Adoption', desc: 'User growth, engagement rates, and feature usage.' },
    { id: 'sme-list', name: 'SME Directory', desc: 'Full list of registered SMEs and their current status.' },
];

export default function Reports() {
    const [selectedReport, setSelectedReport] = useState('emissions');
    const [dateRange, setDateRange] = useState('last-30');
    const [format, setFormat] = useState('pdf');
    const [isGenerating, setIsGenerating] = useState(false);

    const handleExport = () => {
        setIsGenerating(true);
        // Simulate API call
        setTimeout(() => {
            setIsGenerating(false);
            // In a real app, this would trigger a download
            alert(`Report "${REPORT_TYPES.find(r => r.id === selectedReport).name}" exported as ${format.toUpperCase()}`);
        }, 1500);
    };

    return (
        <div className="admin-reports">
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-2" style={{ color: '#1f2937' }}>Reports & Exports</h1>
                <p className="text-sm" style={{ color: '#6b7280' }}>Generate and download system-wide reports</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Report Selection */}
                <div className="space-y-4">
                    <h3 className="font-bold text-lg mb-4" style={{ color: '#1f2937' }}>1. Select Report Type</h3>
                    <div className="space-y-3">
                        {REPORT_TYPES.map((report) => (
                            <label
                                key={report.id}
                                className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all ${selectedReport === report.id
                                        ? 'ring-2 ring-blue-500 border-transparent bg-blue-50'
                                        : 'border-gray-200 hover:border-blue-300'
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="reportType"
                                    className="mt-1"
                                    checked={selectedReport === report.id}
                                    onChange={() => setSelectedReport(report.id)}
                                />
                                <div>
                                    <div className="font-semibold" style={{ color: '#1f2937' }}>{report.name}</div>
                                    <div className="text-xs mt-1" style={{ color: '#6b7280' }}>{report.desc}</div>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Configuration */}
                <div>
                    <h3 className="font-bold text-lg mb-6" style={{ color: '#1f2937' }}>2. Configure Export</h3>

                    <div className="p-6 rounded-xl space-y-6" style={{ background: '#ffffff', border: '1px solid #e5e7eb' }}>
                        <div>
                            <label className="block text-sm font-medium mb-3" style={{ color: '#374151' }}>Date Range</label>
                            <select
                                value={dateRange}
                                onChange={(e) => setDateRange(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                style={{ borderColor: '#e5e7eb' }}
                            >
                                <option value="last-7">Last 7 Days</option>
                                <option value="last-30">Last 30 Days</option>
                                <option value="last-90">Last Quarter (90 Days)</option>
                                <option value="ytd">Year to Date</option>
                                <option value="all">All Time</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-3" style={{ color: '#374151' }}>Export Format</label>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => setFormat('pdf')}
                                    className={`flex flex-col items-center justify-center p-4 rounded-lg border transition-all ${format === 'pdf' ? 'bg-red-50 border-red-500 text-red-700' : 'border-gray-200 hover:bg-gray-50'
                                        }`}
                                >
                                    <i className="ri-file-pdf-line text-2xl mb-2" />
                                    <span className="text-sm font-medium">PDF Document</span>
                                </button>
                                <button
                                    onClick={() => setFormat('csv')}
                                    className={`flex flex-col items-center justify-center p-4 rounded-lg border transition-all ${format === 'csv' ? 'bg-green-50 border-green-500 text-green-700' : 'border-gray-200 hover:bg-gray-50'
                                        }`}
                                >
                                    <i className="ri-file-excel-line text-2xl mb-2" />
                                    <span className="text-sm font-medium">CSV Spreadsheet</span>
                                </button>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-gray-100">
                            <button
                                onClick={handleExport}
                                disabled={isGenerating}
                                className="w-full py-3 rounded-lg font-bold text-white transition-all hover:opacity-90 flex items-center justify-center gap-2"
                                style={{ background: '#2563eb' }}
                            >
                                {isGenerating ? (
                                    <>
                                        <i className="ri-loader-4-line animate-spin text-xl" />
                                        Generating Report...
                                    </>
                                ) : (
                                    <>
                                        <i className="ri-download-cloud-line text-xl" />
                                        Generate & Download
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
