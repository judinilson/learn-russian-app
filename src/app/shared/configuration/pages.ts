export interface NavLinkInfo {
    name: string;
    icon: string;
    location: string;
    subPages?;
}

export interface SubPages {
    name: string;
    icon: string;
    location: string;

}


export const ROLE_UNAUTHORIZED = 'GUEST';
export const ROLE_ADMIN = 'ADMIN';
export const ROLE_TEACHER = 'TEACHER';
export const ROLE_STUDENT = 'STUDENT';

export const PAGE_DASHBOARD = 'DASHBOARD';
export const PAGE_CONTENT_DEMO = 'CONTENT_DEMO';
export const PAGE_TEST = 'TEST';
export const PAGE_STATISTIC = 'STATISTIC';
export const PAGE_HELP = 'HELP';

export const NAV_LINKS: { [key: string]: NavLinkInfo } = {
    [PAGE_DASHBOARD]: {
      name: 'Главный', icon: 'home', location: '/dashboard'

    },
    [PAGE_CONTENT_DEMO]: {
      name: 'Россия', icon: 'class', location: null,
      subPages: [
          {
            name: 'Демонстрация', icon: 'video_label', location: '/content-demo'
          },
          {
            name: 'Статья', icon: 'receipt', location: '/content-text'
          }
      ]

    },
    [PAGE_TEST]: {
      name: 'Тестирование', icon: 'event_available', location: '/test'
    },
    [PAGE_STATISTIC]: {
        name: 'Статистика', icon: 'assessment', location: '/statistic'
      },
    [PAGE_HELP]: {
      name: 'Помощь ', icon: 'help', location: '/help'
    },

  };

export const NAV_SECTIONS: { [key: string]: Array<string> } = {
    [ROLE_ADMIN]: [PAGE_DASHBOARD, PAGE_CONTENT_DEMO,PAGE_TEST, PAGE_STATISTIC, PAGE_HELP],
    [ROLE_TEACHER]: [PAGE_DASHBOARD, PAGE_CONTENT_DEMO,PAGE_TEST, PAGE_STATISTIC, PAGE_HELP],
    [ROLE_STUDENT]: [PAGE_DASHBOARD, PAGE_CONTENT_DEMO, PAGE_TEST,PAGE_STATISTIC, PAGE_HELP],
    [ROLE_UNAUTHORIZED]: [PAGE_DASHBOARD, PAGE_CONTENT_DEMO,PAGE_HELP]
  };

