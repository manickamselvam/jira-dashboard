import Swal from 'sweetalert2';

export const notifySuccess = (title = 'Success', text = '') => {
  Swal.fire({
    icon: 'success',
    title,
    text,
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
};

export const notifyError = (title = 'Error', text = '') => {
  Swal.fire({
    icon: 'error',
    title,
    text,
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
};

export const notifyInfo = (title = 'Info', text = '') => {
  Swal.fire({
    icon: 'info',
    title,
    text,
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
};
