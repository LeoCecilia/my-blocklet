export const setItem = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getItem = (key: string) => {
  const result = localStorage.getItem(key);
  if (result) {
    return JSON.parse(result);
  }
  return null;
};
