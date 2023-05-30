// ** Types Imports
import type { FormRules } from 'element-plus'

const field = {
    name: 'Tiêu đề thương hiệu',
    description: 'Mô tả'
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
    description: [
        {
            max: 160,
            message: `${field.description} tối đa 160 ký tự.`,
            trigger: 'change'
        }
    ]
} as FormRules
