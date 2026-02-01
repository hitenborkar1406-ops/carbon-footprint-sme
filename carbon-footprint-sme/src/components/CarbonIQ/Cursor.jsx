import { useEffect, useState } from 'react';

export default function Cursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const onLeave = () => setVisible(false);
    window.addEventListener('mousemove', onMove);
    document.body.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.body.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <div
        className="cursor-dot fixed w-2 h-2 rounded-full pointer-events-none z-[9999]"
        style={{
          left: pos.x,
          top: pos.y,
          background: 'var(--color-primary)',
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div
        className="cursor-outline fixed w-10 h-10 rounded-full pointer-events-none z-[9998] border border-[var(--color-text-muted)] opacity-50"
        style={{
          left: pos.x,
          top: pos.y,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  );
}
