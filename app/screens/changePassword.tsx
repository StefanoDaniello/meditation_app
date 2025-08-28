import { IconSymbol } from "@/components/ui/IconSymbol";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useToast } from "react-native-toast-notifications";

export default function changePassword() {
  const [email, setEmail] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleChangePassword = () => {
    Keyboard.dismiss(); // Nasconde la tastiera
    setDisabled(true);
    setLoading(true); // Mostra l'overlay di caricamento

    // Simula l'invio di dati al server con un ritardo
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

      router.replace("/(tabs)");
    }, 2000);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar hidden />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          {/* Header */}
          <View className="flex-row items-center justify-start py-3 px-4">
            <TouchableOpacity onPress={() => router.back()}>
              <IconSymbol size={28} name="chevron.left" color="black" />
            </TouchableOpacity>
            <View className="flex-1 items-center">
              <Text className="text-xl font-bold">Cambia Password</Text>
            </View>
            <View className="w-8" />
          </View>

          {/* Contenuto principale */}
          <View className="flex-1 w-full p-6 items-center justify-center">
            <Text className="text-center text-4xl font-bold text-gray-800 mb-4">
              Vuoi davvero cambiare la Password ?
            </Text>
            <Text className="text-center text-base text-gray-600 mb-8 max-w-sm">
              Inserisci la tua email qui sotto e ti invieremo le istruzioni per
              reimpostare la tua password.
            </Text>

            {/* Input Email */}
            <TextInput
              className="w-full bg-purple-100 p-4 rounded-xl text-gray-800 mb-6"
              placeholder="Indirizzo Email"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={setEmail}
              value={email}
            />

            {/* Pulsante di Invio */}
            <TouchableOpacity
              className={`w-full py-4 rounded-full items-center ${email.trim() && !disabled ? "bg-purple-600" : "bg-purple-400"}`}
              onPress={handleChangePassword}
              disabled={!email.trim() || disabled}
            >
              <Text className="text-white text-lg font-bold">Invia</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>

      {/* Overlay di caricamento */}
      {loading && (
        <View className="absolute inset-0 z-50 flex items-center justify-center bg-white/70">
          <ActivityIndicator size="large" color="#8b5cf6" />
        </View>
      )}
    </SafeAreaView>
  );
}
