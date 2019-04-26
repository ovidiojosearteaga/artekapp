import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { UserdataProvider } from '../../providers/userdata/userdata';
import { PersonaldataProvider } from '../../providers/personaldata/personaldata';
import { RestProvider } from '../../providers/rest/rest';
import { HelpersValidatorProvider } from '../../providers/helpers-validator/helpers-validator';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the MisdatosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-misdatos',
  templateUrl: 'misdatos.html',
})
export class MisdatosPage {

  firstName:string;
  firstNameTwo:string;
  lastName:string;
  lastNameTwo:string;
  email:string;
  password:string = '';
  rePassword:string = '';
  setPassword:boolean;
  birthdate:string='';
  maxDateTime:string;
  userThumbnail:string = null;
  defaultThumbnail:string = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAQ/QAAEP0BmYO8LQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAADKzSURBVHja7d13nBXV3cfxZ+kIYseGCtbEqPEx1sSSBB9r7MESsUXR2CIG7IJU6SgIUlRAJahgQQkCVooUIXRQAUHpve1St93nOzqri7C79949M3fmnM99vd7/xcTsnvl9vzt35pz/SSQS/wOgbPkz+h8of5C/SzPpKL1koAyVT2WyfC3LZLPky1ZZJQtkmoyR/8ib8pJ0lZbyoFwsdaUCP3MAQeKHAOwa8lXlN3KtPCEDZKKsl0SItstseVvayq1ytuzH7wkABQAof+AfINdJT/lKCkIO+nSslMHyDzme3yMACgBQduDvLZdLF5kuhTEI/LIsldfkdjmS3zMACgDwY+j/3r+N7t3Kz7Mg8MvyrfSVv0o11gAACgBcCv160tx/8C7hsM3+g4bnSRZrAwAFADaG/j5yl4y15Na+aYv8tw2OZb0A4IeAuId+JbnMf6VuOyGftPFyD28VABQAIG7BX0se95+IJ9DTt0P68TYBQAEA4vDaXivZSHgb5b3++Jb8lnUGUACAKAX/Yf6re1sI68ANk3NYdwAFAMj00/y9/FvVhHO4PpP6rEOAAgCEGfx15FVH3tuPuknyR9YlQAEAgn6qv4nkELyR87oczDoFKACA6fA/1z8Ah7CNLu/hy/s4rRCgAAAmgv8g6c/mPbEyRU5n/QIUACCd4K/gb0azgUCN7auDPbwdGFnPAAUASDb8fytfEqJWWCU3sa4BCgBQVvjfx2t9VhogNVjjAAUA+GXwe9v3DiYorfaVnMR6BygAQFH4n+afU09I2m+b3Mm6BygAIPzv55a/kwZKTa4BgAIAN2/5DyEInTaPA4YACgDcCv9TueUP33ZpxHUBUABgf/jXl2yCD7/QhusDoADA3vC/XnYSdijBy1KRawWgAMCu8H/A3x2OoENp3pdqXDMABQB2hH9rgg0pGCf7cu0AFADEN/gryksEGtLgnfx4ONcRQAFA/MK/mgwlyFAOi+UErieAAoD4hH91GU2AwYB1cjLXFUABQDxu+39AcMGg5VKX6wugACDaBaAfgYWAdg08iGsMoAAgmuHfnqBCgKZwfgBAAUD0wv9hAgoh+FiqcM0BFABEI/wbSiHhhJC8KRW49gAKADIb/pdILqGEkL3A9QdQAJC58D9TthJGyJCnuA4BCgDCD//9ZQkhhAzyvna6mOsRoAAgvPDPkmEEECJgjRzGdQlQABBOAWhC8CBCRnOMMEABQPDhfxYP/SGCWnF9AhQABBf++8n3hA0iqEDqc50CFAAEUwDeI2gQYavkYK5VgAIAs+H/EAGDGPiETYIACgDMhf/vZCfhgph4musWoACg/OHvHe87jVBBjHhl9QSuX4ACgPIVgAcIFMTx0CCuX4ACgPTD/2DZRJggpm7gOgYoAEivALxGiCDGlsveXMsABQCphf/5BAgs0IXrGaAAIPnwrySzCQ9YIE9O5roGKABgr3+4ZyzXNUABQNnhf7jkEBqwzK1c3wAFAKUXgFcJC1i6TXB1rnGAAoA9h//Rkk9YwFL/5DoHKADYcwHoS0jAYkulCtc6QAHAruFfh/3+4YBGXO8ABQC7FoBuhAMcsNA734JrHqAA4Mfwry3bCAc4oiHXPUABwI8FoD2hAId8JRW49gEKgOvhv59kEwpwzF+5/gEKgOsF4BnCAA6axvUPUABcDv+qsp4wgKMuZA4AFABXC0ADQgAOG8gcACgArhaAYYQAHLZVajILAAqAi6/+5RECcNxtzAOAAuBaAWjM8Af6f8I8ACgArhWAaQx/oH+Btw02MwGgALgS/icx+IGfPMZcACgArhSAjgx94CdzmAsABcCF8K8oKxj6wC5OYz4AFADbC8DFDHtgN88xHwAKgO0FoDvDHtjNAuYDQAGwvQDMZtgDe3QEMwKgANi8+Q+DHmBTIIAC4FgBuJ4hD5ToVeYEQAGwtQD0YsgDJVrKnAAoALYWgG8Y8kCpjmNWABQA28L/MIY7UKZ7mBcABcC2AnAzwx0o01vMC4ACYFsBeJnhDpRpjWQxM0AB4IdgUwFYyHAHknISMwMUAH4ItoT/3gx1IGk3MzdAAeCHYEsB+B1DHUhaK+YGKAD8EHgAEOBBQIACgNgWgNYMdSBpM5gboADwQ7ClAAxmqANJ28qbAKAA8EOwpQDMYqgDnAwIUADcCv8Ksp2BDqTkQuYHKACIewGoxzAHUnY/8wMUAMS9AFzCMAdS1p35AQoA4l4AGjPMgZSNZH6AAoC4F4AuDHMgZXOZH6AAIO4FoC/DHEjZUuYHKACIewEYxDAHUraJ+QEKAOJeAIYxzIGUFTA/QAFA3AvAaIY5kJYazBBQABDnAjCVQQ6k5VBmCCgAiHMBmM8gB9JyAjMEFADEuQCsZJADaTmdGQIKAOJcAHIY5EBa/swMAQUAcT4IqJBBDqTlKuYIKACIawGoyRAH0taQOQIKAOJaACozxIG0NWCOgAKAOJeAnQxyIC2XMENAAUCcC8B6BjmQlj8wQ0ABQJwLwPcMciAtJzNDQAFAnAvAHAY5kJa6zBBQABDnAjCRQQ6k5QBmCCgAiHMB+JhBDqSlCjMEFADEuQC8xyAHUraT+QEKAOJeAF5jmAMpW8f8AAUAcS8ALzLMgZR9x/wABQBxLwDtGeZAymYwP0ABQNwLwL0McyBlHzA/QAFA3AvA/zHMgZR1ZX6AAoC4F4B6DHMgZfczP0ABQNwLQEXJZaADHAQEUADcKwHzGOhASo5ldoACABsKwHAGOpC0fKnM7AAFADYUgG4MdSBpi5gboADwQ7ClADzIUAeS9hFzAxQAfgi2FIBLGepA0noxN0AB4IdgSwE4lqEOJK0JcwMUAH4IthSASpLHYAeScjVzAxQAfgg2lYBZDHYgKfWYGaAA8EOwqQD0YbADZVrFvAAoALYVgDsY7kCZ3mNeABQA2wrArxnuQJkeZV4AFADbCkCWbGTAA6U6j3kBUABsLAEjGfBAibxDs6ozKwAKgI0F4BmGPFCiKcwJgAJgawG4mCEPlKg7cwKgANhaAPaVQgY9sEc3MScACoDNJeArBj2wR3WZEQAFwOYC0I9BD+xmJfMBoADYXgDuZNgDuxnCfAAoALYXgEN5DgDYzR3MB4AC4EIJmMLAB35SILWZDQAFwIUC0IyhD/xkInMBoAC4UgBOZegDP3mKuQBQAFwqAUsY/MAPTmEmABQAlwpATwY/0H8x8wCgALhWAC5h+AP9ezIPAAqAawWgquQQAHDcJcwDgALgYgl4lwCAw7Z4RZhZAFAAXCwAtxMCcNh7zAGAAuBqATjI3wSFMICL7mQOABQAl0vApwQBHLRTDmAGABQAlwvAzYQBOPwHAAXAvQJQXTYRCHDMpVz/AAWAEjCjf28CAQ5ZLhW59gEKAAVgRv8zCQU45Fmue4ACgJ9LwByCAY44jmseoADg5wLQhGCAA8ZxvQMUAOxaAGpLHgEBy93B9Q5QALB7CRhKQMBi3tkXNbnWAQoAdi8AVxISsFg/rnOAAoA9F4BKsoqggKXO5ToHKAAouQS0JyhgoW+4vgEKAEovAIdLLoEByzTi+gYoACi7BPQnMGCRlVKVaxugAKDsAnCiFBIcsMQTXNcABQDJl4BhBAcskC37ck0DFAAkXwDOIzxggS5czwAFAKmXgIkECGLMe5i1DtcyQAFA6gXgGkIEMfYq1zFAAUB6BaCCzCNIEEPeQ6wncR0DFACkXwIaESaIoeFcvwAFAOUrAFX996gJFcTJBVy/AAUA5S8BjxMoiJFJXLcABQBmCkAN7gIgRupz3QIUAJgrAXcTLIiBD7leAQoAzBaAivIVAYMIK+DJf4ACgGBKwBWEDCLsFa5TgAKA4ErAaIIGEbTVO8qaaxSgACC4AnAGJwUigtpwfQIUAARfAt4gcBAha2Rvrk2AAoDgC0A92UnwICLu57oEKAAIrwR0JXgQAfOlEtckQAFAeAVgf9lIACHDruV6BCgACL8ENCWAkEHjuA4BCgAyUwAqyXSCCBngPYNyItchQAFA5krAaZJPICFkzbn+AAoAMl8COhBICNFsqcy1B1AAkPkCUM1/GptwQhj7/Z/JdQdQABCdEnABOwQiBF253gAKAKJXAnoTUAjQItmLaw2gACB6BaCWLCOoEJALuc4ACgCiWwI4Mhgc9QtQAOBoCXiTwIJBK2U/ri2AAoDoF4Daso7gAtv9AhQAuFcCriK4YEA/rieAAoD4lYCOBBjKYaZU51oCKACIXwHwzgoYS5AhDZvlOK4jgAKA+JaAw2Q1gYYU/ZXrB6AAIP4loL6/hSvBhmQ8z3UDUABgTwl4mmBDEiZy0A9AAYBdBSBLRhBwKMVaOYLrBaAAwL4ScIAsIehQwil/F3OdABQA2FsCzpJcAg+/0IrrA6AAwP4S8ACBh2JGSQWuDYACADdKQBeCDzJN9uaaACgAcOuhwH8TgE5bKAdzPQAUALhXAirLRwShk7zNoY7lOgAoAHC3BNSU/xKITsmW01j/AAUAlADv+OBvCUYn7JQLWfcABQAoKgHHyCoC0mqFciPrHaAAAL8sAaf5t4cJSzs9xDoHKABASSXgQv82MYFpl3asb4ACAJRVAq6XPELTGn1Y1wAFAEi2BPxFthGesdeR9QxQAIBUS8B5sokQja3HWccABQBItwT8lrcDYnmy392sX4ACAJS3BBwriwjW2Lzn34B1C1AAAFMl4DCZTcBG2ha5iPUKUAAA0yVgP5lA0EbSBjmbdQpQAICgSsBeMpLAjZQVchLrE6AAAEGXAO8UwZcJ3kiYKfVYlwAFAAizCNzif+9MEGdogx+pxloEKABAJkrAr3g4MCPH+XKoD0ABADJeAqrzlUBopstxrDuAAgBEqQjcLDmEdGB6ccsfoAAAUS0BJ/gPphHYZm/538D6AigAQNRLQDXpS3AbMc3biZF1BVAAgDgVgStlISGelq3SXKqylgAKABDHElBVnuDZgJS8KUewfgAKAGBDEfDOEnhNCgn4Um/3n8d6AcAPATYWgbNlMmG/izXSSCqwRgBQAGBzCciS22Wl48GfK11lH9YFAAoAXCoCe0t7B58P8L4G+cDbRZF1AIACANeLwP0y1/LgXy+d5Rh+7wAoAMCuZeACGezfHrcl+KfIHd6WyfyOAVAAgNKLwKH+e/DLYhr626W/nMHvEwAFAEi9CFSS6+QTyYtB8H8jTWV/fn8AKAAw6shBE+pIb+krFR0qAzXlEukgX0p+BALf2+nwFWkodRxbhzfIJ3IO1yVAAUCwA7e2PCfbJeF7T6o6enfAe3jwMunof88eRiH4TvrJrXKkw2vxXikotg6Hym+4TgEKAMwO232lrWwpNnCL+1xq8XVB/1pyub/1sPd+/esyUqbKEv97+dLC3SsQq2WOfO4/jNhTnvED/yjW4w/rsVkJ69ArBAOEnxNAAUA5B21NeUo2ljBwi5sqB/FzS+quwdFyln/34Hz5tRzATnxlrscs6ZbEWtzh36k6kJ8bQAFAaoO2mvxL1iQxbIubx19fCGhNVpKBKa7HbHnGK7L8DAEKAEofspXlH7IsxUFbnPfPnsjPEwbXZXUZXo416RXZf0oVfp4ABQC7D9mLZH45hmxx6+Usfq4w9PzJF4bW5Xdyq/BVC0ABgIbhYfKWoQFbnPfA4EX8jFGOtXmozApgbc6WK/gZAxQAV4drRWnsf0+aCEiu3MbPG2msz9/IogDXpucjnlkBKACuDdezZXrAw7W4F/n+FSmsz5tKeeXUtBy533vDgJ89QAGwebDuL32kMMTwL/KlHMHvAWU8hNotA2vTM0aO5fcAUABsfH/69jRe6zNtrVzI7wQlPIsyPsPrc5s04SFBgAJg03epYzM8WH+5W9uT3HJFsTV6gayK0BqdxKusoADwQ4j7X/3eZj47IzRYi3tf9uF35fw6bSr5EVyfO/xdMCvxewIFAHG7nfpxRIO/uAVyCr8zJ9fo3vJ2DNboNDmV3xkoAIjDYL1a1sVgsBb/3pVXBd1aoyfJNzFao3nSmjdZQAFAVIfqXtI3RkP1l4ZJHX6XVq/RKv7e/DtjukbnyJn8LkEBQJQG6+9i9hdVaYe33M9T2Fau0d/LXAvWqPe8QhvWKCgAyPRQrSCP+TvuJSwygaewrfquv2eG9p4I0khvXw1+x6AAIBODtY58ZtlQLc67TdyS711jvUavlKUWr9GFPMQKCgAyMVg3WDxYi/tK/sDvPVbr8xAZ7Mj63OptXczvHRQAhDFcn7TwdmpZCv3zBGqxBiK/Pu90qJwW18U7YIs1AAoAghis1eUNBwdrcav8EwyrsSYitz4vlsmOr0/vK7mDWA+gAMDkcD1cpjg+XItbJvd6h8ewPjK+Nv8o41iTP1ksp7M2QAGAiQF7lqxgsO7Rd3IHt14zsi7PkU9Yg3u03Tt8i3UCCgDKM2Rv8fckZ6iWbr78jXezQ1mTp8lw1lxSenKXChQApPN+f0cGaFo7tV3HSYOBrElv+953WWMp+8J7K4I1BAoAkhm0tfgLq9xmyX2cNmikiF4mQ/1jnFlb6VkuZ7OmQAFAaQP3GPmagWn0He3+3ja0rK+U1uER/p79S1hDRg+9upT1BQoASrrFupJBGejXAw+xfWuJ66+SXCX/4a/9QHe3vI71BgoAig/fM2Q9AzK0J7QHyvmsvR/WXj3/cJvlrI3QDhO6hbUHCgC8AXyBfwoewzF88/yHLf/s0pkD/t2mJv7GNYWsg4zsbHkv8w8UALfD/zL/u0GGYuZtkQ/8hwePtmyd7ScN5BV/EyV+39HQlDkICoCb4X+9hcf42mSBvCCXy14xfHr/TGnuH62cz+8zsloyD0EBcCv87+RBq1jZ4b/P3Uf+KfWj8m63/j329neL/Lt0lhGyjt9ZvA4SYi6CAuBG+Dfme1drrPf3we8tD/rPEhwSxEZEftB7D4veLp3kQ3/fedaSHfqwkyUoAHaHf3MGnRO8uzub/ffo5/i34UfKYHlZukoL/0G8p6SDXyIG+a/hjZUZssj/a56vitzgvZ1SiVkJCoB94d+JAQegDO+69EYKKAD85Q8AP/PuFlVndoICEP/wv4+BBiBJeTJdbmN+ggIQ7/C/kaf9AZTxuum//YeDf89f/qAA2BH+F/PwFoBiVsv7/oOfF3kbNDErQQGwL/zP8U+iY+gBHE3d1t+rIYv5CAqA3eH/G9nA4AOc5N31+9jfMKouMxEUAHfCvy6nqgHO2eC/w3+D7MMsBAXAvfCv7T/Qw0AE3DjWd6hcwuY9oAC4Hf61ZBpDEbDeMn8XxzrMPlAACP+K/nd+DEfATt55C6PkGv7aBwUAxQtAFwYkYKU1/jkNRzPrQAHAL8P/ZoYkYJ2vpSF78oMCgJLC/39lG8MSsGpXvoYcywtQAEoL/wP9s9gZmkD8eccu38H3+wAFoKzwrySfMzSB2Fsid0tlZhtAAUimADzP4ARizdus636+4wcoAKmE/60MTyC2cqSJVGOeARSAVML/dNnOEAViyTuF7wgbZtHGFg9VlmPkQmkkzaWzvCRvyUiZIHNlqWyQNbJcvpcF8rXMkqkyUT6QvtJK7pNr5BypJxxRTAFwfpvfJQxRIJY7910b06CvKw2kmfSTz2Wx5EsiZMv8YuEVjdvldNmLfKAA2B7+WfIZgxSIlQJ5wdumOyZhX1sul5byoazNQMinqkC+laHytJwrPFdBAbCqADRhmAKxMkPOjHjgHyS3yCD/r/qEJbbJp/7XEudLVXKEAhDX8D9ZdjBQgVjYKo9E8X1+BWGWnCHPyJdSaFHol2a7/9XF495zCwQrBSAu4V9FZjJUgVgYL/UiFvpV5Fp5VVY7EvhlmSZPynGELAUgygWgI0MViIXOUfqr339AroesJ/BLNcN/duAEApcCEKXwP99/iIjhCkTXBrkyIqF/qDziv3pHuKfO+1rkVp4ZoABkOvxryfcMVyDSJkvdCHyvf5X/1H4+IW6E9/ZDe+8VSEKYApCJAjCA4QpEWrdMbuPrf7d/p7+ZDqEd3CuG3uZEF3tFi0CmAIQR/tcyXIHI2iTXZTD495HHZAUBHZ5N/V94Ozs7+w6pSDBTAIIK/0NkHUMWiKRpckyGgv9w6SibCeSQw//F9uOyszcXKvwTMk9ukgoENAXAdAH4kCELRNJQqZ6B4N9PushOwjjj4V/cbLlW+GqAAmAk/BsyZIFI6i0VQw5+77Cdh3iNL5LhX9xUuYywpgCUJ/z3lhUMWiBymmfgr37vFLz5hHDkw7+4CXIuoU0BSKcAdGHQApGSL40ysHnPWAI4duFfxPtn+sq+hDcFINnwP1HyGLhAZGyTK0J+sv9lh/bmtzH8i1spDQhwCkAyBYBjfoHoWC/nhBj+3jvmSwlfa8K/uA/kCIKcAlBS+N/AwAUiw9t981chBX8t/69+wtfO8C/ifR7ktUEKwC/Dv4YsY+gCkTBfDgsp/C+SJQSv9eFf3CQ5iVCnABQVgPYMXSASlspRIf3V/xKh61z4F9nm7SZIsDteADRsTpCdDF4g49aGcdtfYXOyfEvoRij8e3UYG2L4F/eKVCPg3S0Aoxi8QMZtlt+FEP43ylZCl/AvZoYcS8g7VgA47AeIzKt+5wcc/JWkK4FL+Jdgk1xD0DtSADRwKssihi+QUblyecDhX1s+J3AJ/yR0lkoEvv0FoBHDF8ioArkp4PA/k3f7Cf8UfSGHEPqWFgD/r//vGcBARv0j4PC/RXYQuIR/GhbxXIC9BeAehi9g78E+CprGbOdL+JfTajmN8LeoAGjwVJHFDGAgY4ZKVoDh34awJfwN7h5YnwJgTwG4lwEMZMw8qRVQ8FeQXoQt4W/YTg4UsqAAaPBU9XcaYxAD4cvxTtwMKPyryFuELeEfkAK5jwIQ7wJwP0MYyJgGAYV/DRlF2BL+IWhJAYjvX/8c+ANkRqcAw38CYUv4h6Rw5syZzSgA8SsADzKEgYz4VCoGEP6VZQRhS/iHFf5z584dM2zYsIS0oADEJ/yryXIGMRC6JXJQAOGfJa8RtoR/BsK/yH0UgHgUgIcYxEDodsgZAd3670TYEv4ZDH9PgVxPAYh2+FfkvX8gIx4OKPz/RdgS/hkO/yI75UIKQHQLwNUMYiB0E6VCAOF/Mzv8Ef4RCf8iOXIGBSCaBeAThjEQ+q3/XwcQ/hdJLoFL+Eco/IuslRMoANEK/18zjIHQPRVA+J8uOQQu4R/B8C+yWA6jAESnAPRgGAOhmi6VDIf/sbKGwCX8Ixz+Rb6QShSAzIf/3pLNQAZCkyf/azj8q8lMAjdi4d+7I+Ffsk4UgMwXgAcYyECo2gZw678ngUv4xyj8i1xNAchsAfiagQyExrveqhoO/2sIXMI/huHv2SRHUwAyE/4XMpCB0BTIOYbD/0jZQOgS/jEM/yLTpCoFIPwCMJShDISmp+HwryTjCV3CP8bhX6QPBSDc8D9K8hnKQCiyTe/1r8BpS+gS/haEf5GGFIDwCkA7hjIQmuaGw7++FBC8hL8l4e/ZIsdTAIIP/wqyiqEMhMK71moYDP/asoLgJfwtCv8i3v9mFgUg2ALwJ4YyEJr7DP/1P4LgJfwtDP8id1EAgi0AvRnKQCjmm9zxT6FzE8FL+Fsc/p6NcggFILhjf9cymIFQNDAY/jVlGeFL+Fsc/kXeogAEUwD+j6EMhGKy4Vv/7QnfKIR/J8I/HH+hAJgvAC8zmIFQ/Mlg+B8vOwlgwt+R8PcskZoUAHPhX1nWM5iBwI3gwT/Cn/Avt24UAHMF4FIGMxCKMwyG/5UEMOHvYPh7CuR0CoCZAjCAwQwEboLhY34XEsKEv4PhX+RjCkD5w7+KbGQ4A4G70WABaEYIE/4Oh3+RCygA5SsAVzCYgcAtM/Xev3/S31aCmPB3PPw9YykA5SsArzOcgcA9ZfCv/wEEMeFP+P/kIgpAeuFf1T+NjAENBGe7qRP/FEJ1JJcwJvwJ/598SQFIrwBcwHAGAtfP4F//XQhjwp/w382VFIDUC0BLhjMQuFMNhf++kk0gE/6E/25mRP20wCgWgHEMZyBQYwz+9f8EgUz4E/4lakABSD78a0guAxoI1HWGwr+qrCSUCX/Cf3cfDh26ZUX7J4ZQAJIvABcznIHAX/2raKgANCKUCX/Cf8/hv7Z105n+7+4cCkByBaADAxoIVDdD4V9B5hHMhD/hX2r4ewZSAJIrAFMY0ECgzjdUAK4lmAl/wr/M8E/4J2PWpgCUHv77SgEDGgjMKqlgqABMIpwJf8K/zPAv8iQFoPQCcBUDGghUL0PhfyrhTPgT/kmHv2eJVKQAlFwAujGggUDVN1QAOhLQhD/hn3T4F7maAlByAZjNgAYCs9bE0/8aYln+XzMENeFP+Hvh3yap8Pd8RAHYc/jXZkADgXrZ0F//FxDSAYZ/n85jCH8rw99TIIdSAHYvANczoIFAXWKoAPQhqAl/wj/l8C/yAAWA9/+BMG2UygbCv4qsJ6wJf8I/rfD3jKYA7F4ARjGkgcC8auiv/ysJa8Kf8E87/Iu+BjiEArBrAVjFkAYC08BQAXiTwCb8Cf9y/97vowD8HP4HM6CBQB1qIPxryjZCm/An/MvtMwoABwABYVho6K//Wwhtwp/wNyI/KlsDR6EAPMqQBgLzmqECMJjgJvydC//3jYd/kXsoAD8WgEEMaSAwdxsqAKsIb8Kf8DfmHQrAjwVgLkMaCMyJBsL/eMKb8Cf8jVrr7arpdAHQcKom+QxpIBDrJctAAbiLAC9n+Pcl/An/3ZzkegE4nSENBGaYodv/rxLi5Qj/Tk9PycnJ3kT4E/5R2xUw0wXgLoY0EJjHDBWA7wjy9O0Y/+n4wsLCOTk5OZsJ/8iH/4wQ18YQ1wvACwxpIDDnGgj/IwjxctlRuGN7tn6WCUtKAOFvzhrXC8A4hjQQiB1S1UAB+Bshnr7NXZ+ZnCj2iXkJIPzNO9HlArCSQQ0EYrKh2/+9CfL0bR8zclziF5+YlgDCPxj3OlkAvNPJpJBBDQRikKEC8BVBnra8wq1bNib28IlZCSD8g/OyqwWgLkMaCExrA+G/LyFejqf/Oz89NVHKJyYlgPAP1iRXC8C5DGkgMLcbKABnEeTluP3/ybCxiTI+ES8BhH/wcjK5IVAmC8CNDGkgMOcZKAANCfL0z30vzMlem0jiE9ESQPiHp66LBeARhjQQmMMNFIBWBHmat/87PjkjkcInYiWA8A/XX1wsAN0Y0kAgthnaAvgNwjw920a+OyaR4iciJYDwD9/jLhaAdxjUQCDmGnoD4L+EeVoKCzZtWJVI45PhEkD4Z8ZAFwvAlwxqIBAfGCoAmwnzNG7/t398dqIcnwyVAMI/c2a4WABWMKiBQDxnIPwPJszTs3XYW6MT5fyEXAII/8zKdqoAaEBVkgIGNRCIBwwUgHMJ8/QUrF+7LGHgE1IJIPyjYS+XCsCRDGkgMJcZKAB/J8zTuP3/7KNfJQx+Ai4BhH901HOpAPyeIQ0E5iwDBaAdgZ7G7f/3Bo5OGP4EVAII/2g526UC0IAhDQTmJAMFoB+Bnrr81Su/TwTwMVwCCP/oudqlAnA7QxoITF0DBWAwgZ7i7f+2TecnAvwYKgGEfzTd41IBuI8hDQTmQAMF4ENCPTVbhgwYnQj4U84SQPhHV3OXCkAThjQQmOoGCsA4Qj3F2/8rlixIhPBJswQQ/tHW06UC8DRDGghEgaFNgKYT6ilo3eS7RIifFEsA4R99b7pUANoyqIFAZBsqAAsI9hRu/7/x0uhEyJ8kSwDhHw/vuFQAujKogUCsMFQAVhLsyctbsuibRAY+ZZQAwj8+PnCpAPRmUAOBWGCoAOQQ7Elq9a8liQx+SigBhH+8jHCpALzKoAYCMd1A+Gd5J9oR7snJef3FMYkMf35RAgj/+PnEpQIwmEENBGKcgQJQg2BP4fb/wnlzEhH4+CVgk43hP/z9oVstDn/PGJcKwDAGNRCIjwwUgAMJ9mRv/z+80oveREQ++fn5s0eOHLnZtvBf06ap7W+lTHCpAHzCoAYCMcZAAahJuCd5+79/9zGJiH3y8vLm2FICHAl/z2SXCsAEBjUQiCk8AxCe3HlzZiYi+LGhBDgU/p6pLhWA6QxqIBBzDL0FsIWAL0PLxmsThYUFiYh+4lwCHAt/zziXCsBnDGogEIsMFYBVhHzpsl/uOjYR8U8cS4CD4e8Z7lIB2Ec+ZVgDxq1iJ8CQbv/PmT4tEYNPnEqAo+Hv1lbAfgmoLAMY2EAktwLmLIDSb/9vSBQU5CVi8olDCXA4/D19nSoAxYpAc4Y2YEyeoQLAaYCl3f7v3XFcImafKJcAx8Pf09nJAuCXgFtkJ8MbMKKygQIwgqAv2c4Zk6ckYviJYgkg/H/wjLMFwC8Bf5KNDG+g3PYxUACGEPQlyk7k5+9MxPQTpRJA+P/kYacLgF8CTpTvGOBAudQxUAD6M5RLuP3fs934RMw/USgBhP8u7nS+APgl4GBvMxOGOJC2sw0UgA4M5RJu//93/JcJCz6ZLAGE/24uoQD8XAL2kqEMciAt1xsoAHcxlPdoa2Fu7vaEJZ9MlADCf4+OpwDsWgKypKUUMtCBlDQxUAAuYCjv7otOreb36dMnMWXKlMSOHTsoAYS/CQVShQKw5yJwhWxiqANJ62agABzKYN7daz26r2vRokXC07Zt28TQoUMTy5YtowQQ/uWxJFP5GvkC4JeA47w9zhnsQFLeM7QXQA7D+WdrWzTe7oV+UQEobtCgQYnVq1dTAgj/dIymAJRdAmrIWwx3oExTE+wGaNykDi3m7yn8i7Rs2TLx3nvvJTZt2kQJIPxT0Y8CkHwRaCr5DHmgRGsMFYC3GM4/G9ij+5rSCkCR1q1bJ8aPH58oLCx0vgQQ/klpRgFIrQT8WdYy6IESVTdQANownH+0rsVDue3atStMpgAU6d+/f2zvBpgoAYR/0m6mAKReAo5kvwCgRMcbKAC3MZx/NKXDMwtSCf8iKg2JWbNmOVcCCP+UnEoBSK8EVJOXGPbAbi43UADOYTj/aFCPbqvSKQBFFKTOlADCPyXbpBIFoHxFoAHnCAC7eNpAATiAAf1QYn2Lh/I7tG9fWJ4C4BkyZEgiPz/f6hJA+KdsQiaz04oCUOwrgbEMfuAH7xh6EHCe60N6WvtmC8ob/sWfC9i+fbuVJYDwT0s3CoC5ElBRmvGWADBhkaEC8JLrQ/qtHt1WmCoAnl69esVyF8HSSgDhn7aGFADzReAcbwASAnDcvgYKwK0uD+gNLR4q6NSxY4HJAuAZMGCANV8HEP7xOwPA6gLgl4Ba8m9CAA77o4ECUNflAT2z3VMLTYd/kbfffjv2DwYS/uWySbIoAMEWgVskmzCAgx429DXAEleH9JAezy8LqgB4Ro0aFdsS8NGHw1etafPINII8bZ9kOh+tLwB+CThGJhEIcMxrhgrAQFeHdJdOnfKDLACeuXPnxir881ev+G7ru69/vrF1k28J8XJpQQEI9wHBx2UHwQBHzDZUAO52cUDPbfvEoqDD39OhQ4dEdnZ2tEN/+eIFWwb3/3xTm6YLCG5jzqQAhF8EfiXjCQc4wHsbZi8DBeBXLg7od194bmkYBcDz+uuvR+82/+KFX28Z1Nf7S/87wtq4NVKBApCZElBBGstWQgKWu8zQXYA1rg3p57p0yQurAHgmTZqU4cgvLMxb+M2cnNdeHL2x1b+WEtKBei0KWehkAShWBI6WzwgJWOx5QwXgbZcG9DdtHvs+zPD3tG3bNpGTkxN25hfkfjN7Rk6/bmM2tnp4JcEcmhspANEoAVlyD28KwFJfGyoAt7s0oN/v3jX0AuAZPnx48KFfUJCXO2fa1OyXuo7d2LLxWsI4dPmyPwUgWkXgCBlBYMBCRxgoALVkuytDulvXrrmZKACtWrVKrF+/Poj39nbunP7l5OzeHb9Q6G8ghDPqi6jkHuG/exG4TdYTGrDIXXwNkLz5rR9ZmonwL35okJG7+7m523ZM+WJSds9nx+v/VzbBGxlPUgCiXQIOlL5SQHjAAoMNFYBrXBjQw7p3+S6TBcCzZs2a9EJ/x/YtOyZ+PmFz99YT9f9lK2EbSb+mAMSjCJzOBkKwwAbvzRcDBaCqv32p1QO6x/PP7ch0ARgxYkTyob9t66btYz/6YvNzLSbr338HARtpk6OUcQR9cg8J/l3WECSIsbMM3QV4xeYBvah10+WZDv+izYHy8vJKDv0t2eu3f/qfcZu7NPuv/r1zCdbYuJ8CEM8isK9056hhxFRzQwWgvs0D+sNunRZGoQB4Zs2atevD+5s3rd42aujYTR2fmu4/SU6gxsvOqDz9TwFIvwicImMIFMTMHEMFoIKssHVIv9jt+W1RKQDekcEFG9at2DZ8yJhNHZ6YpX+/QkI01t6OWp4R6ukXgb/JcoIFMXKKoRLwnI0DenGrJquiEPzPdemc521D7J1FQGha5S8UALtKQE1pLVsIF8RAB0MF4AwbB/TI5zt+m6nQ9/Yd8DYf+qbNY4sJSiutkkoUADuLwMHSQ3IJGUTYEu+hVkMlYLptQ7pP925bwgx9722DYd07f7eg9SPsu2+/LlHMLgLc/NkCA6WQsEFEnW+oANxk04Be2vJfa1u2bBl46HvPGHzYrdOiRa2briAUnVEgx1MA3HpQcDhhgwjqY6gAVBRrjon9+Ln2C4IIfK9UeHcWRj3f4VvvGQPC0EnvRjWrCOxgi8B5Mp7QQcQ2BapiqAQ8aMuQfumF7tkmQ9/77/NKhXdngQB03tkUALeLwBUym/BBRFxlqADsJeviPqBXtHx4Q3lv/3uH+LzyQvfNn3V9dr7330fowTc2ytlEQIdXAirITTKLAEKGDTG1rjXgWsR9SHuhnU7ot2nTJjGgR/cNY7q0nb+qxcMctoNYvPpHAcj81sJ/kQkEETIkT+oYKgAHyrY4D2nvL/dkQ79t27aJ13p0X/dFp1bz1rRozGE7KM0cyaIAoKQycIGMIpAQ1z0B/BLQI65DelXLhzd7t+9LC/127doVDuzRfc3Eji3nrW3ReDvBhiTdFvUMIoijUQRO827LcvwwQrRRahgqAPXiuje9d/t+j4fxtG9fOKhH91VTOjwzb92Pe7gTaEiFt7dDZQoAUikCJ0g/NhRCSB4weBfgjTgOau87/KLQ79ixQ8GbPbqtmNq+2YL1LR7KI8Rg81//FIDoFoEj5HnJJqQQoAXew6mGCsCxG2P2l7L3Hf7zXbvkDunx/LKZ7Z76dsOPG7YQXiivaVH/7p8CEI8isLfcJ3MJK0T5lUC/BDwbp0Ht/5XPCXsw7Y9xyRiCNj5l4M/yjuQTWjBojMECUMP/7pMQgKuGxilXCNd4fj3QRlYTXjDkNIMl4AZCAI7Kjeqe/xQA+4pAFWkoEwkwlNNgk2tTQ3A0YQAHdYtbjhCmdpSB38nLPDSINHmnV55usACcHNfXAoE0eds/708BQCaLQHV/u+ERPCuAFH1s+C5AN0IBDrknjplBcNpbBg6VJjKTcEOSLjRYAPaVNQQDHPBxXHOCsHSjDPxWusgqQg6lmOKdVWGwBNxJOMBy3iFQR1EAEIciUFEulTdkO4GHPWhgsABkyRhCAha7O86ZQDC6WwZqyvV+GdhM8ME3XyoZLAF1ZB1BAQt9FPccIAxR9ErhJdKHrwkg9xh+IPAKwgIW3vo/kgIA28pABfmDdJaFhKGTVnh3iAyXgOcJDVikkQ3zntBDWYXgFHlGZhCMTulmuABUkakEByzwgS3znZBDKmXgELlZ+stSQtJqBXKG4RJwnOQQIIixBbIPBQAUgkETTpD75T3ZSGhaZ4bJBwL9EtCQEEFMbZGTbJrhBBlMvmJ4ljwln8tOAtQKj5peKxqiAwgTxNBNts1twgtBFYK9/COMn5Ch/oNlBGr8bJV6hguAd2zwPAIFMfKcjXOasELYRxn/VTp559DLFgI2FkYGcBfgJNlEsCAGxkolCgBg/msDb5viu/3TDGdLHoEbSX8LoAScL9sJGETYcjnY1hlMECGKmxKdLDdIK3lHvqYYZMRaGetvENUwiN+3huvVHB2MCG/2c7rN85bQAcXAbYWy2LvNL8/5d2POkwPD+t16+6kTNoiYHfJn2+cq4QIbisFxUl/+Li38fQo+lW95G+EHa2SqvC895DG5SU6TGlH4PWrYNiN0EBHeHalrXZifhAhsLwhZcqj/iqJ3+NEj8oIM8UvCDH9To60xC/V8WScLZLL8R3rJk3KL/EmOlWpx+V1p6PYkfBABd7oyHwkJ4OeyUE0O979q+KNcJ43kcf/NhT7+3YV/+wXC+4t6hF8kxsmXMl3m+sG82H/9cYl/N+Irv3B86f/nP/X/ee81ycEyUPrJi/KsX1bu8v89vEA/VY6SWl6xse3nr8FbQQYTQMigR12aeQx+AFEqAVXlM4IIGdDBteuNoQMgaiWglkwhkBCiPi5eawwcAFEsATXlY4IJIWjn6nXGsAEQ1RLgHSE8iIBCQArlny5fYwwaAFEuAVnePuyEFQzbKTe4fn0xZADEoQg86v/FRnjBxA5/9bmuKAAA4lMCbpM8AgzlsEr+l+uJAgAgfiXgUtlKkCEN38rRXEcUAADxLQFnyToCDSmYKrW5figAAOJfAo6T6QQbkvCm91op1w0FAIBduwb2IOBQgm3SiGuFAgDA3iJwjWwg8FDMHPkN1wcFAID9JeAomUDwQV6S6lwXFAAA7pSASt62ruwX4KzNciPXAgUAgLtF4CJZTSA6xTs86hjWPwUAACXgEPmIYHRiP/+u3rkRrHsKAAAULwI3ylKC0koT5XTWOQUAAEoqATWkrewgNK3ZztfbFjqL9U0BAIBkisAx8gEBGlu50llqsZ4pAACQThHwzhOYR6DGyij5FeuXAgAA5S0BVfwjhnMI10hbJFezZikAAGC6CBwqL3DCYOQsl6ZSjXVKAQCAIIvAgdJS1hO+GfWN3MlrfRQAAMjEGwMPyWLCOFST/DMdKrAOKQAAkMki4G0rfIvMJpwD9aFcwJqjAABA1IpAllwuYwlrY/Lk33IKa4wCAABxKAPHyTP+99QEeepb9o6Rf8gBrCcKAADEtQycJp3YZrhMU/2n+euwbigAAGDbVwTnS29ZR+D/wNtkqYUczxqhAACAC2Wgsv+8QE//4cFCRwJ/h/+MRGvvzghrgQIAAK4XggO8Xez842q9W+H5lgS+t2nSJ9Lce4KfzXooAACA0gtBLblM2vtH2ebGJPCzZYQ8Lr/37nTw+6QAAADKt9fAcX4paOx/dfCRfC8FIYf8TvlK3vdP3Ltb/uQ9vMexuxQAAEB45aCqnOh/hdDUv2vQQwbI2/7peONlpiyU1f6t+Xz/L/YVMl+m+d/PD5e35BXpJm3lAblI6rEDn5v+H7y94rHOI3dIAAAAAElFTkSuQmCC';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public userDataProvider: UserdataProvider,
    public restProvider: RestProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public helpersValidator: HelpersValidatorProvider,
    private camera: Camera,
    public personalData: PersonaldataProvider,
    ) {

    let dateTime = new Date();
    let year:any = dateTime.getFullYear() - 18;

    let month:any = dateTime.getMonth() + 1;
    month = month > 10 ? month : '0'+month;

    let day:any = dateTime.getDate();
    day = day > 10 ? day : '0'+day;

    this.maxDateTime = year+'-'+month+'-'+day;

    this.firstName = this.userDataProvider.getUserData().firstname;
    this.lastName = this.userDataProvider.getUserData().lastname;
    this.firstNameTwo = this.userDataProvider.getUserData().firstnametwo;
    this.lastNameTwo = this.userDataProvider.getUserData().lastnametwo;
    this.email = this.userDataProvider.getUserData().user_email;
    this.birthdate = this.userDataProvider.getUserData().fecha_nacimiento;

    this.userThumbnail = this.defaultThumbnail;

    if (this.userDataProvider.getUserThumbnail() !== null &&
        this.userDataProvider.getUserThumbnail() !== undefined &&
        this.userDataProvider.getUserThumbnail() !== '') {
          this.userThumbnail = this.userDataProvider.getUserThumbnail();
    }
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MisdatosPage');
  }

  getImage()
  {
    let selectMedio = this.alertCtrl.create({
      message: 'Selecciona el medio...',
      buttons: [
        {
          text: 'Galeria',
          handler: () => {
            this.getPicture(this.camera.PictureSourceType.SAVEDPHOTOALBUM);
          }
        },
        {
          text: 'Camara',
          handler: () => {
            this.getPicture(this.camera.PictureSourceType.CAMERA);
          }
        },
      ]
    });

    selectMedio.present();
  }

  getPicture(source:any)
  {
    let options: CameraOptions = {
      sourceType: source,
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000,
      quality: 100,
    }

    this.camera.getPicture(options)
      .then(imageData => {
        this.userThumbnail = `data:image/jpeg;base64,${imageData}`;
        this.userDataProvider.setUserThumbnail(`data:image/jpeg;base64,${imageData}`);
        this.personalData.setPerosalData(this.userDataProvider.getUserData());

        this.restProvider.updateUserThumbnail(
          this.userDataProvider.getUserId(), 
          `data:image/jpeg;base64,${imageData}`
        );
        
      })
      .catch(error => {
        console.log(error);
      })
  }

  updateUserData()
  {
    if (this.firstName == '') {
      this.showAlert('El campo nombre es obligatorio.');
      return;
    } 

    if (this.lastName == '') {
      this.showAlert('El campo apellido es obligatorio.');
      return;
    }

    if (this.birthdate == '') {
      this.showAlert('El campo fecha de nacimiento es obligatorio.');
    }
    
    if (this.email == '') {
      this.showAlert('El campo email es obligatorio.');
      return;
    } 

    if (! this.helpersValidator.validateEmail(this.email)) {
      this.showAlert('Introduce un email correcto.');
      return;
    }

    if ((this.password.length > 1 && this.password.length < 8) || this.helpersValidator.hasWhitespace(this.password)  ) {
      this.showAlert('El password debe tener 8 caracteres o mas y no puede contener espacios en blanco.');
      return;
      
    } else if (this.password == '') {
      this.setPassword = false;

    } else if (this.password != '' && this.rePassword !== this.password) {
      this.showAlert('Los passwords no coinciden.');
      return;

    } else {
      this.setPassword = true;
    }

    let loading = this.loadingCtrl.create({
      content: 'Actualizando...'
    });
    loading.present();

    var data = {
      first_name: this.firstName,
      last_name: this.lastName,
      first_name_two: this.firstNameTwo,
      last_name_two: this.lastNameTwo,
      user_email: this.email,
      fecha_nacimiento: this.birthdate,
    }

    if (this.setPassword) {
      data['password'] = this.password;
    }

    this.restProvider.updateUserData(this.userDataProvider.getUserId(), data)
      .then( data => {
        console.log(data);
        this.userDataProvider.setUserData(data);
        loading.dismiss();
      })
      .catch(err => {
        console.log(err);  
      });
  }

  showAlert(message:string) 
  {
    const alert = this.alertCtrl.create({
      title: 'Error!',
      subTitle: message,
      buttons: ['OK']
    });

    alert.setCssClass('alert-error');
    alert.present();

    console.log(alert);
  }

}
