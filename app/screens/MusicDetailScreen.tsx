// src/screens/MusicDetailScreen.tsx
import { imageSources } from "@/assets/images"; // Importa la mappa delle immagini
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";

export default function MusicDetailScreen() {
  const params = useLocalSearchParams();
  const { imageKey, title } = params;

  // Cerca l'immagine nella mappa usando la chiave
  const imageSource =
    imageSources[imageKey as keyof typeof imageSources] || null;

  if (!imageSource) {
    // Gestione di un'immagine non trovata
    return (
      <View className="flex-1 items-center justify-center bg-gray-100">
        <Text className="text-xl text-red-500">
          Errore: Immagine non trovata
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <StatusBar hidden />

      {/* Immagine di sfondo che copre tutta la schermata */}
      <Image
        source={imageSource}
        style={{ width: "100%", height: "100%" }}
        contentFit="cover"
      />

      {/* Contenitore principale per tutti gli elementi in primo piano */}
      <View className="absolute inset-0 z-10">
        {/* Sezione in alto: Freccia per tornare indietro */}
        <View className="absolute top-16 left-6">
          <TouchableOpacity onPress={() => router.back()}>
            <IconSymbol size={28} name="chevron.left" color="white" />
          </TouchableOpacity>
        </View>

        {/* Sezione del titolo */}
        <View className="absolute top-16 w-full items-center">
          <Text className="text-white text-2xl font-bold">{title}</Text>
        </View>

        {/* Sezione in basso: Tre bottoni */}
        <View className="absolute bottom-12 w-full flex-row justify-evenly items-center">
          {/* Bottone 1: Riproduci */}
          <TouchableOpacity className="bg-transparent rounded-full px-8 py-3 border border-white">
            <IconSymbol size={24} name="heart" color="white" />
          </TouchableOpacity>

          {/* Bottone 2: Pausa */}
          <TouchableOpacity className="bg-transparent rounded-full px-8 py-3 border border-white">
            <IconSymbol size={24} name="pause" color="white" />
          </TouchableOpacity>

          {/* Bottone 3: Successiva */}
          <TouchableOpacity className="bg-transparent rounded-full px-8 py-3 border border-white">
            <IconSymbol size={24} name="clock" color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
