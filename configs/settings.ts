import type { SettingsConfig } from '~/types/basic'
import packageJson from '../package.json'

export const settings: SettingsConfig = {
    title: packageJson.name,
    sidebarLogo: true,
    showNavbarTitle: false,
    ShowDropDown: true,
    showHamburger: true,
    showLeftMenu: true,
    showTopNavbar: true,
    delWindowHeight: '210px'
}

export default settings
