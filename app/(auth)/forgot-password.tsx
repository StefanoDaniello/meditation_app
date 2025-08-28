import { Image } from "expo-image";
import { useRouter } from "expo-router";
import i18next from "i18next";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useToast } from "react-native-toast-notifications";

export default function SignIn() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [email, setEmail] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleChangePassword = () => {
    Keyboard.dismiss(); // Nasconde la tastiera
    setDisabled(true);
    setLoading(true); // Mostra l'overlay di caricamento

    // Simula l'invio di dati al server con un ritardox
    setTimeout(() => {
      setLoading(false); // Nasconde l'overlay
      setDisabled(false);
      setEmail("");

      // Mostra il toast di successo
      toast.show("Istruzioni inviate alla tua email!", {
        type: "success",
        placement: "top",
        duration: 3000,
        animationType: "slide-in",
        style: {
          marginBottom: 30,
          borderRadius: 15,
          backgroundColor: "#9333ea",
        },
      });

      router.replace("/(auth)/sign-in");
    }, 2000);
  };

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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
              <Text className="text-white text-4xl font-bold mb-8">
                {i18next.t("Recupera password")}
              </Text>

              {/* Campi di input e pulsante */}
              <View className="w-full">
                <TextInput
                  className="w-full bg-white/20 p-4 rounded-xl mb-5 text-white"
                  placeholder="Email"
                  placeholderTextColor="white"
                  keyboardType="email-address"
                  onChangeText={setEmail}
                  value={email}
                />

                <TouchableOpacity
                  className={`w-full  py-4 rounded-full items-center ${email.trim() && !disabled ? "bg-white" : "bg-white/70"}`}
                  onPress={handleChangePassword}
                  disabled={!email.trim() || disabled}
                >
                  <Text className="text-lg font-bold">
                    {" "}
                    {i18next.t("Invia")}
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
        {loading && (
          <View className="absolute inset-0 z-50 flex items-center justify-center bg-white/70">
            <ActivityIndicator size="large" color="#8b5cf6" />
          </View>
        )}
      </Animated.View>
    </View>
  );
}
