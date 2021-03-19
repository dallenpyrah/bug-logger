const { AppState } = require('../AppState')
const { logger } = require('../utils/Logger')
const { api } = require('./AxiosService')

class NotesService {
  async getAllNotes() {
    try {
      const res = await api.get('api/notes')
      AppState.notes = res.data
    } catch (error) {
      logger(error)
    }
  }

  async createNote(body) {
    try {
      const res = await api.post('api/notes', body)
      AppState.notes.push(res.data)
    } catch (error) {
      logger(error)
    }
  }

  async editNote(id, body) {
    try {
      const res = await api.put('api/notes/' + id, body)
      AppState.activeNote = res.data
    } catch (error) {
      logger(error)
    }
  }

  async deleteNote(id) {
    try {
      return await api.delete('api/notes/' + id)
    } catch (error) {
      logger(error)
    }
  }
}

export const notesService = new NotesService()
