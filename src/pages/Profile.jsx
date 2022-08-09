import { useParams } from 'react-router-dom'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { userService } from '../services/user/userService'
import { PostsList } from '../cmps/PostsList'
import { Link } from 'react-router-dom'
import { loadPostsByUserId } from '../store/actions/postActions'
import { useDispatch, useSelector } from 'react-redux'

export function Profile() {
  const params = useParams()
  const dispatch = useDispatch()
  const [user, setUser] = useState(null)
  const { posts } = useSelector((state) => state.postModule)
  // const { userPosts } = useSelector((state) => state.postModule)
  const userPosts = posts?.filter((post) => post.userId === user?._id)

  const loadUser = async () => {
    const tempId = '62ea127beb6ee5f8058fd56e'
    const user = await userService.getById(tempId)
    setUser(() => user)
  }

  useEffect(() => {
    console.log(params.userId)
    const filterBy = {
      userId: params.userId,
    }
    loadUser()
    dispatch(loadPostsByUserId(filterBy))
    // eslint-disable-next-line
  }, [params.userId])

  if (!user) return <section className="feed-load">Loading...</section>

  return (
    <section className="profile">
      <div className="left">
        <div className="user-profile">
          <div className="bg">
            <div className="img-container">
              <img src={user.imgUrl} alt="" className="img" />
            </div>
          </div>

          <div className="user-details">
            <div>
              <div className="name">
                <h1>{user.fullname}</h1>
              </div>
              <div className="profession">
                <p>{user.profession}</p>
              </div>
              <div className="btns-container">
                <button className="add-details">Add more details</button>
              </div>
            </div>
          </div>
        </div>

        <div className="user-posts">
          <PostsList posts={userPosts} />
        </div>
      </div>
      <div className="right">
        <div className="top-div"></div>
        <div className="bottom-div"></div>
      </div>
    </section>
  )
}
