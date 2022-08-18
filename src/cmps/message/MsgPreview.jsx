import { useSelector } from 'react-redux'
import { ReactSnip } from '@strg/react-snip'

export function MsgPreview({ msg }) {
  const lastMsg = ' Lorem ipsum dolor sit, amet consectetur adipisicing elit.'
  const user = useSelector((state) => state.userModule.loggedInUser)
  return (
    <section className="msg-preview">
      <div className="container">
        <div className="img-container">
          <img src={user?.imgUrl} alt="" className="img" />
        </div>

        <div className="details">
          <div className="fullname">
            <ReactSnip lines={1} method={'css'} midWord={true}>
              <h1>Shlomi Nugarker</h1>
            </ReactSnip>

            <span>27.6</span>
          </div>
          <div className="last-msg">
            <ReactSnip lines={2} method={'css'}>
              <p>{lastMsg}</p>
            </ReactSnip>
          </div>
        </div>
      </div>
    </section>
  )
}
