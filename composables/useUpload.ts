// ** Configs Imports
import type { UploadRawFile } from 'element-plus'
import { config } from '~/configs'

export const useUploadFile = async (path: string, body: UploadRawFile) => {
    return await fetch(`${config.uploadCDN}/image-data/${path}`, {
        method: 'PUT',
        headers: {
            AccessKey: config.bunnyAK,
            'content-type': 'application/octet-stream'
        },
        body
    })
}
