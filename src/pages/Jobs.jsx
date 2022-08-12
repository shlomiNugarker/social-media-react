import { useCallback, useEffect, useMemo, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrPage } from '../store/actions/postActions'

export function Jobs() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setCurrPage('jobs'))
    // eslint-disable-next-line
  }, [])

  return (
    <section className="jobs-page">
      <h1>jobs!</h1>
    </section>
  )
}
