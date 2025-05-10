export const PATHS = {
    LOGIN: 'login',
    DASHBOARD: 'home',
    EMPLOYE: {
        LIST: 'employes',
        DETAIL: 'employes/detail/:id'
    },
    DEPARTEMENT: {
        LIST: 'departements',
        DETAIL: 'departements/detail/:id'
    },
    BULLETIN: {
        LIST: 'bulletins',
        DETAIL: 'bulletins/detail/:id'
    },
    NOT_FOUND: '**'
}

export const ROUTES = {
    DASHBOARD: `/${PATHS.DASHBOARD}`,
    LOGIN: `/${PATHS.LOGIN}`,
    EMPLOYE: {
        LIST: `/${PATHS.EMPLOYE.LIST}`,
        DETAIL: (id: number) => `/${PATHS.EMPLOYE.LIST}/detail/${id}`,
    },
    DEPARTEMENT: {
        LIST: `/${PATHS.DEPARTEMENT.LIST}`,
        DETAIL: (id: number) => `/${PATHS.DEPARTEMENT.LIST}/detail/${id}`
    },
    BULLETIN: {
        LIST: `/${PATHS.BULLETIN.LIST}`,
        DETAIL: (id: number) => `/${PATHS.BULLETIN.LIST}/detail/${id}`
    },
    NOT_FOUND: `/**`
}
