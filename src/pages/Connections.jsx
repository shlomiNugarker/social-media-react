import { useCallback, useEffect, useMemo, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import { ConnectionList } from '../cmps/connections/ConnectionList'
import { userService } from '../services/user/userService'
import { utilService } from '../services/utilService'

import { MyConnectionPreview } from '../cmps/connections/MyConnectionPreview'

export function Connections() {
  const dispatch = useDispatch()
  const { loggedInUser } = useSelector((state) => state.userModule)

  useEffect(() => {
    // eslint-disable-next-line
  }, [])

  if (!loggedInUser) return

  return (
    <section className="connections-page">
      <div className="left main">
        <div className="container">
          <div className="count">
            <h3>{loggedInUser.connections.length} Connections</h3>
          </div>

          <div className="filter-container">
            {/* <div className="sort-by">Sort by: </div> */}
            <div className="search">
              <FontAwesomeIcon className="search-icon" icon="fas fa-search" />
              <input
                type="text"
                placeholder="Search by name"
                className="input"
              />
            </div>
          </div>

          <div className="my-connection-list">
            {loggedInUser.connections.map((connection) => (
              <MyConnectionPreview
                key={utilService.makeId()}
                connection={connection}
              />
            ))}
          </div>

          {/* <ConnectionList users={loggedInUser?.connections} /> */}
        </div>
      </div>

      <div className="right aside">
        <div></div>
      </div>
    </section>
  )
}
