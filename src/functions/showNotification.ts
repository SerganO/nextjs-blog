export function showMessageNotification(message: string) {
    window?.alert(message);
}

export function showErrorNotification(error: Error) {
   showMessageNotification(error.message)
}


