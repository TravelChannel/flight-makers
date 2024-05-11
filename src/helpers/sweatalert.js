import Swal from 'sweetalert2';

export const handleShowErrorAlert = (errorText) => {
    Swal.fire({
      icon: 'error',
      // title: 'Oops...',
      title: 'Apologies...',
      text: errorText,
      // footer: '<a href="">Please Enter Correct Data</a>'
    });
  };