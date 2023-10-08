import BaseClientContext from "src/di/baseClientContext";
import { ToastOptions, toast } from "react-toastify";

export default class ToastEmitter extends BaseClientContext {
  private defaultMessageParams: ToastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

  private defaultErrorParams: ToastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

  public message(message: string, params: ToastOptions = null) {
    toast(message, params == null ? this.defaultMessageParams : params);
  }

  public errorMessage(message: string, params: ToastOptions = null) {
    toast.error(message, params == null ? this.defaultErrorParams : params);
  }
}
