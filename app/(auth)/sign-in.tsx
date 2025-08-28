import { Image } from "expo-image";
import { Link, useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function SignIn() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <View className="flex-1">
      <StatusBar hidden />
      {/* Immagine di sfondo fissa */}
      <Image
        source={require("@/assets/images/auth/sfondo.png")}
        style={{ width: "100%", height: "100%", position: "absolute" }}
        contentFit="cover"
      />

      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }} // flex: 1 per riempire tutto lo spazio
        >
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
              padding: 32,
            }}
            keyboardShouldPersistTaps="handled" // Per nascondere la tastiera al tocco
          >
            {/* Contenuto della schermata */}
            <Image
              source={require("@/assets/images/auth/logo-white.png")}
              style={{ width: 150, height: 150, marginBottom: 20 }}
            />
            <Text className="text-white text-4xl font-bold mb-8">Sign In</Text>

            {/* Campi di input e pulsante */}
            <View className="w-full">
              <TextInput
                className="w-full bg-white/20 p-4 rounded-xl mb-5 text-white"
                placeholder="Email"
                placeholderTextColor="white"
                keyboardType="email-address"
              />
              <TextInput
                className="w-full bg-white/20 p-4 rounded-xl mb-5 text-white"
                placeholder="Password"
                placeholderTextColor="white"
                secureTextEntry
              />

              <TouchableOpacity
                className="w-full bg-white py-4 rounded-full items-center"
                onPress={() => router.replace("/(tabs)")}
              >
                <Text className="text-black text-lg font-bold">Sign In</Text>
              </TouchableOpacity>
            </View>

            <View className="flex-row justify-center mt-5">
              <Text className="text-white text-sm">
                Don't have an account?{" "}
                <Link href="/sign-up" className="font-bold underline">
                  Sign-up
                </Link>
              </Text>
            </View>

            <View className="flex-row justify-center mt-2">
              <Text className="text-white text-sm">
                Forgot your password?{" "}
                <Link href="/forgot-password" className="font-bold underline">
                  Forgot Password
                </Link>
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Animated.View>
    </View>
  );
}
