<template>
  <div class="w-80">
    <h2 class="text-2xl mb-5">登录</h2>
    <el-form ref="loginFormRef" :model="loginData" :rules="rules" size="large">
      <el-form-item prop="username">
        <el-input v-model="loginData.username" placeholder="账号" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginData.password" placeholder="密码" />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          class="w-full"
          @click="handleLogin(loginFormRef)"
        >
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ElForm, ElFormItem, ElInput } from 'element-plus';
import { reactive, ref } from 'vue';

import { useUserStore } from '@/store/modules/user';
const userStore = useUserStore();

const loginData = reactive({
  username: 'test',
  password: '123456',
});
const loginFormRef = ref(null);
const rules = reactive({
  username: [
    {
      required: true,
      message: '请输入你的账号',
      trigger: 'blur',
    },
    {
      min: 3,
      max: 8,
      message: '账号长度为3-8位',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: '请输入你的密码',
      trigger: 'blur',
    },
    {
      min: 6,
      max: 20,
      message: '密码长度为6-20位',
      trigger: 'blur',
    },
  ],
});

const handleLogin = formEl => {
  if (!formEl) return;
  formEl.validate(valid => {
    if (!valid) return;
    userStore.login(loginData);
  });
};
</script>

<style lang="scss" scoped></style>
