<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <div class="row">
        <categoryCreate/>
        <categoryEdit/>
      </div>
    </section>
  </div>
</template>

<script>
import localStorageToken from '../mixins/localStorageToken';
import categoryEdit from '../components/category/categoryEdit.vue';
import categoryCreate from '../components/category/categoryCreate.vue';

export default {
  name: 'Categories',
  mixins: [localStorageToken],
  components: {
    categoryEdit,
    categoryCreate,
  },
};
</script>

<style scoped>

</style>
