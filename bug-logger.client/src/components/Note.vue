<template>
  <div class="col-5">
    <div class="card">
      <div class="card-img-top">
        <img :src="note.creator.picture" alt="">
      </div>
      <h6>
        Okaty {{ note.body }}
      </h6>
      {{ note.creator.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Note',
  props: {
    note: { type: Object, required: true }
  }
}
</script>

<style>

</style>
