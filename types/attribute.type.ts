// ** Types Imports
import type { IAggregations, ICategoryList, IPagination, IVariantList } from './core.type'

export interface IAttributeFormInput {
    id?: string
    name: string
    slug: string
    category_id?: string
    description?: string
    Variations: IVariantItem[]
}

export interface IAttributeSearch extends IPagination {
    name?: string
    category_id?: string
}

export interface IAttribute {
    id: string
    name: string
    Category: ICategoryList
    Variations: IVariantList[]
    created_at: string
    updated_at: string
}

export interface IVariantItem {
    id: number
    name: string
}

export interface IAttributeTable extends IAggregations {
    data: IAttribute[]
}
