import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilterBy } from '../../store/actions/postActions'

export const InputFilter = () => {
  const dispatch = useDispatch

  const [fields, setFields] = useState({ txt: '' })

  // const { filterBy } = useSelector((state) => state.postModule)

  const handleChange = async ({ target }) => {
    const field = target.name
    let value = target.type === 'number' ? +target.value || '' : target.value
    setFields({ [field]: value })
  }
  const setFilter = () => {
    dispatch(setFilterBy({ ...fields }))
  }

  return (
    <section className="input">
      <FontAwesomeIcon className="search-icon" icon="fas fa-search" />
      <input
        type="text"
        placeholder="Search..."
        onChange={handleChange}
        id="txt"
        name="txt"
        value={fields.txt}
      />
    </section>
  )
}
