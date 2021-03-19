import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BugsService {
  async editBugStatus(id, body) {
    return await dbContext.Bugs.findByIdAndUpdate(id, body).populate('creatorId')
  }

  async editBug(id, body) {
    return await dbContext.Bugs.findByIdAndUpdate(id, body).populate('creatorId')
  }

  async find(query = {}) {
    return await dbContext.Bugs.find(query).populate('creator')
  }

  async findById(id) {
    const bug = await dbContext.Bugs.findById(id).populate('creator')
    if (!bug) {
      throw new BadRequest('Invalid Id')
    }
    return bug
  }

  async create(body) {
    return await dbContext.Bugs.create(body)
  }
}

export const bugsService = new BugsService()
