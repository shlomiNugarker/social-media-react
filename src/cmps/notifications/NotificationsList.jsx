import { NotificaitonPreview } from './NotificaitonPreview'

export function NotificationsList({activities}) {

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
