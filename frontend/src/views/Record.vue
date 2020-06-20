<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>

    <form class="form" v-if="categories.length">
      <div>
        <select>
          <option v-for="item in categories"
                  :key="item.name"
          >
            {{ item.name }}
          </option>
        </select>
        <label>Выберите категорию</label>
      </div>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
          />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
          />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
        >
        <label for="amount">Сумма</label>
        <span class="helper-text invalid">amount пароль</span>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
        >
        <label for="description">Описание</label>
        <span
          class="helper-text invalid">description пароль</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
    <div v-else>
      <p>Категорий пока нету. Создайте первую категорию</p>
      <button class="btn waves-effect waves-light" type="button"
              @click="createCategory"
      >
        Создать
        <i class="material-icons right">send</i>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import localStorageToken from '../mixins/localStorageToken';
import CategoryApi from '../api/CategoryApi';

export default {
  name: 'Record',
  mixins: [localStorageToken],
  computed: {
    ...mapGetters({ categories: 'categoryList' }),
  },
  methods: {
    ...mapMutations(['GET_CATEGORY_LIST']),
    createCategory() {
      this.$router.push('/categories');
    },
  },
  beforeMount() {
    CategoryApi.getCategoryList()
      .then((res) => {
        const { data } = res;
        this.GET_CATEGORY_LIST(data);
      });
    console.log('categories', this.categories);
  },
};
</script>

<style scoped lang="scss">

</style>
