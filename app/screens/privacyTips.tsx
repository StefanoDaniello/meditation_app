import { IconSymbol } from "@/components/ui/IconSymbol";
import { router } from "expo-router";
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
      title: "Usa password sicure e uniche",
      text: "Crea password lunghe e complesse per ogni account. Considera l'uso di un gestore di password per memorizzarle in modo sicuro.",
    },
    {
      title: "Limita la condivisione di informazioni",
      text: "Sii selettivo su ciò che condividi online, specialmente sui social media. Evita di pubblicare dati personali sensibili come il tuo indirizzo o numero di telefono.",
    },
    {
      title: "Controlla le impostazioni sulla privacy",
      text: "Esamina e aggiorna regolarmente le impostazioni di privacy su app e siti web. Imposta i tuoi profili su 'privato' per controllare chi può vedere i tuoi contenuti.",
    },
    {
      title: "Fai attenzione al phishing",
      text: "Non cliccare su link sospetti o aprire allegati da mittenti sconosciuti. Le aziende legittime non chiederanno mai le tue informazioni personali via email.",
    },
    {
      title: "Disabilita il tracciamento",
      text: "Utilizza le impostazioni del tuo browser per bloccare i cookie di terze parti e il tracciamento online. Considera l'uso di estensioni del browser dedicate alla privacy.",
    },
    {
      title: "Aggiorna il software",
      text: "Mantieni il sistema operativo e le app sempre aggiornate. Gli aggiornamenti spesso includono patch di sicurezza essenziali per proteggerti dalle minacce.",
    },
    {
      title: "Utilizza una VPN",
      text: "Una Rete Privata Virtuale (VPN) può criptare il tuo traffico internet, proteggendo i tuoi dati quando usi reti Wi-Fi pubbliche non sicure.",
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
            <Text className="text-xl font-bold">Consigli sulla Privacy</Text>
          </View>
          <View className="w-8" />
        </View>

        {/* Contenuto principale */}
        <View className="w-full p-6">
          <Text className="text-4xl font-bold text-gray-800 mb-4">
            Proteggi la tua Privacy
          </Text>
          <Text className="text-base text-gray-600 mb-8">
            Segui questi semplici consigli per proteggere le tue informazioni
            personali online.
          </Text>

          {tips.map((tip, index) => (
            <View key={index} className="mb-6 p-4 bg-gray-100 rounded-lg">
              <Text className="text-xl font-semibold mb-2 text-purple-600">
                {tip.title}
              </Text>
              <Text className="text-base text-gray-700">{tip.text}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
