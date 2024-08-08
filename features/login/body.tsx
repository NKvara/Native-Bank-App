import { View } from 'react-native';
import React from 'react';
import ReButton from '@/common/shared/ReButton';
import Input from '@/common/shared/Input';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'expo-router';
import { useSession } from '@/context/ctx';

interface Inputs {
  username: string;
  password: string;
  deviceId: string;
  passwordVisible: boolean;
  otpSessionId: string;
}

const LoginBody = () => {
  const { signIn } = useSession();

  const { control, getValues, setValue, handleSubmit, watch } = useForm<Inputs>();

  watch(['passwordVisible', 'username', 'password']);

  return (
    <View className="justify-center items-center gap-4 p-8 flex-1">
      <Link href="/(tabs)">View details</Link>
      <Controller
        name="username"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            placeholder="Username"
            icon="person-outline"
            keyboard="default"
            type="username"
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            placeholder="Password"
            isPassword={!getValues('passwordVisible')}
            icon="lock-closed-outline"
            keyboard="default"
            type="password"
            rightIcon={{
              icon: getValues('passwordVisible') ? 'eye-off-outline' : 'eye-outline',
              onPress: () => {
                setValue('passwordVisible', !getValues('passwordVisible'));
              },
            }}
          />
        )}
      />

      <ReButton
        name="Login"
        isDisabled={!getValues('username') || !getValues('password')}
        onPress={handleSubmit((data) => {
          return signIn({ ...data, setOtpSessionId: (otpSessionId: string) => setValue('otpSessionId', otpSessionId) });
        })}
      />
    </View>
  );
};

export default LoginBody;
