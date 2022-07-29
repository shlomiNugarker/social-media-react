import { Posts } from '../cmps/Posts'
import { RightSideBar } from '../cmps/RightSideBar'
import { LeftSideBar } from '../cmps/LeftSideBar'

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
