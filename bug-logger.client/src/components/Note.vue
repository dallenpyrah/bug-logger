<template>
  <div class="col-5">
    <div class="card">
      <div v-if="note.creator && state.user.email == note.creator.email">
        <i class="fa fa-times" @click="toggleDeleteNote" aria-hidden="true"></i>
      </div>
      <div class="card-img-top" v-if="note.creator">
        <img :src="note.creator.picture" alt="">
      </div>
      <h6>
        Okaty {{ note.body }}
      </h6>
      <div v-if="note.creator">
        {{ note.creator.name }}
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
      user: computed(() => AppState.user)
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

</style>
