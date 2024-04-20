import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getUsers } from '../store/actions/userActions'

export const RightSideBar = () => {
  const { users } = useSelector((state) => state.userModule)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  const lengtConections = [0, 1, 2]
  return (
    <section className="right-side-bar">
      <div className="container">
        <div className="title">
          <p>Add to your feed</p>
        </div>
        <br />
        <div className="list">
          {users &&
            lengtConections.map((num, idx) => (
              <div
                key={users[num]?._id || idx}
                className="preview"
                onClick={() => history.push(`profile/${users[num]?._id}`)}
              >
                <div className="img-container">
                  <img src={users[num]?.imgUrl} className="img" alt="" />
                </div>
                <div>
                  <div className="fullname">
                    <p>{users[num]?.fullname}</p>
                  </div>
                  <div className="profession">
                    <p>{users[num]?.profession}</p>
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
          <p>Taskday is a project management system for collaboration.</p>
        </div>
        <br />
        <div className="img-container">
          <a href="https://fast-eyrie-76140.herokuapp.com/">
            <img
              src="https://res.cloudinary.com/duajg3ah1/image/upload/v1660916126/myPortfolio/qdtzolm9ldd5qlquq2aj.png"
              className="img"
              alt=""
            />
          </a>
        </div>
      </div>
    </section>
  )
}
