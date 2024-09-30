import { Bounce, toast } from "react-toastify";

export function showToast(message, type = "error") {
  toast(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
    type
  });
}
