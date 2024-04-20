import { postService } from '../../services/posts/postService'
import { commentService } from '../../services/comment/commentService'
import { socketService } from '../../services/socket.service'

export function setCurrPage(page) {
  return async (dispatch) => {
    try {
      dispatch({ type: 'SET_CURR_PAGE', page })
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function addFilterByPosts(filterByPosts) {
  return async (dispatch) => {
    dispatch({ type: 'ADD_FILTER_BY_POSTS', filterByPosts })
  }
}

export function setFilterByPosts(filterByPosts) {
  return async (dispatch) => {
    dispatch({ type: 'SET_FILTER_BY_POSTS', filterByPosts })
  }
}

export function setNextPage(number) {
  return async (dispatch) => {
    dispatch({ type: 'SET_NEXT_PAGE', page: number })
  }
}

export function loadPosts() {
  return async (dispatch, getState) => {
    try {
      const { filterByPosts } = getState().postModule
      const posts = await postService.query(filterByPosts)
      dispatch({ type: 'SET_POSTS', posts })
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function getPostsLength() {
  return async (dispatch, getState) => {
    try {
      const { filterByPosts } = getState().postModule
      const postsLength = await postService.getPostsLength(filterByPosts)
      dispatch({ type: 'SET_POSTS_LENGTH', postsLength })
    } catch (err) {
      console.log('err:', err)
    }
  }
}

//// ADDING NEXT PAGE
export function addPosts() {
  return async (dispatch, getState) => {
    try {
      const { filterByPosts } = getState().postModule
      const { pageNumber } = getState().postModule
      const newFilterBy = {
        ...filterByPosts,
        page: pageNumber,
      }

      dispatch({ type: 'SET_IS_POSTS_LOADING', isLoading: true })
      const posts = await postService.query(newFilterBy)
      dispatch({ type: 'ADD_POSTS', posts })
      dispatch({ type: 'SET_IS_POSTS_LOADING', isLoading: false })
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function savePost(post) {
  return async (dispatch) => {
    try {
      const addedPost = await postService.save(post)
      post._id
        ? dispatch({ type: 'UPDATE_POST', post: addedPost })
        : dispatch({ type: 'ADD_POST', post: addedPost })

      post._id
        ? socketService.emit('post-updated', addedPost)
        : socketService.emit('post-added', addedPost)

      return addedPost
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function removePost(postId) {
  return async (dispatch) => {
    try {
      await postService.remove(postId)

      socketService.emit('post-removed', postId)

      dispatch({ type: 'REMOVE_POST', postId })
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function saveComment(comment) {
  return async (dispatch) => {
    try {
      const savedComment = await commentService.save(comment)
      comment._id
        ? dispatch({ type: 'UPDATE_COMMENT', comment: savedComment })
        : dispatch({ type: 'ADD_COMMENT', comment: savedComment })

      comment._id
        ? socketService.emit('comment-updated', savedComment)
        : socketService.emit('comment-added', savedComment)

      return savedComment
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function removeComment(comment) {
  return async (dispatch) => {
    try {
      await commentService.remove(comment)

      socketService.emit('comment-removed', comment)

      dispatch({ type: 'REMOVE_COMMENT', comment })
    } catch (err) {
      console.log('err:', err)
    }
  }
}

// HANDLE SOCKETS

export function updatePostForSocket(post) {
  return async (dispatch) => {
    try {
      dispatch({ type: 'UPDATE_POST', post })

      return post
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function addPostForSocket(post) {
  return async (dispatch) => {
    try {
      dispatch({ type: 'ADD_POST', post })
      return post
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function removePostForSocket(postId) {
  return async (dispatch) => {
    try {
      dispatch({ type: 'REMOVE_POST', postId })
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function updateCommentForSocket(comment) {
  return async (dispatch) => {
    try {
      dispatch({ type: 'UPDATE_COMMENT', comment })

      return comment
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function addCommentForSocket(comment) {
  return async (dispatch) => {
    try {
      dispatch({ type: 'ADD_COMMENT', comment })
      return comment
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function removeCommentForSocket(comment) {
  return async (dispatch) => {
    try {
      dispatch({ type: 'REMOVE_COMMENT', comment })
    } catch (err) {
      console.log('err:', err)
    }
  }
}
