// src/Components/Search/SearchBox.jsx
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import './Searchbox.css';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import { expandQuery, useProductFuse } from '../../utils/useSearch';

const DEBOUNCE_MS = 250;
const MAX_DROPDOWN_ITEMS = 6;

export default function SearchBox() {
  const navigate = useNavigate();
  const { all_product } = useContext(ShopContext);
  const fuse = useProductFuse(all_product);

  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState([]);
  const boxRef = useRef(null);
  const inputRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(-1);

  // debounce search
  useEffect(() => {
    if (!fuse) return;
    const id = setTimeout(() => {
      const query = q.trim();
      if (query.length < 2) {
        setResults([]);
        return;
      }
      const expanded = expandQuery(query);
      const hits = fuse.search(expanded);
      setResults(hits.map(h => h.item));
    }, DEBOUNCE_MS);
    return () => clearTimeout(id);
  }, [q, fuse]);

  // click outside to close
  useEffect(() => {
    function onDocClick(e) {
      if (!boxRef.current) return;
      if (!boxRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  const top = useMemo(() => results.slice(0, MAX_DROPDOWN_ITEMS), [results]);

  function goToAll() {
    const query = q.trim();
    if (!query) return;
    setOpen(false);
    navigate(`/search?q=${encodeURIComponent(query)}`);
  }

  function goToProduct(id) {
    setOpen(false);
    navigate(`/product/${id}`);
  }

  function onKeyDown(e) {
    if (!open && (e.key === 'ArrowDown' || e.key === 'Enter')) {
      setOpen(true);
      return;
    }
    if (!open) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx(i => Math.min(i + 1, top.length)); // last index reserved for "view all"
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx(i => Math.max(i - 1, -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIdx === -1) {
        goToAll();
      } else if (activeIdx < top.length) {
        goToProduct(top[activeIdx].id);
      } else {
        goToAll();
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  }

  return (
    <div className="nav-search" ref={boxRef}>
      <input
        ref={inputRef}
        className="search-input"
        type="text"
        placeholder="Search gifts, plushies, phone cases…"
        value={q}
        onChange={(e) => { setQ(e.target.value); setOpen(true); setActiveIdx(-1); }}
        onFocus={() => { if (q.trim().length >= 2) setOpen(true); }}
        onKeyDown={onKeyDown}
        aria-label="Search"
      />

      {open && q.trim().length >= 2 && (
        <div className="search-dropdown" role="listbox">
          {top.length > 0 ? (
            <>
              {top.map((p, i) => (
                <button
                  key={p.id}
                  className={`search-item ${activeIdx === i ? 'active' : ''}`}
                  onMouseEnter={() => setActiveIdx(i)}
                  onClick={() => goToProduct(p.id)}
                >
                  <img src={p.image} alt={p.name} className="search-thumb" />
                  <div className="search-item-meta">
                    <div className="search-item-name">{p.name}</div>
                    <div className="search-item-meta-row">
                      <span className="pill">{p.category}{p.subcategory ? ` / ${p.subcategory}` : ''}</span>
                      <span className="price">${Number(p.new_price).toFixed(2)}</span>
                    </div>
                  </div>
                </button>
              ))}

              {results.length > MAX_DROPDOWN_ITEMS && (
                <button
                  className={`search-more ${activeIdx === top.length ? 'active' : ''}`}
                  onMouseEnter={() => setActiveIdx(top.length)}
                  onClick={goToAll}
                >
                  View all results for “{q.trim()}”
                </button>
              )}
            </>
          ) : (
            <div className="search-empty">
              <div>No results for “{q.trim()}”.</div>
              <div className="suggestions">
                Try: <button onClick={() => setQ('plush')}>plush</button>
                <button onClick={() => setQ('kitty')}>kitty</button>
                <button onClick={() => setQ('phone case')}>phone case</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
