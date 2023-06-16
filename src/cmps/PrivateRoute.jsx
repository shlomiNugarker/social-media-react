import { Route, Redirect } from 'react-router-dom'
import { userService } from '../services/user/userService'

function PrivateRoute({ component: Component, ...rest }) {
  const isAuthenticated = userService.getLoggedinUser()

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  )
}

export default PrivateRoute
