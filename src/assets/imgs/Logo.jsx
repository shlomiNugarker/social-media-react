import { useHistory } from 'react-router-dom'
import './Logo.scss'

export function Logo() {
  const history = useHistory()
  return (
    <div className="brand-container" onClick={() => history.push(`/`)}>
      <div className="logo-icon">
        <span>T</span>
      </div>
      {/* <span className="brand-name">TravelsIn</span> */}
    </div>
  )
}
