<script>
export default {
  name: 'TaskSelection',
  props: {
    startAmount: {
      type: Number
    }
  },
  methods: {
    start(amount) {
      this.$emit('update:startAmount', amount)
    }
  }
}
</script>

<template>
  <p class="lead">Wieviele Aufgaben magst du rechnen?</p>
  <div class="btn-group btn-group-lg" role="group">
    <button class="btn btn-primary" @click="start(10)">10</button>
    <button class="btn btn-primary" @click="start(20)">20</button>
    <button class="btn btn-primary" @click="start(50)">50</button>
    <button class="btn btn-primary" @click="start(100)">100</button>
  </div>
</template>