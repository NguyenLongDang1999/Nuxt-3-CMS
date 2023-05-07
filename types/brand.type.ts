// ** Types Imports
import type { IAggregations, ICategoryList, IPagination } from './core.type'

export interface IBrandFormInput {
    id?: string
    name: string
    slug: string
    status?: number
    popular?: number
    category_id?: string
    image_uri?: string
    description?: string
}

export interface IBrandSearch extends IPagination {
    name?: string
    category_id?: string
    status?: string
    popular?: string
}

export interface IBrand {
    id: string
    name: string
    Category: ICategoryList
    image_uri: string
    status: number
    popular: number
    created_at: string
    updated_at: string
}

export interface IBrandTable extends IAggregations {
    data: IBrand[]
}
