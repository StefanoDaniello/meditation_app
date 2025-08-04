import { imageSources } from "@/assets/images";
import CircularProgressBar from "@/components/ui/CircleStatusBar";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TimePicker from "@/components/ui/TimePicker";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";

export default function MusicDetailScreen() {
  const [buttonStates, setButtonStates] = useState({
    heart: false,
    pause: false,
    clock: false,
  });
  const params = useLocalSearchParams();
  const { imageKey, title, time } = params;

  const [meditationTime, setMeditationTime] = useState(time as string);

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

  const handleTimeSave = (newTime: string) => {
    setMeditationTime(newTime);
    setButtonStates((prevState) => ({
      ...prevState,
      clock: false,
    }));
  };

  const handleTimeCancel = () => {
    setButtonStates((prevState) => ({
      ...prevState,
      clock: false,
    }));
  };
  const handlePress = (buttonName: "heart" | "pause" | "clock") => {
    setButtonStates((prevState) => {
      // Logica per il bottone "Orologio"
      if (buttonName === "clock") {
        // Se si clicca "clock" e lo si attiva, metti in pausa il timer
        if (!prevState.clock) {
          return {
            ...prevState,
            clock: true,
            pause: true, // Imposta 'pause' su true per fermare il timer
          };
        } else {
          // Se si clicca "clock" e lo si disattiva, rimetti in gioco il timer (non lo avvii automaticamente)
          return {
            ...prevState,
            clock: false,
            pause: false, // Imposta 'pause' su false per permettere il riavvio
          };
        }
      }

      // Logica per gli altri bottoni
      return {
        ...prevState,
        [buttonName]: !prevState[buttonName],
      };
    });
  };

  // Funzione per ottenere le classi dinamiche
  const getButtonClass = (buttonName: "heart" | "pause" | "clock") => {
    return `rounded-full px-8 py-3 ${
      buttonStates[buttonName] // Controlla il valore booleano
        ? "bg-white border border-transparent"
        : "bg-transparent border border-white"
    }`;
  };

  const getIconColor = (buttonName: "heart" | "pause" | "clock") => {
    return buttonStates[buttonName] ? "black" : "white";
  };

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

        {/* Sezione in mezzo: Time */}
        <View className="absolute inset-0 items-center justify-center">
          <CircularProgressBar
            time={meditationTime}
            playing={buttonStates.pause ? false : true}
          />
        </View>

        {/* Sezione in basso: Tre bottoni */}
        <View className="absolute bottom-12 w-full flex-row justify-evenly items-center">
          {/* Bottone 1: Cuore */}
          <TouchableOpacity
            className={getButtonClass("heart")}
            onPress={() => handlePress("heart")}
          >
            <IconSymbol size={24} name="heart" color={getIconColor("heart")} />
          </TouchableOpacity>

          {/* Bottone 2: Pausa */}
          <TouchableOpacity
            className={getButtonClass("pause")}
            onPress={() => handlePress("pause")}
          >
            <IconSymbol
              size={24}
              name={`${buttonStates.pause ? "play" : "pause"}`}
              color={getIconColor("pause")}
            />
          </TouchableOpacity>

          {/* Bottone 3: Orologio */}
          <TouchableOpacity
            className={getButtonClass("clock")}
            onPress={() => handlePress("clock")}
          >
            <IconSymbol size={24} name="clock" color={getIconColor("clock")} />
          </TouchableOpacity>
        </View>
        {/* Condizionale per mostrare il selettore del tempo */}
        {buttonStates.clock && (
          <TimePicker
            initialTime={meditationTime}
            onSave={handleTimeSave}
            onCancel={handleTimeCancel}
          />
        )}
      </View>
    </View>
  );
}
