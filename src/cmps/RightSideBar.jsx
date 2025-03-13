import { useEffect,useState ,useCallback} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getUsers } from '../store/actions/userActions'

export const RightSideBar = () => {
  const { users } = useSelector((state) => state.userModule)
  const dispatch = useDispatch()
  const history = useHistory()
  const { loggedInUser } = useSelector((state) => state.userModule)

  const [filteredUsers, setFilteredUsers] = useState([])

  const filterUsers = useCallback(() => {
    if (users && loggedInUser) {
      const notConnected = users.filter(
        (user) =>
          !loggedInUser.connections.some(
            (connection) => connection.userId === user._id
          )
      )
      setFilteredUsers(notConnected)
    }
  }, [users, loggedInUser])

  useEffect(() => {
    filterUsers()
  }, [filterUsers])



  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  const lengtConections = [0, 1, 2]
  return filteredUsers.length > 0 && (
    <section className="right-side-bar">
      <div className="container">
        <div className="title">
          <p>Add to your feed</p>
        </div>
        <br />
        <div className="list">
          {filteredUsers?.length &&
            lengtConections.map((num, idx) => (
              <div
                key={filteredUsers[num]?._id || idx}
                className="preview"
                onClick={() => history.push(`profile/${filteredUsers[num]?._id}`)}
              >
                <div className="img-container">
                  <img src={filteredUsers[num]?.imgUrl} className="img" alt="" />
                </div>
                <div>
                  <div className="fullname">
                    <p>{filteredUsers[num]?.fullname}</p>
                  </div>
                  <div className="profession">
                    <p>{filteredUsers[num]?.profession}</p>
                  </div>
                  <div className="btn"></div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="else-container">
        <div>
          <h3>Promoted</h3>
        </div>
        <br />
        <div>
          <p>Looking for a full-stack developer for your project or team? I'm open to collaboration and exciting challenges.</p>
        </div>
        <br />
        <div className="img-container">
          <a href="https://www.shlomi.dev/" target="_blank" rel="noreferrer">
            <img
              src="https://res.cloudinary.com/duajg3ah1/image/upload/v1741866031/6ed80c70-7184-4e22-af43-c1b9357bfb2c.png"
              className="img"
              alt={''}
            />
          </a>
        </div>
      </div>
    </section>
  )
}
