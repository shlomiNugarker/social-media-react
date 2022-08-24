import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const MapMenu = ({ menuPosition }) => {
  return (
    <section className="map-menu">
      <span className="location-icon">
        <FontAwesomeIcon icon="fa-solid fa-location-dot" />
      </span>

      <div className="opts-container">
        <div className="add-picture opt">
          <p>Add a picture here</p>
        </div>
        <div className="add-post-to-map opt">
          <p>Add a post here</p>
        </div>
      </div>
    </section>
  )
}
