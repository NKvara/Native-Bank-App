import { View } from 'react-native';
import React from 'react';
import ReButton from '@/common/shared/ReButton';
import Input from '@/common/shared/Input';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'expo-router';
import { useSession } from '@/context/ctx';
import { useGetDeviceId } from '@/common/helper/getUUID';

interface Inputs {
  username: string;
  password: string;
  deviceId: string;
  passwordVisible: boolean;
  otpSessionId: string;
  otpCode: string;
}

const LoginBody = () => {
  const { signIn, isLoading } = useSession();
  const getDeviceId = useGetDeviceId();

  const { control, getValues, setValue, handleSubmit, watch } = useForm<Inputs>({
    defaultValues: {
      otpCode: '',
    },
  });

  watch(['passwordVisible', 'username', 'password', 'otpCode']);
  return (
    <View className="justify-center items-center gap-4 p-8 flex-1">
      <Link href="/(tabs)">View details</Link>
      <Controller
        name="username"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            id="username"
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            placeholder="Username"
            icon="person-outline"
            keyboard="default"
            editable={!getValues('otpSessionId')}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            id="password"
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            // disabled={!!getValues('otpSessionId')}
            placeholder="Password"
            isPassword={!getValues('passwordVisible')}
            icon="lock-closed-outline"
            keyboard="default"
            editable={!getValues('otpSessionId')}
            rightIcon={{
              icon: getValues('passwordVisible') ? 'eye-off-outline' : 'eye-outline',
              onPress: () => {
                setValue('passwordVisible', !getValues('passwordVisible'));
              },
            }}
          />
        )}
      />
      {getValues('otpSessionId') && (
        <Controller
          name="otpCode"
          control={control}
          rules={{ required: true, maxLength: 4, max: 4 }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              id="otpCode"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="otp"
              icon="keypad"
              keyboard="default"
            />
          )}
        />
      )}

      <ReButton
        name="Login"
        isDisabled={
          !getValues('username') ||
          !getValues('password') ||
          isLoading ||
          (!!getValues('otpSessionId') && getValues('otpCode').length !== 4)
        }
        onPress={handleSubmit((data) => {
          if (!getDeviceId) return;
          return signIn({
            ...data,
            deviceId: getDeviceId,
            setOtpSessionId: (otpSessionId: string) => setValue('otpSessionId', otpSessionId),
          });
        })}
      />
    </View>
  );
};

export default LoginBody;
