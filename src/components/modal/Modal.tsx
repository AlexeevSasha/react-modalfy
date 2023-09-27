import { Children, cloneElement, isValidElement, ReactNode, useEffect, useMemo } from "react";
import styles from "./modal.module.scss";
import { IModal } from "@/interfaces/modal";
import { useDebouncePopup } from "@/hooks/useDebouncePopup";
import { modalEvent } from "@/utils/events/modalEvent";
import { classNames } from "@/lib/classNames";

export const Modal = ({ id, children, ...attr }: IModal) => {
  const { closeModal, isClose } = useDebouncePopup({
    cb: () => {
      attr?.callbackAnimationEnd?.();
      modalEvent.close(id);
    },
    delay: 250,
  });

  const onBackdropClick = () => {
    if (attr?.closeBackdropClick !== false) closeModal();
    attr?.callbackBackdropClick?.();
  };

  const modifiedChildren = useMemo(
    () =>
      Children.map(children, (child: ReactNode) => {
        if (isValidElement(child)) {
          return cloneElement(child, { modalid: id } as object);
        }
        return child;
      }),
    [],
  );

  useEffect(() => {
    return () => {
      attr?.callbackAfterClose?.();
    };
  }, []);

  return (
    <div data-id={`modalfy-modal-${id}`} className={styles.modal}>
      <div
        className={classNames(styles.content, {
          [styles.contentClose]: isClose,
        })}
      >
        {modifiedChildren}
      </div>
      <div
        role='presentation'
        onClick={onBackdropClick}
        className={classNames(styles.backdrop, {
          [styles.backdropClose]: isClose,
        })}
      />
    </div>
  );
};
