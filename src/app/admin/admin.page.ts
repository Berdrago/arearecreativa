import { Component, ViewChild, OnInit} from '@angular/core';
import { IonModal, MenuController } from '@ionic/angular';
import { Producto } from 'src/app/models';
import { AreasService } from '../services/areas.service';
import { OverlayEventDetail } from '@ionic/core/components';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit  {
  @ViewChild(IonModal) modal: IonModal;
  productos: Producto[] = [];
  newProducto: Producto = {
    nombre: '',
    fecha: null,
    hora: null,
    imagen: '',
    categoria: '',
    id: this.firestoreService.getId(),
    fcreacion : new Date()
  } ;
  private path = 'Productos/';
  constructor( public menucontroler: MenuController,
               public firestoreService: AreasService,
               public router:Router,
               public authSvc:AuthService){
  }
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }
  ngOnInit() {
    this.getProductos();
  }
  //Metodo Click de menu
  //Metodo click para guardar en la base de datos
  guardarProducto(){
    this.firestoreService.createDoc(this.newProducto, this.path, this.newProducto.id);
  }
  //La notificaccion del guradado
  getProductos(){
    this.firestoreService.getCollection<Producto>(this.path).subscribe( res => {
      console.log(res);
      this.productos = res;
    });
  }

  deleteProducto(producto: Producto){
    console.log(this.deleteProducto);
    this.firestoreService.deleteDoc(this.path, producto.id);
  }

  editarProducto(producto: Producto){
    console.log(this.editarProducto);
    this.firestoreService.updateDoc(this.path, producto.nombre, producto.id);
    
  }
  sendLogout(): void{
    this.router.navigate(['home']);
    this.authSvc.logout();
  }

}
