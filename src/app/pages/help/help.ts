import { Component, NgModule, OnInit } from "@angular/core";
import { MatExpansionModule } from "@angular/material/expansion";
import { SideNavPageModule } from "src/app/shared/side-nav/side-nav.component";
import { BrowserModule } from "@angular/platform-browser";
@Component({
  selector: "app-help",
  templateUrl: "./help.html",
  styleUrls: ["./help.scss"],
})
export class HelpComponent implements OnInit {
  constructor() {}

  Data: any = [1, 2, 3, 5, 6, 7, 8, 10];
  footer_td: Date = new Date();
  panelOpenState = false;
  ngOnInit() {}
}

@NgModule({
  imports: [BrowserModule, MatExpansionModule, SideNavPageModule],
  exports: [HelpComponent],
  //providers: [DataService],
  declarations: [HelpComponent],
})
export class FQHelpModule {}
