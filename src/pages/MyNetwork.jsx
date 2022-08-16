import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ConnectionList } from '../cmps/connections/ConnectionList'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../store/actions/userActions'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { setCurrPage } from '../store/actions/postActions'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

export function MyNetwork() {
  const dispatch = useDispatch()
  let history = useHistory()

  const { users } = useSelector((state) => state.userModule)
  const { loggedInUser } = useSelector((state) => state.userModule)

  useEffect(() => {
    dispatch(getUsers())
    dispatch(setCurrPage('mynetwork'))
    // eslint-disable-next-line
  }, [])

  if (!users) return <section className="my-network">Loading</section>

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
            <li>
              <button>
                <div>
                  <span className="logo">
                    <FontAwesomeIcon icon="fa-solid fa-people-group" />
                  </span>
                  <span className="txt">
                    <p>People I Follow</p>
                  </span>
                </div>
                <span>
                  <p>23</p>
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
