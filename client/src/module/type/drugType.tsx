//interface
export interface drugType {
  entpName?: drugObjType,
  itemName?: drugObjType,
  itemSeq?: drugObjType,
  efcyQesitm?: drugObjType,
  useMethodQesitm?: drugObjType,
  atpnWarnQesitm?: drugObjType,
  atpnQesitm?: drugObjType,
  intrcQesitm?: drugObjType,
  seQesitm?: drugObjType,
  depositMethodQesitm?: drugObjType,
  openDe?: drugObjType,
  updateDe?: drugObjType,
  itemImage?: drugObjType
  length?: number;
}

export interface drugObjType {
  _text?: string,
}