import 'izitoast/dist/css/iziToast.min.css'
import iZtoast from 'izitoast'

const toast = {
    error: (message, title = 'Error') => {
        return iZtoast.error({
            // title: title,
            message: message,
            position: 'bottomCenter',
            messageSize: '20',
            icon: ''

        });
    },
    success: (message, title = 'Success') => {
        return iZtoast.success({
            // title: title,
            message: message,
            position: 'topRight',
            messageSize: '20',
            icon: ''
        });
    }
};

export default toast;