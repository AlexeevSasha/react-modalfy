import { MutableRefObject, ReactElement } from "react";

type PopupT = Map<string, ReactElement>;

export interface IRootPopup {
  drawer: PopupT;
  modal: PopupT;
}

export interface IPopupParam {
  previous: MutableRefObject<IRootPopup>;
  setPopupsCb: (name: keyof IRootPopup, popup: PopupT) => void;
}
