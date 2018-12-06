import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the NoticiaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-noticia',
  templateUrl: 'noticia.html',
})
export class NoticiaPage {

  noticeId:number;

  notice:any = null;

  showNotice:boolean = false;
  
  featureImageData:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public restProvider: RestProvider
  ) 
  {
    this.noticeId = navParams.get('noticeId');
    this.getNoticeData(this.noticeId);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NoticiaPage');
  }

  getNoticeData(noticeId)
  {
    var that = this;
    this.restProvider.getWordPressUniquePage(noticeId)
      .then(
        data => {
          that.notice = data;

          this.notice.featureMediaUrl = "../assets/imgs/loading-image.gif";
          this.getWordPressMediaById(that.notice.featured_media);
          this.showNotice = true;
        })
      .catch(
        err => {
          console.log(err);
      }
    );
  }

  getWordPressMediaById(idMedia:number)
  {
    var that = this;
    this.restProvider.getWordPressMediaById(idMedia)
    .then(
      data => {
        that.featureImageData = data;
        this.notice.featureMediaUrl = that.featureImageData.source_url;
    })
    .catch(
      err => {
        console.log(err);
    });
  }

}
