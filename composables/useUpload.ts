// ** Configs Imports
import { config } from '~/configs'

export const useUploadFile = async (path: string, body: BodyInit | null) => {
    return await fetch(`${config.uploadCDN}/image-data/${path}`, {
        method: 'PUT',
        headers: {
            AccessKey: config.bunnyAK,
            'content-type': 'application/octet-stream'
        },
        body
    })
}
