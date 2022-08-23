import { useCallback, useEffect, useMemo, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrPage } from '../store/actions/postActions'
import GoogleMapReact from 'google-map-react'
import { getUsers, updateUser } from '../store/actions/userActions'
import { Link } from 'react-router-dom'

const UserIconPos = ({ url, userId, fullname }) => (
  <div>
    <Link to={`/main/profile/${userId}`}>
      <img className="userIconPos" src={url} alt={fullname} />
    </Link>
  </div>
)

export function Maps() {
  const dispatch = useDispatch()

  const { loggedInUser } = useSelector((state) => state.userModule)
  const { users } = useSelector((state) => state.userModule)

  useEffect(() => {
    dispatch(setCurrPage('jobs'))
    dispatch(getUsers())
    getLocation()
  }, [])

  const saveUser = (position) => {
    dispatch(updateUser({ ...loggedInUser, position }))
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition)
    } else {
      console.log('Geolocation is not supported by this browser.')
    }
  }
  function showPosition(position) {
    const positionToSave = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    }

    if (position) {
      saveUser(positionToSave)
    }
  }

  const defaultProps = {
    center: {
      lat: 32.05591645013164,
      lng: 34.7549857056555,
    },
    zoom: 5,
  }

  return (
    // Important! Always set the container height explicitly
    <section className="map-page ">
      <div className="map" style={{ height: '100%', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: '' }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          {loggedInUser && (
            <UserIconPos
              lat={loggedInUser?.position?.lat}
              lng={loggedInUser?.position?.lng}
              url={loggedInUser.imgUrl}
            />
          )}

          {users &&
            users.map((user) => (
              <UserIconPos
                key={user._id}
                lat={user?.position?.lat || 32.05591645013164}
                lng={user?.position?.lng || 34.7549857056555}
                url={user.imgUrl}
                userId={user._id}
                fullname={user.fullname}
              />
            ))}

          {/* <UsersIconsList /> */}
        </GoogleMapReact>
      </div>
    </section>
  )
}

{
  /* <AnyReactComponent
  lat={loggedInUser.position?.lat}
  lng={loggedInUser.position?.lng}
  text="My Marker"
/> */
}
