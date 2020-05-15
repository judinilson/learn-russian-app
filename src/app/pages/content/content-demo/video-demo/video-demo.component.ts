import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterService } from 'src/app/shared/service/router-service';
import { DemoService } from 'src/app/shared/service/content-demo-service';
import { trigger, transition, style, animate } from '@angular/animations';
import { AuthenticationService } from 'src/app/shared/service/authentication.service';




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

   constructor(private routerService: RouterService, 
    private demoService:DemoService,
    private authservice: AuthenticationService

    ) { }


  login = false;
  user = null;
  username = 'none';

  route = this.routerService;
  demoContent:any;
  currentVideo:any;

  matRiplecolor = "#e91e63";
  matRipleCentered = true;

  
 

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

    if(localStorage.getItem('currentUser') !== null){
      this.login = true;
      this.user = JSON.parse(window.localStorage.getItem('currentUser')); 
      this.username = this.user.username;
     console.log(this.username);
    }
    
  }

  onVideoClick(video){
    this.currentVideo = video;
      localStorage.removeItem('currentVideo');
      localStorage.setItem('currentVideo', JSON.stringify(this.currentVideo));

  }

   
  public logOut(){
    this.authservice.logout();
    this.login = false ;
  }


}
