import { CommunityPanel } from './CommunityPanel'
import { FeedIdentityModule } from './FeedIdentityModule'

export function LeftSideBar(props) {
  return (
    <section className="left-side-bar">
      <FeedIdentityModule />
      <CommunityPanel />
    </section>
  )
}
