import { generateId } from "@/common/utils/generateId";
import { ReactElement } from "react";
import { IDrawer, IDrawerOptions } from "@/module/drawer/interfaces/drawer";
import { PopupEvent } from "@/common/utils/popuEvent";
import { PopupEventNames } from "@/common/interfaces/popupEventNames";

class DrawerEvent extends PopupEvent<IDrawer> {
  constructor() {
    super();
  }

  open(element: ReactElement, options?: IDrawerOptions) {
    this.emit(PopupEventNames.OPEN_DRAWER, { id: generateId(), ...options, children: element });
  }

  close(id: string) {
    this.emit<{ id: string }>(PopupEventNames.CLOSE_DRAWER, { id });
  }
}

export const drawerEvent = new DrawerEvent();
