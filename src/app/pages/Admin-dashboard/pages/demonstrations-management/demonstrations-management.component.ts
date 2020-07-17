import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'demonstrations-management',
  templateUrl: './demonstrations-management.component.html',
  styleUrls: ['./demonstrations-management.component.scss']
})
export class DemonstrationsManagementComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  isHovering: boolean;

  files: File[] = [];

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
    }
  }

}
