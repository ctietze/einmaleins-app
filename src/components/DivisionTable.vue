<script>
export default {
  name: 'DivisionTable',
  props: {
    dividend: Number,
    divisor: Number
  }
}
</script>

<template>
<div>
  <p class="lead">Divisionstabelle <strong>{{ divisor }}</strong></p>
  <table class="table">
    <thead>
    <tr>
      <th scope="col">:</th>
      <td v-for="n in 10" class="table-primary" :class="dividend === n*divisor ? 'table-success' : ''">
        {{ divisor * n }}
      </td>
    </tr>
    </thead>
    <tbody>
    <tr>
      <th scope="row" class="table-success">{{ divisor }}</th>
      <td v-for="n in 10" :class="dividend === n * divisor ? 'table-success' : ''">
        {{ n*divisor / divisor }}
      </td>
    </tr>
    </tbody>
  </table>
</div>
</template>