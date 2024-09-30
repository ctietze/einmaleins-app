<script>
export default {
  name: 'TaskResult',
  props: {
    amount: Number,
    correct: Number
  }
}
</script>

<template>
  <template v-if="amount === correct">
    <p>Das war Spitze!</p>
    <div>
      <p>Du hast <strong>{{ correct }}</strong> von <strong>{{ amount }}</strong> richtig!</p>
      <p>Weiter so!</p>
    </div>
  </template>

  <template v-if="correct > 0 && correct < amount">
    <div>
      <p>Du hast <strong> {{ correct }} </strong> von <strong>{{ amount }}</strong> richtig!</p>
      <p>Weiter so!</p>
    </div>
  </template>

  <template v-else-if="correct === 0">
    <div>
      <p>Hoopla... da ist noch Luft nach oben ;)</p>
      <p>Du hast <strong> {{ correct }} </strong> von <strong>{{ amount }}</strong> richtig.</p>
      <p>Versuchs gleich nochmal!</p>
    </div>
  </template>
</template>