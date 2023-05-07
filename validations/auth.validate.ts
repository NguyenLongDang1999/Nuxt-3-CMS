// ** Types Imports
import type { FormRules } from 'element-plus'

export default {
    email: [
        {
            required: true,
            message: 'E-mail không được bỏ trống.',
            trigger: 'change'
        },
        {
            type: 'email',
            message: 'E-mail không hợp lệ.',
            trigger: 'change'
        }
    ],
    password: [
        {
            required: true,
            message: 'Mật khẩu không được bỏ trống.',
            trigger: 'change'
        },
        {
            min: 6,
            max: 20,
            message: 'Mật khẩu phải từ 6 - 20 ký tự.',
            trigger: 'change'
        }
    ]
} as FormRules
