import { useState } from 'react';

export default function SystemSettings() {
    const [maintenanceMode, setMaintenanceMode] = useState(false);
    const [allowRegistrations, setAllowRegistrations] = useState(true);
    const [debugMode, setDebugMode] = useState(false);

    return (
        <div className="system-settings">
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-2" style={{ color: '#1f2937' }}>System Settings</h1>
                <p className="text-sm" style={{ color: '#6b7280' }}>Platform configuration and feature toggles</p>
            </div>

            <div className="max-w-3xl space-y-6">

                {/* General Settings */}
                <div className="rounded-xl overflow-hidden shadow-sm" style={{ background: '#ffffff', border: '1px solid #e5e7eb' }}>
                    <div className="px-6 py-4 border-b border-gray-100" style={{ background: '#f9fafb' }}>
                        <h3 className="font-bold text-gray-800">Platform Controls</h3>
                    </div>

                    <div className="p-6 divide-y divide-gray-100">
                        {/* New Registrations */}
                        <div className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                            <div>
                                <div className="font-medium text-gray-800">Allow New Registrations</div>
                                <div className="text-sm text-gray-500">Enable or disable new user sign-ups publicly</div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" checked={allowRegistrations} onChange={() => setAllowRegistrations(!allowRegistrations)} />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>

                        {/* Maintenance Mode */}
                        <div className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                            <div>
                                <div className="font-medium text-gray-800">Maintenance Mode</div>
                                <div className="text-sm text-gray-500">Put the site in read-only mode for updates</div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" checked={maintenanceMode} onChange={() => setMaintenanceMode(!maintenanceMode)} />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                            </label>
                        </div>

                        {/* Debug Mode */}
                        <div className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                            <div>
                                <div className="font-medium text-gray-800">Debug Logging</div>
                                <div className="text-sm text-gray-500">Enable verbose logging for troubleshooting errors</div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" checked={debugMode} onChange={() => setDebugMode(!debugMode)} />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Branding & Info */}
                <div className="rounded-xl overflow-hidden shadow-sm" style={{ background: '#ffffff', border: '1px solid #e5e7eb' }}>
                    <div className="px-6 py-4 border-b border-gray-100" style={{ background: '#f9fafb' }}>
                        <h3 className="font-bold text-gray-800">System Information</h3>
                    </div>
                    <div className="p-6 grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Platform Name</label>
                            <input type="text" value="CarbonIQ" disabled className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Version</label>
                            <input type="text" value="v2.4.1 (Stable)" disabled className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Admin Contact</label>
                            <input type="email" value="admin@carboniq.io" disabled className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">License Key</label>
                            <input type="text" value="XXXX-XXXX-XXXX-892A" disabled className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 font-mono" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
