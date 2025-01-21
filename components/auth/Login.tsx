import React, { useState } from "react";
import { BlurView } from "expo-blur";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validateForm = () => {
    const formErrors = { email: "", password: "" };
    let valid = true;

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail) {
      formErrors.email = "Email is required.";
      valid = false;
    } else if (!emailRegex.test(trimmedEmail)) {
      formErrors.email = "Please enter a valid email address.";
      valid = false;
    }

    if (!trimmedPassword) {
      formErrors.password = "Password is required.";
      valid = false;
    }

    setErrors(formErrors);
    return valid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Login successful!");
    } else {
      console.log("Form contains errors. Please fix them and try again.");
    }
  };

  return (
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
          className="w-full py-3 bg-blue-600 rounded-lg mt-4"
          onPress={handleSubmit}
        >
          <Text className="text-center text-white font-semibold">Log In</Text>
        </TouchableOpacity>

        <View className="w-full flex items-center mt-6">
          <Text className="text-white text-center">
            Don't have an account?{" "}
            <TouchableOpacity
              onPress={() => {
                console.log("Navigate to Sign Up Screen");
                // Add navigation logic here, e.g., navigation.navigate("SignUp");
              }}
            >
              <Text className="text-blue-400">Sign Up</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </BlurView>
  );
};

export default Login;
