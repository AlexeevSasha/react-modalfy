import { useCallback, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { usePrevious } from "@/common/hooks/usePrevious";
import { useModal } from "@/module/modal/hooks/useModal";
import { useDrawer } from "@/module/drawer/hooks/useDrawer";
import { IPopupParam, IRootPopup } from "@/common/interfaces/popup";

export const PopupContainer = () => {
  const [popups, setPopups] = useState<IRootPopup>({ drawer: new Map(), modal: new Map() });
  const previous = usePrevious(popups);

  const setPopupsCb: IPopupParam["setPopupsCb"] = useCallback((name, map) => {
    setPopups((prev) => ({ ...prev, [name]: map }));
  }, []);

  useModal({ setPopupsCb, previous });
  useDrawer({ setPopupsCb, previous });

  const render = useMemo(
    () =>
      Object.entries(popups).map(([type, values]) =>
        values.size ? (
          <div key={type} data-id={`modalfy-${type}`}>
            {Array.from(values.values())}
          </div>
        ) : null,
      ),
    [popups],
  );

  return createPortal(render, document.body);
};
