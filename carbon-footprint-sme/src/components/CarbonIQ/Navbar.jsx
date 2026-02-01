import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'calculator', label: 'Estimator' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'planning', label: 'Planning' },
  { id: 'tracking', label: 'Tracker' },
  { id: 'profile', label: 'Profile' },
];

export default function Navbar() {
  const { theme, toggleTheme, activeSection, scrollToSection } = useApp();
  const navigate = useNavigate();

  return (
    <div className="nav-wrapper flex justify-center fixed top-5 w-full z-[1000]">
      <header
        className="navbar flex items-center gap-2.5 px-4 py-2 rounded-[100px] border shadow-sm transition-colors duration-300"
        style={{
          background: 'var(--color-glass-nav)',
          backdropFilter: 'blur(12px)',
          borderColor: 'var(--color-border)',
          boxShadow: 'var(--color-shadow)',
        }}
      >
        <div
          className="logo font-extrabold text-lg flex items-center gap-2 px-4"
          style={{ color: 'var(--color-text-main)' }}
        >
          <div className="logo-mark" style={{ color: 'var(--color-primary)' }}>
            <i className="ri-leaf-fill" />
          </div>
          CarbonIQ
        </div>
        <nav className="flex gap-1">
          {SECTIONS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              className={`nav-btn px-5 py-2.5 rounded-[20px] font-semibold text-sm cursor-pointer transition-colors duration-200 border-0 ${activeSection === id ? 'active' : ''
                }`}
              style={{
                background: activeSection === id ? 'var(--color-text-main)' : 'transparent',
                color: activeSection === id ? 'var(--color-bg-body)' : 'var(--color-text-muted)',
              }}
              onClick={() => scrollToSection(id)}
            >
              {label}
            </button>
          ))}
        </nav>
        <div
          className="nav-actions flex items-center gap-2.5 pl-2.5 border-l ml-2.5"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <button
            type="button"
            className="theme-toggle bg-transparent border-0 p-1.5 rounded-full grid place-items-center cursor-pointer text-lg"
            style={{ color: 'var(--color-text-main)' }}
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <i className={theme === 'dark' ? 'ri-sun-line' : 'ri-moon-line'} id="theme-icon" />
          </button>
          <button
            onClick={() => navigate('/admin')}
            className="user-pill text-xs font-bold py-2 px-4 rounded-[20px] border cursor-pointer hover:opacity-80 transition-all flex items-center gap-2"
            style={{
              background: 'var(--color-bg-input)',
              color: 'var(--color-text-main)',
              borderColor: 'var(--color-border)',
            }}
          >
            <i className="ri-admin-line" />
            Admin
          </button>
        </div>
      </header>
    </div>
  );
}
