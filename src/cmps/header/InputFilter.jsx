import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadPosts, setFilterByPosts } from '../../store/actions/postActions'

export const InputFilter = () => {
  const dispatch = useDispatch()

  const [fields, setFields] = useState({ txt: '' })

  const handleChange = async ({ target }) => {
    const field = target.name
    let value = target.type === 'number' ? +target.value || '' : target.value
    setFields({ [field]: value })
    if (target.value === '') onLoadPosts()
  }

  useEffect(() => {
    return () => {
      dispatch(setFilterByPosts(null))
    }
  }, [])

  const onLoadPosts = () => {
    dispatch(setFilterByPosts(fields))
    dispatch(loadPosts())
  }

  return (
    <section className="input">
      <FontAwesomeIcon className="search-icon" icon="fas fa-search" />
      <input
        type="text"
        placeholder="Search..."
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.code === 'Enter') onLoadPosts()
        }}
        id="txt"
        name="txt"
        value={fields.txt}
      />
    </section>
  )
}
