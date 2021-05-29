import { Component, OnInit, ViewChild } from "@angular/core";
import { RouterService } from "src/app/shared/service/router.service";
import { ContentService } from "src/app/shared/service/content.service";
import { trigger, transition, style, animate } from "@angular/animations";
import { AuthenticationService } from "src/app/shared/service/authentication.service";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
// import {VERSION} from '@angular/material';
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { map, debounceTime, distinctUntilChanged } from "rxjs/operators";

@Component({
  selector: "app-video-demo",
  templateUrl: "./video-demo.component.html",
  styleUrls: ["./video-demo.component.scss"],
  animations: [
    trigger("inOutAnimation", [
      transition(":enter", [
        style({ height: 0, opacity: 0 }),
        animate("1s ease-out", style({ height: 300, opacity: 1 })),
      ]),
      transition(":leave", [
        style({ height: 300, opacity: 1 }),
        animate("1s ease-in", style({ height: 0, opacity: 0 })),
      ]),
    ]),
  ],
})
export class VideoDemoComponent implements OnInit {
  typesOfShoe: string[] = [
    "Boots",
    "Clogs",
    "Loafers",
    "Moccasins",
    "Sneakers",
  ];
  //version = VERSION;
  mode = "side";
  opened = false;
  layoutGap = "64";
  fixedInViewport = true;

  constructor(
    private bpo: BreakpointObserver,
    private routerService: RouterService,
    private contentService: ContentService,
    private authservice: AuthenticationService
  ) {}

  showDemoItems = true;
  login = false;
  user = null;
  username = "none";
  footer_td: Date = new Date();

  route = this.routerService;
  demoContent: any;
  demoSrc: any;
  currentDemontrationsContentses: any;
  currentVideo: any;

  matRiplecolor = "#e91e63";
  matRipleCentered = true;

  currentTrainingTestIndex: boolean;

  ngOnInit() {
    this.sidnav();
    this.contentService.currentcontentDemo.subscribe(
      (data) => (this.demoContent = data)
    );
    if (this.demoContent === null) {
      this.demoContent = JSON.parse(localStorage.getItem("demoContent"));
      this.currentVideo = JSON.parse(localStorage.getItem("currentVideo"));
      // localStorage.removeItem('demoContent'); // to clear it again.
    } else {
      localStorage.removeItem("demoContent");
      localStorage.setItem("demoContent", JSON.stringify(this.demoContent));

      this.currentDemontrationsContentses = this.demoContent.demosource;
      this.currentVideo = this.videourl(
        this.currentDemontrationsContentses[0].src
      );
      console.log(this.currentVideo);
    }

    //current user
    if (localStorage.getItem("currentUser") !== null) {
      this.login = true;
      this.user = JSON.parse(window.localStorage.getItem("currentUser"));
      this.username = this.user.username;
      console.log(this.username);
    }

    //continue training alert
    if (
      (this.currentTrainingTestIndex =
        JSON.parse(localStorage.getItem("currentTestIndex")) !== null)
    ) {
      this.countTimesUservisitContentPage();
    }
  }

  onVideoClick(video) {
    this.currentVideo = this.videourl(video);
    localStorage.removeItem("currentVideo");
    localStorage.setItem("currentVideo", JSON.stringify(this.currentVideo));
    console.log(this.currentVideo);
  }

  public logOut() {
    this.authservice.logout();
    this.login = false;
  }

  countTimesUservisitContentPage() {
    var visited = JSON.parse(localStorage.getItem("userVisited"));
    console.log(visited);
    if (visited !== null) {
      var userVisited = {
        user_visited_content: visited.user_visited_content + 1,
      };
      localStorage.removeItem("userVisited");
      localStorage.setItem("userVisited", JSON.stringify(userVisited));
    }
  }

  //mat -side nav
  sidnav() {
    const breakpoints = Object.keys(Breakpoints).map((key) => Breakpoints[key]);
    this.bpo
      .observe(breakpoints)
      .pipe(map((bst) => bst.matches))
      .subscribe((matched) => {
        console.log("matched");

        this.determineSidenavMode();
        this.determineLayoutGap();
      });
  }

  private determineSidenavMode(): void {
    if (this.isExtraSmallDevice() || this.isSmallDevice()) {
      this.fixedInViewport = false;
      this.mode = "over";
      this.opened = false;
      return;
    }

    this.fixedInViewport = true;
    this.mode = "side";
  }

  private determineLayoutGap(): void {
    if (this.isExtraSmallDevice() || this.isSmallDevice()) {
      this.layoutGap = "0";
      return;
    }

    this.layoutGap = "64";
  }

  public isExtraSmallDevice(): boolean {
    return this.bpo.isMatched(Breakpoints.XSmall);
  }

  public isSmallDevice(): boolean {
    return this.bpo.isMatched(Breakpoints.Small);
  }

  //url corrections
  videourl(item) {
    var imageUrl = "";
    if (item !== null) {
      var https = "https://";
      var thumburl = item.includes(https) ? item : https + item;
      imageUrl = thumburl;
    }
    return imageUrl;
  }
}
