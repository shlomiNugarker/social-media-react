import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'

import { MyConnectionPreview } from '../cmps/connections/MyConnectionPreview'

function Connections() {
  const [connections, setConnections] = useState(null)
  const [field, setField] = useState({ fullname: '' })

  const { loggedInUser } = useSelector((state) => state.userModule)

  const handleChange = async ({ target }) => {
    const field = target.name
    let value = target.type === 'number' ? +target.value || '' : target.value
    setField({ [field]: value })
    setFilter(value)
  }

  useEffect(() => {
    if (loggedInUser?.connections) {
      setConnections([...loggedInUser?.connections])
    }
  }, [loggedInUser])

  const setFilter = (txt) => {
    const regex = new RegExp(txt, 'i')
    const filteredCnnections = [...loggedInUser?.connections].filter(
      (connection) => {
        return regex.test(connection.fullname)
      }
    )
    setConnections(filteredCnnections)
  }

  if (!loggedInUser) return

  return (
    <section className="connections-page">
      <div className="left main">
        <div className="container">
          <div className="count">
            <h3>{loggedInUser.connections?.length} Connections</h3>
          </div>

          <div className="filter-container">
            <div className="search">
              <FontAwesomeIcon className="search-icon" icon="fas fa-search" />
              <input
                type="text"
                onChange={handleChange}
                id="fullname"
                name="fullname"
                value={field.fullname}
                placeholder="Search by name"
                className="connections-input"
              />
            </div>
          </div>

          <div className="my-connection-list">
            {connections?.map((connection) => (
              <MyConnectionPreview
                key={connection.userId}
                connection={connection}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="right aside">
        <div></div>
      </div>
    </section>
  )
}

export default Connections
