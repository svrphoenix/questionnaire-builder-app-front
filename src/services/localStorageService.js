const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const loadFromLocalStorage = key => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

const removeFromLocalStorage = key => {
  localStorage.removeItem(key);
};

export { saveToLocalStorage, loadFromLocalStorage, removeFromLocalStorage };
