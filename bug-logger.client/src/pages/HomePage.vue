<template>
  <div class="container-fluid">
    <div class="row mt-5 justify-content-center">
      <div class="col-12 text-center">
        <h1 class="mt-5">
          Bug Logger, a website for tracking your bugs.
        </h1>
        <button class="btn btn-primary" @click="routeToBugPage">
          Bugs Page
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  name: 'Home',
  setup() {
    const router = useRouter()
    return {
      router,
      routeToBugPage() {
        router.push({ name: 'BugPage' })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
