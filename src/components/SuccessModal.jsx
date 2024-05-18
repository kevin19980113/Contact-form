import successImg from "../assets/icon-success-check.svg";
import { createPortal } from "react-dom";
import { useRef, forwardRef, useImperativeHandle } from "react";

const SuccessModal = forwardRef(function SuccessModal({ props }, ref) {
  const modal = useRef();

  useImperativeHandle(
    ref,
    () => {
      return {
        open() {
          modal.current.showModal();
        },
        close() {
          modal.current.close();
        },
      };
    },
    []
  );

  return createPortal(
    <dialog ref={modal} className="success-modal">
      <header className="modal-header">
        <img src={successImg} alt="success" />
        <h3>Message Sent!</h3>
      </header>
      <p>Thanks for completing the form, We will be touch in soon!</p>
    </dialog>,
    document.getElementById("modal")
  );
});

export default SuccessModal;
