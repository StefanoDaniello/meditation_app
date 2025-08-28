import { Image } from "expo-image";
import { Link, useRouter } from "expo-router";
import i18next from "i18next";
import { useEffect, useRef } from "react";
import {
  Animated,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  const router = useRouter(); // Ottieni l'hook router
  // Creazione di un valore animato per l'opacità
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Avvia l'animazione di fade-in quando il componente viene montato
    Animated.timing(fadeAnim, {
      toValue: 1, // Valore finale dell'opacità (1 = completamente visibile)
      duration: 1000, // Durata dell'animazione in millisecondi
      useNativeDriver: true, // Usa il driver nativo per una migliore performance
    }).start();
  }, [fadeAnim]);

  return (
    <View className="flex-1">
      <StatusBar hidden />

      {/* Immagine di sfondo posizionata in modo assoluto dietro tutto */}
      <Image
        source={require("@/assets/images/auth/sfondo.png")}
        style={{ width: "100%", height: "100%", position: "absolute" }}
        contentFit="cover"
      />

      {/* Contenitore principale per tutto il contenuto che si sovrappone */}
      <View className="flex-1 justify-between items-center px-5 pb-10">
        {/* Contenitore per il testo di benvenuto */}
        <View className="mt-20">
          <Text className="text-white text-4xl font-bold text-center">
            {i18next.t("Benvenuto in")}
            {"\n"}
            {i18next.t("Meditation app!")}
          </Text>
        </View>

        {/* Contenitore per il logo, centrato */}
        <View className="flex-1 justify-center">
          <Image
            source={require("@/assets/images/auth/logo-white.png")}
            style={{ width: 400, height: 400 }}
            resizeMode="contain"
          />
        </View>

        {/* Contenitore per i pulsanti, posizionato in basso */}
        <View className="w-full items-center mb-20">
          <TouchableOpacity
            onPress={() => router.push("/sign-in")} // Naviga a '/sign-in' al tocco
            className="bg-white/20 py-4 rounded-full w-4/5 items-center mb-4"
          >
            <Text className="text-white text-lg font-bold">
              {" "}
              {i18next.t("Accedi")}
            </Text>
          </TouchableOpacity>

          <Text className="text-white text-sm">
            {i18next.t("Non hai un account?")}{" "}
            <Link href="/sign-up" className="font-bold underline">
              {i18next.t("Registrati")}
            </Link>
          </Text>
        </View>
      </View>
    </View>
  );
}
