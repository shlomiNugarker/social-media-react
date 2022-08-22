export function ThreadMsgPreview({ msg }) {
  return (
    <section className="thread-msg-preview">
      <div className="container-msg">
        <div className="img-container">
          <img
            src="https://images.unsplash.com/photo-1660765604535-ec5585c91aec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=415&q=80"
            alt=""
            className="img"
          />
        </div>

        <div className="name-time-container">
          <div className="fullname">
            <h3>fullname</h3>
          </div>
          <div className="time">
            <span>12:43</span>
          </div>
        </div>
      </div>
      <div className="the-msg">
        <p>{msg.txt}</p>
      </div>
    </section>
  )
}
