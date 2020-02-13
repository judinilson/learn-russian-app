import { Component, OnInit } from '@angular/core';
import { RouterService } from 'src/app/shared/service/router-service';
import { DemoDataService } from 'src/app/shared/service/content-demo-service';

@Component({
  selector: 'app-article-content',
  templateUrl: './article-content.component.html',
  styleUrls: ['./article-content.component.scss']
})
export class ArticleContentComponent implements OnInit {

  constructor(private routerService: RouterService, private demoService:DemoDataService) { }

  route = this.routerService;
  articleContent:any;
  currentArticle:any;

  article = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus, incidunt. Debitis,'
  + 'repudiandae dignissimos et quam velit autem mollitia tenetur,'
  + 'eligendi rerum repellendus, explicabo ad aperiam vel ipsam! Exercitationem, voluptates molestiae.'
  + 'Iusto reiciendis mollitia ab commodi. Animi maiores nesciunt officia enim corrupti officiis consequuntur vel,'
  + 'consectetur eveniet ad dolorum reprehenderit similique qui deleniti ut sed explicabo id error at. Laudantium,'
  + 'excepturi!';

  lorems = Array(8).fill(this.article);
 

  ngOnInit() {
    this.demoService.currrentContentArticle.subscribe(data => this.articleContent = data)
    if(this.articleContent === null)
    {
      this.articleContent = JSON.parse(localStorage.getItem('demoContent'));
      this.currentArticle = JSON.parse(localStorage.getItem('currentVideo'));
     // localStorage.removeItem('demoContent'); // to clear it again.
    }else{
      localStorage.removeItem('demoContent');
      localStorage.setItem('demoContent', JSON.stringify(this.articleContent));
      this.currentArticle = this.articleContent;
    }
    
  }

  onVideoClick(article){
    this.currentArticle = article;
      localStorage.removeItem('currentVideo');
      localStorage.setItem('currentVideo', JSON.stringify(this.currentArticle));

  }

}
