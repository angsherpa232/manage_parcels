import React from "react";

import styles from "./errormodal.module.css";

const ErrorModal = React.memo(props => {
  return (
    <>
      <div className={styles.backdrop} onClick={props.onClose} />
      <div className={styles.error_modal}>
        <h2>An Error Occurred!</h2>
        <p>{props.children}</p>
        <div className={styles.error_modal__actions}>
          <button type="button" onClick={props.onClose}>
            Okay
          </button>
        </div>
      </div>
    </>
  );
});

export default ErrorModal;
