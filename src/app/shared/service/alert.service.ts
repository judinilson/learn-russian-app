import { Injectable } from '@angular/core'
import Swal from 'sweetalert2/dist/sweetalert2.all'


@Injectable()
export class AlertService {
    constructor(){}

    /*
    SWEET ALERT DIALOGS: 
  */
  openSweetAlertToast(icon: string, message: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: icon,
      title: message//'User is successfully created'
    })

  }

  openSweetAlert(icon: string, title: string) {
    Swal.fire({
      position: 'top-end',
      icon: icon,
      title: title,
      showConfirmButton: false,
      timer: 2000
    })
  }

}

