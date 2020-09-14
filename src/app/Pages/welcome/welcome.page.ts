import { Component, ViewChildren } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage {

  @ViewChildren('slides') slides: IonSlides;
  buttonName = "PROXIMO";
  selectedSlide: any;

  

  constructor() { }

  ionSlideChange(slides) {
    this.selectedSlide = slides;

    slides.getActiveIndex().then(
      (slidesIndex) => {
        if (slidesIndex == 2) {
          this.buttonName = "COMEÇAR";
        } else {
          this.buttonName = "PROXIMO"
        }
      });
  }
  /*next() {
    this.selectedSlide.getActiveIndex().then(
      (slidesIndex) => {
        if(slidesIndex == 2){
        console.log("cabou");
      }else{
       this.selectedSlide.slideNext(); 
      }
    }
    );
  }*/
}
