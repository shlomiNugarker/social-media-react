import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch } from 'react-redux'
import { updateUser } from '../../store/actions/userActions'
import { uploadImg } from '../../services/imgUpload.service'

export function EditModal({ toggleShowEditModal, user }) {
  const dispatch = useDispatch()
  const [userToUpdate, setUserToUpdate] = useState({
    age: user.age,
    bg: user.bg,
    email: user.email,
    fullname: user.fullname,
    imgUrl: user.imgUrl,
    phone: user.phone,
    profession: user.profession,
    birthDate: user.birthDate,
  })

  const { age, bg, email, fullname, imgUrl, phone, profession, birthDate } =
    userToUpdate

  useEffect(() => {}, [])

  const handleChange = ({ target }) => {
    const field = target.name
    const value = target.type === 'number' ? +target.value || '' : target.value
    setUserToUpdate((prev) => {
      return {
        ...prev,
        _id: user._id,
        [field]: value,
      }
    })
  }

  const onSaveUser = () => {
    dispatch(updateUser({ ...user, ...userToUpdate })).then((res) => {
      if (res) toggleShowEditModal()
    })
  }

  const onUploadImg = async (ev) => {
    const res = await uploadImg(ev)
    setUserToUpdate((prev) => {
      return {
        ...prev,
        imgUrl: res.url,
      }
    })
  }

  return (
    <section className="edit-modal">
      <div className="bg" onClick={toggleShowEditModal}></div>
      <div className="container">
        <div className="title">
          <p>Edit profile</p>
          <span onClick={toggleShowEditModal}>
            <FontAwesomeIcon icon="fa-solid fa-x" />
          </span>
        </div>

        <div className="form-container">
          <form className="form" action="">
            <label htmlFor="imgUrl" className="add-file">
              <div className="add-btn">
                <p>Add image profile</p>

                <FontAwesomeIcon
                  className="upload-logo"
                  icon="fa-solid fa-cloud-arrow-up"
                />
              </div>
              <input
                onChange={onUploadImg}
                id="imgUrl"
                type="file"
                name="imgUrl"
                hidden
              />
              <img className="img-to-upload" src={imgUrl} alt="" />
            </label>

            <label htmlFor="first-name" className="first-name">
              <p>
                Fullname <span>*</span>
              </p>
              <input
                name="fullname"
                onChange={handleChange}
                id="fullname"
                type="text"
                value={fullname || ''}
              />
            </label>

            <label htmlFor="email" className="email">
              <p>Email</p>
              <input
                name="email"
                onChange={handleChange}
                id="email"
                type="email"
                value={email || ''}
              />
            </label>

            <label htmlFor="profession" className="profession">
              <p>Profession</p>
              <input
                name="profession"
                onChange={handleChange}
                id="profession"
                type="text"
                value={profession || ''}
              />
            </label>

            <label htmlFor="age" className="age">
              <p>Age</p>
              <input
                name="age"
                onChange={handleChange}
                id="age"
                type="number"
                value={age || ''}
              />
            </label>

            <label htmlFor="phone" className="phone">
              <p>Phone</p>
              <input
                name="phone"
                onChange={handleChange}
                id="phone"
                type="text"
                value={phone || ''}
              />
            </label>
          </form>
        </div>
        <div className="btn-save-container">
          <button onClick={onSaveUser}>Save</button>
        </div>
      </div>
    </section>
  )
}
