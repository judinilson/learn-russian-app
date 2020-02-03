import { Component, OnInit, NgModule } from '@angular/core';
import { RouterService } from 'src/app/shared/service/router-service';
import { Router } from '@angular/router';
import { DemoDataService } from 'src/app/shared/service/content-demo-service';
@Component({
  selector: 'app-content-demo',
  templateUrl: './content-demo.html',
  styleUrls: ['./content-demo.scss']
})
export class ContentDemoComponent implements OnInit {
  dataSource = ELEMENT_DATA;
  constructor(
    private routerService: RouterService, 
    private router: Router,
    private demoService:DemoDataService
    ) { }

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

export interface ContentDemo {
  id:number;
  name: string;
  src: string;
  coverImg: string;
  category: string;
  subTitle: string;
}

const ELEMENT_DATA: ContentDemo[] =
[
  {
    id: 1,
    name: 'Russia cart',
    src: 'https://raw.githubusercontent.com/mjstest/orgb4/bdf90d1e1151dc8be00640c73f48884f/DemoGeo.mp4',
    coverImg: 'https://raw.githubusercontent.com/mjstest/orgb4/c076f0264a6acd4ad7e5e5d93bb3ead5/russiaInMap.jpg',
    category: 'geography',
    subTitle: 'Visit ten places on our planet that are undergoing the biggest changes today.'

  },

  {
    id:2,
    name: 'Russia cart',
    src: './src/DemoGeo.mp4',
    coverImg: 'https://raw.githubusercontent.com/mjstest/orgb4/c076f0264a6acd4ad7e5e5d93bb3ead5/russiaInMap.jpg',
    category: 'culture',
    subTitle: 'Visit ten places on our planet that are undergoing the biggest changes today.'

  },

  {
    id:3,
    name: 'Russia cart',
    src: './src/DemoGeo.mp4',
    coverImg: 'https://raw.githubusercontent.com/mjstest/orgb4/c076f0264a6acd4ad7e5e5d93bb3ead5/russiaInMap.jpg',
    category: 'culture',
    subTitle: 'Visit ten places on our planet that are undergoing the biggest changes today.'

  },

  {
    id:4,
    name: 'Russia cart',
    src: './src/DemoGeo.mp4',
    coverImg: 'https://raw.githubusercontent.com/mjstest/orgb4/c076f0264a6acd4ad7e5e5d93bb3ead5/russiaInMap.jpg',
    category: 'culture',
    subTitle: 'Visit ten places on our planet that are undergoing the biggest changes today.'

  },

  {
    id: 5,
    name: 'Russia cart',
    src: './src/DemoGeo.mp4',
    coverImg: 'https://raw.githubusercontent.com/mjstest/orgb4/c076f0264a6acd4ad7e5e5d93bb3ead5/russiaInMap.jpg',
    category: 'culture',
    subTitle: 'Visit ten places on our planet that are undergoing the biggest changes today.'

  },

  {
    id:6,
    name: 'Russia cart',
    src: './src/DemoGeo.mp4',
    coverImg: 'https://raw.githubusercontent.com/mjstest/orgb4/c076f0264a6acd4ad7e5e5d93bb3ead5/russiaInMap.jpg',
    category: 'geography',
    subTitle: 'Visit ten places on our planet that are undergoing the biggest changes today.'

  },

  {
    id: 7,
    name: 'Russia cart',
    src: './src/DemoGeo.mp4',
    coverImg: 'https://raw.githubusercontent.com/mjstest/orgb4/c076f0264a6acd4ad7e5e5d93bb3ead5/russiaInMap.jpg',
    category: 'geography',
    subTitle: 'Visit ten places on our planet that are undergoing the biggest changes today.'

  },

  {
    id:8,
    name: 'Russia cart',
    src: './src/DemoGeo.mp4',
    coverImg: 'https://raw.githubusercontent.com/mjstest/orgb4/c076f0264a6acd4ad7e5e5d93bb3ead5/russiaInMap.jpg',
    category: 'geography',
    subTitle: 'Visit ten places on our planet that are undergoing the biggest changes today.'

  },
  {
    id:9,
    name: 'Russia cart',
    src: './src/DemoGeo.mp4',
    coverImg: 'https://raw.githubusercontent.com/mjstest/orgb4/c076f0264a6acd4ad7e5e5d93bb3ead5/russiaInMap.jpg',
    category: 'geography',
    subTitle: 'Visit ten places on our planet that are undergoing the biggest changes today.'

  },


];
