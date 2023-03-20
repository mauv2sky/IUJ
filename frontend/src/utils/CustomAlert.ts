import Swal from 'sweetalert2';
import '../styles/variable.scss';

export const customAlert = (text: string) => {
  Swal.fire({ text, confirmButtonText: '확인', confirmButtonColor: 'rgba(255, 148, 148, 1)' });
};
