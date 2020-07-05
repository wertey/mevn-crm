<template>
  <div>
    <Loader v-if="loading"/>
    <div v-else-if="!categories.length">
      <p>Категорий пока нету. Создайте первую категорию</p>
      <button class="btn waves-effect waves-light" type="button"
              @click="createCategory"
      >
        Создать
        <i class="material-icons right">send</i>
      </button>
    </div>
    <section v-else>
      <div class="page-title">
        <h3>Планирование</h3>
        <h4>{{ info.bill }}</h4>
      </div>
      <div v-for="cat of categories"
           :key="cat.id"
      >
        <p>
          <strong>{{ cat.name }} <br></strong>
          {{ cat.spend }} из {{ cat.limit }}
        </p>
        <div class="progress" >
          <div
            class="determinate"
            :class="[cat.progressColor]"
            :style="{ width: cat.progressPercent + '%'}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import localStorageToken from '../mixins/localStorageToken';
import LoaderTemplate from '../components/loader/LoaderTemplate.vue';

export default {
  name: 'Planning',
  mixins: [localStorageToken],
  components: {
    Loader: LoaderTemplate,
  },
  data: () => ({
    loading: true,
    categories: [],
  }),
  computed: {
    ...mapGetters(['categoryList', 'info']),
  },
  methods: {
    createCategory() {
      this.$router.push('/categories');
    },
  },
  async mounted() {
    const categories = await this.categoryList;
    console.log('categories', categories);
    const records = await this.info.records;
    console.log('records', records);
    this.categories = categories.map((cat) => {
      const spend = records
        .filter((el) => el.description === cat.name)
        .filter((el) => el.type === 'outcome')
        // eslint-disable-next-line no-param-reassign,no-return-assign
        .reduce((total, record) => {
          console.log('record', record);
          console.log('total', total);
          // eslint-disable-next-line no-param-reassign,no-return-assign
          return total += +record.amount;
        }, 0);
      console.log('speeend', spend);
      // eslint-disable-next-line no-mixed-operators
      const precent = 100 * spend / cat.limit;
      const progressPercent = precent > 100 ? 100 : precent;
      // eslint-disable-next-line no-nested-ternary
      const progressColor = precent < 60 ? 'green' : precent < 100 ? 'yellow' : 'red';
      console.log('spend', spend);
      return {
        ...cat,
        progressPercent,
        progressColor,
        spend,
      };
    });
    this.loading = false;
  },
};
</script>

<style scoped lang="scss">

</style>
