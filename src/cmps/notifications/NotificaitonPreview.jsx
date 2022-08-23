import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export function NotificaitonPreview() {
  return (
    <section className="notificaiton-preview">
      <div className="img-container">
        <img
          src="https://images.unsplash.com/photo-1657299156537-2fd96dc2446e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
          alt=""
          className="img"
        />
      </div>

      <div className="content">
        <p>
          dsfsd sd fadf fadf aaf af aadf afadf af afa adfaf adfaf eaf af af
          afdaf f fewqfaerft efae ef
        </p>
        <div className="actions">
          <p>reactions</p>
          <p>14 comments</p>
        </div>
      </div>
      <div className="menu">
        <p>37m</p>
        <span>
          <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
        </span>
      </div>
    </section>
  )
}
