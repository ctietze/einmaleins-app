<script>
export default {
  name: 'TaskProgressbar',
  props: {
    amount: Number,
    length: Number,
  },
  methods: {
    calculateProgressbar() {
      return (100 / this.amount) * (this.amount - this.length);
    }
  }
}
</script>

<template>
    <div class="progress mb-3" style="height: 25px;">
      <div class="progress-bar" role="progressbar"
           v-bind:style="'width: ' + calculateProgressbar() + '%'"
           v-bind:aria-valuenow="amount - length" aria-valuemin="1"
           v-bind:aria-valuemax="amount">Frage {{ amount - length }} / {{ amount }}
      </div>
    </div>
</template>