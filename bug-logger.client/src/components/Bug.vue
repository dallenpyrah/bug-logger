<template>
  <div class="col-12">
    <div class="card bug shadow-sm m-2 text-center p-5 rounded-bug bg-dark text-light">
      <router-link :to="{ name: 'BugDetailsPage', params: {id: bug.id}}">
        <h3 class="text-light">
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
.rounded-bug{
  border-radius: 2.5rem;
}
.bg-bug{
background-color: rgb(37, 37, 37);
}
.bug:hover{
  transform: translateX(-10px);
  box-shadow: 1px 3px 5px  rgb(37, 37, 37);
  cursor: pointer;
}
.bug{
  transition: all .2s;
  color: black;
}
</style>
