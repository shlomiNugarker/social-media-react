import { Posts } from '../cmps/posts/Posts'
import { RightSideBar } from '../cmps/RightSideBar'
import { LeftSideBar } from '../cmps/LeftSideBar'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { setCurrPage } from '../store/actions/postActions'

export const Feed = (props) => {
  const { loggedInUser } = useSelector((state) => state.userModule)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setCurrPage('home'))
    // eslint-disable-next-line
  }, [])

  if (!loggedInUser)
    return (
      <section className="feed-load">
        <div className="loading">Loading...</div>
      </section>
    )
  console.log('render Feed')
  return (
    <section className="feed-page">
      <LeftSideBar />
      <Posts />
      <RightSideBar />
    </section>
  )
}
