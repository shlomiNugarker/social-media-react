import { useCallback, useEffect, useMemo, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'

export function ImgPreview({ toggleShowImg, imgUrl, title }) {
  const dispatch = useDispatch()
  useEffect(() => {}, [])

  // console.log('render ImgProfilePreview')
  return (
    <div className="img-profile-preview">
      <div className="bg" onClick={toggleShowImg}></div>
      <section className="container">
        <div className="title">
          <p>{title}</p>
          <span onClick={toggleShowImg}>
            <FontAwesomeIcon icon="fa-solid fa-x" />
          </span>
        </div>
        <div className="img-container">
          {imgUrl && <img className="img" src={imgUrl} alt="" />}
        </div>
      </section>
    </div>
  )
}
