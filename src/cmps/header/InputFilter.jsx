import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  loadPosts,
  addFilterByPosts,
  getPostsLength,
} from '../../store/actions/postActions'

export const InputFilter = () => {
  const dispatch = useDispatch()

  const { users } = useSelector((state) => state.userModule)

  const [fields, setFields] = useState({ txt: '' })

  const [usersAutoComplete, setUsersAutoComplete] = useState([])

  const [isFocus, setIsFocus] = useState(false)

  const handleChange = async ({ target }) => {
    const field = target.name
    let value = target.type === 'number' ? +target.value || '' : target.value
    setFields({ [field]: value })
    if (target.value === '') onLoadPosts()
  }

  const handleAutComplete = () => {
    let inputField = document.getElementById('txt')
    let ulField = document.querySelector('.suggestions')
    inputField.addEventListener('input', changeAutoComplete)

    if (ulField) ulField.addEventListener('click', selectItem)

    function changeAutoComplete({ target }) {
      let data = target.value
      ulField.innerHTML = ``
      if (data?.length) {
        let autoCompleteValues = autoComplete(data)
        autoCompleteValues.forEach((value) => {
          addItem(value)
        })
      }
    }

    function autoComplete(inputValue) {
      let destination = usersAutoComplete || []
      return destination.filter((value) =>
        value.toLowerCase().includes(inputValue.toLowerCase())
      )
    }

    function addItem(value) {
      ulField.innerHTML = ulField.innerHTML + `<li>${value}</li>`
    }

    function selectItem({ target }) {
      if (target.tagName === 'LI') {
        inputField.value = target.textContent
        ulField.innerHTML = ``
        setFields({ txt: inputField.value })
      }
    }
  }

  const getUsersName = () => {
    if (!users) return
    const usersToReturn = users.map((user) => user.fullname)
    setUsersAutoComplete(usersToReturn)
  }

  useEffect(() => {
    getUsersName()
    handleAutComplete()
    return () => {
      dispatch(addFilterByPosts(null))
    }
  }, [users])

  useEffect(() => {
    handleAutComplete()
  }, [usersAutoComplete])

  useEffect(() => {
    onLoadPosts()
  }, [fields.txt])

  const onLoadPosts = () => {
    dispatch(addFilterByPosts(fields))
    dispatch(loadPosts())
    dispatch(getPostsLength())
  }

  let focusStyle = isFocus ? 'focus' : ''

  return (
    <section className="input">
      <FontAwesomeIcon className="search-icon" icon="fas fa-search" />
      <input
        type="text"
        placeholder="Search..."
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.code === 'Enter') onLoadPosts(e)
        }}
        onFocus={() => {
          setIsFocus(true)
        }}
        onBlur={() => {
          setIsFocus(false)
        }}
        id="txt"
        name="txt"
        value={fields.txt}
      />
      <ul className={'suggestions ' + focusStyle}></ul>
    </section>
  )
}
