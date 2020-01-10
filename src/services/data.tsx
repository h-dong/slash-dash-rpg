const name = "SLASH_DASH_RPG";

export function setData(data: any) {
  const current = getData();
  const value = JSON.stringify({ ...current, ...data });
  localStorage.setItem(name, value);
}

export function getData() {
  const storedData: any = localStorage.getItem(name);
  return JSON.parse(storedData) || {};
}

export function clearData() {
  localStorage.removeItem(name);
}
