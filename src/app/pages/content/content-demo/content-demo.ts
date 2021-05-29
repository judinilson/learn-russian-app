import { Component, OnInit, NgModule } from "@angular/core";
import { RouterService } from "src/app/shared/service/router.service";
import { Router } from "@angular/router";
import { ContentService } from "src/app/shared/service/content.service";
import { DataService } from "src/app/shared/service/dataService";
import { AuthenticationService } from "src/app/shared/service/authentication.service";
import { Category } from "src/app/shared/Model/Content";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { debounceTime, distinctUntilChanged, map } from "rxjs/operators";

@Component({
  selector: "app-content-demo",
  templateUrl: "./content-demo.html",
  styleUrls: ["./content-demo.scss"],
})
export class ContentDemoComponent implements OnInit {
  login = false;
  user = null;
  username = "none";
  currentTrainingTestIndex: boolean;
  continueTestAlert: boolean;
  demoData: any;
  _categories: any;
  allDemoCategory: Category[] = [];

  querryProgressBar = true;
  notnework = false;

  mode = "side";
  opened = false;
  layoutGap = "64";
  fixedInViewport = true;
  demoSrc: any;
  ContentArr = [];

  constructor(
    private bpo: BreakpointObserver,
    private routerService: RouterService,
    private router: Router,
    private contentService: ContentService,
    private dataService: DataService,
    private authservice: AuthenticationService
  ) {}

  dataSource = this.dataService.demoDataService;

  selectedCategory: any;
  route = this.routerService;

  ngOnInit() {
    setTimeout(() => {
      this.categories();
      this.getAllDemoSrc();
      this.getDemostrationContent();
    }, 200);
    this.sidnav();

    //current user storage
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
    )
      this.continueTestAlert = true;

    //this.categories(); //get all categories
    //this.getDemostrationContent(); //get demonstration content
  }

  categories() {
    this.contentService.getCategory().subscribe(
      (data) => {
        localStorage.removeItem("Democategories");
        localStorage.setItem("Democategories", JSON.stringify(data));
        this.querryProgressBar = false;
      },
      (error) => {
        console.log(" error trying get categories: ", error);
        this.notnework = true;
      }
    );
  }

  filteredCategory() {
    return this.ContentArr.filter(
      (x) => x.category.id == this.selectedCategory.id
    );
  }

  customContentList() {
    var category: any;
    var demosource: any;
    if (this._categories != undefined && this.demoSrc !== undefined)
      this.demoData.forEach((x) => {
        category = this._categories.filter((y) => {
          return y.id === x.categoryID;
        });
        demosource = this.demoSrc.filter((y) => {
          return y.id === x.demonstrationContentID;
        });
        this.ContentArr.push({
          id: x.id,
          title: x.title,
          description: x.subtitle,
          category: category[0],
          demosource: demosource[0].demostrationContentses,
          demosourcelength: demosource[0].demostrationContentses.length,
          demosourceID: x.demonstrationContentID,
          thumb: x.coverImage,
        });
      });
    console.log(this.ContentArr);
  }

  getDemostrationContent() {
    this.querryProgressBar = true;
    this.contentService.getDemoContent().subscribe(
      (data) => {
        console.log(data);
        this.demoData = data;
        this.demonCategory(data);
        setTimeout(() => {
          this.customContentList();
        }, 800);
        this.querryProgressBar = false;
      },
      (error) => {
        console.log("error getting demo data: ", error);
        this.notnework = true;
      }
    );
  }

  // get demostration src
  getAllDemoSrc() {
    var _data: any;
    this.contentService
      .getDemoSrc()
      .pipe(debounceTime(500))
      .pipe(distinctUntilChanged())
      .subscribe(
        (data) => {
          _data = data;
          this.demoSrc = _data;
          console.log(data);
        },
        (error) => {
          console.log("error trying to get demo source", error);
        }
      );
  }

  // show cover image
  imgurl(item) {
    var imageUrl = "";
    if (item.thumb !== null) {
      var https = "https://";
      var thumburl = item.thumb.includes(https)
        ? item.thumb
        : https + item.thumb;
      imageUrl = thumburl;
    }
    return imageUrl;
  }

  //map demostration content categories
  demonCategory(data) {
    this._categories = JSON.parse(localStorage.getItem("Democategories"));
    var category = new Array();
    if (this._categories != null) {
      data.forEach((el, i) => {
        var dt = this._categories.filter((x) => x.id === el.categoryID);

        //check if already exist
        if (category.every((x) => x.id !== dt[0].id)) {
          category[i] = dt[0];
        }
      });

      this.allDemoCategory = category.filter((v) => v !== null); //get just non null value
    }
  }

  onSelectedCard(content: any) {
    this.router.navigateByUrl("/visual-demo");
    this.contentService.newContentDemo(content);
    console.log(content);
  }

  public logOut() {
    this.authservice.logout();
    this.login = false;
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
}
