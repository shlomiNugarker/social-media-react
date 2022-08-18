import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { utilService } from '../../services/utilService'
import { MsgPreview } from './MsgPreview'

export function ListMsg() {
  const msgs = [
    'adfa',
    'sgadgadfg',
    'adfagrw asdgadg sdg',
    'dgd gfadgf g fdhsfg aefa ',
    'adfa',
    'sgadgadfg',
    'adfagrw asdgadg sdg',
    'dgd gfadgf g fdhsfg aefa ',
    'adfa',
    'sgadgadfg',
    'adfagrw asdgadg sdg',
    'dgd gfadgf g fdhsfg aefa ',
    'adfa',
    'sgadgadfg',
    'adfagrw asdgadg sdg',
    'dgd gfadgf g fdhsfg aefa ',
    'adfa',
    'sgadgadfg',
    'adfagrw asdgadg sdg',
    'dgd gfadgf g fdhsfg aefa ',
  ]

  return (
    <section className="list-msg">
      <div className="title-container">
        <p>Messaging</p>

        <div className="logos">
          <span className="logo-menu">
            <FontAwesomeIcon
              className="dots-icon"
              icon="fa-solid fa-ellipsis"
            />
          </span>
          <span className="logo-new-msg">
            <FontAwesomeIcon icon="fa-solid fa-message" />
          </span>
        </div>
      </div>

      <div className="filter-container">
        <input type="text" placeholder="Search messages" />
      </div>

      <div className="list">
        {msgs.map((msg) => (
          <MsgPreview key={utilService.makeId()} msg={msg} />
        ))}
      </div>
    </section>
  )
}
