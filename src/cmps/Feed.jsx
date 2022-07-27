import { Posts } from './Posts'
import { RightSideBar } from './RightSideBar'
import { LeftSideBar } from './LeftSideBar'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export function Feed() {
  return (
    <section className="feed">
      <LeftSideBar />
      <Posts />
      <RightSideBar />
    </section>
  )
}
