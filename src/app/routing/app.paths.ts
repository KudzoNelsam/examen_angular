export const PATHS = {

  CLIENT: {
    LIST: 'clients',
    DETAIL: 'clients/detail/:id',
    ADD: 'clients/add',
    EDIT: 'clients/edit/:id'
  },

  ARTICLE: {
    LIST: 'articles',
    DETAIL: 'articles/detail/:id',
    ADD: 'articles/add',
    EDIT: 'articles/edit/:id'
  },

  DETTE: {
    LIST: 'dettes',
    DETAIL: 'dettes/detail/:id',
    ADD: 'dettes/add',
    EDIT: 'dettes/edit/:id',
    BY_CLIENT: 'dettes/client/:clientId'
  },

  LIGNE: {
    LIST: 'lignes',
    DETAIL: 'lignes/detail/:id',
    BY_DETTE: 'lignes/dette/:detteId'
  },

  PAIEMENT: {
    LIST: 'paiements',
    DETAIL: 'paiements/detail/:id',
    ADD: 'paiements/add',
    EDIT: 'paiements/edit/:id',
    BY_DETTE: 'paiements/dette/:detteId',
    BY_CLIENT: 'paiements/client/:clientId'
  },

  REPORTS: {
    DASHBOARD: 'reports',
    CLIENTS: 'reports/clients',
    DETTES: 'reports/dettes',
    ARTICLES: 'reports/articles',
    PAIEMENTS: 'reports/paiements'
  },

  NOT_FOUND: '**'
}

export const ROUTES = {

  CLIENT: {
    LIST: `/${PATHS.CLIENT.LIST}`,
    DETAIL: (id: string) => `/${PATHS.CLIENT.LIST}/detail/${id}`,
    ADD: `/${PATHS.CLIENT.ADD}`,
    EDIT: (id: string) => `/${PATHS.CLIENT.LIST}/edit/${id}`
  },

  ARTICLE: {
    LIST: `/${PATHS.ARTICLE.LIST}`,
    DETAIL: (id: string) => `/${PATHS.ARTICLE.LIST}/detail/${id}`,
    ADD: `/${PATHS.ARTICLE.ADD}`,
    EDIT: (id: string) => `/${PATHS.ARTICLE.LIST}/edit/${id}`
  },

  DETTE: {
    LIST: `/${PATHS.DETTE.LIST}`,
    DETAIL: (id: string) => `/${PATHS.DETTE.LIST}/detail/${id}`,
    ADD: `/${PATHS.DETTE.ADD}`,
    EDIT: (id: string) => `/${PATHS.DETTE.LIST}/edit/${id}`,
    BY_CLIENT: (clientId: string) => `/${PATHS.DETTE.LIST}/client/${clientId}`
  },

  LIGNE: {
    LIST: `/${PATHS.LIGNE.LIST}`,
    DETAIL: (id: string) => `/${PATHS.LIGNE.LIST}/detail/${id}`,
    BY_DETTE: (detteId: string) => `/${PATHS.LIGNE.LIST}/dette/${detteId}`
  },

  PAIEMENT: {
    LIST: `/${PATHS.PAIEMENT.LIST}`,
    DETAIL: (id: string) => `/${PATHS.PAIEMENT.LIST}/detail/${id}`,
    ADD: `/${PATHS.PAIEMENT.ADD}`,
    EDIT: (id: string) => `/${PATHS.PAIEMENT.LIST}/edit/${id}`,
    BY_DETTE: (detteId: string) => `/${PATHS.PAIEMENT.LIST}/dette/${detteId}`,
    BY_CLIENT: (clientId: string) => `/${PATHS.PAIEMENT.LIST}/client/${clientId}`
  },

  NOT_FOUND: `/**`
}
