import { useDispatch, useSelector } from 'react-redux'
import { useEffectUpdate } from '../hooks/useEffectUpdate'
import { getLoggedinUser } from '../store/actions/userActions'
import { useEffect, useState } from 'react'

export const FeedIdentityModule = (props) => {
  const dispatch = useDispatch()

  const { loggedInUser } = useSelector((state) => state.userModule)

  if (!loggedInUser)
    return <section className="feed-identity-module">Loading</section>

  const { fullname, imgUrl, profession } = loggedInUser

  return (
    <section className="feed-identity-module">
      <div className="">
        <div className="bg">
          <div className="profile-container">
            <img src={imgUrl} alt="" className="img" />
          </div>
        </div>

        <div className="profile-name">
          <h1>{fullname}</h1>
          <p className="professional">{profession}</p>
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
