import { FastApiPost, FastApiPostItem, FastApiStatusResponse } from "../types";
export function isFastApiPost(obj: any): obj is FastApiPost {
  return obj && typeof obj.owner_id === "number";
}

export function isFastApiStatusResponse(
  obj: any
): obj is FastApiStatusResponse {
  return obj && typeof obj.success === "boolean";
}

export function isFastApiPostList(obj: any): obj is FastApiPost[] {
  if (obj == null) return false;
  if (obj.constructor != Array) return false;
  if (obj.length > 0) return isFastApiPost(obj);
  return true;
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
