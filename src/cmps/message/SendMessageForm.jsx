import { useState } from 'react'

export function SendMessageForm({ onSendMsg }) {
  const [newMsg, setNewMsg] = useState({
    txt: '',
  })
  const handleChange = async (e) => {
    const field = e.target.name
    let value =
      e.target.type === 'number' ? +e.target.value || '' : e.target.value
    setNewMsg((prevCred) => ({ ...prevCred, [field]: value }))
  }

  const doSubmit = () => {
    onSendMsg(newMsg.txt)
  }

  return (
    <form
      className="send-msg-container"
      onSubmit={(ev) => {
        ev.preventDefault()
        doSubmit()
      }}
    >
      <div className="input-container">
        <textarea
          required
          onChange={handleChange}
          type="text"
          placeholder="Write a message..."
          id="txt"
          name="txt"
          value={newMsg.txt}
        />
      </div>

      <div className="btns-container">
        <button>Send</button>
      </div>
    </form>
  )
}
