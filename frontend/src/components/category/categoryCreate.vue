<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form @submit.prevent="addNewCategory">
        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="category.name"
          >
          <label for="name">Название</label>
          <span class="helper-text invalid">Введите название</span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model="category.limit"
          >
          <label for="limit">Лимит</label>
          <span class="helper-text invalid">Минимальная величина</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import CategoryApi from '../../api/CategoryApi';

export default {
  name: 'categoryCreate',
  data: () => ({
    category: {
      name: '',
      limit: '',
    },
  }),
  methods: {
    addNewCategory() {
      console.log('category', this.category);
      CategoryApi.addNewCategory(this.category);
    },
  },
};
</script>

<style scoped lang="scss">

</style>
