<script setup>
  import ResultTable from "@/components/ResultTable.vue";
</script>

<script>
import LocalStorageAdapter from "@/shared/lib/local-storage-adapter";
import Multiplication from "@/shared/lib/multiplication-tasks.js";
import Division from "@/shared/lib/division-tasks.js";

const Type = {
  MULTIPLICATION: 'multiplication',
  DIVISION: 'division'
}

export default {
  data: () => ({
    sortedMultiplicationTasks: [],
    sortedDivisionTasks: [],
    type: null
  }),
  created() {
    this.initialize()
  },
  methods: {
    initialize() {
      let multiplicationTasks = JSON.parse(localStorage.getItem(Multiplication.localStorageKey))
      this.sortedMultiplicationTasks = Multiplication.sortTasks(multiplicationTasks)

      let divisionTasks = JSON.parse(localStorage.getItem(Division.localStorageKey))
      this.sortedDivisionTasks = Division.sortTasks(divisionTasks)

    },
    clearCache(type) {
      if (type === Type.MULTIPLICATION) {
        LocalStorageAdapter.removeItem(Multiplication.localStorageKey)
        this.sortedMultiplicationTasks = []
      } else if (type === Type.DIVISION) {
        LocalStorageAdapter.removeItem(Division.localStorageKey)
        this.sortedDivisionTasks = []
      }
    },
    show(type) {
      this.type = type
    }
  }
}
</script>
<template>
  <div class="container">
    <h1>Ergebnisse</h1>
    <template v-if="sortedMultiplicationTasks.length > 0 || sortedDivisionTasks.length > 0">
      <div>
        <p class="lead">Deine letzten Ergebnisse der ...</p>
        <div class="btn-group">
          <button v-if="sortedMultiplicationTasks.length > 0" class="btn btn-primary btn-primary" @click="show(Type.MULTIPLICATION)">Multiplikation</button>
          <button v-if="sortedDivisionTasks.length >0" class="btn btn-primary btn-info" @click="show(Type.DIVISION)">Division</button>
        </div>
        <template v-if="type === Type.MULTIPLICATION && sortedMultiplicationTasks.length >0">
          <ResultTable :tasks="sortedMultiplicationTasks"></ResultTable>

          <button :class="'btn btn-primary'" @click="clearCache(Type.MULTIPLICATION)">Ergebnisse zurücksetzen</button>
        </template>

        <template v-if="type === Type.DIVISION && sortedDivisionTasks.length >0">
          <ResultTable :tasks="sortedDivisionTasks"></ResultTable>

          <button :class="'btn btn-primary'" @click="clearCache(Type.DIVISION)">Ergebnisse zurücksetzen</button>
        </template>
      </div>

    </template>
    <template v-else>
      <div>
        <h2 class="lead">Keine Ergebnisse gefunden 😢 </h2>
        <p>
          <a href="#/einmaleins" class="btn btn-outline-secondary" v-focus>Hier gehts zum Training</a>
        </p>
      </div>
    </template>
  </div>
</template>