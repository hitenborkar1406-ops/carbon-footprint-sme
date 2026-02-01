import { useState } from 'react';

const MOCK_USERS = [
    { id: 1, name: 'John Smith', email: 'john@techcorp.com', organization: 'TechCorp Solutions', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@greenmanuf.com', organization: 'GreenManufacturing Ltd.', role: 'SME User', status: 'Active' },
    { id: 3, name: 'Michael Chen', email: 'michael@retailplus.com', organization: 'RetailPlus Inc.', role: 'SME User', status: 'Active' },
    { id: 4, name: 'Emma Davis', email: 'emma@logistics.com', organization: 'Swift Logistics', role: 'SME User', status: 'Suspended' },
    { id: 5, name: 'David Wilson', email: 'david@ecotech.com', organization: 'EcoTech Industries', role: 'SME User', status: 'Active' },
];

export default function UsersManagement() {
    const [users, setUsers] = useState(MOCK_USERS);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.organization.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleUserStatus = (userId) => {
        setUsers(users.map(user =>
            user.id === userId
                ? { ...user, status: user.status === 'Active' ? 'Suspended' : 'Active' }
                : user
        ));
    };

    return (
        <div className="users-management">
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-2" style={{ color: '#1f2937' }}>Users Management</h1>
                <p className="text-sm" style={{ color: '#6b7280' }}>View and manage platform users</p>
            </div>

            {/* Search Bar */}
            <div className="mb-6 flex items-center gap-4">
                <div className="flex-1 relative">
                    <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#9ca3af' }} />
                    <input
                        type="text"
                        placeholder="Search users by name, email, or organization..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        style={{ borderColor: '#e5e7eb', background: '#ffffff' }}
                    />
                </div>
                <button className="px-4 py-2 rounded-lg font-medium text-white transition-colors hover:opacity-90"
                    style={{ background: '#2563eb' }}>
                    <i className="ri-user-add-line mr-2" />
                    Add User
                </button>
            </div>

            {/* Users Table */}
            <div className="rounded-xl overflow-hidden" style={{ background: '#ffffff', border: '1px solid #e5e7eb' }}>
                <table className="w-full">
                    <thead style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#6b7280' }}>User</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#6b7280' }}>Organization</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#6b7280' }}>Role</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#6b7280' }}>Status</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#6b7280' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div>
                                        <div className="font-medium" style={{ color: '#1f2937' }}>{user.name}</div>
                                        <div className="text-sm" style={{ color: '#6b7280' }}>{user.email}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm" style={{ color: '#4b5563' }}>{user.organization}</td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 rounded text-xs font-medium"
                                        style={{
                                            background: user.role === 'Admin' ? '#dbeafe' : '#f3f4f6',
                                            color: user.role === 'Admin' ? '#1e40af' : '#4b5563'
                                        }}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 rounded text-xs font-medium"
                                        style={{
                                            background: user.status === 'Active' ? '#d1fae5' : '#fee2e2',
                                            color: user.status === 'Active' ? '#065f46' : '#991b1b'
                                        }}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <button className="p-2 rounded-lg hover:bg-blue-50 transition-colors" title="View Details">
                                            <i className="ri-eye-line" style={{ color: '#2563eb' }} />
                                        </button>
                                        <button className="p-2 rounded-lg hover:bg-purple-50 transition-colors" title="Change Role">
                                            <i className="ri-user-settings-line" style={{ color: '#8b5cf6' }} />
                                        </button>
                                        <button
                                            onClick={() => toggleUserStatus(user.id)}
                                            className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                                            title={user.status === 'Active' ? 'Suspend' : 'Activate'}>
                                            <i className={user.status === 'Active' ? 'ri-forbid-line' : 'ri-checkbox-circle-line'}
                                                style={{ color: user.status === 'Active' ? '#dc2626' : '#10b981' }} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm" style={{ color: '#6b7280' }}>
                <div>Showing {filteredUsers.length} of {users.length} users</div>
                <div className="flex items-center gap-2">
                    <button className="px-3 py-1 rounded border" style={{ borderColor: '#e5e7eb' }}>Previous</button>
                    <button className="px-3 py-1 rounded border" style={{ borderColor: '#e5e7eb' }}>Next</button>
                </div>
            </div>
        </div>
    );
}
