import Vue from 'vue'
import Router from 'vue-router'
import ConsumptionForm from '../components/ConsumptionForm.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ConsumptionForm',
      component: ConsumptionForm
    }
  ]
})
