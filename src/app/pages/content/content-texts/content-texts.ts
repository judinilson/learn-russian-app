import { Component, OnInit } from '@angular/core';
import { RouterService } from 'src/app/shared/service/router.service';
import { Router } from '@angular/router';
import { ContentService } from 'src/app/shared/service/content.service';
import { DataService } from 'src/app/shared/service/dataService';
import { AuthenticationService } from 'src/app/shared/service/authentication.service';
import { Category } from 'src/app/shared/Model/Content';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-content-texts',
  templateUrl: './content-texts.html',
  styleUrls: ['./content-texts.scss'],
})
export class ContentTextsComponent implements OnInit {

  mode = 'side'
  opened = false;
  layoutGap = '64';
  fixedInViewport = true;
  selectedCategory: any;
  login = false;
  user = null;
  username = 'none';
  currentTrainingTestIndex: boolean;
  continueTestAlert: boolean;
  ArticleData: any;
  allArticleCategory: Category[] = []
  _categories: any;
  notnework = false;

  constructor(
    private bpo: BreakpointObserver,
    private routerService: RouterService,
    private router: Router,
    private contentService: ContentService,
    private dataService: DataService,
    private authservice: AuthenticationService
  ) { }

  querryProgressBar = true


  route = this.routerService;
  dataSource = this.dataService.articleDataService;




  ngOnInit() {
    this.sidnav()

    // this.dataSource.forEach((el,i) => {
    //   el.article = this.lorem.getLineEnding()
    // });

    //current user storage
    if (localStorage.getItem('currentUser') !== null) {
      this.login = true;
      this.user = JSON.parse(window.localStorage.getItem('currentUser'));
      this.username = this.user.username;
      console.log(this.username);
    }


    //continue training alert 
    if (
      this.currentTrainingTestIndex = JSON.parse(localStorage.getItem('currentTestIndex')) !== null
    ) this.continueTestAlert = true;

    this.categories();
    this.getArticleContent() // get article 

  }

  //subscribe categories from db
  categories() {
    this.contentService.getCategory().subscribe(
      data => {
        //this._categories = data

        //store category in localstorage
        localStorage.removeItem('Articlecategories');
        localStorage.setItem('Articlecategories', JSON.stringify(data));
        // console.log(this._categories);
        this.querryProgressBar  = false;
      },
      error => {
        console.log(" error trying get categories: ", error);
        this.notnework = true;
      }
    )


  }

  //filter categories when user chose one category
  filteredCategory() {
    return this.ArticleData.filter(x => x.categoryID == this.selectedCategory.id)
  }

  //subscribe article data from db 
  getArticleContent() {
    this.querryProgressBar  = true;
    this.contentService.getArticleContent().subscribe(
      data => {
        this.ArticleData = data
        // filter just article categories 
        this.articleCategory(data)
        this.querryProgressBar  = false;
      },
      error => {
        console.log("error getting demo data: ", error);
        this.notnework = true;
      }
    )

  }

  //map article categories
  articleCategory(data) {
    this._categories = JSON.parse(localStorage.getItem('Articlecategories'))
    var category = new Array()
    if (this._categories != null) {
      data.forEach((el, i) => {
        var dt = (this._categories.filter(x => x.id === el.categoryID))

        //check if already exist
        if (category.every(x => x.id !== dt[0].id)) {
          category[i] = dt[0]
        }
      });

      this.allArticleCategory = category.filter(v => v !== null)//get just non null value 
    }
  }



  onSelectedCardArticle(content: any) {
    this.querryProgressBar  = true;
    this.router.navigateByUrl('/visual-article');
    this.contentService.newContentArticle(content);
    this.querryProgressBar  = false;
    console.log(content);

  }

  public logOut() {
    this.authservice.logout();
    this.login = false;
  }



   //mat -side nav
   sidnav() {
    const breakpoints = Object.keys(Breakpoints).map(key => Breakpoints[key])
    this.bpo.observe(breakpoints)
    .pipe(map(bst => bst.matches))
    .subscribe(matched => {
      

      console.log('matched');

      this.determineSidenavMode();
      this.determineLayoutGap();
    });
  }

  private determineSidenavMode(): void {
    if (
      this.isExtraSmallDevice() ||
      this.isSmallDevice()
    ) {
      this.fixedInViewport = false;
      this.mode = 'over';
      this.opened = false;
      return;
    }

    this.fixedInViewport = true;
    this.mode = 'side';
  }

  private determineLayoutGap(): void {
    if (this.isExtraSmallDevice() || this.isSmallDevice()) {
      this.layoutGap = '0';
      return;
    }

    this.layoutGap = '64';
  }

  public isExtraSmallDevice(): boolean {
    return this.bpo.isMatched(Breakpoints.XSmall);
  }

  public isSmallDevice(): boolean {
    return this.bpo.isMatched(Breakpoints.Small)
  }
}

