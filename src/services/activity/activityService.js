import { httpService } from '../httpService'

const ENDPOINT = 'activity'

export const activityService = {
  query,
  save,
  getActivitiesLength,
}

async function query(filterBy = {}) {
  return await httpService.get(ENDPOINT, filterBy)
}

async function save(activity) {
  return activity._id
    ? await httpService.put(`${ENDPOINT}/${activity._id}`, activity)
    : await httpService.post(ENDPOINT, activity)
}

async function getActivitiesLength(filterBy = {}) {
  console.log()
  return await httpService.get(ENDPOINT + '/length', filterBy)
}

// ;(async () => {
//   console.log('IFI !')
//   const chats = await query()

//   console.log('chats: ', chats)
// })()
