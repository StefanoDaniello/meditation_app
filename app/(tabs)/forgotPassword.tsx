import { IconSymbol } from "@/components/ui/IconSymbol";
import { toast } from "burnt"; // Importa la funzione 'toast' dalla libreria 'burnt'
import { router } from "expo-router";
import React, { useState } from "react";
import {
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

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleForgotPassword = () => {
    // Simula l'invio dell'email di recupero
    console.log("Password reset request sent for email:", email);

    // Mostra il toast di successo usando 'burnt'
    toast({
      title: "Successo!",
      message: "Istruzioni inviate alla tua email.",
      preset: "done", // Un preset per un'icona di successo
      duration: 3000, // Il toast sparirà dopo 3 secondi
    });

    // Reindirizza l'utente dopo un piccolo ritardo per permettere al toast di apparire
    // setTimeout(() => {
    //   router.replace("/(tabs)");
    // }, 500);
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
              <Text className="text-xl font-bold">Recupera Password</Text>
            </View>
            <View className="w-8" />
          </View>

          {/* Contenuto principale */}
          <View className="flex-1 w-full p-6 items-center justify-center">
            <Text className="text-center text-4xl font-bold text-gray-800 mb-4">
              Password Dimenticata?
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
              className={`w-full py-4 rounded-full items-center ${email.trim() ? "bg-purple-600" : "bg-purple-400"}`}
              onPress={handleForgotPassword}
              disabled={!email.trim()}
            >
              <Text className="text-white text-lg font-bold">Invia</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
