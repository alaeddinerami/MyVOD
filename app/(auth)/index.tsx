import { ScrollView, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient
import SignUp from "@/app/(auth)/SignUp";
import { Slot } from "expo-router";

export default function HomeScreen() {
  return (
    <ScrollView>
      <LinearGradient
        colors={["#8E1616", "#1D1616", "#8E1616"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="px-3 h-screen"
      >
        <View className="flex justify-center min-h-screen ">
          <SignUp />
        </View>
      </LinearGradient>
    </ScrollView>
  );
}
