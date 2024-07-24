import {
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text
} from "react-native";
import {useSession} from "../ctx/ctx";
import {router} from "expo-router";
import Input from "@/components/Input";
import ReButton from "@/components/ReButton";
import {useFormik} from "formik";
import {LinearGradient} from "expo-linear-gradient";

export default function Login() {
  const {signIn} = useSession();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      passwordVisible: false
    },
    onSubmit(values) {
      console.log(values);
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
          colors={["#e4ecff", "#fff6ee"]}
        >
          <View className="h-full flex-col justify-between">
            <View />
            <View className="justify-center items-center gap-4 p-8">
              <Input
                name="username"
                placeholder="მომხმარებლის სახელი"
                icon="person-outline"
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
                placeholder="პაროლი"
                icon="key-outline"
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
                name="შესვლა"
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
