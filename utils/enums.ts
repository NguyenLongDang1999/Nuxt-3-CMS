export enum STATUS {
    ACTIVE = 1,
    INACTIVE = 2
}

export enum POPULAR {
    ACTIVE = 1,
    INACTIVE = 2
}

export enum DISCOUNT {
    PRICE = 1,
    PERCENT = 2
}

export enum ROUTE {
    AUTH = 'auth',
    CATEGORY = 'category',
    BRAND = 'brand',
    ATTRIBUTE = 'attribute',
    VARIANT = 'variant',
    PRODUCT = 'product',
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

// ----- ROUTER -----
export enum ROUTER {

    // ----- DASHBOARD -----
    DASHBOARD = '/',

    // ----- AUTH -----
    LOGIN = '/auth/login',

    // ----- PRODUCT -----
    PRODUCT = '/product',
    PRODUCT_CREATE = '/product/create',

    // ----- BRAND -----
    BRAND = '/product/brand',

    // ----- CATEGORY -----
    CATEGORY = '/product/category',

    // ----- ATTRIBUTE -----
    ATTRIBUTE = '/product/attribute',
}
