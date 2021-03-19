import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { notesService } from '../services/NotesService'
import { BadRequest } from '../utils/Errors'

export class NotesController extends BaseController {
  constructor() {
    super('api/notes')
    this.router
      .get('', this.getAll)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)

      .post('', this.create)
      .put('/:id', this.editNote)
      .delete('/:id', this.deleteNote)
  }

  async getAll(req, res, next) {
    try {
      return res.send(await notesService.find())
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      const note = await notesService.create(req.body)
      res.send(note)
    } catch (error) {
      next(error)
    }
  }

  async editNote(req, res, next) {
    try {
      if (req.body.closed === true) {
        req.body.closed = false
        res.send(await notesService.editNote(req.params.id, req.body))
      } else {
        throw new BadRequest('Note has been closed, there is no editing this note.')
      }
    } catch (error) {
      next(error)
    }
  }

  async deleteNote(req, res, next) {
    try {
      res.send(await notesService.deleteNote(req.params.id))
    } catch (error) {
      next(error)
    }
  }
}
