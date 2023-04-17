import type { RouteRecordRaw } from 'vue-router'

export interface rawConfig {
    hidden?: boolean
    alwaysShow?: boolean
    code?: number
    name?: string
    fullPath?: string
    path?: string
    meta?: {
        title: string
        icon?: string
        affix?: boolean
        activeMenu?: string
        breadcrumb?: boolean
        roles?: Array<string>
        elSvgIcon?: string
        code?: number
        cachePage?: boolean
        leaveRmCachePage?: boolean
        closeTabRmCache?: boolean
    }
    children?: RouterOptions
    redirect?: string
}

export type RouteRawConfig = RouteRecordRaw & rawConfig
export type RouterTypes = Array<rawProp>

export interface SettingsConfig {
    title: string
    sidebarLogo: boolean
    showLeftMenu: boolean
    ShowDropDown: boolean
    showHamburger: boolean
    showNavbarTitle: boolean
    showTopNavbar: boolean
    delWindowHeight: string
}

