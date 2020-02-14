import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterService } from 'src/app/shared/service/router-service';
import { DemoService } from 'src/app/shared/service/content-demo-service';
import { trigger, transition, style, animate } from '@angular/animations';




@Component({
  selector: 'app-video-demo',
  templateUrl: './video-demo.component.html',
  styleUrls: ['./video-demo.component.scss'],
  animations: [
		trigger('inOutAnimation', [
			transition(':enter', [
				style({ height: 0, opacity: 0 }),
				animate('1s ease-out', style({ height: 300, opacity: 1 }))
			]),
			transition(':leave', [
				style({ height: 300, opacity: 1 }),
				animate('1s ease-in', style({ height: 0, opacity: 0 }))
			])
		])
	]
})
export class VideoDemoComponent implements OnInit {

   constructor(private routerService: RouterService, private demoService:DemoService) { }

  route = this.routerService;
  demoContent:any;
  currentVideo:any;

  
 

  ngOnInit() {
    this.demoService.currentcontentDemo.subscribe(data => this.demoContent = data)
    if(this.demoContent === null)
    {
      this.demoContent = JSON.parse(localStorage.getItem('demoContent'));
      this.currentVideo = JSON.parse(localStorage.getItem('currentVideo'));
     // localStorage.removeItem('demoContent'); // to clear it again.
    }else{
      localStorage.removeItem('demoContent');
      localStorage.setItem('demoContent', JSON.stringify(this.demoContent));
      this.currentVideo = this.demoContent.src[0];
    }
    
  }

  onVideoClick(video){
    this.currentVideo = video;
      localStorage.removeItem('currentVideo');
      localStorage.setItem('currentVideo', JSON.stringify(this.currentVideo));

  }

   
  


}
