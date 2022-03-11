<template>
  <div class="login-wrap w-full h-full px-4 flex items-center relative">
    <div class="login-title flex-1">开箱即用的中后台管理系统</div>
    <div class="login-form flex-1 flex justify-center">
      <LoginForm />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import LoginForm from './LoginForm.vue';
</script>

<style lang="scss" scoped>
.login-wrap {
  &::before {
    content: '';
    z-index: -1;
    background-image: url('@/assets/svg/login-bg.svg');
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin-left: -48%;
    background-position: 100%;
    background-repeat: no-repeat;
    background-size: auto 100%;
  }
}
</style>
