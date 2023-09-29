import { ActionPopup, IActionPopupParams } from "@/common/utils/actionPopup";
import { Modal } from "@/module/modal/components/Modal";
import cls from "@/module/modal/components/modal.module.scss";
import clsPopup from "@/styles/popup.module.scss";
import { IModal } from "@/module/modal/interfaces/modal";

export class ActionModal extends ActionPopup<IModal> {
  constructor(params: IActionPopupParams) {
    super(params);
    this.handlerAdd = this.handlerAdd.bind(this);
    this.handlerRemove = this.handlerRemove.bind(this);
  }

  private removeAll() {
    for (const [id] of this.popups) {
      const modals = document.querySelector(`[data-id="modalfy-modal-${id}"]`);
      [...modals.children].forEach((el, i) => {
        el.classList.add(!i ? cls.contentClose : clsPopup.backdropClose);
      });
    }
    this.popups.clear();
  }

  private add(details: IModal) {
    const map = this.popups;
    const { children, ...attr } = details;
    map.set(
      details.id,
      <Modal key={details.id} {...attr}>
        {children}
      </Modal>,
    );
    this.setPopups("modal", map);
  }

  handlerAdd({ detail }: { detail: IModal }) {
    if (detail.closePrevious) {
      this.removeAll();
      setTimeout(() => {
        this.add(detail);
      }, 240);
    } else {
      this.add(detail);
    }
  }
}
