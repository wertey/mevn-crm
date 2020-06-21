<template>
  <form class="card auth-card"
        @submit.prevent="submitHandler"
  >
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          class="validate"
          v-model.trim="email"
          :class="{invalid: ($v.email.$dirty && $v.email.required)
          || ($v.email.$dirty && $v.email.email)}"
        >
        <label for="email">Email</label>
        <small class="helper-text invalid"
               v-if="$v.email.$dirty && !$v.email.required"
        >Поле Email должнл быть заполнено</small>
        <small class="helper-text invalid"
               v-else-if="$v.email.$dirty && !$v.email.email"
        >Введите корректный Email</small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          class="validate"
          v-model.trim="password"
          :class="{invalid: ($v.password.$dirty && $v.password.required) || $v.password.minLength}"
        >
        <label for="password">Пароль</label>
        <small class="helper-text invalid"
               v-if="$v.password.$dirty && !$v.password.required"
        >Поле Password должно быть заполнено</small>
        <small class="helper-text invalid"
               v-else-if="$v.password.$dirty && !$v.password.minLength"
        >Поле Password должно содержать минимум
          {{ $v.password.$params.minLength.min }}
          символов. Сейчас он
          {{ password.length }}
        </small>
      </div>
      <div class="input-field">
        <input
          id="name"
          type="text"
          class="validate"
          v-model.trim="name"
          :class="{invalid: ($v.password.$dirty && $v.password.required) || $v.password.minLength}"
        >
        <label for="name">Имя</label>
        <small class="helper-text invalid"
               v-if="$v.name.$dirty && !$v.name.required"
        >Поле Password должно быть заполнено</small>
        <small class="helper-text invalid"
               v-else-if="$v.name.$dirty && !$v.name.minLength"
        >Поле имя должно содержать минимум
          {{ $v.name.$params.minLength.min }}
          символов. Сейчас он
          {{ name.length }}
        </small>
      </div>
      <p>
        <label>
          <input type="checkbox"
                 v-model="rule"
          />
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
        >
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <a href="/"
           @click.prevent="login"
        >Войти!</a>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators';
import { mapMutations } from 'vuex';
import userApi from '../api/UserApi';

const generateUniqueId = require('generate-unique-id');

export default {
  name: 'Register',
  data: () => ({
    email: '',
    password: '',
    name: '',
    rule: false,
    token: null,
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
    name: { required, minLength: minLength(2) },
  },
  methods: {
    ...mapMutations(['SET_USER_NAME']),
    login() {
      this.$router.push('/login');
    },
    // eslint-disable-next-line consistent-return
    submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return false;
      }
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name,
        rules: this.rule,
        bill: 1000,
        records: {},
        categories: [],
      };
      userApi.sendSignUp(formData).then(() => {
        this.token = generateUniqueId({
          includeSymbols: ['@', '#', '|'],
          excludeSymbols: ['0'],
          length: 32,
        });
        this.SET_USER_NAME(formData);
        localStorage.setItem('token', JSON.stringify(this.token));
        this.$router.push('/');
      }).catch((err) => {
        console.error(err);
      });
    },
  },
};
</script>

<style scoped lang="scss">

</style>
