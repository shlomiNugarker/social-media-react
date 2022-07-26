import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Input = () => {
  return (
    <section className="input">
      <FontAwesomeIcon className="search-icon" icon="fas fa-search" />
      <input type="search" placeholder="Search..." />
    </section>
  )
}
