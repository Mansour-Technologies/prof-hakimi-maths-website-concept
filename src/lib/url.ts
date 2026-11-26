/** Prefix an internal path with the configured base (GitHub Pages sub-path). */
export const url = (path = '') => {
  const base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : import.meta.env.BASE_URL + '/';
  return base + path.replace(/^\//, '');
};
