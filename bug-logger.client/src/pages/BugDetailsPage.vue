<template>
  <div class="container-fluid bg-light">
    <div class="row mt-5 justify-content-center">
      <div v-if="state.bug.creator && state.user.email == state.bug.creator.email" class="col-8 mt-5">
        <div class="card text-center rounded p-2 bg-dark text-light">
          <div>
            <div class="row justify-content-around">
              <button v-if="state.bug.closed === false" class="btn btn-success m-2 text-light" :data-target="`#edit-bug` + state.bug.id" data-toggle="modal" aria-hidden="true">
                Edit Bug
              </button>
              <button v-if="state.bug.closed === false" class="btn btn-danger m-2" @click="toggleCloseBug">
                Close Bug
              </button>
              <button class="btn btn-success m-2 text-light" :data-target="`#create-note` + state.notes._id" data-toggle="modal" aria-hidden="true">
                Create Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="col-5 mt-5">
        <div v-if="state.bug.closed === false && state.user.isAuthenticated" class="card rounded text-center p-2 bg-dark text-light">
          <div>
            <div class="row justify-content-around">
              <button class="btn btn-success text-light m-2" :data-target="`#create-note` + state.notes._id" data-toggle="modal" aria-hidden="true">
                Create Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-8 mt-4">
        <div class="card p-5 rounded bg-dark">
          <h3 v-if="state.bug.closed">
            <span class="badge badge-danger">
              CLOSED
            </span>
          </h3>
          <h3 v-else>
            <h6 class="text-light" v-if="state.bug.updatedAt">
              Bug Last Modified {{ state.bug.updatedAt.slice(5, 7) }} - {{ state.bug.updatedAt.slice(8, 10) }} - {{ state.bug.updatedAt.slice(0, 4) }}
            </h6>
            <span class="badge text-light badge-success">
              OPEN
            </span>
          </h3>
          <div class="row mt-3 justify-content-center">
            <div class="col-10">
              <div class="card animate__animated animate__fadeInRight text-light p-3 mb-3 text-center bg-danger rounded mt-3">
                <h3>Bug</h3>
              </div>
              <div class="card bug-height bg-light">
                <div class="card-img-top" v-if="state.bug && state.bug.creator">
                  <div class="row justify-content-between">
                    <div class="col-3">
                      <img class="p-3" :src="state.bug.creator.picture" width="100" alt="">
                    </div>
                    <div class="col-4 p-3">
                      <h3 class="text-danger">
                        {{ state.bug.title }}
                      </h3>
                      <h6 class="text-grey">{{ state.bug.creator.name }}</h6>
                    </div>
                    <div class="col-4 p-4">
                      <h6> {{ state.bug.description }} </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-10">
              <div class="card animate__animated animate__fadeInLeft text-light p-3 text-center bg-success rounded mt-3">
                <h3>Notes</h3>
              </div>
              <Note v-for="note in state.notes" :key="note.id" :note="note" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <CreateNoteModal />
    <EditBugModal />
  </div>
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
import 'animate.css'

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
.rounded{
  border-radius: 2rem!important;
}
.text-grey{
  color: rgb(80, 80, 80);
}
</style>
