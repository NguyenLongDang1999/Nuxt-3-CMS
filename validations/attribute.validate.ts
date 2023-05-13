// ** Types Imports
import type { FormRules } from 'element-plus'

const field = {
    name: 'Tiêu đề thuộc tính',
    description: 'Mô tả',
    category_id: 'Danh mục'
}

export default {
    name: [
        {
            required: true,
            message: `${field.name} không được bỏ trống.`,
            trigger: 'change'
        },
        {
            max: 30,
            message: `${field.name} tối đa 30 ký tự.`,
            trigger: 'change'
        }
    ],
    category_id: [
        {
            required: true,
            message: `${field.category_id} không được bỏ trống.`,
            trigger: 'change'
        }
    ],
    description: [
        {
            max: 160,
            message: `${field.description} tối đa 160 ký tự.`,
            trigger: 'change'
        }
    ]
} as FormRules
