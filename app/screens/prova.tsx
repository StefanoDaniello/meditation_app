// src/screens/MusicDetailScreen.tsx
import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Prova() {
  return (
    <SafeAreaView className="flex-1">
      {/* Overlay scuro per migliorare la leggibilità del testo */}
      <View className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-30"></View>

      {/* Contenitore principale per header e controlli */}
      <View className="flex-1 justify-between ">
        {/* Header con bottone indietro e titolo */}
        <View className="flex-row items-center justify-between p-6">
          <TouchableOpacity onPress={() => router.back()}>
            <IconSymbol size={28} name="chevron.left" color="white" />
          </TouchableOpacity>
          <Text className="text-white text-xl font-bold">{title}</Text>
          <View style={{ width: 28 }} />{" "}
          {/* Placeholder per centrare il titolo */}
        </View>

        {/* Parte inferiore con i pulsanti di controllo (come da mockup) */}
        <View className="items-center pb-12">
          {/* Contenitore dei pulsanti */}
          <View className="flex-row items-center gap-12">
            <TouchableOpacity
              activeOpacity={0.6}
              className="bg-white p-4 rounded-full"
            >
              <IconSymbol size={28} name="heart" color={"black"} />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.6}
              className="bg-white p-6 rounded-full"
            >
              <IconSymbol size={36} name="pause" color={"black"} />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.6}
              className="bg-white p-4 rounded-full"
            >
              <IconSymbol size={28} name="alarm" color={"black"} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
