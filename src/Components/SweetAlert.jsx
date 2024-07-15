import React, { useEffect } from 'react';
import Swal from 'sweetalert2';

const SweetAlert = ({ show, title, text, icon, onConfirm }) => {
  useEffect(() => {
    if (show) {
      Swal.fire({
        title,
        text,
        icon,
        confirmButtonText: 'OK'
      }).then(() => {
        if (onConfirm) {
          onConfirm();
        }
      });
    }
  }, [show, title, text, icon, onConfirm]);

  return null;
};

export default SweetAlert;
