import { View } from 'react-native';
import React from 'react';
import ReButton from '@/common/shared/ReButton';
import Input from '@/common/shared/Input';
import { Controller, useForm } from 'react-hook-form';
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
  const { signIn, mutateSca, mutateVerify } = useSession();
  const getDeviceId = useGetDeviceId();

  const { control, getValues, setValue, handleSubmit, watch } = useForm<Inputs>({
    defaultValues: {
      otpCode: '',
    },
  });

  watch(['passwordVisible', 'username', 'password', 'otpCode']);
  return (
    <View className="justify-center items-center gap-4 p-8 flex-1">
      <Controller
        name="username"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            id="username"
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            placeholder="Username"
            startAdornment="person-outline"
            keyboardType="default"
            editable={!getValues('otpSessionId')}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            id="password"
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            // disabled={!!getValues('otpSessionId')}
            placeholder="Password"
            secureTextEntry={!getValues('passwordVisible')}
            startAdornment="lock-closed-outline"
            keyboardType="default"
            editable={!getValues('otpSessionId')}
            endAdornment={{
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
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              id="otpCode"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="otp"
              startAdornment="keypad"
              keyboardType="default"
              maxLength={4}
            />
          )}
        />
      )}

      <ReButton
        name="Login"
        disabled={
          !getValues('username') ||
          !getValues('password') ||
          mutateSca.isPending ||
          mutateVerify.isPending ||
          (!!getValues('otpSessionId') && getValues('otpCode').length !== 4)
        }
        isLoading={mutateSca.isPending || mutateVerify.isPending}
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
