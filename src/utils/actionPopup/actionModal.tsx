import { ActionPopup, IActionPopupParams } from "@/utils/actionPopup/actionPopup";
import { IModal } from "@/interfaces/modal";
import { Modal } from "@/components/modal/Modal";
import styles from "@/components/modal/modal.module.scss";

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
        el.classList.add(!i ? styles.contentClose : styles.backdropClose);
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
