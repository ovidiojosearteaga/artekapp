import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { NoticiaPage } from '../noticia/noticia';


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

  showLoading:boolean = true;

  showNotices:boolean = false;

  notices:any = null;

  noticesSlider:any

  urlMedia:string;

  featureMediaUrl:string = "../assets/imgs/loading-image.gif";

  data:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider) {
    this.getWordPressPages();
    this.getWordPressPagesForSlider();
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad NoticiasPage');
  }

  getWordPressPagesForSlider()
  {
    this.restProvider.getWordPressPages(3)
    .then(
      pages => {
        this.noticesSlider = pages;

        console.log(this.noticesSlider);

        /*
        this.noticesSlider.forEach(element => {
          element.featureMediaUrl = "../assets/imgs/loading-image.gif";
        });
        */

        this.noticesSlider.forEach(element => {
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
    this.restProvider.getWordPressPages(8)
    .then(
      pages => {
        this.showLoading = false;
        this.showNotices = true;
        this.notices = pages;

        this.notices.forEach(element => {
          element.featureMediaUrl = "../assets/imgs/loading-image.gif";
        });

        this.notices.forEach(element => {
          this.getWordPressMediaById(element.featured_media, element.id);
        });
        
      }
    ).catch(
      err => {
        console.log(err);
      }
    );
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
