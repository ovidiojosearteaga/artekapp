import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { StoragenoticeProvider } from '../../providers/storagenotice/storagenotice';
import { HelpersProvider } from '../../providers/helpers/helpers';

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

  loading:any;

  noticeId:number;

  notice:any = null;

  showNotice:boolean = false;
  
  featureImageData:any;

  dateNotice:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public restProvider: RestProvider,
    public loadingCtrl: LoadingController,
    public storageNotice: StoragenoticeProvider,
    public helpers: HelpersProvider
  ) 
  {
    this.noticeId = navParams.get('noticeId');
    this.getNoticeData(this.noticeId);

    this.loading = this.loadingCtrl.create({
      content: 'Cargando noticia...'
    });

    this.loading.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NoticiaPage');
  }

  getNoticeData(noticeId)
  {
    var that = this;
    this.restProvider.getWordPressUniquePost(noticeId)
      .then(
        data => {
          that.notice = data;
          console.log(data);
          this.notice.featureMediaUrl = "../assets/imgs/loading-image.gif";
          this.getWordPressMediaById(that.notice.featured_media);
          this.dateFormat([this.notice]);
          this.showNotice = true;
          this.loading.dismiss();
          this.storageNotice.deleteIdNotice();
        })
      .catch(
        err => {
          console.log(err);
      }
    );
  }

  dateFormat(notices:any)
  {
    notices.forEach(notice => {
      let fecha:string = notice.date;
      notice.date_notice = this.helpers.dateFormat(fecha);
    });
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
