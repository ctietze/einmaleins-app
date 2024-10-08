<script setup>
import Calculation from "@/components/Calculation.vue";
</script>

<script>
export default {
  data: () => ({
    selection: null
  }),
  methods: {
    calculate(selection) {
      this.selection = selection
    }
  }
}
</script>

<template>
  <div class="container">
    <h1>Einmaleins - Training</h1>
    <template v-if="selection === null">
      <p class="lead">Wähle eine Rechenart:</p>
      <div class="btn-group">
        <button class="btn btn-primary btn-primary" @click="calculate('multiplication')">Multiplikation</button>
        <button class="btn btn-primary btn-info" @click="calculate('division')">Division</button>
      </div>
    </template>

    <Calculation v-if="selection === 'division'" type="division"></Calculation>
    <Calculation v-if="selection === 'multiplication'" type="multiplication"></Calculation>
  </div>
</template>
