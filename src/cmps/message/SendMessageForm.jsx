import { useEffect, useState } from 'react'

export function SendMessageForm({ onSendMsg, messagesToShow }) {
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
    setNewMsg({ txt: '' })
  }

  const inputRef = (elInput) => {
    if (elInput) elInput.focus()
  }

  useEffect(() => {
    setNewMsg({ txt: '' })
    return () => {}
  }, [messagesToShow])

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
          ref={inputRef}
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
