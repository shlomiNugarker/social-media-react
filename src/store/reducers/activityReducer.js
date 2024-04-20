const INITIAL_STATE = {
  activities: [],
  filterByActivities: null,
  isActivitiesLoading: false,
  activitiesLength: null,
  unreadActivities: [],
  unreadMessages: [],
}

export function activityReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_ACTIVITIES':
      return {
        ...state,
        activities: [...action.activities],
      }
    case 'ADD_ACTIVITY':
      return {
        ...state,
        activities: [action.activity, ...state.activities],
      }

    case 'UPDATE_ACTIVITY':
      return {
        ...state,
        activities: state.activities.map((activity) => {
          return activity._id === action.activity._id
            ? action.activity
            : activity
        }),
      }

    case 'SET_ACTIVITIES_LENGTH':
      return {
        ...state,
        activitiesLength: action.activitiesLength,
      }

    case 'ADD_FILTER_BY_ACTIVITIES':
      return {
        ...state,
        filterByActivities: {
          ...state.filterByActivities,
          ...action.filterByActivities,
        },
      }
    case 'SET_FILTER_BY_ACTIVITIES':
      return {
        ...state,
        filterByActivities: action.filterByActivities,
      }

    case 'SET_UNREAD_ACTIVITIES':
      return {
        ...state,
        unreadActivities: action.unreadActivities,
      }
    case 'SET_UNREAD_MESSAGES':
      return {
        ...state,
        unreadMessages: action.unreadMessages,
      }

    default:
      return state
  }
}
