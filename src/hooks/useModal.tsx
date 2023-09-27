import { useEffect, useMemo } from "react";
import { IPopupParam } from "@/interfaces/popup";
import { ActionModal } from "@/utils/actionPopup/actionModal";
import { modalEvent } from "@/utils/events/modalEvent";
import { PopupEventNames } from "@/interfaces/popupEventNames";

export const useModal = ({ previous, setPopupsCb }: IPopupParam) => {
  const modal = useMemo(
    () =>
      new ActionModal({
        type: "modal",
        popups: previous.current["modal"],
        setPopups: setPopupsCb,
      }),
    [],
  );

  useEffect(() => {
    modalEvent.on(PopupEventNames.OPEN_MODAL, modal.handlerAdd);
    modalEvent.on(PopupEventNames.CLOSE_MODAL, modal.handlerRemove);

    return () => {
      modalEvent.off(PopupEventNames.OPEN_MODAL, modal.handlerAdd);
      modalEvent.off(PopupEventNames.CLOSE_MODAL, modal.handlerRemove);
    };
  }, []);
};
