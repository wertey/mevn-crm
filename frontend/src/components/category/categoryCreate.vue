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
            v-model="name"
            :class="{invalid: ($v.name.$dirty && $v.name.required)
          || ($v.name.$dirty)}"
          >
          <label for="name">Название</label>
          <small class="helper-text invalid"
                v-if="$v.name.$dirty && !$v.name.required"
          >Введите название</small>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model="limit"
          >
          <label for="limit">Лимит</label>
          <small class="helper-text invalid"
                v-if="$v.limit.$dirty && !$v.limit.required"
          >Минимальная величина {{ $v.limit.$params.minLength.min }}</small>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Создать
          <i class="material-icons right">send</i>
        </button>
        <p v-if="created">Категория успешно создана!</p>
      </form>
    </div>
  </div>
</template>

<script>
import { minLength, required } from 'vuelidate/lib/validators';
import { mapMutations } from 'vuex';
import CategoryApi from '../../api/CategoryApi';

const generateUniqueId = require('generate-unique-id');


export default {
  name: 'categoryCreate',
  data: () => ({
    id: generateUniqueId({
      includeSymbols: ['@', '#', '|'],
      excludeSymbols: ['0'],
      length: 32,
    }),
    name: '',
    limit: '',
    created: false,
  }),
  validations: {
    name: { required },
    limit: { required, minLength: minLength(1) },
  },
  methods: {
    ...mapMutations(['GET_CATEGORY_LIST']),
    // eslint-disable-next-line consistent-return
    addNewCategory() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return false;
      }
      // eslint-disable-next-line no-underscore-dangle
      const userId = this.$store.getters.info._id;
      const category = {
        id: this.id,
        name: this.name,
        limit: this.limit,
      };
      CategoryApi.addNewCategory(userId, category);
      CategoryApi.getCategoryList()
        .then((res) => {
          this.GET_CATEGORY_LIST(res.data[0].categories);
        });
      this.created = true;
      setTimeout(() => {
        this.created = false;
      }, 3000);
      this.name = '';
      this.limit = '';
    },
  },
};
</script>

<style scoped lang="scss">

</style>
