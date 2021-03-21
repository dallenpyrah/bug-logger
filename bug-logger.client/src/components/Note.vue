<template>
  <div class="col-12 mt-3">
    <div class="card bug-height bg-light">
      <div class="card-img-top" v-if="note && note.creator">
        <div class="row justify-content-between">
          <div class="col-3">
            <img class="p-3" :src="note.creator.picture" width="100" alt="">
          </div>
          <div class="col-4 p-3">
            <h3 class="text-success">
              {{ note.body }}
            </h3>
            <h6 class="text-grey">{{ note.creator.name }}</h6>
          </div>
          <div class="col-4 p-4">
            <h6 v-if="state.bug.closed === false && state.user.email === note.creator.email && state.user.isAuthenticated"> <i class="fa fa-trash-o fa-2x mt-2 ml-5 pointer text-danger" @click="toggleDeleteNote" aria-hidden="true"></i> </h6>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { notesService } from '../services/NotesService'
import { bugsService } from '../services/BugsService'
import swal from 'sweetalert'
import { AppState } from '../AppState'
export default {
  name: 'Note',
  props: {
    note: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      user: computed(() => AppState.user),
      bug: computed(() => AppState.activeBug)
    })
    return {
      state,
      async deleteNote() {
        try {
          await notesService.deleteNote(props.note.id)
          await bugsService.getNotesByBugId(props.note.bug)
        } catch (error) {
          console.error(error)
        }
      },
      async toggleDeleteNote() {
        try {
          swal({
            title: 'Are you sure?',
            text: 'Once deleted, you will not be able to recover this note!',
            icon: 'warning',
            buttons: true,
            dangerMode: true
          })
            .then((willDelete) => {
              if (willDelete) {
                this.deleteNote()
                swal('The note has been deleted!', {
                  icon: 'success'
                })
              } else {
                swal('Canceled, the note has not been deleted!')
              }
            })
        } catch (error) {
          console.log(error)
        }
      }
    }
  }
}
</script>

<style>
.pointer{
  cursor: pointer;
}
.text-grey{
  color: rgb(80, 80, 80);
}

</style>
