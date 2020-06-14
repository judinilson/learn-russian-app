import {Component, OnInit} from '@angular/core';
import { NgModule } from '@angular/core';



@Component({
  selector: 'not-network',
  templateUrl: 'not-network.html',
  styleUrls: ['not-network.scss'],
})
export class NotNetwork implements OnInit {
  constructor(){}

  ngOnInit(){

  }
}

@NgModule({
  imports: [],
  exports: [NotNetwork],
  declarations:[NotNetwork]
})
export class NotNetworkModule { }