import { Component, OnInit } from "@angular/core";
import { RouterService } from "src/app/shared/service/router.service";
import { ContentService } from "src/app/shared/service/content.service";
import { AuthenticationService } from "src/app/shared/service/authentication.service";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { map, debounceTime, distinctUntilChanged } from "rxjs/operators";

@Component({
  selector: "app-article-content",
  templateUrl: "./article-content.component.html",
  styleUrls: ["./article-content.component.scss"],
})
export class ArticleContentComponent implements OnInit {
  bpo: any;
  constructor(
    private routerService: RouterService,
    private contentService: ContentService,
    private authservice: AuthenticationService
  ) {}

  route = this.routerService;
  articleContent: any;
  currentArticle: any;

  login = false;
  user = null;
  username = "none";
  currentTrainingTestIndex: boolean;
  mode = "side";
  opened = false;
  layoutGap = "64";
  fixedInViewport = true;
  footer_td: Date = new Date();

  article =
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus, incidunt. Debitis," +
    "repudiandae dignissimos et quam velit autem mollitia tenetur," +
    "eligendi rerum repellendus, explicabo ad aperiam vel ipsam! Exercitationem, voluptates molestiae." +
    "Iusto reiciendis mollitia ab commodi. Animi maiores nesciunt officia enim corrupti officiis consequuntur vel," +
    "consectetur eveniet ad dolorum reprehenderit similique qui deleniti ut sed explicabo id error at. Laudantium," +
    "excepturi!";

  lorems = Array(8).fill(this.article);

  ngOnInit() {
    this.contentService.currrentContentArticle.subscribe(
      (data) => (this.articleContent = data)
    );
    if (this.articleContent === null) {
      this.articleContent = JSON.parse(localStorage.getItem("demoContent"));
      this.currentArticle = JSON.parse(localStorage.getItem("currentArticle"));
    } else {
      localStorage.removeItem("demoContent");
      localStorage.setItem("demoContent", JSON.stringify(this.articleContent));
      this.currentArticle = this.articleContent;
    }

    //current user storage
    if (localStorage.getItem("currentUser") !== null) {
      this.login = true;
      this.user = JSON.parse(window.localStorage.getItem("currentUser"));
      this.username = this.user.username;
      console.log(this.username);
    }

    //continue training test alert
    if (
      (this.currentTrainingTestIndex =
        JSON.parse(localStorage.getItem("currentTestIndex")) !== null)
    ) {
      this.countTimesUservisitContentPage();
    }
  }

  onArticleClick(article) {
    this.currentArticle = article;
    localStorage.removeItem("currentArticle");
    localStorage.setItem("currentArticle", JSON.stringify(this.currentArticle));
  }

  public logOut() {
    this.authservice.logout();
    this.login = false;
  }

  countTimesUservisitContentPage() {
    var visited = JSON.parse(localStorage.getItem("userVisited"));
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
      //.pipe(map((bst) => bst.matches))
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
