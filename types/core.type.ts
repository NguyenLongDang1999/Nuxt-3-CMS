export interface IGlobalState {
    primary: string
    isCollapse: boolean
    breadcrumb: boolean
    breadcrumbIcon: boolean
    tabs: boolean
    tabsIcon: boolean
}

export interface IPagination {
    page: number
    pageSize: number
}

export interface IAggregations {
    aggregations: number
}

export interface INavigation {
    title: string
    to: string
    name: string
}

export interface IOptions {
    id: string | number
    name: string
    icon?: Component
    class?: string
}

export interface ICategoryList {
    id: string
    name: string
    image_uri: string
}

export interface IBrandList {
    id: string
    name: string
    image_uri: string
}

export interface IAttributeList {
    id: string
    name: string
}

export interface IProductAttribute extends IAttributeList {
    variant: string[]
}

export interface ITableColumn<T> {
    row: T
}

