<script setup>
const vFocus = {
  mounted: (el) => {
    el.focus()
    el.classList.add("focused")
  }
}
</script>

<script>
import LocalStorageAdapter from "@/shared/lib/local-storage-adapter";

export default {
  data: () => ({
    sortedTasks: []
  }),
  created() {
    this.initialize()
  },
  methods: {
    initialize() {
      let calculatedTasks = JSON.parse(localStorage.getItem("calculatedTasks"))
      for (let key in calculatedTasks) {
        this.sortedTasks.push(calculatedTasks[key]);
      }
      this.sortedTasks.sort((a, b) => {
        if (a.multiplicand < b.multiplicand) return -1;
        if (a.multiplicand > b.multiplicand) return 1;
        // Sort on name
        if (a.multiplier < b.multiplier) return -1;
        if (a.multiplier > b.multiplier) return 1;
        return 0;
      });
    },
    clearCache() {
      LocalStorageAdapter.removeItem("calculatedTasks")
      this.sortedTasks = []
    }
  }
}
</script>
<template>
  <div class="container">
    <h1 class="display-1">Ergebnisse</h1>
    <template v-if="sortedTasks.length > 0">
      <div>
        <p class="lead">Deine letzten Ergebnisse</p>
        <table class="table table-striped text-end">
          <thead>
          <tr>
            <th scope="col">Aufgabe</th>
            <th scope="col">Gesamt</th>
            <th scope="col">Richtig</th>
            <th scope="col">Falsch</th>
          </tr>
          </thead>
          <tbody>
          <template v-for="(task, id) in sortedTasks" :key="id">
            <tr>
              <td>{{ task.multiplier }} · {{ task.multiplicand }}</td>
              <td>{{ task.calculated }}</td>
              <td>{{ task.calculated - task.wrong }}</td>
              <td>{{ task.wrong }}</td>
              <td></td>
            </tr>
          </template>
          </tbody>
        </table>
      </div>

      <button :class="'btn btn-primary'" @click="clearCache()">Ergebnisse zurücksetzen</button>
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