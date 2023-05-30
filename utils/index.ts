// ** Config Imports
import { config } from '~/configs'

// ** Types Imports
import type { IOptions } from '~/types/core.type'

export const optionStatus = (): IOptions[] => {
    return [{
        id: STATUS.ACTIVE,
        icon: ElIconCircleCheck,
        class: 'text-blue-600 w-6 h-6',
        name: useI18n().t('Status.Active')
    }, {
        id: STATUS.INACTIVE,
        icon: ElIconCircleClose,
        class: 'text-red-600 w-6 h-6',
        name: useI18n().t('Status.Inactive')
    }]
}

export const optionPopular = (): IOptions[] => {
    return [{
        id: POPULAR.ACTIVE,
        icon: ElIconCircleCheck,
        class: 'text-blue-600 w-6 h-6',
        name: useI18n().t('Popular.Active')
    }, {
        id: POPULAR.INACTIVE,
        icon: ElIconCircleClose,
        class: 'text-red-600 w-6 h-6',
        name: useI18n().t('Popular.Inactive')
    }]
}

export const optionTypeDiscount = (): IOptions[] => {
    return [{
        id: DISCOUNT.PRICE,
        name: useI18n().t('Discount.Price')
    }, {
        id: DISCOUNT.PERCENT,
        name: useI18n().t('Discount.Percent')
    }]
}

export const formatDateTime = (date: string) => {
    return useDateFormat(date, FORMAT.DATE_TIME).value
}

export const getExtensionFile = (fileName: string) => fileName.split('.').pop()

export const getImageFile = (path: string, name?: string) => {
    if (name) {
        return name.includes('https://') ?
            name :
            `${config.previewCDN}/${path}/${name}`
    }

    return IMAGE.DEFAULT
}

export const valueTransform = (dataList: IOptions[], value: string | number) => useArrayFind(dataList, val => val.id === value).value

export const slugify = (str: string) => {
    const map: { [key: string]: string } = {
        a: 'à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ',
        e: 'è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ',
        i: 'ì|í|ị|ỉ|ĩ',
        o: 'ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ',
        u: 'ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ',
        y: 'ỳ|ý|ỵ|ỷ|ỹ',
        d: 'đ'
    }

    for (const key in map) {
        str = str.replace(new RegExp(map[key], 'g'), key)
    }

    str = str.replace(/([^0-9a-z-\s])/g, '')
        .replace(/[\s]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '')

    return str.toLowerCase()

    return str
}
