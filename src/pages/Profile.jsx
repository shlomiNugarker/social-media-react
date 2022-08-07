import { useParams } from 'react-router-dom'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { userService } from '../services/user/userService'
import { PostsList } from '../cmps/PostsList'
import { Link } from 'react-router-dom'

export function Profile() {
  const params = useParams()
  const [user, setUser] = useState(null)

  const loadUser = async () => {
    const tempId = '62ea127beb6ee5f8058fd56e'
    const user = await userService.getById(tempId)
    setUser(() => user)
  }

  useEffect(() => {
    loadUser()
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

        <div className="user-posts"></div>
      </div>
      <div className="right">right</div>
    </section>
  )
}
