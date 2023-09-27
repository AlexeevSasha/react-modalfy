import { ReactNode } from "react";

export interface IModalOptions {
  closePrevious?: boolean;
  closeBackdropClick?: boolean;
  callbackAfterClose?: () => void;
  callbackBackdropClick?: () => void;
  callbackAnimationEnd?: () => void;
}

export interface IModal extends IModalOptions {
  id: string;
  children: ReactNode;
}
