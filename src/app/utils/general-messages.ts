import Swal from 'sweetalert2';

export const GenericErrorMessage = (): void => {
  Swal.fire('Oops... something went wrong', '', 'error');
};

export const SuccessMessage = (message: string): void => {
  Swal.fire(message, '', 'success');
};
