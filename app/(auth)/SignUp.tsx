import React, { useState } from "react";
import { BlurView } from "expo-blur";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as Yup from "yup";
import { Link } from "expo-router";

const validationSchema = Yup.object().shape({
  fullName: Yup.string().trim()
    .required("Full Name is required.")
    .matches(/^[A-Za-z\s]+$/, "Full Name cannot contain numbers or special characters."),
  email: Yup.string().trim()
    .required("Email is required.")
    .email("Please enter a valid email address."),
  password: Yup.string().trim()
    .required("Password is required.")
    .min(6, "Password must be at least 6 characters."),
  confirmPassword: Yup.string().trim()
    .required("Please confirm your password.")
    .oneOf([Yup.ref("password")], "Passwords do not match."),
});

const SignUp: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<any>({});

  const validateForm = async () => {
    try {
      await validationSchema.validate(
        { fullName, email, password, confirmPassword },
        { abortEarly: false } 
      );
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
      console.log("Form submitted successfully!");
    } else {
      console.log("Form contains errors. Please fix them and try again.");
    }
  };

  return (

    <BlurView className="flex rounded-xl justify-center items-center p-6">
      <Text className="text-3xl font-semibold mb-4 text-white">Sign Up</Text>

      <View className="w-full max-w-md space-y-4">
        <View>
          <Text className="text-xl font-medium text-white">Full Name</Text>
          <TextInput
            className="m-1 p-3 bg-white rounded-lg border border-gray-400"
            placeholder="Enter your full name"
            value={fullName}
            onChangeText={setFullName}
            placeholderTextColor="#9CA3AF"
          />
          {errors.fullName && (
            <Text className="text-red-500 text-sm mt-1">{errors.fullName}</Text>
          )}
        </View>

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

        <View>
          <Text className="text-xl font-medium text-white">
            Confirm Password
          </Text>
          <TextInput
            className="m-1 p-3 bg-white rounded-lg border border-gray-400"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            placeholderTextColor="#9CA3AF"
          />
          {errors.confirmPassword && (
            <Text className="text-red-500 text-sm mt-1">
              {errors.confirmPassword}
            </Text>
          )}
        </View>

        <TouchableOpacity
          className="w-full py-3 bg-red-800 rounded-lg mt-4"
          onPress={handleSubmit}
        >
          <Text className="text-center text-white font-semibold">Sign Up</Text>
        </TouchableOpacity>

        <View className="w-full flex flex-row justify-center items-center mt-6">
          <Text className="text-white text-center">
            Already have an account?
          </Text>
          <TouchableOpacity
            className="flex text-center pl-2"
            onPress={() => {
              console.log("Navigate to Login Screen");
            }}
          >
            <Link href={'/Login'}>
            <Text className="text-red-900">Log In</Text>
            </Link>
          </TouchableOpacity>
        </View>
      </View>
    </BlurView>
  );
};

export default SignUp;
