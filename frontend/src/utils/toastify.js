import { toast } from "react-toastify";

export const toastifySuccess = (msg, position = "top-center") => {
  toast.success(msg, {
    position,
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
