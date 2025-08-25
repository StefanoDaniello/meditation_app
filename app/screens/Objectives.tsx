import { IconSymbol } from "@/components/ui/IconSymbol";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Dati fittizi per gli obiettivi
const objectives = [
  {
    id: "1",
    title: "Completare il tutorial",
    description:
      "Segui la guida introduttiva per capire le funzionalità principali dell'app.",
    completed: true,
  },
  {
    id: "2",
    title: "Aggiungere 3 amici",
    description: "Espandi il tuo network invitando almeno tre amici a unirsi.",
    completed: false,
  },
  {
    id: "3",
    title: "Condividere il primo risultato",
    description: "Condividi il tuo successo sui social media con i tuoi amici.",
    completed: false,
  },
  {
    id: "4",
    title: "Personalizzare il profilo",
    description:
      "Carica la tua foto e aggiorna la tua biografia per farti conoscere.",
    completed: true,
  },
  {
    id: "5",
    title: "Raggiungere 100 punti",
    description:
      "Guadagna punti completando le sfide e raggiungi il primo traguardo.",
    completed: false,
  },
];

export default function Objectives() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar hidden />

      {/* Header */}
      <View className="flex-row items-center justify-start py-3 px-4 border-b border-b-gray-200">
        <TouchableOpacity onPress={() => router.back()}>
          <IconSymbol size={28} name="chevron.left" color="black" />
        </TouchableOpacity>
        <View className="flex-1 items-center">
          <Text className="text-xl font-bold">Obiettivi</Text>
        </View>
        <View className="w-8" />
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 20 }}
      >
        {objectives.map((objective) => (
          <View
            key={objective.id}
            className="flex-row items-center bg-gray-50 rounded-lg p-4 mb-4 shadow-sm"
          >
            {/* Icona dello stato */}
            <View
              className={`w-10 h-10 rounded-full items-center justify-center ${objective.completed ? "bg-green-500" : "bg-purple-500"}`}
            >
              <IconSymbol
                size={20}
                name={
                  objective.completed
                    ? "checkmark.circle.fill"
                    : "circle.dashed"
                }
                color="white"
              />
            </View>

            {/* Contenuto dell'obiettivo */}
            <View className="flex-1 ml-4">
              <Text className="text-base font-semibold text-gray-800">
                {objective.title}
              </Text>
              <Text className="text-sm text-gray-500 mt-1">
                {objective.description}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
