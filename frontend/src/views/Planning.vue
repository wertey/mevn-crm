<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>12 212</h4>
    </div>

    <section>
      <div>
        <p>
          <strong>Девушка:</strong>
          12 122 из 14 0000
        </p>
        <div class="progress" >
          <div
            class="determinate green"
            style="width:40%"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import localStorageToken from '../mixins/localStorageToken';

export default {
  name: 'Planning',
  mixins: [localStorageToken],
  data: () => ({
    loading: true,
    categories: [],
  }),
  async mounted() {
    const records = await this.$store.dispatch('fetchRecords');
    const categories = await this.$store.dispatch('fetchCategories');
    console.log('records', records);
    console.log('categories', categories);
    this.loading = false;
  },
};
</script>

<style scoped lang="scss">

</style>
