<template>
  <div class="edit-bug-modal">
    <div
      class="modal fade"
      :id="`edit-bug` + state.bug._id"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modelTitleId"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-dark">
              Edit your bug
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
            <form class="form-inline" @submit.prevent="editBug">
              <div class="form-group">
                <input
                  type="text"
                  name="bug"
                  id="bug"
                  class="form-control"
                  placeholder="Bug Title"
                  aria-describedby="helpId"
                  v-model="state.editedBug.title"
                />
              </div>
              <div class="form-group">
                <input
                  type="text"
                  name="bug"
                  id="bug"
                  class="form-control"
                  placeholder="Bug Description"
                  aria-describedby="helpId"
                  v-model="state.editedBug.description"
                />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-danger"
              data-dismiss="modal"
            >
              Close
            </button>
            <button class="btn btn-success" @click="editBug">
              Edit
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
import { bugsService } from '../services/BugsService'
import { useRouter } from 'vue-router'
export default {
  name: 'EditBugModal',
  setup() {
    const router = useRouter()
    const state = reactive({
      user: computed(() => AppState.user),
      bug: computed(() => AppState.activeBug),
      editedBug: {}
    })
    return {
      router,
      state,
      async editBug() {
        try {
          const editedBug = { title: state.editedBug.title, description: state.editedBug.description, closed: state.bug.closed }
          console.log(editedBug)
          await bugsService.editBug(state.bug.id, editedBug)
          await bugsService.getBugById(state.bug.id)
          $('#edit-bug' + state.bug._id).modal('hide')
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
