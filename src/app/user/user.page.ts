import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonModal } from '@ionic/angular';
import { User } from 'firebase/auth';
import { Observable } from 'rxjs';
import { Producto } from '../models';
import { AreasService } from '../services/areas.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage  {
  data: any = {
    acomp: 0,
    numsala: '',
    tiempo: '',
    motivo: ''
  };

  niveles: any[] = [
    {id:1, nivel:'5min - 15min'},
    {id:2, nivel:'5min - 30min'},
    {id:3, nivel:'30min - 60min'},
  ];
  @ViewChild(IonModal) modal: IonModal;
  productos: Producto[] = [];
  public path = 'Productos/';
  card: { img: string, titulo: string, desc: string }[] = [
    {
      img: '/assets/Bibloteca.jpg',
      titulo: 'Bibloteca Duoc ',
      desc: 'Mira y comparte increíbles fotos de todo el mundo'
    },
    {
      img: '/assets/Futbol.jpg',
      titulo: 'Reserva tu Cancha',
      desc: 'Siempre sabremos donde estás!'
    }
  ];
  user$: Observable<User> = this.authSvc.afAuth.user;
  constructor(private authSvc: AuthService,
              private router: Router,
              private alertController: AlertController,
              public firestoreService: AreasService,
              ) { }
    
  sendLogout(): void{
    this.router.navigate(['home']);
    this.authSvc.logout();
  }
  ngOnInit() {
    this.getProductos();
  }
  getProductos(){
    this.firestoreService.getCollection<Producto>(this.path).subscribe( res => {
      console.log(res);
      this.productos = res;
    });
  }
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Ingresa Tu informacion',
      buttons: ['Solicitar Area'],
      inputs: [
        {
          placeholder: 'Nomre de Usuario',
          attributes: {
            maxlength: 8
          }
        },
        {
          type: 'number',
          placeholder: 'Cantidad de Acompañantes ',
          min: 1,
          max:5,
        },
        {
          type: 'textarea',
          placeholder: 'Necesidad del Area',
          attributes: {
            maxlength: 60
          }
        },
        {
          type: 'time',
          placeholder: 'Hora de Solicitud',
        },
      ]
    });

    await alert.present();
  }
  
}
