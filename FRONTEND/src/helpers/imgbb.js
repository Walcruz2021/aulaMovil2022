import uploadImage from "imgbb-uploader"

export const uploadImage= (img) =>{
    let body = new FormData()
    body.set('key', 'an_api_key')
    body.append('image', img)

    return axios({
      method: 'post',
      url: 'https://api.imgbb.com/1/upload',
      data: body
    })
}