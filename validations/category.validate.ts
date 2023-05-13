// ** Types Imports
import type { FormRules } from 'element-plus'

const field = {
    name: 'Tiêu đề danh mục',
    description: 'Mô tả',
    meta_title: 'Meta Title',
    meta_keyword: 'Meta Keyword',
    meta_description: 'Meta Description'
}

export default {
    name: [
        {
            required: true,
            message: `${field.name} không được bỏ trống.`,
            trigger: 'change'
        },
        {
            max: 60,
            message: `${field.name} tối đa 60 ký tự.`,
            trigger: 'change'
        }
    ],
    description: [
        {
            max: 160,
            message: `${field.description} tối đa 160 ký tự.`,
            trigger: 'change'
        }
    ],
    meta_title: [
        {
            max: 60,
            message: `${field.meta_title} tối đa 60 ký tự.`,
            trigger: 'change'
        }
    ],
    meta_keyword: [
        {
            max: 60,
            message: `${field.meta_keyword} tối đa 60 ký tự.`,
            trigger: 'change'
        }
    ],
    meta_description: [
        {
            max: 160,
            message: `${field.meta_description} tối đa 160 ký tự.`,
            trigger: 'change'
        }
    ]
} as FormRules
