import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the HelpersValidatorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HelpersValidatorProvider {

  constructor(public http: HttpClient) {
    console.log('Hello HelpersValidatorProvider Provider');
  }

  validateEmail(mail) 
  {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
    {
      return (true);
    }
  }

  hasWhitespace( str ) {
    return str.search(" ") != -1;
  }

}
