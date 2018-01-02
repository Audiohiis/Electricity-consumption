<template>
  <div id="app">
    <consumption-form></consumption-form>
  </div>
</template>

<script>
import ConsumptionForm from './components/ConsumptionForm'

export default {
  components: {ConsumptionForm},
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
