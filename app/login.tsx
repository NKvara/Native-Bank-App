import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  Image,
  Button,
  TouchableHighlight
} from "react-native";
import {useSession} from "../ctx/ctx";
import {router} from "expo-router";
import Input from "@/components/shared/Input";
import ReButton from "@/components/shared/ReButton";
import {useFormik} from "formik";
import {LinearGradient} from "expo-linear-gradient";
import {Ionicons} from "@expo/vector-icons";
import {useColorScheme} from "nativewind";

export default function Login() {
  const {colorScheme, toggleColorScheme} = useColorScheme();
  const {signIn} = useSession();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      passwordVisible: false
    },
    onSubmit(values) {
      signIn(values.username);
      router.replace("/");
    }
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <LinearGradient
          start={{x: 1, y: 1}}
          end={{x: 0, y: 0}}
          colors={
            colorScheme === "light"
              ? ["#e4ecff", "#fff6ee"]
              : ["#10244e", "#331c07"]
          }
        >
          <View className="h-full flex-col justify-between">
            <View
              className="min-h-[30vh] h-1/3 w-full"
              style={{opacity: colorScheme === "light" ? 0.6 : 1}}
            >
              <Image
                source={require("@/assets/images/login/topimage.png")}
                className="h-full absolute top-0"
                resizeMode="stretch"
                blurRadius={100}
              />
              <TouchableHighlight onPress={toggleColorScheme}>
                <View className="absolute flex-row items-center top-20 right-8">
                  <Ionicons name="rose" color="white" size={22} />
                  <Text className="font-bold text-white text-2xl">Bank</Text>
                </View>
              </TouchableHighlight>
              <View className="absolute bottom-0 p-8">
                <Text className="text-5xl font-bold text-white">
                  Sign in to your Account
                </Text>
              </View>
            </View>
            <View className="justify-center items-center gap-4 p-8 flex-1">
              <Input
                name="username"
                placeholder="Username"
                // icon="person-outline"
                keyboard="default"
                type="username"
                onChangeText={(e) => {
                  formik.setFieldValue("username", e);
                }}
                onBlur={() => {
                  formik.handleBlur("username");
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
                  formik.setFieldValue("password", e);
                }}
                onBlur={() => {
                  formik.handleBlur("password");
                }}
                value={formik.values.password}
                rightIcon={{
                  icon: formik.values.passwordVisible
                    ? "eye-off-outline"
                    : "eye-outline",
                  onPress: () => {
                    formik.setFieldValue(
                      "passwordVisible",
                      !formik.values.passwordVisible
                    );
                  }
                }}
              />
              <ReButton
                name="Login"
                isDisabled={!formik.values.username || !formik.values.password}
                onPress={formik.handleSubmit}
              />
            </View>
          </View>
        </LinearGradient>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
