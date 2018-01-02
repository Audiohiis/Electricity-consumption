<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <table class="inputTable">
      <tr>
        <td>Algkuupäev:</td>
        <input type="date" v-model="startDate"/>
      </tr>
      <tr>
        <td>Lõppkuupäev:</td>
        <input type="date" v-model="endDate"/>
      </tr>
      <tr>
        <td>Elektrihind kW/h:</td>
        <input type="number" v-model="electricityPrice"/>
      </tr>
    </table>
    <button @click="this.getData">Näita</button>
    <table class="dataTable">
      <tr>
        <th>Alates:</th>
        <td>{{ this.startDate }}</td>
      </tr>
      <tr>
        <th>Kuni:</th>
        <td>{{ this.endDate }}</td>
      </tr>
      <tr>
        <th>Elektritarbimine:</th>
        <td>{{ this.electricityConsumption }} kHz</td>
      </tr>
      <tr>
        <th>Elektrihind:</th>
        <td>{{ this.consumedElectricityPrice }} €</td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ConsumptionForm',
  data () {
    return {
      msg: 'Teie elektritarbimise väljavõte',
      startDate: '',
      endDate: '',
      electricityConsumption: 0,
      electricityPrice: 0
    }
  },
  methods: {
    getData () {
      axios.get('/api/kwh/?start=' + this.startDate + '&end=' + this.endDate)
        .then(response => {
          this.electricityConsumption = response.data.electricityConsumption
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  computed: {
    consumedElectricityPrice () {
      return this.electricityPrice * this.electricityConsumption
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  button {
    display: flex;
    margin: 20px auto;
    padding: 10px 20px;
    border-radius: 3px;
    background-color: lightgray;
    color: white;
    font-size: 16px;
    cursor: pointer;
  }
  table {
    margin: auto;
  }
  .dataTable {
    border: 1px solid lightgray;
  }
  th {
    float: left;
  }
</style>
