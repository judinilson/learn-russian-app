import { Component, OnInit } from '@angular/core';
import { RouterService } from 'src/app/shared/service/router-service';
import { Router } from '@angular/router';
import { DemoDataService } from 'src/app/shared/service/content-demo-service';
import { LoremIpsum } from "lorem-ipsum";

@Component({
  selector: 'app-content-texts',
  templateUrl: './content-texts.html',
  styleUrls: ['./content-texts.scss'],
})
export class ContentTextsComponent implements OnInit {
  selectedCategory: any;

  constructor(
    private routerService: RouterService, 
    private router: Router,
    private demoService:DemoDataService
    ) { }


  route = this.routerService;
  dataSource = ELEMENT_DATA;

   lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4
    },
    wordsPerSentence: {
      max: 16,
      min: 4
    }
  });
  

    article = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus, incidunt. Debitis,'
    +'repudiandae dignissimos et quam velit autem mollitia tenetur,'
    +'eligendi rerum repellendus, explicabo ad aperiam vel ipsam! Exercitationem, voluptates molestiae.'
    +'Iusto reiciendis mollitia ab commodi. Animi maiores nesciunt officia enim corrupti officiis consequuntur vel,'
    +'consectetur eveniet ad dolorum reprehenderit similique qui deleniti ut sed explicabo id error at. Laudantium,'
    +'excepturi!';
   // lorems = Array(5).fill(this.article);

    categories(){
      return  this.dataSource.filter(
        (items, i,arr) => arr.findIndex(x => x.category === items.category) === i);
    }s
  
    filteredCategory(){
      return this.dataSource.filter(x => x.category == this.selectedCategory);
    }

  ngOnInit() {
 
    this.lorem.generateWords(1);
    this.lorem.generateSentences(5);
    this.lorem.generateParagraphs(7);
    this.dataSource.forEach((el,i) => {
      el.article = this.lorem.getLineEnding()
    });

  }

  onSelectedCardArticle(content:any){
    this.router.navigateByUrl('/visual-article');
    this.demoService.newContentArticle(content)
    console.log(content);
    
  };

}

export interface ArticleContent {
  id:number;
  title: string;
  subTitle: string;
  coverImg: string;
  article: string;
  category: string;
}

const ELEMENT_DATA: ArticleContent[] =
[
  {
    id: 1,
    title: 'Что такое Lorem Ipsum' ,
    subTitle: 'Lorem Ipsum - это текст-, часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной  для текстов на латинице с начала XVI века.' ,
    coverImg: 'https://raw.githubusercontent.com/mjstest/orgb4/c076f0264a6acd4ad7e5e5d93bb3ead5/russiaInMap.jpg',
    article:'',
    category: 'culture'
  },
  {
    id: 2,
    title: 'Что такое Lorem Ipsum' ,
    subTitle: 'Lorem Ipsum - это текст-, часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной  для текстов на латинице с начала XVI века.' ,
    coverImg: 'https://raw.githubusercontent.com/mjstest/orgb4/c076f0264a6acd4ad7e5e5d93bb3ead5/russiaInMap.jpg',
    article:'',
    category: 'culture'
  },
  {
    id: 3,
    title: 'Что такое Lorem Ipsum' ,
    subTitle: 'Lorem Ipsum - это текст-, часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной  для текстов на латинице с начала XVI века.' ,
    coverImg: 'https://raw.githubusercontent.com/mjstest/orgb4/c076f0264a6acd4ad7e5e5d93bb3ead5/russiaInMap.jpg',
    article:'',
    category: 'geography'
  },
  {
    id: 4,
    title: 'Что такое Lorem Ipsum' ,
    subTitle: 'Lorem Ipsum - это текст-, часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной  для текстов на латинице с начала XVI века.' ,
    coverImg: 'https://raw.githubusercontent.com/mjstest/orgb4/c076f0264a6acd4ad7e5e5d93bb3ead5/russiaInMap.jpg',
    article:'',
    category: 'science'
  },
  {
    id: 6,
    title: 'Что такое Lorem Ipsum' ,
    subTitle: 'Lorem Ipsum - это текст-, часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной  для текстов на латинице с начала XVI века.' ,
    coverImg: 'https://raw.githubusercontent.com/mjstest/orgb4/c076f0264a6acd4ad7e5e5d93bb3ead5/russiaInMap.jpg',
    article:'',
    category: 'geography'
  },
  {
    id: 7,
    title: 'Что такое Lorem Ipsum' ,
    subTitle: 'Lorem Ipsum - это текст-, часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной  для текстов на латинице с начала XVI века.' ,
    coverImg: 'https://raw.githubusercontent.com/mjstest/orgb4/c076f0264a6acd4ad7e5e5d93bb3ead5/russiaInMap.jpg',
    article:'',
    category: 'culture'
  },

];

