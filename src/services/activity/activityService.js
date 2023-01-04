import { httpService } from '../httpService'

const ENDPOINT = 'activity'

export const activityService = {
  query,
  save,
  getActivitiesLength,
}

const activitiesCash = {}

async function query(filterBy = {}) {
  const activities = await httpService.get(ENDPOINT, filterBy)

  return activities
}

async function save(activity) {
  return activity._id
    ? await httpService.put(`${ENDPOINT}/${activity._id}`, activity)
    : await httpService.post(ENDPOINT, activity)
}

async function getActivitiesLength(filterBy = {}) {
  return await httpService.get(ENDPOINT + '/length', filterBy)
}
