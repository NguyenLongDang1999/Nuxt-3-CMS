export enum STATUS {
    ACTIVE = 1,
    INACTIVE = 2
}

export enum POPULAR {
    ACTIVE = 1,
    INACTIVE = 2
}

export enum ROUTE {
    AUTH = 'auth',
    CATEGORY = 'category',
    BRAND = 'brand',
    ATTRIBUTE = 'attribute',
}

export enum ROUTER {
    DASHBOARD = '/',
    LOGIN = '/auth/login',
    PRODUCT = '/product',
    CATEGORY = '/product/category',
    BRAND = '/product/brand',
    ATTRIBUTE = '/product/attribute',
}

export enum FORMAT {
    DATE_TIME = 'DD-MM-YYYY HH:mm'
}

export enum MESSAGE {
    SUCCESS = 'success',
    ERROR = 'error'
}

export enum PAGE {
    CURRENT = 1,
    SIZE = 10
}

export enum IMAGE {
    DEFAULT = '/assets/default.jpg'
}

export enum AUTH {
    TOKEN = 'accessToken',
    USER_DATA = 'userData',
}
