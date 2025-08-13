// src/Pages/SearchPage.jsx
import React, { useContext, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import { useProductFuse, expandQuery } from '../utils/useSearch';
import Item from '../Components/Item/Item';
import './CSS/SearchPage.css'

export default function SearchPage() {
  const { all_product } = useContext(ShopContext);
  const [params] = useSearchParams();
  const q = (params.get('q') || '').trim();

  const fuse = useProductFuse(all_product);

  const matches = useMemo(() => {
    if (!fuse || q.length < 1) return [];
    const expanded = expandQuery(q);
    return fuse.search(expanded).map((r) => r.item);
  }, [fuse, q]);

  return (
    <div className="search-page container">
      <h1>Search</h1>
      <p className="search-subtitle">
        {q ? <>Showing {matches.length} result(s) for <strong>“{q}”</strong></> : 'Type a query to search.'}
      </p>

      {q && matches.length === 0 && (
        <div className="search-zero">
          <p>No results found.</p>
          <div className="chips">
            <span>Try:</span>
            <button onClick={() => window.location.search = '?q=plush'}>plush</button>
            <button onClick={() => window.location.search = '?q=kitty'}>kitty</button>
            <button onClick={() => window.location.search = '?q=cup'}>cup</button>
          </div>
        </div>
      )}

      <div className="search-grid">
        {matches.map((p) => (
          <Item
            key={p.id}
            id={p.id}
            name={p.name}
            image={p.image}
            new_price={p.new_price}
            old_price={p.old_price}
          />
        ))}
      </div>
    </div>
  );
}
