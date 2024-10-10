<script>
export default {
  name: 'ResultTable',
  props: {
    tasks: Array
  }
}
</script>

<template>
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
    <template v-for="(task, id) in tasks" :key="id">
      <tr>
        <td>{{ task.formula }}</td>
        <td>{{ task.calculated }}</td>
        <td>{{ task.calculated - task.wrong }}</td>
        <td>{{ task.wrong }}</td>
        <td></td>
      </tr>
    </template>
    </tbody>
  </table>
</template>