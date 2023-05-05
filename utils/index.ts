// ** Config Imports
import { config } from '~/configs'

// ** Types Imports
import type { IOptions } from '~/types/core.type'

export const optionStatus = (): IOptions[] => {
    return [{
        id: STATUS.ACTIVE,
        name: useI18n().t('Status.Active')
    }, {
        id: STATUS.INACTIVE,
        name: useI18n().t('Status.Inactive')
    }]
}

export const optionPopular = (): IOptions[] => {
    return [{
        id: POPULAR.ACTIVE,
        name: useI18n().t('Popular.Active')
    }, {
        id: POPULAR.INACTIVE,
        name: useI18n().t('Popular.Inactive')
    }]
}

export const formatDateTime = (date: string) => {
    return useDateFormat(date, FORMAT.DATE_TIME).value
}

export const getExtensionFile = (fileName: string) => fileName.split('.').pop()

export const getImageFile = (path: string, name?: string) => name ? `${config.previewCDN}/${path}/${name}` : '/assets/default.jpg'

export const slugify = (str: string) => {
    str = str.toLowerCase()
    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a')
    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e')
    str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i')
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o')
    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u')
    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y')
    str = str.replace(/(đ)/g, 'd')
    str = str.replace(/([^0-9a-z-\s])/g, '')
    str = str.replace(/(\s+)/g, '-')
    str = str.replace(/^-+/g, '')
    str = str.replace(/-+$/g, '')

    return str
}
