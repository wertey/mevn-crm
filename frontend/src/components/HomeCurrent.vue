<template>
  <div class="current">
    <div class="col s12 m6 l8">
      <div class="card orange darken-3 bill-card">
        <div class="card-content white-text">
          <div class="card-header">
            <span class="card-title">Курс валют</span>
          </div>
          <table>
            <thead>
            <tr>
              <th>Валюта</th>
              <th>Курс</th>
              <th>Дата</th>
            </tr>
            </thead>

            <tbody>
            <tr v-for="cur in currencies"
                :key="cur"
            >
              <td>{{ cur }}</td>
              <td>{ currency[cur] }</td>
              <td>{{ currencyDate }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'HomeCurrent',
  data: () => ({
    currencies: ['RUB', 'USD', 'EUR', 'BYN'],
    currencyDateDef: '',
  }),
  props: {
    date: {
      type: String,
      default: () => '',
    },
    currency: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    currencyDate: {
      get() {
        return this.currencyDateDef;
      },
      set(data) {
        this.currencyDateDef = data.moment().format('MMMM Do YYYY');
      },
    },
  },
  methods: {
    moment() {
      return moment();
    },
  },
  beforeMount() {
    console.log('currency', this.currency);
  },
};
</script>

<style scoped lang="sass">

</style>
