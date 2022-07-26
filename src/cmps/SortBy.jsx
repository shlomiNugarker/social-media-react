import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const SortBy = () => {
  return (
    <section className="sort-by">
      <hr className="divider" />
      <span>Sort by: Top</span>
      <FontAwesomeIcon icon="fa-solid fa-sort-down" />
    </section>
  )
}
