<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small"
              @click="refreshCurrency"
      >
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
  methods: {
    async refreshCurrency() {
      this.loading = true;
      await CurrencyApi.getFixerCurrency().then((resp) => {
        this.loading = false;
        this.currency = resp.data.rates;
        this.date = resp.data.date;
      })
        .catch((e) => {
          this.loading = false;
          console.log(e);
        });
    },
  },
  async mounted() {
    this.loading = true;
    await CurrencyApi.getFixerCurrency().then((resp) => {
      this.loading = false;
      this.currency = resp.data.rates;
      this.date = resp.data.date;
    })
      .catch((e) => {
        this.loading = false;
        console.log(e);
      });
  },
};
</script>

<style scoped lang="scss">

</style>
