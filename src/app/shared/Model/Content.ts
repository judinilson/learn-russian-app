
export class Category{
  id?: number; 
  name: string;
}


export class DemoContent{
  title: string;
  src: string;
}

export class DemonstrationContent {
    id: number;
    title: string;
    subtitle: string;
    coverImage: string;
    DemonstrationContentses: DemoContent[];
    article: string; 
    categoryID: number;
    isDemo: boolean;
    author: string;

}

export class ArticleContent {
  id: number;
  title: string;
  subtitle: string;
  coverImage: string;
  article: string; 
  categoryID: number;
  isArticle: boolean;
  author: string;

}