<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
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
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
        >
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <a href="/"
           @click.prevent="register()"
        >Зарегистрироваться</a>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators';
import { mapMutations } from 'vuex';
import userApi from '../api/UserApi';

export default {
  name: 'Login',
  data: () => ({
    email: '',
    password: '',
    token: '',
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
  },
  methods: {
    ...mapMutations(['SET_USER_NAME']),
    register() {
      this.$router.push('/register');
    },
    // eslint-disable-next-line consistent-return
    submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return false;
      }
      userApi.sendLogin(this.email, this.password).then((resp) => {
        const userInfo = resp.data.user;
        this.token = userInfo.tokens[userInfo.tokens.length - 1].token;
        localStorage.setItem('token', JSON.stringify(this.token));
        this.SET_USER_NAME(userInfo);
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
