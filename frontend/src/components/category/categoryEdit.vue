<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="updateCategory">
        <div>
          <select @change="selectedItem($event)">
            <option v-for="item in categories"
                    :key="item.name">
              {{ item.name }}
            </option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <div class="input-field">
          <input type="text"
                 id="name"
                 v-model="name"
                 :class="{invalid: ($v.name.$dirty && $v.name.required)
          || ($v.name.$dirty)}"
          >
          <label for="name">Название</label>
          <span class="helper-text invalid"
                v-if="$v.name.$dirty && !$v.name.required"
          >Введите категорию</span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model="limit"
            :class="{invalid: ($v.limit.$dirty && $v.limit.required)
          || ($v.limit.$dirty)}"
          >
          <label for="limit">Лимит</label>
          <small class="helper-text invalid"
                 v-if="$v.limit.$dirty && !$v.limit.required"
          >Минимальная величина {{ $v.limit.$params.minLength.min }}</small>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
        <p v-if="updated">Категория успешно обновлена!</p>
      </form>
    </div>
  </div>
</template>

<script>
import { minLength, required } from 'vuelidate/lib/validators';
import { mapMutations, mapGetters } from 'vuex';
import CategoryApi from '../../api/CategoryApi';

export default {
  name: 'categoryEdit',
  data: () => ({
    name: '',
    limit: '',
    oldCategoryName: '',
    updated: false,
  }),
  validations: {
    name: { required },
    limit: { required, minLength: minLength(1) },
  },
  computed: {
    ...mapGetters(['categoryList']),
    categories: {
      // eslint-disable-next-line vue/return-in-computed-property
      get() {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        return this.categoryList;
      },
      set(data) {
        this.GET_CATEGORY_LIST(data);
      },
    },
  },
  methods: {
    ...mapMutations(['GET_CATEGORY_LIST']),
    selectedItem(e) {
      this.oldCategoryName = e.target.value;
    },
    // eslint-disable-next-line consistent-return
    updateCategory() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return false;
      }
      console.log('oldCategoryName', this.oldCategoryName);
      CategoryApi.changeCategory(this.oldCategoryName, this.name, this.limit);
      CategoryApi.getCategoryList()
        .then((res) => {
          const { data } = res;
          this.GET_CATEGORY_LIST(data);
        });
      this.updated = true;
      setTimeout(() => {
        this.updated = false;
      }, 3000);
      this.name = '';
      this.limit = '';
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
