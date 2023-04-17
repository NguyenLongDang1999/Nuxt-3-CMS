// ** Third Party Imports
import { ofetch } from 'ofetch'

// ** Configs Imports
import { config } from '~/configs'

export const _fetcher = ofetch.create({
    baseURL: config.baseURL,
    onRequest: () => {
        console.log('onRequest')
    },
    onRequestError: () => {
        console.log('onRequestError')
    },
    onResponse: () => {
        console.log('onResponse')
    },
    onResponseError: () => {
        console.log('onResponseError')
    }
})
