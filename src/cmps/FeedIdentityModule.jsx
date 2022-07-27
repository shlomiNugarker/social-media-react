export const FeedIdentityModule = (props) => {
  return (
    <section className="feed-identity-module">
      <div className="">
        <div className="bg">
          <div className="profile-container">
            <div className="img"></div>
          </div>
        </div>

        <div className="profile-name">
          <h1>
            Shlomi <br /> Nugarker
          </h1>
          <p className="professional">Full-Stack Developer</p>
        </div>

        <div className="views">
          <div>
            <p>Who's viewed your profile</p>
            <span>245</span>
          </div>

          <div>
            <p>Impressions of your post</p>
            <span>2164</span>
          </div>
        </div>

        <div className="to-premium">
          <p>Access exclusive tools & insights</p>
          <div>
            <span className="logo">o</span>
            <p>Try Premium for free</p>
          </div>
        </div>

        <div className="my-items">
          <div>
            <span>o</span>
            My items
          </div>
        </div>
      </div>
    </section>
  )
}
