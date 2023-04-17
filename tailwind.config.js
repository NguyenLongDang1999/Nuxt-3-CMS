import { amber, emerald, indigo, pink, red, sky } from 'tailwindcss/colors'
import { fontFamily } from 'tailwindcss/defaultTheme'

const primary = indigo
const secondary = pink
const info = sky
const warning = amber
const success = emerald
const error = red

export const content = [
    './assets/**/*.{vue,js,css}',
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
]
export const darkMode = 'class'
export const theme = {
    extend: {
        colors: {
            primary,
            secondary,
            info,
            warning,
            success,
            error
        },
        textColor: {
            skin: {
                base: 'var(--color-text-base)',
                muted: 'var(--color-text-muted)',
                active: 'var(--color-text-active)',
                hover: 'var(--color-text-hover)',
                icon: 'var(--color-text-icon)'
            }
        },
        backgroundColor: {
            skin: {
                'fill': 'var(--color-fill)',
                'fill-active': 'var(--color-fill-active)',
                'fill-hover': 'var(--color-fill-hover)',
                'icon-fill': 'var(--color-icon-fill)'
            }
        },
        fontFamily: {
            sans: [
                '"IBM Plex Sans"',
                ...fontFamily.sans
            ]
        }
    }
}
export const variants = {
    extend: {}
}

export const plugins = [
]
