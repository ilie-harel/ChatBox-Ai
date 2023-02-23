import { toast } from "react-toastify"

class ToastAlerts {
    toastError(message) {
        return toast.error(message, {
            position: 'top-right'
        })
    }
    toastSuccess(message) {
        return toast.success(message, {
            position: 'top-right'
        })
    }
    toastInfo(message) {
        return toast.info(message, {
            position: 'top-right'
        })
    }
}

export const toastsFunctions = new ToastAlerts()