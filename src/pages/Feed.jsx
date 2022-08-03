import { Posts } from '../cmps/Posts'
import { RightSideBar } from '../cmps/RightSideBar'
import { LeftSideBar } from '../cmps/LeftSideBar'
import { useDispatch, useSelector } from 'react-redux'

export const Feed = () => {
  const { loggedInUser } = useSelector((state) => state.userModule)

  if (!loggedInUser)
    return (
      <section className="feed-load">
        <div className="loading">Loading...</div>
      </section>
    )

  return (
    <section className="feed">
      {/* <p>loggedin user: {loggedInUser?.fullname}</p> */}
      <LeftSideBar />
      <Posts />
      <RightSideBar />
    </section>
  )
}
