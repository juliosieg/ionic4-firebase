import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController, NavParams, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  title: string;
  form: FormGroup;
  
  key = '';
  name = '';
  tel = '';

  constructor(
    private formBuilder: FormBuilder,
    private service: ContactService,
    private toast: ToastController,
    private activatedRoute: ActivatedRoute,
    public navCtrl: NavController,
    public router: Router
  ) {
    
    this.key = this.activatedRoute.snapshot.paramMap.get('key') || '';
    this.name = this.activatedRoute.snapshot.paramMap.get('name') || '';
    this.tel = this.activatedRoute.snapshot.paramMap.get('tel') || '';

    this.createForm();
    this.setupPageTitle();
   }

  ngOnInit() {
  }

  private setupPageTitle(){
    this.title = this.key ? 'Alterando Contato' : 'Novo contato';
  }

  createForm(){
    this.form = this.formBuilder.group({
      key: [this.key],
      name: [this.name, Validators.required],
      tel: [this.tel, Validators.required]
    })
  }

  async presentToast(message){
    const toast = await this.toast.create({
      message: message, duration: 3000
    });
    toast.present();
  }

  onSubmit(){
    if(this.form.valid){
      this.service.save(this.form.value)
      .then(() => {
        this.presentToast('Contato salvo com sucesso.');
        this.router.navigate(['/home']);
      })
      .catch((e) => {
        this.presentToast('Erro ao salvar o contato.');
        console.error(e);
      });
    }
  }

}
