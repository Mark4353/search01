const KEY = "movies";

export function getSaved() {
  return JSON.parse(localStorage.getItem(KEY)) || [];
}

export function save(movie) {
  const list = getSaved();
  localStorage.setItem(KEY, JSON.stringify([...list, movie]));
}

export function remove(id) {
  const list = getSaved().filter(m => m.id !== id);
  localStorage.setItem(KEY, JSON.stringify(list));
}
