
export class Category{
  id?: number; 
  name: string;
}

export class DemonstrationSource{
  id?:number;
  title: string;
  src: string;
  demonstrationContentsId?:number;
}

export class DemoContent{
 id?:number;
 demostrationContentses:DemonstrationSource[];
}

export class DemonstrationContent {
    id?: number;
    title: string;
    subtitle: string;
    coverImage: string;
    demonstrationContentID:string;
    //DemonstrationContentses: DemoContent[];
    article: string; 
    categoryID: number;
    isDemo?: boolean;
    author: string;
    created?: Date;

}

export class DemoContentPostWithCoverImg{
    title: string;
    subtitle: string;
    coverImage: string;
    categoryID: number;
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

