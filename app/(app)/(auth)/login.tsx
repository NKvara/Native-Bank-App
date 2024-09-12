import { View, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useColorScheme } from 'nativewind';
import LoginHeader from '@/features/login/header';
import LoginBody from '@/features/login/body';

const Login = () => {
  const { colorScheme } = useColorScheme();

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <LinearGradient
          start={{ x: 1, y: 1 }}
          end={{ x: 0, y: 0 }}
          colors={colorScheme === 'light' ? ['#e4ecff', '#fff6ee'] : ['#071536', '#331c07']}
        >
          <View className="h-full flex-col justify-between">
            <LoginHeader />
            <LoginBody />
          </View>
        </LinearGradient>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;
