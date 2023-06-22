import Swal, { SweetAlertIcon } from "sweetalert2";
export function validateEmail(inputText: string): boolean {
  const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (inputText.match(mailformat)) {
    return true;
  } else {
    return false;
  }
}
export function validateUserName(inputText: string): boolean {
  const userFormat = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/;
  if (inputText.match(userFormat)) {
    return true;
  } else {
    return false;
  }
}

export function swalFire(title: string, text: string, icon: SweetAlertIcon) {
  return Swal.fire({
    title: title,
    text: text,
    icon: icon,
    showConfirmButton: false,
    timer: 1000,
  });
}
