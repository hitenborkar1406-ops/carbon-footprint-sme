import { useState, useEffect, useRef, useCallback } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const CO2_ELEC = 0.5;
const CO2_FUEL = 2.3;
const CO2_TRAVEL = 0.15;
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

export default function Tracker({ theme }) {
  const [rows, setRows] = useState(
    MONTHS.map(() => ({ elec: '', fuel: '', travel: '' }))
  );
  const [total, setTotal] = useState(0);
  const trendRef = useRef(null);
  const trendChartRef = useRef(null);

  const getTrendData = useCallback(() => {
    return rows.map((r) => {
      const e = parseFloat(r.elec) || 0;
      const f = parseFloat(r.fuel) || 0;
      const t = parseFloat(r.travel) || 0;
      return e * CO2_ELEC + f * CO2_FUEL + t * CO2_TRAVEL;
    });
  }, [rows]);

  useEffect(() => {
    const data = getTrendData();
    const sum = data.reduce((a, b) => a + b, 0);
    setTotal(sum);
    if (!trendRef.current) return;
    if (trendChartRef.current) trendChartRef.current.destroy();
    const ctx = trendRef.current.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(46, 213, 115, 0.4)');
    gradient.addColorStop(1, 'rgba(46, 213, 115, 0.0)');
    trendChartRef.current = new Chart(trendRef.current, {
      type: 'line',
      data: {
        labels: MONTHS,
        datasets: [
          {
            label: 'Total Emissions',
            data,
            borderColor: '#2ed573',
            backgroundColor: gradient,
            borderWidth: 2,
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { y: { beginAtZero: true } },
      },
    });
    return () => trendChartRef.current?.destroy();
  }, []);

  useEffect(() => {
    const data = getTrendData();
    setTotal(data.reduce((a, b) => a + b, 0));
    if (trendChartRef.current) {
      trendChartRef.current.data.datasets[0].data = data;
      trendChartRef.current.update();
    }
  }, [rows, getTrendData]);

  useEffect(() => {
    if (!trendChartRef.current) return;
    const textColor = theme === 'dark' ? '#94a3b8' : '#64748b';
    const gridColor = theme === 'dark' ? '#334155' : '#e2e8f0';
    if (trendChartRef.current.options.scales?.x?.ticks) trendChartRef.current.options.scales.x.ticks.color = textColor;
    if (trendChartRef.current.options.scales?.y?.ticks) trendChartRef.current.options.scales.y.ticks.color = textColor;
    if (trendChartRef.current.options.scales?.y?.grid) trendChartRef.current.options.scales.y.grid.color = gridColor;
    trendChartRef.current.update();
  }, [theme]);

  const updateRow = (i, field, value) => {
    setRows((prev) => {
      const next = [...prev];
      next[i] = { ...next[i], [field]: value };
      return next;
    });
  };

  return (
    <section id="tracking" className="section-padding py-[100px]" style={{ background: 'var(--color-bg-alt)' }}>
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
                6-Month Trend Tracker
              </h2>
              <p style={{ color: 'var(--color-text-muted)' }}>Live data visualization.</p>
            </div>
            <button
              type="button"
              className="btn-secondary flex items-center gap-2 px-8 py-3.5 rounded-lg font-semibold border cursor-pointer transition-colors"
              style={{
                background: 'transparent',
                borderColor: 'var(--color-border)',
                color: 'var(--color-text-main)',
              }}
            >
              <i className="ri-download-cloud-line" /> CSV
            </button>
          </div>
          <div className="tracking-layout grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-10">
            <div className="table-container overflow-x-auto">
              <table className="data-table w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th
                      className="text-left py-3 px-3 border-b-2 text-xs uppercase font-semibold"
                      style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}
                    >
                      Month
                    </th>
                    <th
                      className="text-left py-3 px-3 border-b-2 text-xs uppercase font-semibold"
                      style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}
                    >
                      Elec (kWh)
                    </th>
                    <th
                      className="text-left py-3 px-3 border-b-2 text-xs uppercase font-semibold"
                      style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}
                    >
                      Fuel (L)
                    </th>
                    <th
                      className="text-left py-3 px-3 border-b-2 text-xs uppercase font-semibold"
                      style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}
                    >
                      Travel (km)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {MONTHS.map((month, i) => (
                    <tr key={month}>
                      <td
                        className="td-month py-2.5 px-3 border-b font-bold"
                        style={{
                          borderColor: 'var(--color-border)',
                          color: 'var(--color-primary)',
                        }}
                      >
                        {month}
                      </td>
                      <td className="py-2.5 px-3 border-b" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-main)' }}>
                        <input
                          type="number"
                          className="table-inp w-full py-2 px-2 rounded text-right border border-transparent bg-transparent focus:outline-none focus:bg-[var(--color-bg-input)] focus:border-[var(--color-border)]"
                          style={{ color: 'var(--color-text-main)' }}
                          placeholder="0"
                          value={rows[i].elec}
                          onChange={(e) => updateRow(i, 'elec', e.target.value)}
                        />
                      </td>
                      <td className="py-2.5 px-3 border-b" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-main)' }}>
                        <input
                          type="number"
                          className="table-inp w-full py-2 px-2 rounded text-right border border-transparent bg-transparent focus:outline-none focus:bg-[var(--color-bg-input)] focus:border-[var(--color-border)]"
                          style={{ color: 'var(--color-text-main)' }}
                          placeholder="0"
                          value={rows[i].fuel}
                          onChange={(e) => updateRow(i, 'fuel', e.target.value)}
                        />
                      </td>
                      <td className="py-2.5 px-3 border-b" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-main)' }}>
                        <input
                          type="number"
                          className="table-inp w-full py-2 px-2 rounded text-right border border-transparent bg-transparent focus:outline-none focus:bg-[var(--color-bg-input)] focus:border-[var(--color-border)]"
                          style={{ color: 'var(--color-text-main)' }}
                          placeholder="0"
                          value={rows[i].travel}
                          onChange={(e) => updateRow(i, 'travel', e.target.value)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div
                className="table-footer flex justify-between p-5 rounded-lg mt-5 font-bold"
                style={{
                  background: 'var(--color-text-main)',
                  color: 'var(--color-bg-body)',
                }}
              >
                <span>Total Emission:</span>
                <span className="total-val" id="six-month-total">
                  {total.toFixed(0)} kg
                </span>
              </div>
            </div>
            <div className="chart-container-right w-full h-[350px] relative">
              <canvas id="trendChart" ref={trendRef} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
