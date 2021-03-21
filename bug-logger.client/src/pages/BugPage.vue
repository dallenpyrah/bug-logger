<template>
  <div class="container-fluid bg-light">
    <div class="row justify-content-center mt-bug">
      <div class="col-6">
        <div class="fixed">
          <button class="btn btn-success m-5" type="button" @click="findOpenBugs">
            Active Bugs
          </button>
          <button class="btn btn-danger m-5" type="button" @click="findClosedBugs">
            Closed Bugs
          </button>
          <button class="btn btn-success m-5" :data-target="`#create-bug` + state.bug._id" data-toggle="modal" aria-hidden="true">
            Create Bug
          </button>
          <div class="col-10 ml-5 text-center">
            <img src="https://i.pinimg.com/originals/d8/e4/da/d8e4da1ae3d255699922b60a6d13ef86.gif" width="550">
          </div>
          <div class="col-12 mt-4">
            <div class="card shadow-lg bg-danger text-center text-light card-height">
              <h6 class="mt-4">
                Browse through active bugs or create a bug that needs to be fixed.
              </h6>
              <h6 class="mt-4">
                <i class="fa fa-bug fa-2x" aria-hidden="true"></i>
              </h6>
              <h6 class="mt-4">
                Sort the bugs by currently active bugs or closed bugs.
              </h6>
            </div>
          </div>
        </div>
      </div>
      <div class="col-4 mt-5 overflow">
        <Bug v-for="bug in state.bug" :key="bug.id" :bug="bug" />
      </div>
    </div>
    <CreateBugModal />
  </div>
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
      user: computed(() => AppState.user),
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
.rounded-bug{
  border-radius: 2.5rem;
}
.bg-white{
  background-color: rgb(255, 255, 255);
}
.card-height{
  height: 20vh;
}
.fixed {
position: fixed;
}
.mt-bug{
  margin-top: 2rem;
}
</style>
