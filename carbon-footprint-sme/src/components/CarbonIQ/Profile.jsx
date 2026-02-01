import { useState } from 'react';

export default function Profile() {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [sector, setSector] = useState('Logistics');
  const [email, setEmail] = useState('');
  const [employees, setEmployees] = useState('');

  const saveProfile = (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 1000);
  };

  return (
    <section id="profile" className="section-padding py-[100px]">
      <div className="container max-w-[1200px] w-[90%] mx-auto reveal">
        <div
          className="panel rounded-3xl p-10 shadow-sm border"
          style={{
            background: 'var(--color-bg-panel)',
            boxShadow: 'var(--color-shadow)',
            borderColor: 'var(--color-border)',
          }}
        >
          <div className="profile-layout grid grid-cols-1 md:grid-cols-[280px_1fr] gap-10 min-h-[400px]">
            <div
              className="profile-sidebar border-r pr-5 md:border-r md:pr-5 md:border-b-0 border-b pb-8 mb-8 md:mb-0 md:pb-0"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <div
                className="avatar-circle w-20 h-20 grid place-items-center rounded-full text-3xl mb-5"
                style={{
                  background: 'var(--color-bg-input)',
                  color: 'var(--color-text-main)',
                }}
              >
                <i className="ri-building-4-line" />
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-text-main)' }}>
                Company Settings
              </h3>
              <p
                className="profile-desc text-sm mb-8 leading-normal"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Manage your organization's sustainability profile.
              </p>
              <ul className="profile-nav list-none p-0 m-0">
                {[
                  { icon: 'ri-user-settings-line', label: 'General Info', active: true },
                  { icon: 'ri-shield-key-line', label: 'Security', active: false },
                  { icon: 'ri-notification-3-line', label: 'Alerts', active: false },
                ].map((item) => (
                  <li
                    key={item.label}
                    className={`py-3 px-4 rounded-lg font-semibold cursor-pointer transition-colors flex items-center gap-2.5 mb-1 ${
                      item.active ? 'active' : ''
                    }`}
                    style={{
                      background: item.active ? 'var(--color-text-main)' : 'transparent',
                      color: item.active ? 'var(--color-bg-body)' : 'var(--color-text-muted)',
                    }}
                  >
                    <i className={item.icon} />
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
            <div className="profile-form-area">
              <div
                className="form-header border-b pb-4 mb-6"
                style={{ borderColor: 'var(--color-border)' }}
              >
                <h3 className="text-xl font-semibold" style={{ color: 'var(--color-text-main)' }}>
                  General Information
                </h3>
              </div>
              <form className="clean-form" onSubmit={saveProfile}>
                <div className="form-row-2 grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <div className="input-group">
                    <label
                      className="block text-xs font-bold mb-2 uppercase tracking-wider"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      Company Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Acme Logistics"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full py-3.5 px-3.5 rounded-lg border text-base transition-colors"
                      style={{
                        background: 'var(--color-bg-input)',
                        borderColor: 'var(--color-border)',
                        color: 'var(--color-text-main)',
                      }}
                    />
                  </div>
                  <div className="input-group">
                    <label
                      className="block text-xs font-bold mb-2 uppercase tracking-wider"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      Industry Sector
                    </label>
                    <div className="select-wrapper relative">
                      <select
                        value={sector}
                        onChange={(e) => setSector(e.target.value)}
                        className="w-full py-3.5 px-3.5 pr-10 rounded-lg border text-base appearance-none cursor-pointer bg-[var(--color-bg-input)] border-[var(--color-border)] text-[var(--color-text-main)]"
                      >
                        <option>Logistics</option>
                        <option>Manufacturing</option>
                        <option>IT</option>
                      </select>
                      <i
                        className="ri-arrow-down-s-line absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-lg"
                        style={{ color: 'var(--color-text-muted)' }}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-row-2 grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                  <div className="input-group">
                    <label
                      className="block text-xs font-bold mb-2 uppercase tracking-wider"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      Contact Email
                    </label>
                    <input
                      type="email"
                      placeholder="admin@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full py-3.5 px-3.5 rounded-lg border text-base transition-colors"
                      style={{
                        background: 'var(--color-bg-input)',
                        borderColor: 'var(--color-border)',
                        color: 'var(--color-text-main)',
                      }}
                    />
                  </div>
                  <div className="input-group">
                    <label
                      className="block text-xs font-bold mb-2 uppercase tracking-wider"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      Employee Count
                    </label>
                    <input
                      type="number"
                      placeholder="0"
                      value={employees}
                      onChange={(e) => setEmployees(e.target.value)}
                      className="w-full py-3.5 px-3.5 rounded-lg border text-base transition-colors"
                      style={{
                        background: 'var(--color-bg-input)',
                        borderColor: 'var(--color-border)',
                        color: 'var(--color-text-main)',
                      }}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn-primary px-8 py-3.5 rounded-lg font-bold cursor-pointer transition-all border-0 text-white flex items-center gap-2"
                  style={{
                    background: saved ? 'var(--color-primary)' : 'var(--color-primary)',
                    opacity: saving ? 0.7 : 1,
                  }}
                  disabled={saving}
                >
                  {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
