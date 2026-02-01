import { useState } from 'react';

const ROADMAP_ACTIONS = [
    { id: 1, name: 'LED Retrofit', phase: 'Quick Wins', enabled: true, impact: 'Medium' },
    { id: 2, name: 'Waste Audit', phase: 'Quick Wins', enabled: true, impact: 'Low' },
    { id: 3, name: 'Green Procurement', phase: 'Process', enabled: true, impact: 'Medium' },
    { id: 4, name: 'Route Optimization', phase: 'Process', enabled: true, impact: 'High' },
    { id: 5, name: 'Solar Installation', phase: 'Transform', enabled: true, impact: 'High' },
    { id: 6, name: 'EV Fleet', phase: 'Transform', enabled: false, impact: 'Max' },
];

export default function RoadmapTemplates() {
    const [actions, setActions] = useState(ROADMAP_ACTIONS);

    const toggleAction = (id) => {
        setActions(actions.map(action =>
            action.id === id ? { ...action, enabled: !action.enabled } : action
        ));
    };

    return (
        <div className="roadmap-templates">
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-2" style={{ color: '#1f2937' }}>Roadmap Templates</h1>
                <p className="text-sm" style={{ color: '#6b7280' }}>Manage predefined roadmap actions and templates</p>
            </div>

            {/* Warning */}
            <div className="mb-6 flex items-start gap-4 p-4 rounded-xl" style={{ background: '#fef2f2', border: '1px solid #fecaca' }}>
                <i className="ri-alert-line text-xl" style={{ color: '#dc2626' }} />
                <div className="flex-1">
                    <div className="font-semibold mb-1" style={{ color: '#991b1b' }}>Important</div>
                    <div className="text-sm" style={{ color: '#991b1b' }}>
                        Changes to roadmap actions will only affect future-generated roadmaps. Existing SME roadmaps will not be modified.
                    </div>
                </div>
            </div>

            {/* Actions List */}
            <div className="space-y-4">
                {['Quick Wins', 'Process', 'Transform'].map(phase => (
                    <div key={phase} className="rounded-xl overflow-hidden" style={{ background: '#ffffff', border: '1px solid #e5e7eb' }}>
                        <div className="px-6 py-3" style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                            <h3 className="font-semibold" style={{ color: '#1f2937' }}>Phase: {phase}</h3>
                        </div>
                        <div className="p-6 space-y-4">
                            {actions.filter(a => a.phase === phase).map(action => (
                                <div key={action.id} className="flex items-center justify-between p-4 rounded-lg transition-all"
                                    style={{ background: action.enabled ? '#f0fdf4' : '#f9fafb', border: `1px solid ${action.enabled ? '#86efac' : '#e5e7eb'}` }}>
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => toggleAction(action.id)}
                                            className={`w-12 h-6 rounded-full relative transition-all ${action.enabled ? 'bg-green-500' : 'bg-gray-300'}`}
                                        >
                                            <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all ${action.enabled ? 'left-6' : 'left-0.5'}`} />
                                        </button>
                                        <div>
                                            <div className="font-medium" style={{ color: '#1f2937' }}>{action.name}</div>
                                            <div className="text-xs" style={{ color: '#6b7280' }}>Impact: {action.impact}</div>
                                        </div>
                                    </div>
                                    <button className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                        style={{ background: '#f3f4f6', color: '#4b5563' }}>
                                        <i className="ri-edit-line mr-1" />
                                        Edit Values
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 flex justify-end">
                <button className="px-6 py-2 rounded-lg font-medium text-white transition-colors hover:opacity-90"
                    style={{ background: '#2563eb' }}>
                    <i className="ri-add-line mr-2" />
                    Add New Action
                </button>
            </div>
        </div>
    );
}
