import { musicSources } from "@/assets/audio";
import { imageSources } from "@/assets/images";
import CircularProgressBar from "@/components/ui/CircleStatusBar";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TimePicker from "@/components/ui/TimePicker";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import i18next from "i18next";
import React, { useEffect, useState } from "react";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

function parseTime(time: string) {
  // "mm:ss" → secondi totali
  const [m, s] = time.split(":").map(Number);
  return m * 60 + s;
}

export default function MusicDetailScreen() {
  const params = useLocalSearchParams();
  const { imageKey, title, favorite, music } = params;

  const [buttonStates, setButtonStates] = useState({
    heart: favorite == "true",
    pause: false,
    clock: false,
  });

  // Cerca l'immagine nella mappa usando la chiave
  const imageSource =
    imageSources[imageKey as keyof typeof imageSources] || null;

  const musicUri = musicSources[music as keyof typeof musicSources] || null;
  const player = useAudioPlayer(musicUri);
  const status = useAudioPlayerStatus(player);

  const [duration, setDuration] = useState<number>(0);
  const [meditationTime, setMeditationTime] = useState<string>("00:00");
  const [remaining, setRemaining] = useState<number>(30);
  useEffect(() => {
    if (status.duration && status.duration !== duration) {
      setDuration(status.duration);
      setMeditationTime(formatTime(status.duration));
    }
  }, [status.duration]);

  // avvia musica all'entrata
  useEffect(() => {
    player.play();
  }, []);

  useEffect(() => {
    if (!status.isLoaded) return;

    if (buttonStates.pause) {
      player.pause();
    } else {
      player.play();
    }
  }, [status.isLoaded, buttonStates.pause]);

  // loop manuale
  useEffect(() => {
    if (!status.duration) return;
    if (status.currentTime >= status.duration - 0.1 && !buttonStates.pause) {
      // restart da capo
      player.seekTo(0);
      player.play();
    }
  }, [status.currentTime, status.duration, buttonStates.pause]);

  // timer countdown
  useEffect(() => {
    setRemaining(parseTime(meditationTime));
  }, [meditationTime]);

  useEffect(() => {
    if (buttonStates.pause) return; // timer fermo
    if (remaining <= 0) {
      // stop manuale
      player.pause();
      player.seekTo(0);
      return;
    }

    const id = setInterval(() => {
      setRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(id);
  }, [remaining, buttonStates.pause]);

  if (!imageSource) {
    // Gestione di un'immagine non trovata
    return (
      <View className="flex-1 items-center justify-center bg-gray-100">
        <Text className="text-xl text-red-500">
          {i18next.t("Errore: Immagine non trovata")}
        </Text>
      </View>
    );
  }

  const handleTimeSave = (newTime: string) => {
    setMeditationTime(newTime);
    setRemaining(parseTime(newTime));

    // riporta la musica all’inizio e avvia
    handleRestartMusic();

    setButtonStates((prev) => ({
      ...prev,
      clock: false,
      pause: false, // assicurati che non sia in pausa
    }));
  };

  const handleRestartMusic = () => {
    player.seekTo(0);
    player.play();
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
      if (buttonName == "clock") {
        // Se si clicca "clock" e lo si attiva, metti in pausa il timer
        if (!prevState.clock) {
          return {
            ...prevState,
            clock: true,
            pause: true, // Imposta 'pause' su true per fermare il timer
          };
        } else {
          // Se si clicca "clock" e lo si disattiva, rimette in gioco il timer (non lo avvii automaticamente)
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
      buttonStates[buttonName]
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
          <Text className="text-white text-2xl font-bold">
            {" "}
            {`${i18next.t(`MusicAndSoundTitle.${title}`)}`}
          </Text>
        </View>

        {/* Sezione in mezzo: Time */}
        <View className="absolute inset-0 items-center justify-center">
          <CircularProgressBar
            time={meditationTime}
            playing={buttonStates.pause ? false : true}
            handleRestartMusic={handleRestartMusic}
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
