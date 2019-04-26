import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestProvider } from '../../providers/rest/rest';
import 'rxjs/add/operator/map';

/*
  Generated class for the UserlistProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserlistProvider {

  //pacientes:any;
  //data:any;
  ///letterList:any;
  //listPacientes:any = [];

  constructor(
    public http: HttpClient,
    public restProvider: RestProvider ) 
  {
    console.log('Hello UserlistProvider Provider');
  }

  /*
  getPacientes()
  {
    this.restProvider.getPacientes()
      .then( data => {
        this.pacientes = data;
        this.letterList = Object.keys(this.pacientes);

        Object.keys(this.pacientes).forEach((element) => {
          this.pacientes[element].forEach(function(paciente) {
            if (paciente.user_avatar == false)
              paciente.user_avatar = "assets/imgs/user-default.jpg";
          });
        }); 

        this.pacientesWhitOutDivisors();
      
      })
      .catch(
        err => {
          console.log(err);  
      });
  }
  */

    /*
  pacientesWhitOutDivisors()
  {
    this.listPacientes = [];
    Object.keys(this.pacientes).forEach((element) => {
      this.pacientes[element].forEach((paciente) => {
        this.listPacientes.push(paciente);
      });
    }); 
  }

  filterItems(searchTerm) 
  {
    return this.listPacientes.filter((item) => {
      return item.display_name.toLowerCase().indexOf(
        searchTerm.toLowerCase()) > -1; 
    });
  }

    */
}
