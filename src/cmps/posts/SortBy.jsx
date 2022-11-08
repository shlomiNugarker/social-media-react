export const SortBy = ({ onSetSort }) => {
  return (
    <section className="sort-by">
      <hr className="divider" />
      {/* <span>Sort by: Top</span> */}
      <form action="" className="sort-container">
        <label htmlFor="sortBy" className="label">
          Sort by:
          {/* <FontAwesomeIcon icon="fa-solid fa-sort-down" /> */}
          <select
            name="sortBy"
            id="opts"
            onChange={(e) => {
              onSetSort(e.target.value)
            }}
          >
            <option value="-1">Newest</option>
            <option value="1">Oldest</option>
          </select>
        </label>
      </form>
    </section>
  )
}
