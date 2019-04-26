import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the PersonaldataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const STORAGE_KEY = 'personalData';
const STORAGE_KEY_TOKEN = 'personalToken';

@Injectable()
export class PersonaldataProvider {

  constructor( public storage: Storage ) { 
  }

  havePersonalData()
  {
    return this.getPersonalData().then(result => {
      if (result) {
        return true;
      };
    });
  }

  havePersonalToken()
  {
    return this.getPersonalToken().then(result => {
      if (result) {
        return result;
      };
    });
  }

  setPerosalData(data:any)
  {
    return this.storage.set(STORAGE_KEY, data);
  }

  getPersonalData() {
    return this.storage.get(STORAGE_KEY);
  }

  deletePersonalData() 
  {
    return this.storage.remove(STORAGE_KEY);
  }

  setPersonalToken(token) 
  {
    return this.storage.set(STORAGE_KEY_TOKEN, token);
  }

  getPersonalToken()
  {
    return this.storage.get(STORAGE_KEY_TOKEN);
  }

  deletePersonalToken()
  {
    return this.storage.remove(STORAGE_KEY_TOKEN);
  }

}
