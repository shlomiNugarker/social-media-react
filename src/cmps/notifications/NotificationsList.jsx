import { utilService } from '../../services/utilService'
import { NotificaitonPreview } from './NotificaitonPreview'

export function NotificationsList() {
  const notificaitons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 122, 3, 434, 5]
  return (
    <section className="notifications-list">
      {notificaitons.map((notificaiton) => (
        <NotificaitonPreview
          key={utilService.makeId()}
          notificaiton={notificaiton}
        />
      ))}
    </section>
  )
}
