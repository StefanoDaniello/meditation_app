import { IconSymbol } from "@/components/ui/IconSymbol";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker"; // Importa la libreria
import { router } from "expo-router";
import i18next from "i18next";
import React, { useState } from "react";
import {
  ActivityIndicator,
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
import { SafeAreaView } from "react-native-safe-area-context";
import { useToast } from "react-native-toast-notifications";

export default function editProfile() {
  const user = {
    firstName: "Stefano",
    lastName: "D'aneiello",
    email: "s.daniello@gmail.com",
    avatar: require("@/assets/images/music/falo.webp"),
  };

  // Stato per la gestione della nuova immagine
  const [pickedImage, setPickedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const toast = useToast();

  const handleEditProfile = () => {
    Keyboard.dismiss(); // Nasconde la tastiera
    setDisabled(true);
    setLoading(true); // Mostra l'overlay di caricamento

    // Simula l'invio di dati al server con un ritardo
    setTimeout(() => {
      setLoading(false); // Nasconde l'overlay
      setDisabled(false);

      // Mostra il toast di successo
      toast.show("Profilo modificato con successo!", {
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
    }, 2000); // Imposta un ritardo di 2 secondi
  };
  const handleImagePick = async () => {
    // Chiede il permesso per accedere alla libreria
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Spiacenti, non abbiamo il permesso per accedere alla galleria.");
      return;
    }

    // Apri la galleria per la selezione dell'immagine
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true, // Permette all'utente di ritagliare l'immagine
      aspect: [4, 3], // Definisce un rapporto d'aspetto
      quality: 1,
    });

    if (!result.canceled) {
      // Se l'utente ha scelto un'immagine, salva l'URI nello stato
      setPickedImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar hidden />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 10,
            }}
            keyboardShouldPersistTaps="handled"
          >
            {/* Header */}
            <View className="flex-row items-center justify-start py-3 px-4">
              <TouchableOpacity onPress={() => router.back()}>
                <IconSymbol size={28} name="chevron.left" color="black" />
              </TouchableOpacity>
              <View className="flex-1 items-center">
                <Text className="text-xl font-bold">{`${i18next.t("Modifica Profilo")}`}</Text>
              </View>
              <View className="w-8" />
            </View>

            {/* Avatar Section (Resa cliccabile) */}
            <View className="w-full items-center py-4 border-b border-b-purple-100 rounded-b-3xl">
              <TouchableOpacity onPress={handleImagePick}>
                <View className="rounded-full overflow-hidden mb-3 border-4 border-purple-500">
                  <Image
                    style={{ width: 120, height: 120 }}
                    source={pickedImage ? { uri: pickedImage } : user.avatar}
                  />
                </View>
              </TouchableOpacity>
              <Text className="text-4xl font-semibold text-gray-800">
                {user.firstName} {user.lastName}
              </Text>
              <Text className="text-purple-600 text-base font-medium mt-2">
                {user.email}
              </Text>
            </View>

            {/* Form Fields Section */}
            <View className="w-full px-4 mt-3 flex-1">
              <View className="my-4">
                <Text className="text-gray-600 text-base font-semibold mb-2">
                  {`${i18next.t("Nome")}`}
                </Text>
                <TextInput
                  className="w-full bg-purple-100 p-4 rounded-xl text-gray-800"
                  placeholder="Nome"
                  defaultValue={user.firstName}
                />
              </View>
              <View className="mb-4">
                <Text className="text-gray-600 text-base font-semibold mb-2">
                  {`${i18next.t("Cognome")}`}
                </Text>
                <TextInput
                  className="w-full bg-purple-100 p-4 rounded-xl text-gray-800"
                  placeholder="Cognome"
                  defaultValue={user.lastName}
                />
              </View>
              {/* Save Button */}
              <View className="px-4 pb-4 mt-6">
                <TouchableOpacity
                  className={`w-full bg-purple-600 py-4 rounded-full items-center ${!disabled ? "bg-purple-600" : "bg-purple-400"}`}
                  onPress={handleEditProfile}
                >
                  <Text className="text-white text-lg font-bold">
                    {`${i18next.t("Salva Modifiche ")}`}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
          {/* Overlay di caricamento */}
          {loading && (
            <View className="absolute inset-0 z-50 flex items-center justify-center bg-white/70">
              <ActivityIndicator size="large" color="#8b5cf6" />
            </View>
          )}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
