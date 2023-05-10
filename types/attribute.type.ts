// ** Types Imports
import type { IAggregations, ICategoryList, IPagination } from './core.type'

export interface IAttributeFormInput {
    id?: string
    name: string
    category_id?: string
    description?: string
}

export interface IAttributeSearch extends IPagination {
    name?: string
    category_id?: string
}

export interface IAttribute {
    id: string
    name: string
    Category: ICategoryList
    created_at: string
    updated_at: string
}

export interface IAttributeTable extends IAggregations {
    data: IAttribute[]
}
