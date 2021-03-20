<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-4">
        <div class="card">
          <router-link :to="{ name: 'BugDetailsPage', params: {id: bug.id}}">
            <h3>
              {{ bug.title }}
            </h3>
            <h3 v-if="bug.closed">
              <span class="badge badge-danger">
                CLOSED
              </span>
            </h3>
            <h3 v-else>
              <span class="badge badge-success">
                OPEN
              </span>
            </h3>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
export default {
  name: 'Bug',
  props: {
    bug: { type: Object, required: true }
  },
  setup() {
    const state = reactive({
      bug: computed(() => AppState.bugs)
    })
    return {
      state
    }
  },
  components: {}

}
</script>

<style>

</style>
