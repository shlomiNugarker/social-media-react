import { useCallback, useEffect, useMemo, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'

export function ImgProfilePreview({ toggleShowImgProfile, user }) {
  const dispatch = useDispatch()
  useEffect(() => {}, [])

  console.log('render ImgProfilePreview')
  return (
    <div className="img-profile-preview">
      <div className="bg" onClick={toggleShowImgProfile}></div>
      <section className="container">
        <div className="title">
          <p>Profile photo</p>
          <span onClick={toggleShowImgProfile}>
            <FontAwesomeIcon icon="fa-solid fa-x" />
          </span>
        </div>
        <div className="img-container">
          <img className="img" src={user.imgUrl} alt="" />
        </div>
      </section>
    </div>
  )
}
