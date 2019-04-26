import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the HelpersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HelpersProvider {

  constructor(
    public http: HttpClient,
    
  ) { }

  dateFormat(fecha:string)
  {
    let year = fecha.substr(0,4);
    let month = fecha.substr(5,2);
    let day = fecha.substr(8,2);
    let months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

    return months[parseInt(month)-1]+' '+day+', '+year;
  }


}
