import { useState, useEffect, useRef, useCallback } from 'react';
import { Chart, registerables } from 'chart.js';
import { useApp } from '../../context/AppContext';

Chart.register(...registerables);

const CO2_ELEC = 0.5;
const CO2_FUEL = 2.3;
const CO2_TRAVEL = 0.15;

const PIE_COLORS = ['#2ed573', '#1e90ff', '#ffa502'];
const BAR_COLORS = ['#2ed573', '#1e90ff', '#ffa502'];

export default function Calculator({ onRoadmapUpdate }) {
  const { isINR, toggleCurrency, theme } = useApp();
  const [elec, setElec] = useState('');
  const [fuel, setFuel] = useState('');
  const [travel, setTravel] = useState('');
  const [emissions, setEmissions] = useState({ elec: 0, fuel: 0, travel: 0, total: 0 });
  const [cost, setCost] = useState(0);
  const [offsetCost, setOffsetCost] = useState(0);
  const [aiMsg, setAiMsg] = useState('Awaiting data...');
  const pieRef = useRef(null);
  const barRef = useRef(null);
  const pieChartRef = useRef(null);
  const barChartRef = useRef(null);

  const COST_ELEC = isINR ? 8.0 : 0.12;
  const COST_FUEL = isINR ? 96.0 : 1.0;
  const COST_OFFSET = isINR ? 1.5 : 0.02;
  const currSymbol = isINR ? '₹' : '$';

  const calculate = useCallback(() => {
    const e = parseFloat(elec) || 0;
    const f = parseFloat(fuel) || 0;
    const t = parseFloat(travel) || 0;
    const emElec = e * CO2_ELEC;
    const emFuel = f * CO2_FUEL;
    const emTravel = t * CO2_TRAVEL;
    const total = emElec + emFuel + emTravel;
    const totalCost = e * COST_ELEC + f * COST_FUEL;
    const offset = total * COST_OFFSET;
    setEmissions({ elec: emElec, fuel: emFuel, travel: emTravel, total });
    setCost(totalCost);
    setOffsetCost(offset);
    if (total === 0) setAiMsg('Awaiting data...');
    else if (total > 5000) setAiMsg('⚠️ High Alert: Emissions high.');
    else setAiMsg('✅ Optimal: Within range.');
    onRoadmapUpdate?.({ elec: e, fuel: f, travel: t, COST_ELEC, COST_FUEL, currSymbol });
  }, [elec, fuel, travel, isINR, COST_ELEC, COST_FUEL, COST_OFFSET, onRoadmapUpdate]);

  useEffect(() => {
    calculate();
  }, [calculate]);

  // Init pie & bar charts
  useEffect(() => {
    if (!pieRef.current || !barRef.current) return;
    if (pieChartRef.current) pieChartRef.current.destroy();
    if (barChartRef.current) barChartRef.current.destroy();

    pieChartRef.current = new Chart(pieRef.current, {
      type: 'doughnut',
      data: {
        labels: ['Electricity', 'Fuel', 'Travel'],
        datasets: [
          {
            data: [emissions.elec, emissions.fuel, emissions.travel],
            backgroundColor: PIE_COLORS,
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'right' } },
      },
    });

    barChartRef.current = new Chart(barRef.current, {
      type: 'bar',
      data: {
        labels: ['Elec', 'Fuel', 'Travel'],
        datasets: [
          {
            label: 'Emissions (kg)',
            data: [emissions.elec, emissions.fuel, emissions.travel],
            backgroundColor: BAR_COLORS,
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } },
      },
    });

    return () => {
      pieChartRef.current?.destroy();
      barChartRef.current?.destroy();
    };
  }, []);

  // Update chart data when emissions change
  useEffect(() => {
    if (pieChartRef.current) {
      pieChartRef.current.data.datasets[0].data = [
        emissions.elec,
        emissions.fuel,
        emissions.travel,
      ];
      pieChartRef.current.update();
    }
    if (barChartRef.current) {
      barChartRef.current.data.datasets[0].data = [
        emissions.elec,
        emissions.fuel,
        emissions.travel,
      ];
      barChartRef.current.update();
    }
  }, [emissions.elec, emissions.fuel, emissions.travel]);

  // Update chart theme when theme changes
  useEffect(() => {
    const textColor = theme === 'dark' ? '#94a3b8' : '#64748b';
    const gridColor = theme === 'dark' ? '#334155' : '#e2e8f0';
    [barChartRef.current, pieChartRef.current].forEach((chart) => {
      if (chart?.options?.scales) {
        if (chart.options.scales.x?.ticks) chart.options.scales.x.ticks.color = textColor;
        if (chart.options.scales.y?.ticks) chart.options.scales.y.ticks.color = textColor;
        if (chart.options.scales.y?.grid) chart.options.scales.y.grid.color = gridColor;
      }
      if (chart?.options?.plugins?.legend?.labels)
        chart.options.plugins.legend.labels.color = textColor;
      chart?.update();
    });
  }, [theme]);

  return (
    <section id="calculator" className="section-padding py-[100px]">
      <div className="container max-w-[1200px] w-[90%] mx-auto reveal">
        <div
          className="panel rounded-3xl p-10 shadow-sm border"
          style={{
            background: 'var(--color-bg-panel)',
            boxShadow: 'var(--color-shadow)',
            borderColor: 'var(--color-border)',
          }}
        >
          <div
            className="panel-header flex justify-between items-start mb-10 pb-5 border-b"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <div>
              <h2 className="text-2xl font-bold mb-1" style={{ color: 'var(--color-text-main)' }}>
                Footprint Estimator
              </h2>
              <p style={{ color: 'var(--color-text-muted)' }}>
                Enter monthly data to see emission breakdown.
              </p>
            </div>
            <div
              className="currency-toggle flex items-center gap-2.5 text-sm font-semibold"
              style={{ color: 'var(--color-text-main)' }}
            >
              <span id="curr-label" style={{ opacity: isINR ? 0.5 : 1 }}>
                USD ($)
              </span>
              <label className="switch cursor-pointer">
                <input
                  type="checkbox"
                  id="currencySwitch"
                  checked={isINR}
                  onChange={toggleCurrency}
                  className="sr-only"
                />
                <span className="slider block absolute inset-0 rounded-[34px] transition-colors duration-400" />
              </label>
              <span id="curr-label-2" style={{ opacity: isINR ? 1 : 0.5 }}>
                INR (₹)
              </span>
            </div>
          </div>
          <div className="calc-grid grid grid-cols-1 md:grid-cols-2 gap-14">
            <div className="inputs-col">
              <h3
                className="text-lg font-semibold mb-5 flex items-center gap-2"
                style={{ color: 'var(--color-text-main)' }}
              >
                <i className="ri-input-method-line" /> Monthly Activity
              </h3>
              <div className="input-group mb-5">
                <label
                  className="block text-xs font-bold mb-2 uppercase tracking-wider"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  Electricity Usage (kWh)
                </label>
                <input
                  type="number"
                  id="inp-elec"
                  placeholder="0"
                  value={elec}
                  onChange={(e) => setElec(e.target.value)}
                  className="w-full py-3.5 px-3.5 rounded-lg border text-base transition-colors"
                  style={{
                    background: 'var(--color-bg-input)',
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-text-main)',
                  }}
                />
              </div>
              <div className="input-group mb-5">
                <label
                  className="block text-xs font-bold mb-2 uppercase tracking-wider"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  Fleet Fuel (Liters)
                </label>
                <input
                  type="number"
                  id="inp-fuel"
                  placeholder="0"
                  value={fuel}
                  onChange={(e) => setFuel(e.target.value)}
                  className="w-full py-3.5 px-3.5 rounded-lg border text-base transition-colors"
                  style={{
                    background: 'var(--color-bg-input)',
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-text-main)',
                  }}
                />
              </div>
              <div className="input-group mb-5">
                <label
                  className="block text-xs font-bold mb-2 uppercase tracking-wider"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  Business Travel (km)
                </label>
                <input
                  type="number"
                  id="inp-travel"
                  placeholder="0"
                  value={travel}
                  onChange={(e) => setTravel(e.target.value)}
                  className="w-full py-3.5 px-3.5 rounded-lg border text-base transition-colors"
                  style={{
                    background: 'var(--color-bg-input)',
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-text-main)',
                  }}
                />
              </div>
              <div
                className="ai-insight mt-8 p-5 rounded border-l-4"
                style={{
                  background: 'rgba(46, 213, 115, 0.05)',
                  borderLeftColor: 'var(--color-primary)',
                }}
              >
                <div
                  className="ai-title font-bold mb-1 flex items-center gap-2 text-sm"
                  style={{ color: 'var(--color-primary)' }}
                >
                  <i className="ri-magic-line" /> AI Insight
                </div>
                <p id="ai-msg" className="text-sm m-0" style={{ color: 'var(--color-text-muted)' }}>
                  {aiMsg}
                </p>
              </div>
            </div>
            <div className="results-col">
              <h3 className="text-lg font-semibold mb-5" style={{ color: 'var(--color-text-main)' }}>
                Impact Analysis
              </h3>
              <div
                className="metric-card main-metric p-8 rounded-xl text-center mb-5 border-0"
                style={{
                  background: 'var(--color-text-main)',
                  color: 'var(--color-bg-body)',
                }}
              >
                <span className="opacity-80">Total Monthly Emissions</span>
                <h2 className="text-5xl font-extrabold mt-1">
                  {emissions.total.toFixed(1)} <small className="text-base font-normal">kg</small>
                </h2>
              </div>
              <div className="metrics-row grid grid-cols-2 gap-5 mb-8">
                <div
                  className="metric-card p-5 rounded-xl text-center border"
                  style={{
                    background: 'var(--color-bg-panel)',
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-text-main)',
                  }}
                >
                  <span className="block text-sm font-semibold mb-1">Est. Cost</span>
                  <h3 className="text-xl font-bold">
                    {currSymbol}
                    {cost.toFixed(0)}
                  </h3>
                </div>
                <div
                  className="metric-card p-5 rounded-xl text-center border"
                  style={{
                    background: 'var(--color-bg-panel)',
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-text-main)',
                  }}
                >
                  <span className="block text-sm font-semibold mb-1">Offset Cost</span>
                  <h3 className="text-xl font-bold">
                    {currSymbol}
                    {offsetCost.toFixed(0)}
                  </h3>
                </div>
              </div>
              <div className="charts-wrapper grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">
                <div
                  className="chart-box p-4 rounded-xl border"
                  style={{
                    background: 'var(--color-bg-input)',
                    borderColor: 'var(--color-border)',
                  }}
                >
                  <h4
                    className="text-xs uppercase mb-2.5 text-center font-semibold"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    Breakdown (Pie)
                  </h4>
                  <div className="chart-container-small w-full h-[200px] relative">
                    <canvas id="estimatorPieChart" ref={pieRef} />
                  </div>
                </div>
                <div
                  className="chart-box p-4 rounded-xl border"
                  style={{
                    background: 'var(--color-bg-input)',
                    borderColor: 'var(--color-border)',
                  }}
                >
                  <h4
                    className="text-xs uppercase mb-2.5 text-center font-semibold"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    Comparison (Bar)
                  </h4>
                  <div className="chart-container-small w-full h-[200px] relative">
                    <canvas id="estimatorBarChart" ref={barRef} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
