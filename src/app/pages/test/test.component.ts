import { Component, OnInit, NgModule } from "@angular/core";
import { RouterService } from "src/app/shared/service/router.service";
import { Router, RouterModule } from "@angular/router";
import { DataService } from "src/app/shared/service/dataService";
import { TrainingTestService } from "src/app/shared/service/training-test.service";
import { AuthenticationService } from "src/app/shared/service/authentication.service";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackbarAlertComponent } from "./snackbar-alert/snackbar-alert";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { ContentService } from "src/app/shared/service/content.service";
import { Category } from "src/app/shared/Model/Content";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { map } from "rxjs/operators";

@Component({
  selector: "app-test",
  templateUrl: "./test.component.html",
  styleUrls: ["./test.component.scss"],
})
export class TestComponent implements OnInit {
  mode = "side";
  opened = false;
  layoutGap = "64";
  fixedInViewport = true;
  login = false;
  user = null;
  username = "none";
  startTest: boolean;
  testIndex = 0;
  getIndex: any;
  private _categories: any;
  allTrainingCategory: Category[] = [];

  querryProgressBar = true;
  notnework = false;

  constructor(
    private bpo: BreakpointObserver,
    private routerService: RouterService,
    private router: Router,
    private dataService: DataService,
    private trainingService: TrainingTestService,
    private authservice: AuthenticationService,
    private contentService: ContentService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  dataSource = this.dataService.trainingDataService;
  demoDataSource = this.dataService.demoDataService;
  route = this.routerService;
  selectedCategory: any;
  trainingData: any;

  ngOnInit() {
    this.sidnav();
    if (localStorage.getItem("currentUser") !== null) {
      this.login = true;
      this.user = JSON.parse(window.localStorage.getItem("currentUser"));
      this.username = this.user.username;
      console.log(this.username);
    }
    this.getTestIndex();

    this.getCategories();
    this.getTrainingData();
  }

  //subscribe categories from db
  getCategories() {
    this.contentService.getCategory().subscribe(
      (data) => {
        //this._categories = data

        //store category in localstorage
        localStorage.removeItem("Trainingcategories");
        localStorage.setItem("Trainingcategories", JSON.stringify(data));
        // console.log(this._categories);
        this.querryProgressBar = false;
      },
      (error) => {
        console.log(" error trying get categories: ", error);
        this.notnework = true;
      }
    );
  }

  //filter categories when user chose one category
  filteredCategory() {
    return this.trainingData.filter(
      (x) => x.categoryId == this.selectedCategory.id
    );
  }

  getTrainingData() {
    this.querryProgressBar = true;
    this.trainingService
      .getTrainingContent()
      .pipe(debounceTime(500))
      .pipe(distinctUntilChanged())
      .subscribe(
        (data) => {
          this.trainingData = data;
          this.trainingCategory(data);
          this.querryProgressBar = false;
        },
        (error) => {
          console.log("error trying to get training Data: ", error);
          this.notnework = true;
        }
      );
  }

  //map article categories
  trainingCategory(data) {
    this._categories = JSON.parse(localStorage.getItem("Trainingcategories"));
    var cat = new Array();
    if (this._categories != null) {
      data.forEach((el, i) => {
        var dt = this._categories.filter((x) => x.id === el.categoryId);

        //check if already exist
        if (cat.every((x) => x.id !== dt[0].id)) {
          cat[i] = dt[0];
        }
      });

      this.allTrainingCategory = cat.filter((v) => v !== null); //get just non null value
    }
    console.log("Categories: ", this.allTrainingCategory);
  }

  onSelectedCard(content: any, index?) {
    index += 1;
    if (this.testIndex === 0 || this.testIndex === index) {
      this.setTestIndex(index, content);
      this.trainingService.newTraining(content);
      this.router.navigateByUrl("/training");
    } else {
      var message = content.title;
      this._userAlertTraining(message, content, index);
    }
  }

  setTestIndex(index, content) {
    var newIndex = {
      index: index,
      content: content,
    };
    localStorage.removeItem("currentTestIndex");
    localStorage.setItem("currentTestIndex", JSON.stringify(newIndex));
  }

  getTestIndex() {
    this.getIndex = JSON.parse(localStorage.getItem("currentTestIndex"));
    if (this.getIndex != null) this.testIndex = this.getIndex.index;
  }

  _userAlertTraining(message, content = null, index) {
    const dialogRef = this.dialog.open(SnackbarAlertComponent, {
      width: "450px",
      data: {
        message,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(debounceTime(300))
      .pipe(distinctUntilChanged())
      .subscribe((result) => {
        if (result != null) {
          var _content: any;
          console.log("dialog result: ", result);
          if (result.continue) {
            this.trainingService._continue = true;
            this.getIndex = JSON.parse(
              localStorage.getItem("currentTestIndex")
            );
            console.log("current test index: ", this.getIndex);
            if (this.getIndex != null) {
              this.testIndex = this.getIndex.index;
              _content = this.getIndex.content;
              this.router.navigateByUrl("/training");
              this.trainingService.newTraining(_content);
            }
          }
          if (result.new) {
            this.trainingService._start = true;
            this.setTestIndex(index, content);
            this.router.navigateByUrl("/training");
            this.trainingService.newTraining(content);
          }
        }
      });
  }

  public logOut() {
    this.authservice.logout();
    this.login = false;
  }

  // show cover image
  imgurl(item) {
    var imageUrl = "";
    if (item.coverImage !== null) {
      var https = "https://";
      var thumburl = item.coverImage.includes(https)
        ? item.coverImage
        : https + item.coverImage;
      imageUrl = thumburl;
    }
    return imageUrl;
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
