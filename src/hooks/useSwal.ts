import { useCallback } from 'react';
import Swal, { SweetAlertIcon, SweetAlertPosition } from 'sweetalert2'

const useSwal = () => {
    const SwalInstance = Swal.mixin({
        position: 'center',
        toast: false
    });

    /**
     * @function
     * @param {SweetAlertIcon} icon "success" | "error" | "warning" | "info" | "question"
     * @param {String} title
     * @param {Number} timer
     * @param {Boolean} timerProgressBar
     * @param {position} timerProgressBar "top" | "top-start" | "top-end" | "top-left" | "top-right" | "center" | "center-start" | "center-end" | "center-left" | "center-right" | "bottom" | "bottom-start" | "bottom-end" | "bottom-left" | "bottom-right"
     * @param {Boolean} showConfirmButton
     */
    const toast = useCallback((
        icon: SweetAlertIcon = "success",
        title: string = "Exito!",
        timer: number = 1500,
        timerProgressBar: boolean = true,
        position: SweetAlertPosition = "top-end",
        showConfirmButton: boolean = false,
        popupClasses: string = "" // Margen superior personalizable
    ): Promise<import("sweetalert2").SweetAlertResult<any>> => {
        return SwalInstance.fire({
            icon,
            title,
            timer,
            timerProgressBar,
            toast: true,
            position,
            showConfirmButton,
            // Añade estilo personalizado
            customClass: {
                popup: popupClasses // Tailwind CSS (usando JIT)
            }
        });
    }, []);

    /**
     * @function
     * @param {SweetAlertIcon} icon "success" | "error" | "warning" | "info" | "question"
     * @param {String} title
     * @param {Number} timer
     * @param {Boolean} timerProgressBar
     * @param {position} timerProgressBar "top" | "top-start" | "top-end" | "top-left" | "top-right" | "center" | "center-start" | "center-end" | "center-left" | "center-right" | "bottom" | "bottom-start" | "bottom-end" | "bottom-left" | "bottom-right"
     * @param {Boolean} showConfirmButton
     */
    const alert = useCallback((
        icon: SweetAlertIcon = "success",
        title: any = "Exito!",
        timer: number = 5000,
        timerProgressBar: boolean = true,
        position: SweetAlertPosition = "center",
        showConfirmButton: boolean = false,
        willClose = () => { },
        html: any = ""
    ): Promise<import("sweetalert2").SweetAlertResult<any>> => {
        return SwalInstance.fire({
            icon,
            title,
            timer,
            timerProgressBar,
            toast: false,
            position,
            showConfirmButton,
            willClose,
            html
        });
    }, []);

    const question = useCallback((
        title: string = "¿Esta seguro de continuar?",
        showCancelButton: boolean = true,
        confirmButtonText: string = 'Continuar',
        denyButtonText: string = 'Cancelar',
        position: SweetAlertPosition = "center",
        showConfirmButton: boolean = true
    ): Promise<any> => {
        return new Promise<any>((resolve, reject) => {

            SwalInstance.fire({
                icon: "question",
                title,
                showConfirmButton,
                showDenyButton: false,
                showCancelButton,
                confirmButtonText,
                position,
                denyButtonText
            }).then((result) => {
                if (result.isConfirmed) {
                    resolve(result)
                }
            }).catch((err) => {
                reject(err)
            })
        });
    }, []);

    const selectOptions = useCallback((title: string = "Seleccione una opción", options: any, value: string = "") => {
        return new Promise<any>((resolve, reject) => {
            SwalInstance.fire({
                icon: "info",
                title,
                showConfirmButton: true,
                showCancelButton: true,
                position: "center",
                input: 'select',
                inputPlaceholder: 'Selecciona una opción',
                inputOptions: options,
                inputValue: value
            }).then((result) => {
                if (result.isConfirmed) {
                    resolve(result)
                    return
                }
                reject(result)
            })
        })
    }, []);

    const promptInput = useCallback((
        title: string = "Ingresa la información",
        inputType: any = "text",
        inputLabel: string = "",
        inputPlaceholder: string = "Ingresa la información aqui"
    ) => {//email
        return new Promise<any>((resolve, reject) => {
            Swal.fire({
                title,
                input: inputType,
                inputLabel,
                inputPlaceholder,
                showCancelButton: true
            }).then((result) => {
                if (result.isConfirmed) {
                    resolve(result)
                    return
                }
                reject(result)
            });
        });
    }, []);

    return { alert, toast, question, promptInput, selectOptions, swalClose: SwalInstance.close };
}

export default useSwal;