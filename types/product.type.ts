// ** Types Imports
import type { IAggregations, IBrandList, ICategoryList, IPagination, IProductAttribute } from './core.type'

export interface IProductFormInput {
    id?: string
    sku: string
    name: string
    slug: string
    category_id: string
    quantity: number
    price: number
    type_discount: number
    price_discount: number
    attribute: IProductAttribute[]
    status?: number
    popular?: number
    brand_id?: string
    image_uri?: string
    short?: string
    content?: string
    meta_title?: string
    meta_keyword?: string
    meta_description?: string
}

export interface IProductSearch extends IPagination {
    sku?: string
    name?: string
    category_id?: string
    brand_id?: string
    status?: string
    popular?: string
}

export interface IProduct {
    id: string
    sku: string
    name: string
    Category: ICategoryList
    Brand: IBrandList
    image_uri: string
    price: number
    type_discount: number
    price_discount: number
    quantity: number
    status: number
    popular: number
    created_at: string
}

export interface IProductTable extends IAggregations {
    data: IProduct[]
}
