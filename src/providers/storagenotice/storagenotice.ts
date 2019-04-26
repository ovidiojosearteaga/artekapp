import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the StoragenoticeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const STORAGE_KEY = 'idNotice';

@Injectable()
export class StoragenoticeProvider {

  constructor(public storage: Storage) {
    
  }

  setIdNotice(data:any)
  {
    return this.storage.set(STORAGE_KEY, data);
  }

  getIdNotice()
  {
    return this.storage.get(STORAGE_KEY);
  }

  deleteIdNotice()
  {
    return this.storage.remove(STORAGE_KEY);
  }

}
