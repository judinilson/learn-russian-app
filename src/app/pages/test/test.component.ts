import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

export interface Trainig
{
  id: number;
  questions: string;
  answer: string[];
  coverImg: string;
  title: string;
}

const ELEMENT_DATA: Trainig[] = 
[
  {
    id: 1, 
    questions: '',
    answer: [
      'A',
      'B',
      'C',
      'D'
    ],
    coverImg: '',
    title: ''
  }
]