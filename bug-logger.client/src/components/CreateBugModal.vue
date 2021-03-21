<template>
  <div class="create-bug-modal">
    <div
      class="modal fade"
      :id="`create-bug` + state.bug._id"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modelTitleId"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-dark">
              Add your bug
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
            <form class="form-inline" @submit.prevent="createBug">
              <div class="form-group">
                <input
                  type="text"
                  name="bug"
                  id="bug"
                  class="form-control"
                  placeholder="Bug Title"
                  aria-describedby="helpId"
                  v-model="state.newBug.title"
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
                  v-model="state.newBug.description"
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
            <button class="btn btn-success" @click="createBug">
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
import { bugsService } from '../services/BugsService'
import { useRouter } from 'vue-router'
export default {
  name: 'CreateBugModal',
  setup() {
    const router = useRouter()
    const state = reactive({
      user: computed(() => AppState.user),
      bug: computed(() => AppState.bugs),
      newBug: {}
    })
    return {
      router,
      state,
      async createBug() {
        try {
          const bugId = await bugsService.createBug(state.newBug)
          router.push({ name: 'BugDetailsPage', params: { id: bugId } })
          state.newBug = { title: '', description: '' }
          $('#create-bug' + state.bug._id).modal('hide')
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
