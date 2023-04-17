// ** Types Imports
import type { IAggregations, ICategoryList } from './core.type'

export interface ICategoryFormInput {
    id?: string
    name: string
    slug: string
    status?: number
    popular?: number
    parent_id?: string
    image_uri?: string
    description?: string
    meta_title?: string
    meta_keyword?: string
    meta_description?: string
}

export interface ICategorySearch {
    name?: string
    parent_id?: string
    status?: string
    popular?: string
}

export interface ICategory {
    id: string
    name: string
    parentCategory: ICategoryList
    image_uri: string
    status: number
    popular: number
    created_at: string
    updated_at: string
}

export interface ICategoryTable extends IAggregations {
    data: ICategory[]
}
