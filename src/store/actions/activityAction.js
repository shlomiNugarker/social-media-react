import { activityService } from '../../services/activity/activityService'

export function loadActivities() {
  return async (dispatch, getState) => {
    try {
      const { filterByActivities } = getState().activityModule
      const activities = await activityService.query(filterByActivities)

      dispatch({ type: 'SET_ACTIVITIES', activities })
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function saveActivity(activity) {
  return async (dispatch) => {
    try {
      const addedActivity = await activityService.save(activity)
      activity._id
        ? dispatch({ type: 'UPDATE_ACTIVITY', activity: addedActivity })
        : dispatch({ type: 'ADD_ACTIVITY', activity: addedActivity })
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function getActivitiesLength() {
  return async (dispatch, getState) => {
    try {
      const { filterByActivities } = getState().activityModule
      const activitiesLength = await activityService.getActivitiesLength(
        filterByActivities
      )
      dispatch({ type: 'SET_ACTIVITIES_LENGTH', activitiesLength })
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function addFilterByActivities(filterByActivities) {
  return async (dispatch) => {
    dispatch({ type: 'ADD_FILTER_BY_ACTIVITIES', filterByActivities })
  }
}

export function setFilterByActivities(filterByActivities) {
  return async (dispatch) => {
    dispatch({ type: 'SET_FILTER_BY_ACTIVITIES', filterByActivities })
  }
}

export function setUnreadActivitiesIds(unreadActivities) {
  return async (dispatch) => {
    dispatch({ type: 'SET_UNREAD_ACTIVITIES', unreadActivities })
  }
}
