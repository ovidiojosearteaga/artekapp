import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserdataProvider } from '../../providers/userdata/userdata';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  apiUrl = 'http://localhost/wptesting/wp-json/';  
	//apiUrl = 'http://paginaswebenbogota.net/artek/wp-json/';	

  constructor(
    public http: HttpClient,
    public userDataProvider: UserdataProvider,
  ) 
  {
    //console.log('Hello RestProvider Provider');
  }

  getWordpressCPT(nameCPT:string)
  {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'wp/v2/'+nameCPT).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getWordPressUniqueCPT(nameCPT:string, id:number) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'wp/v2/'+nameCPT+'/'+id).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getWordpressUserData(userId:number)
  {

    console.log(this.userDataProvider.getToken());

    return new Promise(resolve => {
      this.http.get(
        this.apiUrl+'wp/v2/users/'+userId,
        {
          headers: new HttpHeaders().set('Authorization', 'Bearer '+this.userDataProvider.getToken()),
        }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      })
    });
  }

  getCitasData(userId:number)
  {
    return new Promise(resolve => {
      this.http.get(
        this.apiUrl+'artek/v1/citas/?user_id='+userId,
        {
          headers: new HttpHeaders().set('Authorization', 'Bearer '+this.userDataProvider.getToken()),
        }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      })
    });
  }

  updateEstadoCita(citaId, estado) 
  {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'artek/v1/citas/'+citaId+'?estado='+estado,
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer '+this.userDataProvider.getToken()),
      }).
      subscribe(res => {
        resolve(res);
      }, err => {
        resolve(err);
      });
    });
  }

  getPacientes()
  {
    return new Promise(resolve => {
      this.http.get(
        this.apiUrl+'artek/v1/pacientes',
        {
          headers: new HttpHeaders().set('Authorization', 'Bearer '+this.userDataProvider.getToken()),
        }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      })
    });
  }

  getWordPressPosts(numberOfPost:number) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'wp/v2/posts?per_page='+numberOfPost).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getWordPressPages(numberOfPages:number) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'wp/v2/pages/?per_page='+numberOfPages).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getWordPressUniquePage(id:number) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'wp/v2/pages/'+id).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  //Get JWT Token
  getJWTToken(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'jwt-auth/v1/token', data).
      subscribe(res => {
        resolve(res);
      }, err => {
        resolve(err);
      });
    });
  }

  updateUserPoints(userId, data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'wp/v2/users/'+userId, data, 
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer '+this.userDataProvider.getToken()),
      }).
      subscribe(res => {
        resolve(res);
      }, err => {
        resolve(err);
      });
    });
  }

  setOneSignalId(userId, data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'wp/v2/users/'+userId, data, 
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer '+this.userDataProvider.getToken()),
      }).
      subscribe(res => {
        resolve(res);
      }, err => {
        resolve(err);
      });
    });
  }

  registerUserWordPress(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'wp/v2/users/register', data ).
      subscribe(res => {
        resolve(res);
      }, err => {
        resolve(err);
      });
    });
  }

  getWordPressMediaById(id:number)
  {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'wp/v2/media/'+id).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      })
    }); 
  }

}
