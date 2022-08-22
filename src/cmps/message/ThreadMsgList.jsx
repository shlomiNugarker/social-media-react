import { useSelector } from 'react-redux'
import { utilService } from '../../services/utilService'
import { ThreadMsgPreview } from './ThreadMsgPreview'

export function ThreadMsgList({ messages }) {
  const { loggedInUser } = useSelector((state) => state.userModule)

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
    <section className="thread-msg-list">
      <div className="list">
        {messages.map((msg) => (
          <ThreadMsgPreview key={utilService.makeId()} msg={msg} />
        ))}
      </div>
    </section>
  )
}
