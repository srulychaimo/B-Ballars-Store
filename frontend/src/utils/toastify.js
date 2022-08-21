import { toast } from "react-toastify";

export const toastifySuccess = (msg, position = "top-center") => {
  toast.success(msg, {
    position,
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
