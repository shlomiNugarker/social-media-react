import { Link } from 'react-router-dom'

export function ConnectionPreview({ user }) {
  if (!user) return
  return (
    <li className="connection-preview">
      <Link to={`/main/profile/${user?._id}`}>
        <div className="bg">
          <img src={user.imgUrl} alt="" className="img-profile" />
        </div>
        <div className="fullname">
          <p>{user.fullname}</p>
        </div>
        <div className="profession">
          <p>{user.profession}</p>
        </div>
      </Link>
      <div className="followers-count">
        <p> {user.connections.length} conections</p>
      </div>

      <div className="btn-container">
        <button>Connect</button>
      </div>
    </li>
  )
}
