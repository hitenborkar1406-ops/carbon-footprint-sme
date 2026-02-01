import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';


const INITIAL_ITEMS = [
  {
    id: 'led',
    icon: 'ri-lightbulb-flash-line',
    title: 'LED Retrofit',
    desc: 'Switch to high-efficiency LEDs.',
    defaultInvestUsd: 500,
    saveRatePerMonth: 0.15, // 15% of invest per month in savings
    gradientFrom: '#2ed573',
    gradientTo: '#26de81',
  },
  {
    id: 'route',
    icon: 'ri-road-map-line',
    title: 'Route Optimization',
    desc: 'AI software to reduce mileage.',
    defaultInvestUsd: 120,
    investSuffix: '/m',
    saveRatePerMonth: 1.55, // Monthly subscription saves 155% per month
    gradientFrom: '#1e90ff',
    gradientTo: '#00d2ff',
  },
  {
    id: 'virtual',
    icon: 'ri-vidicon-line',
    title: 'Virtual Policy',
    desc: 'Replace travel with Zoom/Teams.',
    defaultInvestUsd: 0,
    saveRatePerMonth: 0, // No invest = immediate
    gradientFrom: '#a55eea',
    gradientTo: '#fd79a8',
  },
];

export default function Roadmap({ roadmapData = {} }) {
  const { isINR } = useApp();
  const navigate = useNavigate();
  const currSymbol = isINR ? '₹' : '$';
  const investMultiplier = isINR ? 80 : 1;

  // Local state to store editable values for each item
  const [itemsState, setItemsState] = useState({});

  // Initialize/Update state when props or currency changes
  useEffect(() => {
    const newState = {};
    INITIAL_ITEMS.forEach((item) => {
      // Calculate initial invest in current currency
      const initialInvest = item.defaultInvestUsd * investMultiplier;

      // Auto-calculate save based on invest and save rate
      const calculatedSave = initialInvest * item.saveRatePerMonth;

      newState[item.id] = {
        invest: initialInvest,
        save: calculatedSave,
      };
    });
    setItemsState(newState);
  }, [isINR, investMultiplier]);

  const handleInvestChange = (id, value) => {
    // Remove non-numeric characters for safety (keeping decimal point)
    const sanitizedVal = value.replace(/[^0-9.]/g, '');
    const newInvest = Number(sanitizedVal) || 0;

    // Find the item config to get save rate
    const itemConfig = INITIAL_ITEMS.find(item => item.id === id);
    const calculatedSave = newInvest * (itemConfig?.saveRatePerMonth || 0);

    setItemsState((prev) => ({
      ...prev,
      [id]: {
        invest: newInvest,
        save: calculatedSave,
      },
    }));
  };

  const calculateROI = (invest, save) => {
    if (invest === 0) return 'Immediate';
    if (save <= 0) return '∞';
    return (invest / save).toFixed(1);
  };

  const getROIGradient = (roi) => {
    if (roi === 'Immediate') return 'linear-gradient(135deg, #2ed573, #26de81)';
    const numRoi = parseFloat(roi);
    if (numRoi <= 6) return 'linear-gradient(135deg, #2ed573, #26de81)'; // Great ROI
    if (numRoi <= 12) return 'linear-gradient(135deg, #1e90ff, #00d2ff)'; // Good ROI
    if (numRoi <= 24) return 'linear-gradient(135deg, #a55eea, #fd79a8)'; // Moderate ROI
    return 'linear-gradient(135deg, #fc5c65, #fd7979)'; // Long ROI
  };

  const handleROIClick = (solutionId, invest, save, roi) => {
    navigate('/roi-execution', {
      state: {
        solutionId,
        invest,
        save,
        roi,
      },
    });
  };

  return (
    <section id="roadmap" className="section-padding py-[100px]" style={{ background: 'var(--color-bg-alt)' }}>
      <div className="container max-w-[1200px] w-[90%] mx-auto reveal">
        <div className="section-header mb-12 text-center">
          <h2 className="text-3xl font-bold mb-2" style={{
            color: 'var(--color-text-main)',
            background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Reduction Roadmap
          </h2>
          <p className="text-base" style={{ color: 'var(--color-text-muted)' }}>
            ROI-driven steps to reduce footprint. Adjust investment to see projected savings.
          </p>
        </div>
        <div className="roadmap-grid grid grid-cols-1 md:grid-cols-3 gap-8">
          {INITIAL_ITEMS.map((item) => {
            const state = itemsState[item.id] || { invest: 0, save: 0 };
            const roi = calculateROI(state.invest, state.save);
            const roiGradient = getROIGradient(roi);

            return (
              <div
                key={item.id}
                className="roadmap-card group relative p-8 rounded-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                style={{
                  background: 'var(--color-bg-panel)',
                  border: '2px solid transparent',
                  backgroundImage: `linear-gradient(var(--color-bg-panel), var(--color-bg-panel)), linear-gradient(135deg, ${item.gradientFrom}, ${item.gradientTo})`,
                  backgroundOrigin: 'border-box',
                  backgroundClip: 'padding-box, border-box',
                  color: 'var(--color-text-main)',
                }}
              >
                {/* Gradient overlay on hover */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${item.gradientFrom}, ${item.gradientTo})`,
                  }}
                />

                {/* Icon with gradient background */}
                <div
                  className="card-icon w-14 h-14 grid place-items-center rounded-xl text-2xl mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                  style={{
                    background: `linear-gradient(135deg, ${item.gradientFrom}, ${item.gradientTo})`,
                    color: '#ffffff',
                    boxShadow: `0 4px 20px ${item.gradientFrom}40`,
                  }}
                >
                  <i className={item.icon} />
                </div>

                <div className="card-body relative z-10">
                  <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                  <p className="text-sm mb-6 leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                    {item.desc}
                  </p>

                  {/* Investment input section with better design */}
                  <div
                    className="roi-data p-5 rounded-xl mb-5 transition-all duration-300"
                    style={{
                      background: 'var(--color-bg-input)',
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    <div className="mb-4">
                      <label className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: 'var(--color-text-muted)' }}>
                        💰 Investment
                      </label>
                      <div className="flex items-center text-lg font-bold">
                        <span className="mr-1 text-base">{currSymbol}</span>
                        <input
                          type="text"
                          className="bg-transparent flex-1 outline-none border-b-2 border-transparent focus:border-[var(--color-primary)] transition-all px-1 py-1"
                          style={{
                            background: `linear-gradient(135deg, ${item.gradientFrom}10, ${item.gradientTo}10)`,
                            borderRadius: '6px',
                          }}
                          value={state.invest}
                          onChange={(e) => handleInvestChange(item.id, e.target.value)}
                        />
                        {item.investSuffix && <span className="text-sm font-normal ml-1">{item.investSuffix}</span>}
                      </div>
                    </div>

                    <div className="pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
                      <label className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: 'var(--color-text-muted)' }}>
                        💚 Monthly Savings
                      </label>
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-black" style={{
                          background: `linear-gradient(135deg, ${item.gradientFrom}, ${item.gradientTo})`,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}>
                          {currSymbol}{state.save.toFixed(0)}
                        </div>
                        <span className="text-xs font-semibold">/month</span>
                      </div>
                    </div>
                  </div>


                  {/* ROI Badge with gradient - Clickable */}
                  <button
                    onClick={() => handleROIClick(item.id, state.invest, state.save, roi)}
                    className="roi-badge w-full text-center py-3 px-4 rounded-lg text-sm font-bold transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-xl"
                    style={{
                      background: roiGradient,
                      color: '#ffffff',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                      border: 'none',
                    }}
                  >
                    {roi === 'Immediate' ? (
                      <>⚡ ROI: Immediate</>
                    ) : roi === '∞' ? (
                      <>🎯 Adjust investment to calculate ROI</>
                    ) : (
                      <>📊 ROI: {roi} Months</>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
