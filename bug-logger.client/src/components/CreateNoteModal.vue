<template>
  <div class="create-note-modal">
    <div
      class="modal fade"
      :id="`create-note` + state.note._id"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modelTitleId"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-dark">
              Add your note
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form class="form-inline" @submit.prevent="createNote">
              <div class="form-group">
                <input
                  type="text"
                  name="note"
                  id="note"
                  class="form-control"
                  placeholder="Note Title"
                  aria-describedby="helpId"
                  v-model="state.newNote.body"
                />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button class="btn btn-success" @click="createNote">
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import $ from 'jquery'
import { notesService } from '../services/NotesService'
import { useRouter } from 'vue-router'
import { bugsService } from '../services/BugsService'
export default {
  name: 'CreateNoteModal',
  setup() {
    const router = useRouter()
    const state = reactive({
      user: computed(() => AppState.user),
      note: computed(() => AppState.notes),
      bug: computed(() => AppState.activeBug),
      newNote: {}
    })
    return {
      router,
      state,
      async createNote() {
        try {
          const note = { body: state.newNote.body, bug: state.bug.id }
          await notesService.createNote(note)
          await bugsService.getNotesByBugId(state.bug.id)
          state.newNote = { body: '', bug: state.bug.id }
          $('#create-note' + state.note._id).modal('hide')
        } catch (error) {
          console.error(error)
        }
      }
    }
  }

}
</script>

<style>

</style>
