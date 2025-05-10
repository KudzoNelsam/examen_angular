export const PATHS = {
    LOGIN: 'login',
    DASHBOARD: 'home',
    EMPLOYE: {
        LIST: 'employes',
        DETAIL: 'employe/detail/:id'
    },
    DEPARTEMENT: {
        LIST: 'departements',
        DETAIL: 'departement/detail/:id'
    },
    BULLETIN: {
        LIST: 'bulletins',
        DETAIL: 'bulletin/detail/:id'
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
