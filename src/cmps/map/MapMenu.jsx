import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const MapMenu = ({ menuPosition, setIsCreateShowPost }) => {
  return (
    <section className="map-menu">
      <span className="location-icon">
        <FontAwesomeIcon icon="fa-solid fa-location-dot" />
      </span>

      <div className="opts-container">
        <div
          className="add-post-to-map opt"
          onClick={() => {
            setIsCreateShowPost(true)
          }}
        >
          <p>Add a post here</p>
        </div>
      </div>
    </section>
  )
}
