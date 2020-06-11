<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <LoaderTemplate v-if="loading"/>

    <div class="row"
         v-else
    >
      <HomeBill :currency="currency"/>
      <HomeCurrent :date="date"
                   :currency="currency"
      />
    </div>
  </div>
</template>

<script>
import localStorageToken from '../mixins/localStorageToken';
import CurrencyApi from '../api/CurrencyApi';
import HomeBill from '../components/HomeBill.vue';
import HomeCurrent from '../components/HomeCurrent.vue';

export default {
  name: 'Home',
  data: () => ({
    loading: true,
    currency: null,
    date: '',
    currencies: ['RUB', 'USD', 'EUR', 'BYN'],
  }),
  mixins: [localStorageToken],
  components: {
    HomeCurrent,
    HomeBill,
  },
  async mounted() {
    await CurrencyApi.getFixerCurrency().then((resp) => {
      this.currency = resp.data.rates;
      this.date = resp.data.date;
    })
      .catch((e) => {
        console.log(e);
      });
    this.loading = false;
  },
};
</script>

<style scoped lang="scss">

</style>
