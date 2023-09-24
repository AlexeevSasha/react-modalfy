import styles from "./modal.module.scss";
import { IModal } from "@/interfaces/modal";
import { useDebouncePopup } from "@/hooks/useDebouncePopup";
import { modalEvent } from "@/utils/events/modalEvent";
import { classNames } from "@/lib/classNames";

export const Modal = ({ id, children }: IModal) => {
  const { closeModal, isClose } = useDebouncePopup({
    cb: () => modalEvent.close(id),
    delay: 250,
  });

  return (
    <div className={styles.modal}>
      <div
        className={classNames(styles.content, {
          [styles.contentClose]: isClose,
        })}
      >
        {children}
      </div>
      <div
        data-testid='close-modal'
        role='presentation'
        onClick={closeModal}
        className={classNames(styles.backdrop, {
          [styles.backdropClose]: isClose,
        })}
      />
    </div>
  );
};
