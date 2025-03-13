import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ConnectionList } from '../cmps/connections/ConnectionList'
import { getUsers, setUsers } from '../store/actions/userActions'
import { setCurrPage } from '../store/actions/postActions'
import loadingGif from '../assets/imgs/loading-gif.gif'

function MyNetwork() {
  const dispatch = useDispatch()
  let history = useHistory()

  const { users } = useSelector((state) => state.userModule)
  const { loggedInUser } = useSelector((state) => state.userModule)

  useEffect(() => {
    dispatch(getUsers())
    dispatch(setCurrPage('mynetwork'))

    return () => {
      dispatch(setUsers(null))
    }
  }, [dispatch])

  if (!users)
    return (
      <section className="network">
        <span className="gif-container">
          <img className="loading-gif" src={loadingGif} alt="" />
        </span>
      </section>
    )
  return (
    <section className="my-network-page">
      <div className="left">
        <div className="manage-network">
          <div>
            <h3>Manage my network</h3>
          </div>
          <ul>
            <li>
              <button onClick={() => history.push('/main/connections')}>
                <div>
                  <span className="logo">
                    <FontAwesomeIcon icon="fa-solid fa-user-group" />
                  </span>
                  <span className="txt">
                    <p>Connections</p>
                  </span>
                </div>
                <span>
                  <p>
                    {loggedInUser.connections?.length === 0
                      ? 0
                      : loggedInUser.connections?.length}
                  </p>
                </span>
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="right">
        <div className="recommended">
          <div>
            <h3>Recommended for you</h3>
          </div>

          <ConnectionList users={users} />
        </div>
      </div>
    </section>
  )
}

export default MyNetwork
