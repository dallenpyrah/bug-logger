<template>
  <div class="container-fluid bg-light">
    <div class="row mt-homepage">
      <div class="col-6 text-left ml-5">
        <h1 class="mt-5 text-danger animate__animated animate__fadeInLeft text-big">
          BUG LOGGER
        </h1>
        <h6 class="mt-5 animate__animated animate__fadeInRight ml-5">
          Your home for tracking all your bugs, discover more by traveling to the bugs page
        </h6>
        <div class="row mt-5 ml-5">
          <div class="col-1 text-right ml-5">
            <i class="fa fa-arrow-circle-right hover text-danger fa-4x" @click="routeToBugPage" aria-hidden="true"></i>
          </div>
          <div class="col-9">
            <h4 class="mt-bug hover text-grey hover" @click="routeToBugPage">
              Bugs page
            </h4>
          </div>
        </div>
      </div>
      <div class="col-4 mt-description">
        <h6><i class="fa fa-check mr-2 animate__animated animate__fadeInRight" aria-hidden="true"></i> We are here to help you keep track of your bugs</h6>
        <h6 class="mt-4 text-grey">
          <i class="fa fa-address-card mr-2 text-grey animate__animated animate__fadeInRight" aria-hidden="true"></i> No matter what they are you can count on us to keep you organized
        </h6>
      </div>
    </div>
    <div class="row justify-content-end">
      <div class="col-3 mt-card">
        <div class="card bg-danger text-light text-center">
          <h6 class="p-2 mt-1 animate__animated animate__bounceIn">80 MILLION <i class="fa fa-bug ml-3 mr-3" aria-hidden="true"></i> TRACKED SINCE 2006</h6>
        </div>
      </div>
      <div class="col-8 mt-3 text-center">
        <img src="https://i.pinimg.com/originals/d8/e4/da/d8e4da1ae3d255699922b60a6d13ef86.gif" width="500">
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import 'animate.css'
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
.text-big{
  font-size: 100px;
}
.mt-bug{
  margin-top: 1rem;
}
.hover{
  cursor: pointer;
}
.text-grey{
  color: rgb(119, 119, 119);
}
.mt-description{
  margin-top: 11rem;
}
.mt-card{
  margin-top: 12rem;
}
.mt-bugspage{
  margin-top: 7rem;
}
.mt-homepage{
  margin-top: 7rem;
}
</style>
