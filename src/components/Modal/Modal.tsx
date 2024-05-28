import React, { PropsWithChildren } from "react";
import styles from "./Modal.module.css";
import { IoMdClose } from "react-icons/io";

import { createPortal } from "react-dom";
import { FocusOn } from "react-focus-on";

interface ModalProps {
  onModalClose: () => void;
  children: React.ReactNode;
}

function Modal({
  onModalClose,
  children,
}: PropsWithChildren<ModalProps>): JSX.Element {
  const modalContainer = document.getElementById("modal") as
    | Element
    | DocumentFragment;

  return createPortal(
    <FocusOn onEscapeKey={onModalClose}>
      <div className="modal" role="dialog">
        <div className={styles.overlay}></div>
        <div className={styles.modalContainer}>
          <div className={styles.closeBtn}>
            <IoMdClose
              size={40}
              onClick={onModalClose}
              data-testid="close-icon"
            />
          </div>
          <div className={styles.modalContent}>{children}</div>
        </div>
      </div>
      ,
    </FocusOn>,
    modalContainer
  );
}

export default Modal;
