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
          :class="{invalid: ($v.email.$dirty && $v.email.required) || $v.email.email}"
        >
        <label for="email">Email</label>
        <small class="helper-text invalid">Email</small>
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
        <small class="helper-text invalid">Password</small>
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

export default {
  name: 'Login',
  data: () => ({
    email: '',
    password: '',
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
  },
  methods: {
    register() {
      this.$router.push('/register');
    },
    submitHandler() {
      if (this.$v.invalid) {
        this.$v.$touch();
        return;
      }
      this.$router.push('/');
    },
  },
};
</script>

<style scoped lang="scss">

</style>
