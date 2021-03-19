const { AppState } = require('../AppState')
const { logger } = require('../utils/Logger')
const { api } = require('./AxiosService')

class BugsService {
  async getClosedBugs(closed) {
    try {
      const res = await api.get('api/bugs', closed === false)
      console.log(res.data)
      AppState.bugs = res.data
    } catch (error) {
      logger(error)
    }
  }

  async getAllBugs() {
    try {
      const res = await api.get('api/bugs')
      AppState.bugs = res.data
    } catch (error) {
      logger(error)
    }
  }

  async getNotesByBugId(id) {
    try {
      const res = await api.get(`api/bugs${id}/notes`)
      AppState.notes = res.data
    } catch (error) {
      logger(error)
    }
  }

  async getBugById(id) {
    try {
      const res = await api.get('api/bugs/' + id)
      AppState.activeBug = res.data
    } catch (error) {
      logger(error)
    }
  }

  async createBug(body) {
    try {
      const res = await api.post('api/bugs', body)
      AppState.bugs.push(res.data)
      return res.data._id
    } catch (error) {
      logger(error)
    }
  }

  async editBug(id, body) {
    try {
      const res = await api.put('api/bugs/' + id, body)
      AppState.activeBug = res.data
    } catch (error) {
      logger(error)
    }
  }

  async deleteBug(id, body) {
    try {
      await api.delete('api/bugs/' + id, body)
      this.getAllBugs()
    } catch (error) {
      logger(error)
    }
  }
}

export const bugsService = new BugsService()
