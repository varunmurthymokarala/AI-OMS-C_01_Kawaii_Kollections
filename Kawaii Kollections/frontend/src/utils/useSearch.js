// src/utils/useSearch.js
import { useMemo } from 'react';
import Fuse from 'fuse.js';

export function useProductFuse(products) {
  return useMemo(() => {
    if (!products || !products.length) return null;

    // Build index once, reuse
    const fuse = new Fuse(products, {
      includeScore: true,
      shouldSort: true,
      minMatchCharLength: 2,
      threshold: 0.35, // typo tolerance; lower = stricter
      keys: [
        { name: 'name', weight: 0.5 },
        { name: 'tags', weight: 0.3 },
        { name: 'category', weight: 0.2 },
        { name: 'subcategory', weight: 0.2 },
        { name: 'description', weight: 0.15 },
        { name: 'aliases', weight: 0.15 },
      ],
    });

    return fuse;
  }, [products]);
}

// Optional tiny synonyms map (expand user query a bit)
const SYNONYMS = {
  kitty: ['cat'],
  perfume: ['fragrance'],
  'black box': ['mystery box', 'blind box'],
  tumbler: ['cup'],
  phonecase: ['phone case'],
  plushy: ['plush', 'plushie'],
};

export function expandQuery(q) {
  if (!q) return q;
  const norm = q.toLowerCase().trim();
  const parts = [norm];

  Object.entries(SYNONYMS).forEach(([k, vals]) => {
    if (norm.includes(k)) vals.forEach(v => parts.push(norm.replace(k, v)));
  });

  // naive plural singular tweak
  if (norm.endsWith('s')) parts.push(norm.slice(0, -1));
  return Array.from(new Set(parts)).join(' ');
}
