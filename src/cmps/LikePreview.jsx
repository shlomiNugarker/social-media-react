import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { userService } from '../services/user/userService'

export function LikePreview({ reaction }) {
  const [user, setUser] = useState(null)

  const history = useHistory()

  const loadUser = async (id) => {
    if (!reaction) return
    const userPost = await userService.getById(id)
    setUser(() => userPost)
  }

  useEffect(() => {
    loadUser(reaction.userId)
  }, [])

  if (!user) return

  return (
    <section className="like-preview">
      <div
        className="container-name"
        onClick={() => history.push(`/main/profile/${user._id}`)}
      >
        <div className="img-container">
          <img src={user.imgUrl} alt="" className="img" />
        </div>
        <div className="fullname">
          <p>{user.fullname}</p>
          <p>{user.profession}</p>
        </div>
      </div>
      <div>
        <button>Connect</button>
      </div>
    </section>
  )
}
