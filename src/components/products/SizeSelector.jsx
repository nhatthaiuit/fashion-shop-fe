import { useState, useEffect } from 'react';
import "../../styles/SizeSelector.css";

export default function SizeSelector({ sizes = [], onChange }) {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    onChange?.(selected);
  }, [selected, onChange]);

  // Nếu BE chưa có sizes, bạn có thể set default list:
  const options = sizes?.length ? sizes : [
    { label: 'S', stock: 0 },
    { label: 'M', stock: 0 },
    { label: 'L', stock: 0 },
    { label: 'XL', stock: 0 },
  ];

  return (
    <div className="size-wrap">
      {options.map(({ label, stock }) => {
        const disabled = stock <= 0;
        const active = selected === label;
        return (
          <button
            key={label}
            type="button"
            className={`size-btn ${active ? 'active' : ''} ${disabled ? 'disabled' : ''}`}
            disabled={disabled}
            onClick={() => setSelected(label)}
            title={disabled ? 'Out of Stock' : `In stock: ${stock}`}
          >
            <span className="size-text">{label}</span>
            {disabled && <span className="size-cross" aria-hidden>╳</span>}
          </button>
        );
      })}
    </div>
  );
}
