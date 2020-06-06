import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterService } from 'src/app/shared/service/router-service';
import { DemoService } from 'src/app/shared/service/content-demo-service';
import { trigger, transition, style, animate } from '@angular/animations';
import { AuthenticationService } from 'src/app/shared/service/authentication.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';




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

  typesOfShoe:string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];

   constructor(private routerService: RouterService, 
    private demoService:DemoService,
    private authservice: AuthenticationService,

    ) { }


  showDemoItems = true;
  login = false;
  user = null;
  username = 'none';
  footer_td: Date = new Date();

  route = this.routerService;
  demoContent:any;
  currentVideo:any;

  matRiplecolor = "#e91e63";
  matRipleCentered = true;

  currentTrainingTestIndex: boolean;
  
 

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


    
    if( this.currentTrainingTestIndex = JSON.parse(localStorage.getItem('currentTestIndex')) !== null)
    {
      this.countTimesUservisitContentPage()
    }
  }

  onVideoClick(video){  
    this.currentVideo = video;
      localStorage.removeItem('currentVideo');
      localStorage.setItem('currentVideo', JSON.stringify(this.currentVideo));
    console.log(this.currentVideo);
  }

   
  public logOut(){
    this.authservice.logout();
    this.login = false ;
  }

  countTimesUservisitContentPage(){
    var visited = JSON.parse(localStorage.getItem('userVisited'))
    console.log(visited)
    if(visited !== null){
      var userVisited = {
        'user_visited_content': visited.user_visited_content + 1,
      }
      localStorage.removeItem('userVisited');
      localStorage.setItem('userVisited', JSON.stringify(userVisited));
    }
    
  }

}
