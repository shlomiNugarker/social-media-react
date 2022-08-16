import { utilService } from '../../services/utilService'
import { ConnectionPreview } from './ConnectionPreview'

export function ConnectionList({ users }) {
  return (
    <ul className="connection-list">
      {users.map((user) => (
        <ConnectionPreview key={utilService.makeId()} user={user} />
      ))}
    </ul>
  )
}
