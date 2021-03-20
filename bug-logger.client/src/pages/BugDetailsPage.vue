<template>
  <div class="container-fluid">
    <div class="row mt-5">
      <div class="col-3 mt-5">
        <div v-if="state.bug.creator && state.user.email == state.bug.creator.email">
          <button v-if="state.bug.closed === false" class="btn btn-success m-2" :data-target="`#edit-bug` + state.bug.id" data-toggle="modal" aria-hidden="true">
            Edit Bug
          </button>
          <button v-if="state.bug.closed === false" class="btn btn-danger m-2" @click="toggleCloseBug">
            Close Bug
          </button>
        </div>
        <div v-if="state.user.isAuthenticated">
          <button class="btn btn-success" :data-target="`#create-note` + state.notes._id" data-toggle="modal" aria-hidden="true">
            Create Note
          </button>
        </div>
      </div>
      <div class="col-6 mt-5">
        <div class="card bg-dark">
          <div class="card-img-top" v-if="state.bug && state.bug.creator">
            <img :src="state.bug.creator.picture" alt="">
          </div>
          <h3>
            <div v-if="state.bug.creator && state.user.email == state.bug.creator.email">
              <button v-if="state.bug.closed === false" class="btn btn-success" :data-target="`#edit-bug` + state.bug.id" data-toggle="modal" aria-hidden="true">
                Edit Bug
              </button>
              <button v-if="state.bug.closed === false" class="btn btn-success" @click="toggleCloseBug">
                Close Bug
              </button>
            </div>
            {{ state.bug.title }}
          </h3>
          <h3>
            {{ state.bug.description }}
          </h3>
          <h3 v-if="state.bug.creator">
            {{ state.bug.creator.name }}
          </h3>
          <h3 v-if="state.bug.updatedAt">
            Last Modified: {{ state.bug.updatedAt.slice(5, 7) }} - {{ state.bug.updatedAt.slice(8, 10) }} - {{ state.bug.updatedAt.slice(0, 4) }}
          </h3>
          <h3 v-if="state.bug.closed">
            <span class="badge badge-danger">
              CLOSED
            </span>
          </h3>
          <h3 v-else>
            <span class="badge badge-success">
              OPEN
            </span>
          </h3>
        </div>
      </div>
      <Note v-for="note in state.notes" :key="note.id" :note="note" />
      <div v-if="state.user.isAuthenticated" class="col-2">
        <button class="btn btn-success" :data-target="`#create-note` + state.notes._id" data-toggle="modal" aria-hidden="true">
          Create Note
        </button>
      </div>
    </div>
  </div>
  <CreateNoteModal />
  <EditBugModal />
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
import { useRoute } from 'vue-router'
import Note from '../components/Note'
import CreateNoteModal from '../components/CreateNoteModal'
import EditBugModal from '../components/EditBugModal'
import swal from 'sweetalert'
export default {
  name: 'BugDetailsPage',
  setup() {
    const route = useRoute()
    const state = reactive({
      user: computed(() => AppState.user),
      bug: computed(() => AppState.activeBug),
      notes: computed(() => AppState.notes)
    })
    onMounted(async() => await bugsService.getBugById(route.params.id))
    onMounted(async() => await bugsService.getNotesByBugId(route.params.id))
    return {
      route,
      state,
      async closeBug() {
        try {
          await bugsService.deleteBug(state.bug.id)
          await bugsService.getBugById(state.bug.id)
        } catch (error) {
          console.error(error)
        }
      },
      async toggleCloseBug() {
        try {
          swal({
            title: 'Are you sure?',
            text: 'Once closed, you will not be able to modify this bug!',
            icon: 'warning',
            buttons: true,
            dangerMode: true
          })
            .then((willDelete) => {
              if (willDelete) {
                this.closeBug()
                swal('The bug has been closed!', {
                  icon: 'success'
                })
              } else {
                swal('Canceled, the bug has not been closed!')
              }
            })
        } catch (error) {
          console.error(error)
        }
      }
    }
  },
  components: {
    Note,
    CreateNoteModal,
    EditBugModal
  }
}
</script>

<style>

</style>
