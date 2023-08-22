<template>
  <div class="card">
    <h1>Here is some text</h1>
    <p>This is going to be a little element for a paragraph</p>
    <span>Span tags are cool too</span>
    <section>Semantic Sectoins</section>
    <p>Thsiafkh</p>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  message: {
    type: String,
    required: true,
  },
})
</script>

<style>
  .card {
    height: 100px;
    width: 300px;
    background-color: aquamarine;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
