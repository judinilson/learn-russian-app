import { Component, OnInit, NgModule } from '@angular/core';

@Component({
  selector: 'app-content-demo',
  templateUrl: './content-demo.html',
  styleUrls: ['./content-demo.scss']
})
export class ContentDemoComponent implements OnInit {
  dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit() {
  }

}

export interface ContentDemo {
  name: string;
  src: string;
  coverImg: string;
  category: string;
  subTitle: string;
}

const ELEMENT_DATA: ContentDemo[] =
[
  {
    name: 'Russia cart',
    src: './src/DemoGeo.mp4',
    coverImg: 'https://raw.githubusercontent.com/mjstest/orgb4/c076f0264a6acd4ad7e5e5d93bb3ead5/russiaInMap.jpg',
    category: 'geography',
    subTitle: 'Visit ten places on our planet that are undergoing the biggest changes today.'

  },

  {
    name: 'Russia cart',
    src: './src/DemoGeo.mp4',
    coverImg: 'https://raw.githubusercontent.com/mjstest/orgb4/c076f0264a6acd4ad7e5e5d93bb3ead5/russiaInMap.jpg',
    category: 'culture',
    subTitle: 'Visit ten places on our planet that are undergoing the biggest changes today.'

  },

  {
    name: 'Russia cart',
    src: './src/DemoGeo.mp4',
    coverImg: 'https://raw.githubusercontent.com/mjstest/orgb4/c076f0264a6acd4ad7e5e5d93bb3ead5/russiaInMap.jpg',
    category: 'culture',
    subTitle: 'Visit ten places on our planet that are undergoing the biggest changes today.'

  },

  {
    name: 'Russia cart',
    src: './src/DemoGeo.mp4',
    coverImg: 'https://raw.githubusercontent.com/mjstest/orgb4/c076f0264a6acd4ad7e5e5d93bb3ead5/russiaInMap.jpg',
    category: 'culture',
    subTitle: 'Visit ten places on our planet that are undergoing the biggest changes today.'

  },

  {
    name: 'Russia cart',
    src: './src/DemoGeo.mp4',
    coverImg: 'https://raw.githubusercontent.com/mjstest/orgb4/c076f0264a6acd4ad7e5e5d93bb3ead5/russiaInMap.jpg',
    category: 'culture',
    subTitle: 'Visit ten places on our planet that are undergoing the biggest changes today.'

  },

  {
    name: 'Russia cart',
    src: './src/DemoGeo.mp4',
    coverImg: 'https://raw.githubusercontent.com/mjstest/orgb4/c076f0264a6acd4ad7e5e5d93bb3ead5/russiaInMap.jpg',
    category: 'geography',
    subTitle: 'Visit ten places on our planet that are undergoing the biggest changes today.'

  },

  {
    name: 'Russia cart',
    src: './src/DemoGeo.mp4',
    coverImg: 'https://raw.githubusercontent.com/mjstest/orgb4/c076f0264a6acd4ad7e5e5d93bb3ead5/russiaInMap.jpg',
    category: 'geography',
    subTitle: 'Visit ten places on our planet that are undergoing the biggest changes today.'

  },

  {
    name: 'Russia cart',
    src: './src/DemoGeo.mp4',
    coverImg: 'https://raw.githubusercontent.com/mjstest/orgb4/c076f0264a6acd4ad7e5e5d93bb3ead5/russiaInMap.jpg',
    category: 'geography',
    subTitle: 'Visit ten places on our planet that are undergoing the biggest changes today.'

  },
  {
    name: 'Russia cart',
    src: './src/DemoGeo.mp4',
    coverImg: 'https://raw.githubusercontent.com/mjstest/orgb4/c076f0264a6acd4ad7e5e5d93bb3ead5/russiaInMap.jpg',
    category: 'geography',
    subTitle: 'Visit ten places on our planet that are undergoing the biggest changes today.'

  },


];
