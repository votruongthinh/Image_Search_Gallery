const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export const fetchImages = async (query) => {
  const res = await fetch(
    `https://api.unsplash.com/search/photos?page=1&query=${query}&per_page=10&client_id=${ACCESS_KEY}`
  );
  const data = await res.json();
  return data.results;
};
