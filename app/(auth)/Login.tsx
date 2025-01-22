import React, { useState } from "react";
import { BlurView } from "expo-blur";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as Yup from "yup";
import { Link, Stack } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const validationSchema = Yup.object().shape({
  email: Yup.string().trim()
    .required("Email is required.")
    .email("Please enter a valid email address."),
  password: Yup.string().trim().required("Password is required."),
});

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<any>({});

  const validateForm = async () => {
    try {
      await validationSchema.validate({ email, password }, { abortEarly: false });
      setErrors({});
      return true;
    } catch (validationErrors: any) {
      const formErrors: any = {};
      validationErrors.inner.forEach((error: any) => {
        formErrors[error.path] = error.message;
      });
      setErrors(formErrors);
      return false;
    }
  };

  const handleSubmit = async () => {
    if (await validateForm()) {
      console.log("Login successful!");
    } else {
      console.log("Form contains errors. Please fix them and try again.");
    }
  };

  return (
    <>
          <Stack.Screen name="login" options={{ headerShown: false }} />
    
    <ScrollView>
          <LinearGradient
            colors={["#8E1616", "#1D1616", "#8E1616"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="px-3 h-screen"
          >
    <View className="flex justify-center min-h-screen ">
    <BlurView className="flex rounded-xl justify-center items-center p-6">
      <Text className="text-3xl font-semibold mb-4 text-white">Log In</Text>

      <View className="w-full max-w-md space-y-4">
        <View>
          <Text className="text-xl font-medium text-white">Email</Text>
          <TextInput
            className="m-1 p-3 bg-white rounded-lg border border-gray-400"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholderTextColor="#9CA3AF"
            />
          {errors.email && (
            <Text className="text-red-500 text-sm mt-1">{errors.email}</Text>
          )}
        </View>

        <View>
          <Text className="text-xl font-medium text-white">Password</Text>
          <TextInput
            className="m-1 p-3 bg-white rounded-lg border border-gray-400"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#9CA3AF"
            />
          {errors.password && (
            <Text className="text-red-500 text-sm mt-1">{errors.password}</Text>
          )}
        </View>

        <TouchableOpacity
          className="w-full py-3 bg-red-800 rounded-lg mt-4"
          onPress={handleSubmit}
        >
          <Text className="text-center text-white font-semibold">Log In</Text>
        </TouchableOpacity>

        <View className="w-full flex flex-row justify-center items-center mt-6">
          <Text className="text-white text-center">Don't have an account?</Text>
          <TouchableOpacity
            className="flex text-center pl-2"
            onPress={() => {
              console.log("Navigate to Sign Up Screen");
            }}
          >
            <Link href={'/(auth)'}>
              <Text className="text-red-900">Sign Up</Text>
            </Link>
          </TouchableOpacity>
        </View>
      </View>
    </BlurView>
    </View>
    </LinearGradient>
    </ScrollView>
              </>
  );
};

export default Login;
