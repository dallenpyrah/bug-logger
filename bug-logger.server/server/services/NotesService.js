import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class NotesService {
  async deleteNote(id) {
    return await dbContext.Notes.findByIdAndDelete(id).populate('creator')
  }

  async editNote(id, body) {
    return await dbContext.Notes.findByIdAndUpdate(id, body).populate('creator')
  }

  async find(query = {}) {
    return await dbContext.Notes.find(query).populate('creator')
  }

  async findById(id) {
    const note = await dbContext.Notes.findById(id).populate('creator')
    if (!note) {
      throw new BadRequest('Invalid Id')
    }
    return note
  }

  async create(body) {
    return await dbContext.Notes.create(body)
  }
}

export const notesService = new NotesService()
