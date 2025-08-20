import { Image } from "expo-image";
import { Link, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
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

export default function SignUp() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Stato per la visibilità della password e della conferma password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
              padding: 32,
            }}
            keyboardShouldPersistTaps="handled"
          >
            {/* Contenuto della schermata */}
            <Image
              source={require("@/assets/images/auth/logo-white.png")}
              style={{ width: 150, height: 150, marginBottom: 20 }}
            />
            <Text className="text-white text-4xl font-bold mb-8">Sign Up</Text>

            {/* Campi di input e pulsante */}
            <View className="w-full">
              <TextInput
                className="w-full bg-white/20 p-4 rounded-xl mb-5 text-white"
                placeholder="Name"
                placeholderTextColor="white"
                keyboardType="default"
              />
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
                secureTextEntry={true} // Controlla la visibilità
                autoCorrect={false} // Aggiunto
                spellCheck={false} // Aggiunto
              />
              {/* Contenitore per il campo password e l'icona */}
              {/* <View className="relative w-full mb-5">
                <TextInput
                  className="w-full bg-white/20 p-4 rounded-xl text-white pr-12" 
                  placeholder="Password"
                  placeholderTextColor="white"
                  secureTextEntry={!showPassword} // Controlla la visibilità
                  autoCorrect={false} // Aggiunto
                  spellCheck={false} // Aggiunto
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  <Ionicons
                    name={showPassword ? "eye" : "eye-off"}
                    size={24}
                    color="white"
                  />
                </TouchableOpacity>
              </View> */}

              {/* Contenitore per il campo conferma password e l'icona */}
              {/* <View className="relative w-full mb-5">
                <TextInput
                  className="w-full bg-white/20 p-4 rounded-xl text-white pr-12" 
                  placeholder="Confirm Password"
                  placeholderTextColor="white"
                  secureTextEntry={!showConfirmPassword} // Controlla la visibilità
                  autoCorrect={false} // Aggiunto
                  spellCheck={false} // Aggiunto
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  <Ionicons
                    name={showConfirmPassword ? "eye" : "eye-off"}
                    size={24}
                    color="white"
                  />
                </TouchableOpacity>
              </View> */}

              <TextInput
                className="w-full bg-white/20 p-4 rounded-xl mb-5 text-white"
                placeholder="Confirm Password"
                placeholderTextColor="white"
                secureTextEntry={true} // Controlla la visibilità
                autoCorrect={false} // Aggiunto
                spellCheck={false} // Aggiunto
              />

              <TouchableOpacity
                className="w-full bg-white py-4 rounded-full items-center"
                onPress={() => router.replace("/(tabs)")}
              >
                <Text className="text-black text-lg font-bold">Sign Up</Text>
              </TouchableOpacity>
            </View>

            {/* Link per tornare indietro */}
            <View className="flex-row justify-center mt-5">
              <Text className="text-white text-sm">
                Already have an account?{" "}
                <Link href="/sign-in" className="font-bold underline">
                  Sign-in
                </Link>
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Animated.View>
    </View>
  );
}
