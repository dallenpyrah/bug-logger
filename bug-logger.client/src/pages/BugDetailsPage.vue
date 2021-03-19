<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <h3>
            {{ state.bug.title }}
          </h3>
          <h3 v-if="state.bug.closed">
            <span class="badge badge-success">
              OPEN
            </span>
          </h3>
          <h3 v-else>
            <span class="badge badge-danger">
              CLOSED
            </span>
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
import { useRoute } from 'vue-router'
export default {
  name: 'BugDetailsPage',
  setup() {
    const route = useRoute()
    const state = reactive({
      bug: computed(() => AppState.activeBug)
    })
    onMounted(async() => await bugsService.getBugById(route.params.id))
    return {
      route,
      state
    }
  }
}
</script>

<style>

</style>
