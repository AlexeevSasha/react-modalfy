import { PopupEvent } from "@/utils/events/popuEvent";
import { PopupEventNames } from "@/interfaces/popupEventNames";
import { generateId } from "@/helpers/generateId";
import { IModal, IModalOptions } from "@/interfaces/modal";
import { ReactElement } from "react";

class ModalEvent extends PopupEvent<IModal> {
  constructor() {
    super();
  }

  open(element: ReactElement, options?: IModalOptions) {
    this.emit(PopupEventNames.OPEN_MODAL, { id: generateId(), ...options, children: element });
  }

  close(id: string) {
    this.emit<{ id: string }>(PopupEventNames.CLOSE_MODAL, { id });
  }
}

export const modalEvent = new ModalEvent();
