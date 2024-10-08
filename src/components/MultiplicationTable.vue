<script>
export default {
  name: 'MultiplicationTable',
  props: {
    multiplicand: Number,
    multiplier: Number
  }
}
</script>

<template>
<div>
  <p class="lead">Multiplikationstabelle <strong>{{ multiplicand }}</strong></p>
  <table class="table">
    <thead>
    <tr>
      <th scope="col">·</th>
      <td v-for="n in 10" class="table-primary" :class="multiplier === n ? 'table-success' : ''">
        {{ n }}
      </td>
    </tr>
    </thead>
    <tbody>
    <tr>
      <th scope="row" class="table-success">{{ multiplicand }}</th>
      <td v-for="n in 10" :class="multiplier === n ? 'table-success' : ''">
        {{ multiplicand * n }}
      </td>
    </tr>
    </tbody>
  </table>
</div>
</template>