import {
  CharacterInterface,
  EquipmentsInterface,
  InventoryItemInterface
} from "../machines/GameMachine";

const name = "SLASH_DASH_RPG";

export interface DataInterface {
  character: CharacterInterface;
  equipments: EquipmentsInterface;
  inventory: InventoryItemInterface[];
}

export function setData(data: DataInterface) {
  const current = getData();
  const value = JSON.stringify({ ...current, ...data });
  localStorage.setItem(name, value);
}

export function getData(): DataInterface {
  const storedData: any = localStorage.getItem(name);
  return JSON.parse(storedData) || {};
}

export function clearData() {
  localStorage.removeItem(name);
}
