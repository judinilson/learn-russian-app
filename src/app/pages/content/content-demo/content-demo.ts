import { Component, OnInit, NgModule } from '@angular/core';
import { RouterService } from 'src/app/shared/service/router-service';
import { Router } from '@angular/router';
import { DemoService } from 'src/app/shared/service/content-demo-service';
import {DataService} from 'src/app/shared/service/dataService';
@Component({
  selector: 'app-content-demo',
  templateUrl: './content-demo.html',
  styleUrls: ['./content-demo.scss']
})
export class ContentDemoComponent implements OnInit {
 
  constructor(
    private routerService: RouterService, 
    private router: Router,
    private demoService:DemoService,
    private dataService: DataService
    ) { }

    dataSource = this.dataService.demoDataService;

  selectedCategory: any;
  route = this.routerService;

  ngOnInit() {
    
  }

  categories(){
    return  this.dataSource.filter(
      (items, i,arr) => arr.findIndex(x => x.category === items.category) === i);
  }

  filteredCategory(){
    return this.dataSource.filter(x => x.category == this.selectedCategory);
  }
  

  onSelectedCard(content:any){
    this.router.navigateByUrl('/visual-demo');
    this.demoService.newContentDemo(content);
    console.log(content);
    
  };
}

