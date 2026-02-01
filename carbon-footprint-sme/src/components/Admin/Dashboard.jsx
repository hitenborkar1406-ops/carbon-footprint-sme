import { motion } from 'framer-motion';

const METRICS = [
    { label: 'Total SMEs', value: '247', change: '+12%', icon: 'ri-building-line', color: '#2563eb' },
    { label: 'Active Users', value: '1,834', change: '+8%', icon: 'ri-user-line', color: '#10b981' },
    { label: 'Total Emissions', value: '45.2k tCO₂e', change: '-5%', icon: 'ri-leaf-line', color: '#f59e0b' },
    { label: 'Avg ROI Improvement', value: '18.5 Mo', change: '+3 Mo', icon: 'ri-line-chart-line', color: '#8b5cf6' },
    { label: 'Roadmaps Generated', value: '892', change: '+24%', icon: 'ri-route-line', color: '#ec4899' },
    { label: 'System Health', value: '98.7%', change: '+0.3%', icon: 'ri-heart-pulse-line', color: '#14b8a6' },
];

const RECENT_ACTIVITY = [
    { action: 'New SME registered', detail: 'TechCorp Solutions', time: '5 min ago', icon: 'ri-building-add-line', color: '#2563eb' },
    { action: 'Roadmap generated', detail: 'GreenManufacturing Ltd.', time: '12 min ago', icon: 'ri-route-line', color: '#10b981' },
    { action: 'User updated profile', detail: 'john@example.com', time: '23 min ago', icon: 'ri-user-settings-line', color: '#8b5cf6' },
    { action: 'Report exported', detail: 'Q4 Emissions Summary', time: '1 hour ago', icon: 'ri-file-download-line', color: '#f59e0b' },
];

const INDUSTRY_BREAKDOWN = [
    { industry: 'Manufacturing', count: 87, percentage: 35 },
    { industry: 'Retail', count: 62, percentage: 25 },
    { industry: 'Technology', count: 49, percentage: 20 },
    { industry: 'Logistics', count: 37, percentage: 15 },
    { industry: 'Other', count: 12, percentage: 5 },
];

export default function Dashboard() {
    return (
        <div className="dashboard">
            <div className="mb-8">
                <h1 className="text-2xl font-bold mb-2" style={{ color: '#1f2937' }}>Dashboard Overview</h1>
                <p className="text-sm" style={{ color: '#6b7280' }}>Monitor platform health and activity</p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {METRICS.map((metric, index) => (
                    <motion.div
                        key={metric.label}
                        className="metric-card p-6 rounded-xl"
                        style={{ background: '#ffffff', border: '1px solid #e5e7eb' }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-12 h-12 rounded-lg grid place-items-center"
                                style={{ background: `${metric.color}15`, color: metric.color }}>
                                <i className={`${metric.icon} text-xl`} />
                            </div>
                            <span className="text-xs font-semibold px-2 py-1 rounded"
                                style={{ background: metric.change.startsWith('+') ? '#d1fae5' : '#fee2e2', color: metric.change.startsWith('+') ? '#065f46' : '#991b1b' }}>
                                {metric.change}
                            </span>
                        </div>
                        <div className="text-3xl font-bold mb-1" style={{ color: '#1f2937' }}>{metric.value}</div>
                        <div className="text-sm" style={{ color: '#6b7280' }}>{metric.label}</div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <div className="activity-section p-6 rounded-xl" style={{ background: '#ffffff', border: '1px solid #e5e7eb' }}>
                    <h3 className="text-lg font-bold mb-4" style={{ color: '#1f2937' }}>Recent Activity</h3>
                    <div className="space-y-4">
                        {RECENT_ACTIVITY.map((activity, index) => (
                            <div key={index} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0">
                                <div className="w-10 h-10 rounded-lg grid place-items-center shrink-0"
                                    style={{ background: `${activity.color}15`, color: activity.color }}>
                                    <i className={activity.icon} />
                                </div>
                                <div className="flex-1">
                                    <div className="text-sm font-semibold" style={{ color: '#1f2937' }}>{activity.action}</div>
                                    <div className="text-xs" style={{ color: '#6b7280' }}>{activity.detail}</div>
                                </div>
                                <div className="text-xs" style={{ color: '#9ca3af' }}>{activity.time}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Industry Breakdown */}
                <div className="industry-section p-6 rounded-xl" style={{ background: '#ffffff', border: '1px solid #e5e7eb' }}>
                    <h3 className="text-lg font-bold mb-4" style={{ color: '#1f2937' }}>SMEs by Industry</h3>
                    <div className="space-y-4">
                        {INDUSTRY_BREAKDOWN.map((item) => (
                            <div key={item.industry}>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium" style={{ color: '#4b5563' }}>{item.industry}</span>
                                    <span className="text-sm font-semibold" style={{ color: '#1f2937' }}>{item.count}</span>
                                </div>
                                <div className="w-full h-2 rounded-full" style={{ background: '#e5e7eb' }}>
                                    <div className="h-full rounded-full transition-all duration-500"
                                        style={{ width: `${item.percentage}%`, background: '#2563eb' }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
