import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { NoticiaPage } from '../noticia/noticia';
import { HelpersProvider } from '../../providers/helpers/helpers';

/**
 * Generated class for the NoticiasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-noticias',
  templateUrl: 'noticias.html',
})
export class NoticiasPage {

  loading:any;

  showNotices:boolean = false;

  notices:any = null;

  noticesSlider:any

  urlMedia:string;

  featureMediaUrl:string = "../assets/imgs/loading-image.gif";

  data:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public restProvider: RestProvider,
    public loadingCtrl:LoadingController,
    public helpers: HelpersProvider
  ) {
    this.getWordPressPages();
    this.getWordPressPagesForSlider();

    this.loading = this.loadingCtrl.create({
      content: 'Cargando noticias...'
    });

    this.loading.present();
  }

  ionViewDidLoad() {
  }

  getWordPressPagesForSlider()
  {
    this.restProvider.getWordPressPosts(3)
    .then(
      pages => {
        this.noticesSlider = pages;

        this.noticesSlider.forEach(element => {
          element.featureMediaUrl = "../assets/imgs/loading-image.gif";
        });

        this.noticesSlider.forEach(element => {
          if (element.featured_media > 0)
            this.getWordPressMediaByIdForSlider(element.featured_media, element.id);
        });        
      }
    ).catch(
      err => {
        console.log(err);
      }
    );
  }

  getWordPressPages()
  {
    this.restProvider.getWordPressPosts(8)
    .then(
      pages => {
        this.showNotices = true;
        this.notices = pages;

        this.dateFormat(this.notices);

        this.notices.forEach(element => {
          element.featureMediaUrl = "../assets/imgs/loading-image.gif";
        });

        this.notices.forEach(element => {
          if (element.featured_media > 0)
            this.getWordPressMediaById(element.featured_media, element.id);
        });
        this.loading.dismiss();
      }
    ).catch(
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

  getWordPressMediaById(idMedia:number, idNotice:number)
  {
    this.restProvider.getWordPressMediaById(idMedia)
    .then(
      data => {
        var that = this;
        that.data = data;
        this.notices.forEach(function(element){
          if (element.id === idNotice) {
            element.featureMediaUrl = that.data.source_url;
          }
        })
      }
    )
    .catch(
      err => {
        console.log(err);
      }
    );
  }

  getWordPressMediaByIdForSlider(idMedia:number, idNotice:number)
  {
    this.restProvider.getWordPressMediaById(idMedia)
    .then(
      data => {
        var that = this;
        that.data = data;
        this.noticesSlider.forEach(function(element){
          if (element.id === idNotice) {
            element.featureMediaUrl = that.data.source_url;
          }
        })
      }
    )
    .catch(
      err => {
        console.log(err);
      }
    );
  }

  viewNotice(notice)
  {
    this.navCtrl.push(NoticiaPage, {
      noticeId: notice.id
    });
  }

}
