import { defineConfig } from 'windicss/helpers'

export default defineConfig({
    attributify: true,
    theme: {
        extend: {
            fontFamily: {
                sans: ['"IBM Plex Sans"']
            }
        }
    },
    plugins: [
        require('windicss/plugin/forms'),
        require('windicss/plugin/line-clamp')
    ]
})
