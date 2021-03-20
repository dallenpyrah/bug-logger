import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { bugsService } from '../services/BugsService'
import { BadRequest } from '../utils/Errors'
import { notesService } from '../services/NotesService'

export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .get('', this.getAll)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .get('/:id/notes', this.getNotesByBugId)
      .get('/:id', this.getBugById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.editBug)
      .delete('/:id', this.deleteBug)
  }

  async getAll(req, res, next) {
    try {
      return res.send(await bugsService.find())
    } catch (error) {
      next(error)
    }
  }

  async getNotesByBugId(req, res, next) {
    try {
      return res.send(await notesService.find({ bug: req.params.id }))
    } catch (error) {
      next(error)
    }
  }

  async getBugById(req, res, next) {
    try {
      return res.send(await bugsService.findById(req.params.id))
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      const bug = await bugsService.create(req.body)
      res.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async editBug(req, res, next) {
    try {
      if (req.body.closed === true || req.body.closed === false) {
        req.body.closed = false
        res.send(await bugsService.editBug(req.params.id, req.body))
      } else {
        throw new BadRequest('Bug has been closed, there is no editing this bug.')
      }
    } catch (error) {
      next(error)
    }
  }

  async deleteBug(req, res, next) {
    try {
      if (req.body) {
        req.body.closed = true
        res.send(await bugsService.editBugStatus(req.params.id, req.body))
      }
    } catch (error) {
      next(error)
    }
  }
}
