import { Component, OnInit, NgModule } from '@angular/core';
import { RouterService } from 'src/app/shared/service/router-service';
import { Router, RouterModule } from '@angular/router';
import { DataService } from 'src/app/shared/service/dataService';
import { TrainingTestService } from 'src/app/shared/service/training-test-service';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {


  constructor(
    private routerService: RouterService,
    private router: Router,
    private dataService: DataService,
    private trainingService: TrainingTestService
  ) { }

  dataSource = this.dataService.trainingDataService;
  demoDataSource = this.dataService.demoDataService;
  route = this.routerService;
  selectedCategory: any;
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
    this.router.navigateByUrl('/training');
    this.trainingService.newTraining(content);
    console.log(content);
    
  };

}



