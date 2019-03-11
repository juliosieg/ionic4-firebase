import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private PATH = 'contacts/';

  constructor(private db: AngularFireDatabase) { }

  getAll(){
    return this.db.list(this.PATH)
      .snapshotChanges()
      .pipe(map(changes => {
        return changes.map(c=> ({key: c.payload.key, ...c.payload.val()}));
      }))
  }

  get(key: string){
    return this.db.database.ref().child(this.PATH + key)
    .once('value')
    .then(snapshot =>{
      return snapshot.val();
    })
  }

  save(contact: any){
    return new Promise((resolve, reject) => {
      if(contact.key){
        //Alteração
        this.db.list(this.PATH)
          .update(contact.key, {name: contact.name, tel: contact.tel})
          .then(() => resolve())
          .catch((err) => reject(err));
      }else{
        //Inclusão
        this.db.list(this.PATH)
          .push({name: contact.name, tel: contact.tel})
          .then(() => resolve());
      }
    });
  }

  remove(key: string){
    return this.db.list(this.PATH).remove(key);
  }
}
