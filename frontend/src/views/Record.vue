<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>

    <form class="form"
          v-if="categories.length"
          @submit.prevent="submitHandler"
    >
      <div>
        <select  v-model="category">
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
            v-model="type"
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
            v-model="type"
          />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{invalid: ($v.amount.$dirty && $v.amount.required)
          || ($v.amount.$dirty && $v.amount.amount)}"
        >
        <label for="amount">Сумма</label>
        <small class="helper-text invalid"
              v-if="$v.amount.$dirty && !$v.amount.required"
        >Введите сумму</small>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="description"
          :class="{invalid: ($v.description.$dirty && $v.description.required)
          || ($v.description.$dirty && $v.description.description)}"
        >
        <label for="description">Описание</label>
        <small
          class="helper-text invalid"
          v-if="$v.description.$dirty && !$v.description.required"
        >Необходимо описать</small>
        <small class="helper-text invalid"
               v-else-if="$v.description.$dirty && !$v.description.minLength"
        >Поле Password должно содержать минимум
          {{ $v.description.$params.minLength.min }}
          символов. Сейчас он
          {{ description.length }}
        </small>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
      <div v-if="message">
        Недостаточно средств в счете {{ this.amount - this.info.bill }}
      </div>
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
import { required, minLength } from 'vuelidate/lib/validators';
import localStorageToken from '../mixins/localStorageToken';
import CategoryApi from '../api/CategoryApi';
import UserApi from '../api/UserApi';

export default {
  name: 'Record',
  mixins: [localStorageToken],
  data: () => ({
    category: [],
    type: 'outcome',
    amount: 1,
    description: '',
    message: false,
  }),
  validations: {
    amount: { required },
    description: { required, minLength: minLength(6) },
  },
  computed: {
    ...mapGetters({ categories: 'categoryList', info: 'info' }),
    canCreateRecord() {
      console.log('test');
      if (this.type === 'income') {
        return true;
      }
      return +this.info.bill >= this.amount;
    },
  },
  methods: {
    ...mapMutations(['GET_CATEGORY_LIST']),
    createCategory() {
      this.$router.push('/categories');
    },
    // eslint-disable-next-line consistent-return
    submitHandler() {
      console.log('submit');
      if (this.$v.$invalid) {
        this.$v.$touch();
        return false;
      }
      if (this.canCreateRecord) {
        const record = {
          amount: this.amount,
          description: this.description,
          date: Date.now(),
          type: this.type,
        };
        // eslint-disable-next-line no-underscore-dangle
        const userId = this.$store.getters.info._id;
        console.log('userIduserIduserId', userId);
        UserApi.updateBill(userId, this.amount, record);
      } else {
        this.message = true;
        setTimeout(() => {
          this.message = false;
        }, 3000);
      }
    },
  },
  beforeMount() {
    CategoryApi.getCategoryList()
      .then((res) => {
        const { data } = res;
        console.log('data', data[0].bill);
        this.GET_CATEGORY_LIST(data[0].categories);
      });
  },
};
</script>

<style scoped lang="scss">

</style>
