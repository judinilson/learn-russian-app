import { Component, OnInit } from '@angular/core';
import { RouterService } from 'src/app/shared/service/router-service';
import { DemoDataService } from 'src/app/shared/service/content-demo-service';


@Component({
  selector: 'app-video-demo',
  templateUrl: './video-demo.component.html',
  styleUrls: ['./video-demo.component.scss']
})
export class VideoDemoComponent implements OnInit {

   constructor(private routerService: RouterService, private demoService:DemoDataService) { }

  route = this.routerService;
  demoContent:any;

  ngOnInit() {
    this.demoService.currentcontentDemo.subscribe(data => this.demoContent = data)
  }

}
