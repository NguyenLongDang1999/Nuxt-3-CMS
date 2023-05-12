// ** Configs Imports
import { config } from '~/configs'

// ** Types Imports
import type { UploadFile, UploadRawFile } from 'element-plus'

// ** State
const imageURL = ref<UploadFile>()

export const useUpload = () => {
    return {
        imageURL
    }
}

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

export const useDeleteFile = async (path: string) => {
    return await fetch(`${config.uploadCDN}/image-data/${path}`, {
        method: 'DELETE',
        headers: { AccessKey: config.bunnyAK }
    })
}
