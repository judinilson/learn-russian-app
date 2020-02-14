import { Component, OnInit } from '@angular/core';
import { RouterService } from 'src/app/shared/service/router-service';
import { Router } from '@angular/router';
import { DemoService } from 'src/app/shared/service/content-demo-service';
import { DataService } from 'src/app/shared/service/dataService';

@Component({
  selector: 'app-content-texts',
  templateUrl: './content-texts.html',
  styleUrls: ['./content-texts.scss'],
})
export class ContentTextsComponent implements OnInit {

  constructor(
    private routerService: RouterService,
    private router: Router,
    private demoService: DemoService,
    private dataService: DataService
    ) { }

  selectedCategory: any;


  route = this.routerService;
  dataSource = this.dataService.articleDataService;

  

    categories() {
      return  this.dataSource.filter(
        (items, i, arr) => arr.findIndex(x => x.category === items.category) === i);
    }
    filteredCategory() {
      return this.dataSource.filter(x => x.category === this.selectedCategory);
    }

  ngOnInit() {

    // this.dataSource.forEach((el,i) => {
    //   el.article = this.lorem.getLineEnding()
    // });

  }

  onSelectedCardArticle(content: any) {
    this.router.navigateByUrl('/visual-article');
    this.demoService.newContentArticle(content);
    console.log(content);

  }
}

