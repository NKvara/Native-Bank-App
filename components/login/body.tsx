import { View } from 'react-native';
import React from 'react';
import Input from '@/components/shared/Input';
import ReButton from '@/components/shared/ReButton';
import { router } from 'expo-router';
import { useFormik } from 'formik';
import { useSession } from '@/ctx/ctx';

const LoginBody = () => {
  const { signIn } = useSession();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordVisible: false,
    },
    onSubmit(values) {
      signIn(values.username);
      // @ts-ignore next line
      router.replace('/');
    },
  });

  return (
    <View className="justify-center items-center gap-4 p-8 flex-1">
      <Input
        name="username"
        placeholder="Username"
        // icon="person-outline"
        keyboard="default"
        type="username"
        onChangeText={(e) => {
          formik.setFieldValue('username', e);
        }}
        onBlur={() => {
          formik.handleBlur('username');
        }}
        value={formik.values.username}
      />
      <Input
        name="password"
        placeholder="Password"
        // icon="key-outline"
        keyboard="default"
        type="password"
        isPassword={!formik.values.passwordVisible}
        onChangeText={(e) => {
          formik.setFieldValue('password', e);
        }}
        onBlur={() => {
          formik.handleBlur('password');
        }}
        value={formik.values.password}
        rightIcon={{
          icon: formik.values.passwordVisible ? 'eye-off-outline' : 'eye-outline',
          onPress: () => {
            formik.setFieldValue('passwordVisible', !formik.values.passwordVisible);
          },
        }}
      />
      <ReButton
        name="Login"
        isDisabled={!formik.values.username || !formik.values.password}
        onPress={formik.handleSubmit}
      />
    </View>
  );
};

export default LoginBody;
