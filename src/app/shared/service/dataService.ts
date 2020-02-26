import { Injectable, OnInit, OnDestroy } from '@angular/core';



@Injectable({
    providedIn: 'root',
})

export class DataService {
    demoDataService = ELEMENT_DEMO_DATA; 
    articleDataService = ELEMENT_ARTICLE_DATA;
    trainingDataService = ELEMENT_TRAINING_DATA;
}

//content Demo
export interface ContentDemo {
    id:number;
    name: string;
    src: string[];
    coverImg: string;
    category: string;
    subTitle: string;
  }

  //article content
  export interface ArticleContent {
    id: number;
    title: string;
    subTitle: string;
    coverImg: string;
    article: string;
    category: string;
  }

  //training Content
  interface TrainigContent{
    category: string;
    coverImg: string;
    title: string;
    training: Trainig[];
  }
  interface Trainig
  {
    id: number;
    questions: string;
    answer: Answer[];
  }
  interface Answer{
    state: boolean;
    answer: string;
  }
  
  
  
  //demo
  const ELEMENT_DEMO_DATA: ContentDemo[] =
  [
    {
      id: 1,
      name: 'Russia cart',
      src: ['https://raw.githubusercontent.com/mjstest/orgb4/bdf90d1e1151dc8be00640c73f48884f/DemoGeo.mp4',
            'https://raw.githubusercontent.com/mjstest/orgb5/86ddf338a9f20896fcff907874b72bb8/videoplayback.mp4',
              'https://raw.githubusercontent.com/mjstest/orgb5/86ddf338a9f20896fcff907874b72bb8/videoplayback.mp4',
              'https://raw.githubusercontent.com/mjstest/orgb4/bdf90d1e1151dc8be00640c73f48884f/DemoGeo.mp4'
            ],
      coverImg: 'https://raw.githubusercontent.com/mjstest/orgb4/c076f0264a6acd4ad7e5e5d93bb3ead5/russiaInMap.jpg',
      category: 'geography',
      subTitle: 'Visit ten places on our planet that are undergoing the biggest changes today.'
  
    },
  
    {
      id:2,
      name: 'Russia cart',
      src: ['https://raw.githubusercontent.com/mjstest/orgb4/bdf90d1e1151dc8be00640c73f48884f/DemoGeo.mp4'],
      coverImg: 'https://raw.githubusercontent.com/mjstest/orgb5/57fc1a3e82717417ff0d960ff3ae6d4b/Sochi.jpg',
      category: 'culture',
      subTitle: 'Visit ten places on our planet that are undergoing the biggest changes today.'
  
    },
  
    {
      id:3,
      name: 'Russia cart',
      src: ['https://raw.githubusercontent.com/mjstest/orgb4/bdf90d1e1151dc8be00640c73f48884f/DemoGeo.mp4'],
      coverImg: 'https://raw.githubusercontent.com/mjstest/orgb5/905d5f953fc3570fe48c562d2cde4113/MoscowVladivostok.jpg',
      category: 'culture',
      subTitle: 'Visit ten places on our planet that are undergoing the biggest changes today.'
  
    },
  
    {
      id:4,
      name: 'Russia cart',
      src: ['https://raw.githubusercontent.com/mjstest/orgb4/bdf90d1e1151dc8be00640c73f48884f/DemoGeo.mp4'],
      coverImg: 'https://raw.githubusercontent.com/mjstest/orgb4/c076f0264a6acd4ad7e5e5d93bb3ead5/russiaInMap.jpg',
      category: 'culture',
      subTitle: 'Visit ten places on our planet that are undergoing the biggest changes today.'
  
    },
  
    {
      id: 5,
      name: 'Russia cart',
      src: ['https://raw.githubusercontent.com/mjstest/orgb4/bdf90d1e1151dc8be00640c73f48884f/DemoGeo.mp4'],
      coverImg: 'https://raw.githubusercontent.com/mjstest/orgb4/c076f0264a6acd4ad7e5e5d93bb3ead5/russiaInMap.jpg',
      category: 'culture',
      subTitle: 'Visit ten places on our planet that are undergoing the biggest changes today.'
  
    },
  
    {
      id:6,
      name: 'Russia cart',
      src: ['https://raw.githubusercontent.com/mjstest/orgb4/bdf90d1e1151dc8be00640c73f48884f/DemoGeo.mp4'],
      coverImg: 'https://raw.githubusercontent.com/mjstest/orgb4/c076f0264a6acd4ad7e5e5d93bb3ead5/russiaInMap.jpg',
      category: 'geography',
      subTitle: 'Visit ten places on our planet that are undergoing the biggest changes today.'
  
    },
  
    {
      id: 7,
      name: 'Russia cart',
      src: ['https://raw.githubusercontent.com/mjstest/orgb4/bdf90d1e1151dc8be00640c73f48884f/DemoGeo.mp4'],
      coverImg: 'https://raw.githubusercontent.com/mjstest/orgb4/c076f0264a6acd4ad7e5e5d93bb3ead5/russiaInMap.jpg',
      category: 'geography',
      subTitle: 'Visit ten places on our planet that are undergoing the biggest changes today.'
  
    },
  
    {
      id:8,
      name: 'Russia cart',
      src: ['https://raw.githubusercontent.com/mjstest/orgb4/bdf90d1e1151dc8be00640c73f48884f/DemoGeo.mp4'],
      coverImg: 'https://raw.githubusercontent.com/mjstest/orgb4/c076f0264a6acd4ad7e5e5d93bb3ead5/russiaInMap.jpg',
      category: 'geography',
      subTitle: 'Visit ten places on our planet that are undergoing the biggest changes today.'
  
    },
    {
      id:9,
      name: 'Russia cart',
      src: ['https://raw.githubusercontent.com/mjstest/orgb4/bdf90d1e1151dc8be00640c73f48884f/DemoGeo.mp4'],
      coverImg: 'https://raw.githubusercontent.com/mjstest/orgb4/c076f0264a6acd4ad7e5e5d93bb3ead5/russiaInMap.jpg',
      category: 'geography',
      subTitle: 'Visit ten places on our planet that are undergoing the biggest changes today.'
  
    },
  
  
  ];
  

 //article
  const ELEMENT_ARTICLE_DATA: ArticleContent[] =
  [
    {
      id: 1,
      title: 'Что такое Lorem Ipsum' ,
      subTitle: 'Lorem Ipsum - это текст-, часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной  для текстов на латинице с начала XVI века.' ,
      coverImg: 'https://raw.githubusercontent.com/mjstest/orgb4/c076f0264a6acd4ad7e5e5d93bb3ead5/russiaInMap.jpg',
      article: '',
      category: 'culture'
    },
    {
      id: 2,
      title: 'Что такое Lorem Ipsum' ,
      subTitle: 'Lorem Ipsum - это текст-, часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной  для текстов на латинице с начала XVI века.' ,
      coverImg: 'https://raw.githubusercontent.com/mjstest/orgb4/c076f0264a6acd4ad7e5e5d93bb3ead5/russiaInMap.jpg',
      article: '',
      category: 'culture'
    },
    {
      id: 3,
      title: 'Что такое Lorem Ipsum' ,
      subTitle: 'Lorem Ipsum - это текст-, часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной  для текстов на латинице с начала XVI века.' ,
      coverImg: 'https://raw.githubusercontent.com/mjstest/orgb4/c076f0264a6acd4ad7e5e5d93bb3ead5/russiaInMap.jpg',
      article: '',
      category: 'geography'
    },
    {
      id: 4,
      title: 'Что такое Lorem Ipsum' ,
      subTitle: 'Lorem Ipsum - это текст-, часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной  для текстов на латинице с начала XVI века.' ,
      coverImg: 'https://raw.githubusercontent.com/mjstest/orgb4/c076f0264a6acd4ad7e5e5d93bb3ead5/russiaInMap.jpg',
      article: '',
      category: 'science'
    },
    {
      id: 6,
      title: 'Что такое Lorem Ipsum' ,
      subTitle: 'Lorem Ipsum - это текст-, часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной  для текстов на латинице с начала XVI века.' ,
      coverImg: 'https://raw.githubusercontent.com/mjstest/orgb4/c076f0264a6acd4ad7e5e5d93bb3ead5/russiaInMap.jpg',
      article: '',
      category: 'geography'
    },
    {
      id: 7,
      title: 'Что такое Lorem Ipsum' ,
      subTitle: 'Lorem Ipsum - это текст-, часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной  для текстов на латинице с начала XVI века.' ,
      coverImg: 'https://raw.githubusercontent.com/mjstest/orgb4/c076f0264a6acd4ad7e5e5d93bb3ead5/russiaInMap.jpg',
      article: '',
      category: 'culture'
    },
  
  ];
  
  


  const ELEMENT_TRAINING_DATA: TrainigContent[] = 
