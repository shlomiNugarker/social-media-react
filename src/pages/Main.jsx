import { Feed } from '../pages/Feed'
import { Header } from '../cmps/Header'
import { Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getLoggedinUser } from '../store/actions/userActions'

export function Main() {
  const dispatch = useDispatch()
  dispatch(getLoggedinUser())

  return (
    <div className="main container">
      <Header />
      {/* <Switch> */}
      <Route path="/main/feed" component={Feed}></Route>
      {/* </Switch> */}
    </div>
  )
}
