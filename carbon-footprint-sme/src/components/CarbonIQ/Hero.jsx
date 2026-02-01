import { useApp } from '../../context/AppContext';
import { useEffect, useRef } from 'react';

export default function Hero() {
  const { scrollToSection } = useApp();
  const heroRef = useRef(null);
  const visualRef = useRef(null);

  useEffect(() => {
    let VanillaTilt;
    import('vanilla-tilt').then((m) => {
      VanillaTilt = m.default;
      if (visualRef.current && VanillaTilt) {
        VanillaTilt.init(visualRef.current, { glare: true, 'max-glare': 0.5 });
        const cards = visualRef.current.querySelectorAll('[data-tilt]');
        cards.forEach((el) => VanillaTilt.init(el, {}));
      }
    });
    return () => {
      if (visualRef.current && visualRef.current.vanillaTilt) {
        visualRef.current.vanillaTilt.destroy();
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          heroRef.current?.querySelectorAll('.reveal').forEach((el) => el.classList.add('active'));
        }
      },
      { threshold: 0.2 }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="home" className="hero-section min-h-screen flex items-center justify-center pt-20">
      <div className="container max-w-[1200px] w-[90%] mx-auto">
        <div className="hero-grid grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-16 items-center">
          <div ref={heroRef} className="hero-text reveal">
            <h1
              className="text-[56px] leading-tight font-extrabold mb-6 tracking-tight"
              style={{ color: 'var(--color-text-main)', letterSpacing: '-1.5px' }}
            >
              Turn Sustainability <br /> into{' '}
              <span className="gradient-text">Profitability.</span>
            </h1>
            <p
              className="text-lg mb-10 max-w-[480px]"
              style={{ color: 'var(--color-text-muted)' }}
            >
              The first ROI-centric carbon estimator for SMEs. We don't just measure your
              footprint; we calculate the money you save by reducing it.
            </p>
            <div className="hero-btns flex gap-4">
              <button
                type="button"
                className="btn-primary flex items-center gap-2.5 px-8 py-3.5 rounded-lg font-bold cursor-pointer transition-all duration-300 border-0 text-white"
                style={{
                  background: 'var(--color-primary)',
                }}
                onClick={() => scrollToSection('calculator')}
              >
                Start Estimation <i className="ri-arrow-right-line" />
              </button>
              <button
                type="button"
                className="btn-secondary flex items-center gap-2.5 px-8 py-3.5 rounded-lg font-semibold cursor-pointer transition-colors border"
                style={{
                  background: 'transparent',
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-text-main)',
                }}
                onClick={() => scrollToSection('planning')}
              >
                <i className="ri-play-circle-line" /> View Plan
              </button>
            </div>
          </div>

          <div
            ref={visualRef}
            className="hero-visual relative perspective-1000 transform-style-3d hidden md:block"
            data-tilt
            data-tilt-glare
            data-tilt-max-glare="0.5"
            style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
          >
            <div className="glass-card main-card">
              <div className="card-glow" />
              <div className="card-header">
                <div className="scan-line" />
                <div className="circle red" />
                <div className="circle yellow" />
                <div className="circle green" />
              </div>
              <div className="card-content">
                <div className="graph-bar">
                  <div className="bar-fill" style={{ width: '70%' }} />
                </div>
                <div className="graph-bar">
                  <div className="bar-fill delay-1" style={{ width: '45%' }} />
                </div>
                <div className="graph-bar">
                  <div className="bar-fill delay-2" style={{ width: '60%' }} />
                </div>
              </div>
              <div className="holo-overlay" />
            </div>
            <div className="float-card float-1" data-tilt>
              <div className="icon-sq">
                <i className="ri-money-dollar-circle-line" />
              </div>
              <div>
                <span>Est. Savings</span>
                <h4>$12,450</h4>
              </div>
            </div>
            <div className="float-card float-2" data-tilt>
              <div className="icon-sq green">
                <i className="ri-leaf-line" />
              </div>
              <div>
                <span>Carbon Reduced</span>
                <h4>-24%</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
