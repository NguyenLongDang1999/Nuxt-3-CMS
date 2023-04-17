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
}

export interface ICategoryList {
    id: string
    name: string
    image_uri: string
}

export interface ITableColumn<T> {
    row: T
}
