import { useState } from 'react';
import "../../styles/ImageGallery.css";

export default function ImageGallery({ main, images = [] }) {
  const all = images?.length ? [main, ...images] : [main].filter(Boolean);
  const [current, setCurrent] = useState(all[0]);

  if (!all.length) return null;

  return (
    <div className="ig-wrap">
      <div className="ig-main">
        <img src={current} alt="" />
      </div>
      {all.length > 1 && (
        <div className="ig-thumbs">
          {all.map((src, idx) => (
            <button
              type="button"
              key={idx}
              className={`ig-thumb ${src === current ? 'active' : ''}`}
              onClick={() => setCurrent(src)}
            >
              <img src={src} alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
