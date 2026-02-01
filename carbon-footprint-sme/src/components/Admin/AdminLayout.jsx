import { useState } from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import UsersManagement from './UsersManagement';
import SMEsManagement from './SMEsManagement';
import EmissionsData from './EmissionsData';
import RoadmapTemplates from './RoadmapTemplates';
import ROIConfiguration from './ROIConfiguration';
import Reports from './Reports';
import SystemSettings from './SystemSettings';

const ADMIN_NAV = [
    { path: '/admin', label: 'Overview', icon: 'ri-dashboard-line' },
    { path: '/admin/users', label: 'Users', icon: 'ri-user-line' },
    { path: '/admin/smes', label: 'SMEs', icon: 'ri-building-line' },
    { path: '/admin/emissions', label: 'Emissions', icon: 'ri-leaf-line' },
    { path: '/admin/roadmaps', label: 'Roadmap Templates', icon: 'ri-route-line' },
    { path: '/admin/roi-config', label: 'ROI Configuration', icon: 'ri-settings-3-line' },
    { path: '/admin/reports', label: 'Reports', icon: 'ri-file-chart-line' },
    { path: '/admin/settings', label: 'Settings', icon: 'ri-settings-line' },
];

export default function AdminLayout() {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="admin-layout min-h-screen" style={{ background: '#f9fafb' }}>
            {/* Top Navigation */}
            <header className="admin-header fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-6 z-50"
                style={{ background: '#ffffff', borderBottom: '1px solid #e5e7eb' }}>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <i className="ri-menu-line text-xl" />
                    </button>
                    <h1 className="text-xl font-bold" style={{ color: '#1f2937' }}>
                        CarbonIQ Admin
                    </h1>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/')}
                        className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        style={{ background: '#f3f4f6', color: '#4b5563' }}
                    >
                        <i className="ri-arrow-left-line mr-2" />
                        Back to App
                    </button>
                    <div className="w-10 h-10 rounded-full grid place-items-center" style={{ background: '#2563eb', color: '#fff' }}>
                        <i className="ri-user-line" />
                    </div>
                </div>
            </header>

            <div className="flex pt-16">
                {/* Sidebar */}
                <aside
                    className="admin-sidebar fixed left-0 top-16 bottom-0 transition-all duration-300 overflow-y-auto"
                    style={{
                        width: sidebarCollapsed ? '80px' : '250px',
                        background: '#ffffff',
                        borderRight: '1px solid #e5e7eb'
                    }}
                >
                    <nav className="p-4">
                        {ADMIN_NAV.map(item => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.path === '/admin'}
                                className={({ isActive }) =>
                                    `nav-item flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${isActive ? 'active' : ''
                                    }`
                                }
                                style={({ isActive }) => ({
                                    background: isActive ? '#eff6ff' : 'transparent',
                                    color: isActive ? '#2563eb' : '#6b7280',
                                    fontWeight: isActive ? '600' : '500',
                                })}
                            >
                                <i className={`${item.icon} text-xl`} />
                                {!sidebarCollapsed && <span className="text-sm">{item.label}</span>}
                            </NavLink>
                        ))}
                    </nav>
                </aside>

                {/* Main Content */}
                <main
                    className="admin-content flex-1 p-8 transition-all duration-300"
                    style={{ marginLeft: sidebarCollapsed ? '80px' : '250px' }}
                >
                    <Routes>
                        <Route index element={<Dashboard />} />
                        <Route path="users" element={<UsersManagement />} />
                        <Route path="smes" element={<SMEsManagement />} />
                        <Route path="emissions" element={<EmissionsData />} />
                        <Route path="roadmaps" element={<RoadmapTemplates />} />
                        <Route path="roi-config" element={<ROIConfiguration />} />
                        <Route path="reports" element={<Reports />} />
                        <Route path="settings" element={<SystemSettings />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
}
