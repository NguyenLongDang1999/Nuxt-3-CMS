// ** Types Imports
// import type { ICategoryFormInput } from '~/types/category.type'
import type { FormRules } from 'element-plus'

export default {
    name: [
        {
            required: true,
            message: 'Please input',
            trigger: 'change'
        }
    ]
} as FormRules
