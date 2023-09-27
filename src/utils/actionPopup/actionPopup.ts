import { IPopupParam, IRootPopup, PopupT } from "@/interfaces/popup";

export interface IActionPopupParams {
  type: keyof IRootPopup;
  popups: PopupT;
  setPopups: IPopupParam["setPopupsCb"];
}

export class ActionPopup<T extends { id: string }> {
  private readonly _popups: PopupT;
  private readonly type: keyof IRootPopup;
  protected readonly setPopups: IPopupParam["setPopupsCb"];

  constructor({ type, setPopups, popups }: IActionPopupParams) {
    this._popups = popups;
    this.setPopups = setPopups;
    this.type = type;
  }

  protected get popups() {
    return this._popups;
  }

  handlerRemove({ detail }: { detail: T }) {
    this.popups.delete(detail.id);
    this.setPopups(this.type, this.popups);
  }
}
