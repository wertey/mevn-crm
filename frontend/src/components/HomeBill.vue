<template>
  <div class="bill">
    <div class="col s12 m6 l4">
      <div class="card light-blue bill-card">
        <div class="card-content white-text">
          <span class="card-title">Счет в валюте</span>

          <p class="currency-line"
             v-for="cur in currencies"
             :key="cur"
          >
            <span>{{ getCurrency(cur) }} {{ cur }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeBill',
  data: () => ({
    currencies: ['RUB', 'USD', 'EUR', 'BYN'],
  }),
  props: {
    currency: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    base() {
      return this.$store.getters.info.bill / (this.currency.RUB / this.currency.EUR);
    },
  },
  methods: {
    getCurrency(currency) {
      return Math.floor(this.base * this.currency[currency]);
    },
  },
  beforeMount() {
    console.log('currency', this.currency);
  },
};
</script>

<style scoped lang="scss">

</style>
