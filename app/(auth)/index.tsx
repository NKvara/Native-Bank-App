import Input from "@/components/Input";
import ReButton from "@/components/ReButton";
import {Formik} from "formik";
import {
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  KeyboardAvoidingView,
  Platform
} from "react-native";

export default function AuthScreen() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView className="bg-white">
          <Formik
            initialValues={{username: "", password: ""}}
            onSubmit={(values) => console.log(values)}
          >
            {({values}) => (
              <View className="h-full flex-col justify-between">
                <View />
                <View className="justify-center items-center gap-4 p-8">
                  <Input
                    name="მომხმარებლის სახელი"
                    icon="person-outline"
                    keyboard="default"
                    type="username"
                    value={values.username}
                  />
                  <Input
                    name="პაროლი"
                    icon="key-outline"
                    keyboard="default"
                    type="password"
                    value={values.password}
                  />
                  <ReButton />
                </View>
              </View>
            )}
          </Formik>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
