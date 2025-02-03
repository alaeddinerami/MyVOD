import React, { useState } from "react";
import { BlurView } from "expo-blur";
import { ScrollView, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from "react-native";
import * as Yup from "yup";
import { Link, router } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { authService } from "../../services/authServices";

const validationSchema = Yup.object().shape({
  fullName: Yup.string().trim()
    .required("Full Name is required.")
    .matches(/^[A-Za-z\s]+$/, "Full Name cannot contain numbers or special characters.")
    .min(2, "Full Name must be at least 2 characters")
    .max(50, "Full Name cannot exceed 50 characters"),
  email: Yup.string().trim()
    .required("Email is required.")
    .email("Please enter a valid email address."),
  password: Yup.string().trim()
    .required("Password is required.")
    .min(6, "Password must be at least 6 characters.")
    .matches(
      /^.{6,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
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
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    try {
      if (!(await validateForm())) return;
      setIsLoading(true);
      
      const response = await authService.register(
        fullName.trim(),
        email.trim(),
        password
      );
      console.log("Attempting to register:", { fullName, email, password });

      await AsyncStorage.setItem('authToken', response.token);
      await AsyncStorage.setItem('userData', JSON.stringify(response.user));

      Toast.show({
        type: 'success',
        text1: 'Welcome!',
        text2: 'Account created successfully',
      });

      // Clear form and navigate
      setFullName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      router.replace('/(tabs)');
      
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApiError = (error: any) => {
    const errorMessage = error.message || 'Registration failed';
    
    // Handle specific error cases
    if (errorMessage.toLowerCase().includes('already exists')) {
      setErrors({ ...errors, email: errorMessage });
    } else if (errorMessage.toLowerCase().includes('validation')) {
      setErrors({ ...errors, api: 'Please check your input values' });
    } else {
      setErrors({ ...errors, api: errorMessage });
    }

    Toast.show({
      type: 'error',
      text1: 'Registration Error',
      text2: errorMessage,
    });
  };

  return (
    <BlurView className="flex rounded-xl justify-center items-center p-6">
      <Text className="text-3xl font-semibold mb-4 text-white">Sign Up</Text>

      <View className="w-full max-w-md space-y-4">
        {/* Full Name Input */}
        <View>
          <Text className="text-xl font-medium text-white">Full Name</Text>
          <TextInput
            className="m-1 p-3 bg-white rounded-lg border border-gray-400"
            placeholder="Enter your full name"
            value={fullName}
            onChangeText={setFullName}
            placeholderTextColor="#9CA3AF"
            autoCapitalize="words"
            autoCorrect={false}
          />
          {errors.fullName && (
            <Text className="text-red-500 text-sm mt-1">{errors.fullName}</Text>
          )}
        </View>

        {/* Email Input */}
        <View>
          <Text className="text-xl font-medium text-white">Email</Text>
          <TextInput
            className="m-1 p-3 bg-white rounded-lg border border-gray-400"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholderTextColor="#9CA3AF"
            autoCapitalize="none"
            autoCorrect={false}
          />
          {errors.email && (
            <Text className="text-red-500 text-sm mt-1">{errors.email}</Text>
          )}
        </View>

        {/* Password Input */}
        <View>
          <Text className="text-xl font-medium text-white">Password</Text>
          <View className="relative">
            <TextInput
              className="m-1 p-3 bg-white rounded-lg border border-gray-400"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              placeholderTextColor="#9CA3AF"
            />
            <TouchableOpacity
              className="absolute right-3 top-3"
              onPress={() => setShowPassword(!showPassword)}
            >
              <Text className="text-gray-500">
                {showPassword ? 'Hide' : 'Show'}
              </Text>
            </TouchableOpacity>
          </View>
          {errors.password && (
            <Text className="text-red-500 text-sm mt-1">{errors.password}</Text>
          )}
        </View>

        {/* Confirm Password Input */}
        <View>
          <Text className="text-xl font-medium text-white">Confirm Password</Text>
          <View className="relative">
            <TextInput
              className="m-1 p-3 bg-white rounded-lg border border-gray-400"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              placeholderTextColor="#9CA3AF"
            />
            <TouchableOpacity
              className="absolute right-3 top-3"
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Text className="text-gray-500">
                {showConfirmPassword ? 'Hide' : 'Show'}
              </Text>
            </TouchableOpacity>
          </View>
          {errors.confirmPassword && (
            <Text className="text-red-500 text-sm mt-1">
              {errors.confirmPassword}
            </Text>
          )}
        </View>

        {/* Error Message */}
        {errors.api && (
          <Text className="text-red-500 text-sm mt-2 text-center">
            {errors.api}
          </Text>
        )}

        {/* Submit Button */}
        <TouchableOpacity
          className="w-full py-3 bg-red-800 rounded-lg mt-4"
          onPress={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-center text-white font-semibold">Sign Up</Text>
          )}
        </TouchableOpacity>

        {/* Login Link */}
        <View className="w-full flex flex-row justify-center items-center mt-6">
          <Text className="text-white text-center">
            Already have an account?
          </Text>
          <TouchableOpacity className="flex text-center pl-2">
            <Link href={"/Login"}>
              <Text className="text-red-900">Log In</Text>
            </Link>
          </TouchableOpacity>
        </View>
      </View>

      <Toast />
    </BlurView>
  );
};

export default SignUp;