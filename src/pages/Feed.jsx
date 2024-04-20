import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Posts } from '../cmps/posts/Posts'
import { RightSideBar } from '../cmps/RightSideBar'
import { LeftSideBar } from '../cmps/LeftSideBar'
import { setCurrPage, setNextPage } from '../store/actions/postActions'
import loadongGif from '../assets/imgs/loading-gif.gif'

const Feed = () => {
  const { loggedInUser } = useSelector((state) => state.userModule)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setCurrPage('home'))
    dispatch(setNextPage(1))
  }, [dispatch])

  if (!loggedInUser)
    return (
      <section className="feed-load">
        <div className="loading">
          <span>
            <img src={loadongGif} alt="" />
          </span>
        </div>
      </section>
    )

  return (
    <section className="feed-page">
      <LeftSideBar />
      <Posts />
      <RightSideBar />
    </section>
  )
}

export default Feed
