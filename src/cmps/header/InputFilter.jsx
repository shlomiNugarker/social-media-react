import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  loadPosts,
  addFilterByPosts,
  getPostsLength,
} from '../../store/actions/postActions'

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
      dispatch(addFilterByPosts(null))
    }
  }, [])

  const onLoadPosts = () => {
    dispatch(addFilterByPosts(fields))
    dispatch(loadPosts())
    dispatch(getPostsLength())
    // searchPrompt(fields.txt, true, false)
    // setTimeout(() => {
    //   searchPrompt(fields.txt, true, false, true)
    // }, 3000)
  }

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
        id="txt"
        name="txt"
        value={fields.txt}
      />
    </section>
  )
}

/////////////////////////////////////////////////////////////////////////////////////////

function doHighlight(
  bodyText,
  searchTerm,
  highlightStartTag,
  highlightEndTag,
  cleanHighLight
) {
  // the highlightStartTag and highlightEndTag parameters are optional
  if (cleanHighLight) {
    highlightStartTag = ''
    highlightEndTag = ''
  } else if (!highlightStartTag || !highlightEndTag) {
    highlightStartTag = "<font style='color:blue; background-color:yellow;'>"
    highlightEndTag = '</font>'
  }

  var newText = ''
  var i = -1
  var lcSearchTerm = searchTerm.toLowerCase()
  var lcBodyText = bodyText.toLowerCase()

  while (bodyText.length > 0) {
    i = lcBodyText.indexOf(lcSearchTerm, i + 1)
    if (i < 0) {
      newText += bodyText
      bodyText = ''
    } else {
      // skip anything inside an HTML tag
      if (bodyText.lastIndexOf('>', i) >= bodyText.lastIndexOf('<', i)) {
        // skip anything inside a <script> block
        if (
          lcBodyText.lastIndexOf('/script>', i) >=
          lcBodyText.lastIndexOf('<script', i)
        ) {
          newText +=
            bodyText.substring(0, i) +
            highlightStartTag +
            bodyText.substr(i, searchTerm.length) +
            highlightEndTag
          bodyText = bodyText.substr(i + searchTerm.length)
          lcBodyText = bodyText.toLowerCase()
          i = -1
        }
      }
    }
  }
  return newText
}

function highlightSearchTerms(
  searchText,
  treatAsPhrase,
  warnOnFailure,
  highlightStartTag,
  highlightEndTag,
  cleanHighLight
) {
  var searchArray
  if (treatAsPhrase) {
    searchArray = [searchText]
  } else {
    searchArray = searchText.split(' ')
  }

  if (!document.body || typeof document.body.innerHTML == 'undefined') {
    if (warnOnFailure) {
      alert('the text is unavailable.')
    }
    return false
  }

  var bodyText = document.body.innerHTML
  for (var i = 0; i < searchArray.length; i++) {
    bodyText = doHighlight(
      bodyText,
      searchArray[i],
      highlightStartTag,
      highlightEndTag,
      cleanHighLight
    )
  }

  document.body.innerHTML = bodyText
  return true
}

function searchPrompt(
  defaultSearchText,
  isPrompt,
  treatAsPhrase,
  cleanHighLight,
  textColor,
  bgColor
) {
  // we can optionally use our own highlight tag values
  if (!textColor || !bgColor) {
    var highlightStartTag = ''
    var highlightEndTag = ''
  } else if (cleanHighLight) {
  } else {
    highlightStartTag =
      "<font style='color:" +
      textColor +
      '; background-color:' +
      bgColor +
      ";'>"
    highlightEndTag = '</font>'
  }

  if (treatAsPhrase) {
    var promptText = "Please enter the phrase you'd like to highlight:"
  } else {
    promptText =
      "Please enter the words you'd like to highlight, separated by spaces:"
  }
  if (isPrompt) defaultSearchText = defaultSearchText
  // if (isPrompt) defaultSearchText = prompt(promptText, defaultSearchText)

  if (!defaultSearchText) {
    alert('No search terms were entered. Exiting function.')
    return false
  }

  return highlightSearchTerms(
    defaultSearchText,
    treatAsPhrase,
    true,
    highlightStartTag,
    highlightEndTag,
    cleanHighLight
  )
}
