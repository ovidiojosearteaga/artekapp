import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
/*
  Generated class for the UserdataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class UserdataProvider {

  private token:string;
  private userId:number;
  private tokenDecode:any;
  private userData:any;
  private urlImageUser:string = "../assets/imgs/user-default.jpg";
  private status:string = 'Usuario';
  private userDataReady:boolean = false;

  private oneSignalId:any;

  constructor(
    public http: HttpClient,
  ) 
  {
    this.token = '';
    this.userId = null;
  }

  getOneSignalId():any
  {
    return this.oneSignalId;
  }

  setOneSignalId(id):void
  {
    this.oneSignalId = id;
  }

  getCedula():string 
  {
    return this.userData.slug;
  }

  getEmail():string
  {
    return this.userData.user_email;
  }

  getName():string 
  {
    return this.userData.firstname + ' ' + this.userData.lastname
  }

  getToken():string
  {
    return this.token;
  }

  setToken(token:string):void
  {
    this.token = token;
    const helper = new JwtHelperService();
    this.tokenDecode = helper.decodeToken(this.token); 
    this.setUserId(this.tokenDecode.data.user.id);
  }

  getUserId():number
  {
    return this.userId;
  }

  setUserId(userId:number):void
  {
    this.userId = userId;
  }

  getUserData():any
  {
    return this.userData;
  }

  setUserData(userData:any)
  {
    this.userData = userData;
  }

  getUserDataReay():boolean
  {
    return this.userDataReady;
  }

  setUserDataReady(isReady:boolean){
    this.userDataReady = isReady;
  }

  getStatus():string
  {
    return this.status;
  }

  setStatus(status:string):void
  {
    this.status = status;
  }

  getUrlImageUser():string
  {
    return this.urlImageUser;
  }

  setUrlImageUser(urlImageUser:string):void
  {
    this.urlImageUser = urlImageUser;
  }

  setUserThumbnail(picture:any)
  {
    this.userData.userThumbnail = picture;
  }

  getUserThumbnail()
  {
    return this.userData.userThumbnail;
  }

  updatePoints(points:any, transaction:string)
  {
    if (transaction == 'add') {
      this.userData.user_points = (parseInt(this.userData.user_points) + parseInt(points));
      return this.userData.user_points;

    } else if (transaction == 'rest') {
      this.userData.user_points = (parseInt(this.userData.user_points) - parseInt(points));
      return this.userData.user_points;
    }
    
    return false;
  }

}
