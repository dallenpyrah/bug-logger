<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-img-top" v-if="state.bug && state.bug.creator">
            <img :src="state.bug.creator.picture" alt="">
          </div>
          <h3>
            {{ state.bug.title }}
          </h3>
          <h3>
            {{ state.bug.description }}
          </h3>
          <h3 v-if="state.bug.creator">
            {{ state.bug.creator.name }}
          </h3>
          <h3 v-if="state.bug && state.bug.closedDate">
            {{ state.bug.closedDate }}
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
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
import { useRoute } from 'vue-router'
import Note from '../components/Note'
export default {
  name: 'BugDetailsPage',
  setup() {
    const route = useRoute()
    const state = reactive({
      bug: computed(() => AppState.activeBug),
      notes: computed(() => AppState.notes)
    })
    onMounted(async() => await bugsService.getBugById(route.params.id))
    onMounted(async() => await bugsService.getNotesByBugId(route.params.id))
    return {
      route,
      state
    }
  },
  components: {
    Note
  }
}
</script>

<style>

</style>
