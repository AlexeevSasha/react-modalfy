import { PopupEvent } from "@/utils/events/popuEvent";
import { PopupEventNames } from "@/interfaces/popupEventNames";
import { generateId } from "@/helpers/generateId";
import { IModal } from "@/interfaces/modal";
import { ReactElement } from "react";

class ModalEvent extends PopupEvent<IModal> {
  constructor() {
    super();
  }

  open(element: ReactElement, details?: Omit<IModal, "id" | "children">) {
    this.emit(PopupEventNames.OPEN_MODAL, { id: generateId(), ...details, children: element });
  }

  close(id: string) {
    this.emit<{ id: string }>(PopupEventNames.CLOSE_MODAL, { id });
  }
}

export const modalEvent = new ModalEvent();