[
  {
    
    category: 'culture',
    coverImg: 'https://raw.githubusercontent.com/mjstest/orgb4/c076f0264a6acd4ad7e5e5d93bb3ead5/russiaInMap.jpg',
    title: 'Visit ten places on our planet',
    training:[
      {
        id: 1, 
        questions: 'Dolor sit amet consectetur adipisicing elit. Necessitatibus, incidunt. Debitis,repudiandae dignissimos et quam velit autem mollitia tenetur,eligendi rerum repellendus, explicabo ad aperiam vel ipsam! Exercitationem, voluptates molestiae.',
        answer: [
          {
            state:false,
            answer: 'Laudantium'
          },
          {
            state:true,
            answer: 'Laudantium,excepturi!'
          },
          {
            state:false,
            answer: 'Laudantium,excepturi!'
          },
          {
            state:false,
            answer: 'Laudantium,sit amet!'
          },
    
        ],
       
      },
      {
        id: 2, 
        questions: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus, incidunt. Debitis,repudiandae dignissimos et quam velit autem mollitia tenetur,eligendi rerum repellendus, explicabo ad aperiam vel ipsam! Exercitationem, voluptates molestiae.',
        answer: [
          {
            state:true,
            answer: 'Laudantium,excepturi sit amet!'
          },
          {
            state:false,
            answer: 'Laudantium,excepturi!'
          },
          {
            state:false,
            answer: 'Laudantium,excepturi!'
          },
          {
            state:true,
            answer: 'Laudantium,excepturi sit amet!'
          },
    
        ],
       
      },
      {
        id: 3, 
        questions: 'Lorem ipsum, consectetur adipisicing elit. Necessitatibus, incidunt. Debitis,repudiandae dignissimos et quam velit autem mollitia tenetur,eligendi rerum repellendus, explicabo ad aperiam vel ipsam! Exercitationem, voluptates molestiae.',
        answer: [
          {
            state:false,
            answer: 'Laudantium,excepturi '
          },
          {
            state:true,
            answer: 'Laudantium,excepturi!'
          },
          {
            state:false,
            answer: 'Laudantium'
          },
          {
            state:false,
            answer: 'Laudantium,excepturi sit amet!'
          },
    
        ],
       
      },
      {
        id: 4, 
        questions: 'Lorem ipsum, dolor sit  adipisicing elit. Necessitatibus, incidunt. Debitis,repudiandae dignissimos et quam velit autem mollitia tenetur,eligendi rerum repellendus, explicabo ad aperiam vel ipsam! Exercitationem, voluptates molestiae.',
        answer: [
          {
            state:false,
            answer: 'Laudantium,excepturi sit amet!'
          },
          {
            state:true,
            answer: 'Laudantium,excepturi!'
          },
          {
            state:false,
            answer: 'Laudantium,excepturi!'
          },
          {
            state:false,
            answer: 'Laudantium,excepturi sit amet!'
          },
    
        ],
       
      },
      {
        id: 5, 
        questions: 'Lorem ipsum, dolor sit amet consectetur at. Necessitatibus, incidunt. Debitis,repudiandae dignissimos et quam velit autem mollitia tenetur,eligendi rerum repellendus, explicabo ad aperiam vel ipsam! Exercitationem, voluptates molestiae.',
        answer: [
          {
            state:false,
            answer: 'Laudantium,excepturi sit amet!'
          },
          {
            state:true,
            answer: 'Laudantium,excepturi!'
          },
          {
            state:false,
            answer: 'Laudantium,excepturi!'
          },
          {
            state:false,
            answer: 'Laudantium,excepturi sit amet!'
          },
    
        ],
       
      },

    ]
  },
  {
    
    category: 'geography',
    coverImg: 'https://raw.githubusercontent.com/mjstest/orgb4/c076f0264a6acd4ad7e5e5d93bb3ead5/russiaInMap.jpg',
    title: 'Visit ten places on our planet',
    training:[
      {
        id: 2, 
        questions: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus, incidunt. Debitis,repudiandae dignissimos et quam velit autem mollitia tenetur,eligendi rerum repellendus, explicabo ad aperiam vel ipsam! Exercitationem, voluptates molestiae.',
        answer: [
          {
            state:false,
            answer: 'Laudantium,excepturi sit amet!'
          },
          {
            state:true,
            answer: 'Laudantium,excepturi!'
          },
          {
            state:false,
            answer: 'Laudantium,excepturi!'
          },
          {
            state:false,
            answer: 'Laudantium,excepturi sit amet!'
          },
    
        ],
       
      }
    ]
  },
  {
    
    category: 'science',
    coverImg: 'https://raw.githubusercontent.com/mjstest/orgb4/c076f0264a6acd4ad7e5e5d93bb3ead5/russiaInMap.jpg',
    title: 'Visit ten places on our planet',
    training:[
      {
        id: 3, 
        questions: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus, incidunt. Debitis,repudiandae dignissimos et quam velit autem mollitia tenetur,eligendi rerum repellendus, explicabo ad aperiam vel ipsam! Exercitationem, voluptates molestiae.',
        answer: [
          {
            state:false,
            answer: 'Laudantium,excepturi sit amet!'
          },
          {
            state:true,
            answer: 'Laudantium,excepturi!'
          },
          {
            state:false,
            answer: 'Laudantium,excepturi!'
          },
          {
            state:false,
            answer: 'Laudantium,excepturi sit amet!'
          },
    
        ],
       
      }
    ]
  },
  {
    
    category: 'geography',
    coverImg: 'https://raw.githubusercontent.com/mjstest/orgb4/c076f0264a6acd4ad7e5e5d93bb3ead5/russiaInMap.jpg',
    title: 'Visit ten places on our planet',
    training:[
      {
        id: 4, 
        questions: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus, incidunt. Debitis,repudiandae dignissimos et quam velit autem mollitia tenetur,eligendi rerum repellendus, explicabo ad aperiam vel ipsam! Exercitationem, voluptates molestiae.',
        answer: [
          {
            state:false,
            answer: 'Laudantium,excepturi sit amet!'
          },
          {
            state:true,
            answer: 'Laudantium,excepturi!'
          },
          {
            state:false,
            answer: 'Laudantium,excepturi!'
          },
          {
            state:false,
            answer: 'Laudantium,excepturi sit amet!'
          },
    
        ],
       
      }
    ]
  },
  {
    
    category: 'geography',
    coverImg: 'https://raw.githubusercontent.com/mjstest/orgb4/c076f0264a6acd4ad7e5e5d93bb3ead5/russiaInMap.jpg',
    title: 'Visit ten places on our planet',
    training:[
      {
        id: 5, 
        questions: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus, incidunt. Debitis,repudiandae dignissimos et quam velit autem mollitia tenetur,eligendi rerum repellendus, explicabo ad aperiam vel ipsam! Exercitationem, voluptates molestiae.',
        answer: [
          {
            state:false,
            answer: 'Laudantium,excepturi sit amet!'
          },
          {
            state:true,
            answer: 'Laudantium,excepturi!'
          },
          {
            state:false,
            answer: 'Laudantium,excepturi!'
          },
          {
            state:false,
            answer: 'Laudantium,excepturi sit amet!'
          },
    
        ],
       
      }
    ]
  },
  

]