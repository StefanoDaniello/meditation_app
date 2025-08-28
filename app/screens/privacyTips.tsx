import { IconSymbol } from "@/components/ui/IconSymbol";
import { router } from "expo-router";
import i18next from "i18next";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function privacyTips() {
  const tips = [
    {
      title: "I tuoi dati restano sul tuo dispositivo",
      description:
        "Questa app non raccoglie né condivide le tue informazioni personali. Il tuo percorso di meditazione, le tue preferenze e i tuoi progressi sono memorizzati in modo sicuro solo sul tuo dispositivo.",
    },
    {
      title: "Nessun tracciamento esterno",
      description:
        "Non utilizziamo tracker di terze parti o servizi di analisi. La tua esperienza è completamente privata e non viene monitorata per scopi pubblicitari o di raccolta dati.",
    },
    {
      title: "Proteggi il tuo dispositivo",
      description:
        "Per garantire la massima sicurezza dei tuoi dati locali, ti consigliamo di proteggere il tuo telefono con un PIN, una password o un'impronta digitale.",
    },
    {
      title: "Gestisci l'accesso alla galleria",
      description:
        "Se scegli di caricare un'immagine dalla galleria, l'app vi accederà solo per lo scopo selezionato. Puoi controllare e revocare questa autorizzazione in qualsiasi momento dalle impostazioni del tuo sistema operativo.",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar hidden />
      <ScrollView>
        {/* Header */}
        <View className="flex-row items-center justify-start py-3 px-4">
          <TouchableOpacity onPress={() => router.back()}>
            <IconSymbol size={28} name="chevron.left" color="black" />
          </TouchableOpacity>
          <View className="flex-1 items-center">
            <Text className="text-xl font-bold">
              {" "}
              {`${i18next.t("Suggerimenti per la privacy")}`}
            </Text>
          </View>
          <View className="w-8" />
        </View>

        {/* Contenuto principale */}
        <View className="w-full p-6">
          <Text className="text-4xl font-bold text-gray-800 mb-4">
            {`${i18next.t("Proteggi la tua Privacy")}`}
          </Text>
          <Text className="text-base text-gray-600 mb-8">
            {`${i18next.t("Segui questi semplici consigli per proteggere le tue informazioni personali online.")}`}
          </Text>

          {tips.map((tip, index) => (
            <View key={index} className="mb-6 p-4 bg-gray-100 rounded-lg">
              <Text className="text-xl font-semibold mb-2 text-purple-600">
                {`${i18next.t(`PrivacyTipTitle.${tip.title}`)}`}
              </Text>
              <Text className="text-base text-gray-700">{`${i18next.t(`PrivacyTipDescription.${tip.description}`)}`}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
