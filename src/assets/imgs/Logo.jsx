import { useHistory } from 'react-router-dom'

export function Logo() {
  const history = useHistory()
  return (
    <section className="logo" onClick={() => history.push(`/`)}>
      <div className="logo-container">
        <div className="t">
          <div className="top"></div>
          <div className="bottom"></div>
        </div>
      </div>
      {/* <img src="" alt="" /> */}
    </section>
  )
}
