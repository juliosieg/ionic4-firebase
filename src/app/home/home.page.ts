import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from '../contact.service';
import { ToastController, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ContactPage } from '../contact/contact.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  contacts: Observable<any>;

  constructor(public router: Router, private service: ContactService,
    private toast: ToastController, public navCtrl: NavController){
      this.contacts = this.service.getAll();
    }

  newContact(){
    this.router.navigate(['/contact']);
  }

  editContact(contact: any){
    this.router.navigate(['/contact', contact]);
  }

  removeContact(key: string){
    this.service.remove(key)
      .then(() => {
        this.presentToast('Contato removido com sucesso.');
      })
      .catch((e) => {
        this.presentToast('Erro ao remover o contato.');
      })
  }

  async presentToast(message){
    const toast = await this.toast.create({
      message: message, duration: 3000
    });
    toast.present();
  }

}
