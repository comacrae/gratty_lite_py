import { FastApiPost, FastApiPostItem } from "../types";
export function isFastApiPost(obj: any): obj is FastApiPost {
  return obj && typeof obj.owner_id === "number";
}

export function convertFastApiDate(timeCreated: string) {
  const date = new Date(Date.parse(timeCreated));
  return {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  };
}

export function convertFastApiPostItemsToStrings(list: FastApiPostItem[]) {
  return list.map((value, index) => {
    return value.text;
  });
}
