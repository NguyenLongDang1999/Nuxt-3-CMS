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
