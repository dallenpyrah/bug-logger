<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <button class="btn btn-success" type="button" @click="findOpenBugs">
        Open Bugs
      </button>
      <button class="btn btn-danger" type="button" @click="findClosedBugs">
        Closed Bugs
      </button>
      <div class="col-12 text-center">
        <h1>
          Hello from the bug page!
        </h1>
        <button class="btn btn-success" :data-target="`#create-bug` + state.bug._id" data-toggle="modal" aria-hidden="true">
          Create Bug
        </button>
        <Bug v-for="bug in state.bug" :key="bug.id" :bug="bug" />
      </div>
    </div>
  </div>
  <CreateBugModal />
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import Bug from '../components/Bug'
import CreateBugModal from '../components/CreateBugModal'
import { bugsService } from '../services/BugsService'
export default {
  name: 'BugPage',
  setup() {
    const state = reactive({
      bug: computed(() => AppState.bugs),
      newBug: {}
    })
    onMounted(() => { bugsService.getAllBugs() })
    return {
      state,
      async createBug() {
        await bugsService.createBug(state.newBug)
      },
      async findOpenBugs() {
        await bugsService.getAllBugs()
        const openBugs = state.bug.filter(closed => closed.closed === false)
        console.log(openBugs)
        AppState.bugs = openBugs
      },
      async findClosedBugs() {
        await bugsService.getAllBugs()
        const closedBugs = state.bug.filter(closed => closed.closed === true)
        console.log(closedBugs)
        console.log(closedBugs)
        AppState.bugs = closedBugs
      }
    }
  },
  components: {
    Bug,
    CreateBugModal
  }
}
</script>

<style>

</style>
