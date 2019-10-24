import { CommonModule} from '@angular/common';
import { Component, OnInit,NgModule  } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent implements OnInit {


  images = [
    '../../../assets/Images/carousel/russiaFlag.jpg', 
    '../../../assets/Images/carousel/moscow_city.jpg',
    '../../../assets/Images/carousel/Astrakhan-K.jpg'
  ];

  constructor() {

   }

  ngOnInit() {
  }

  customOptions: OwlOptions = {
    loop: true,
    autoplay:false,
    autoplayTimeout :3000,
    autoHeight:true,
    margin:10,
    animateOut: 'fadeOut',
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots:true,
    navSpeed: 700,
    stagePadding:0,
    responsive: {
      0: {
        items: 1
      }
    },
    nav: false
  }

}




@NgModule({
  imports: [
    CommonModule,
    CarouselModule
  ],
  exports: [DashboardComponent],
  declarations: [DashboardComponent],
})
export class DashboardPageModule { }
