export const uploadImg = (ev) => {
  //Defining our variables
  const UPLOAD_PRESET = 'social_n_shlomi' //insert yours
  const CLOUD_NAME = 'duajg3ah1' //insert yours
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
  const FORM_DATA = new FormData()
  //Building the request body
  FORM_DATA.append('file', ev.target.files[0]) // form data kind of key : file, add the file we get
  FORM_DATA.append('upload_preset', UPLOAD_PRESET) // add the upload_preset
  //Sending a post method request to Cloudinary`s API
  return fetch(UPLOAD_URL, {
    // add the img to Cloudinary
    method: 'POST',
    body: FORM_DATA,
  })
    .then((res) => res.json())
    .then((res) => res) //return the res
    .catch((err) => {
      console.error(err)
    })
}

export const uploadVid = (ev) => {
  //Defining our variables
  const UPLOAD_PRESET = 'social_n_shlomi' //insert yours
  const CLOUD_NAME = 'duajg3ah1' //insert yours
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`
  const FORM_DATA = new FormData()
  //Building the request body
  FORM_DATA.append('file', ev.target.files[0]) // form data kind of key : file, add the file we get
  FORM_DATA.append('upload_preset', UPLOAD_PRESET) // add the upload_preset
  //Sending a post method request to Cloudinary`s API
  return fetch(UPLOAD_URL, {
    // add the img to Cloudinary
    method: 'POST',
    body: FORM_DATA,
  })
    .then((res) => res.json())
    .then((res) => res) //return the res
    .catch((err) => console.error(err))
}
