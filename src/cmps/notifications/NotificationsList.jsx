import { useSelector } from 'react-redux'
import { NotificaitonPreview } from './NotificaitonPreview'

export function NotificationsList() {
  const { activities } = useSelector((state) => state.activityModule)

  if (!activities?.length)
    return (
      <div className="notifications-list">
        <div className="no-activities-container">
          <p>No activities</p>
        </div>
      </div>
    )

  return (
    <section className="notifications-list">
      {activities.map((activity) => (
        <NotificaitonPreview key={activity?._id} activity={activity} />
      ))}
    </section>
  )
}
