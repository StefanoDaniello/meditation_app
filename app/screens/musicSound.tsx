import { musicSources } from "@/assets/audio";
import { imageSources } from "@/assets/images";
import { IconSymbol } from "@/components/ui/IconSymbol";
import music from "@/database/music.json";
import sounds from "@/database/sounds.json";
import { Audio } from "expo-av";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function musicSound() {
  const [activeButton, setActiveButton] = useState<"music" | "sound">("music");
  const currentData = activeButton === "music" ? music : sounds;
  const initialFavorites = currentData
    .filter((item) => item.favorite)
    .map((item) => String(item.id));

  const [favorites, setFavorites] = useState<string[]>(initialFavorites);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  useEffect(() => {
    // Funzione di pulizia: scarica l'audio quando il componente si smonta
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const getButtonClass = (buttonName: "music" | "sound") => {
    return `rounded-full px-8 py-3 ${
      activeButton === buttonName
        ? "bg-purple-600 text-white border border-transparent"
        : "bg-transparent text-purple-600 border-2 border-purple-600"
    }`;
  };

  const categories = Array.from(
    new Set(currentData.map((item) => item.category))
  );

  const handleButtonPress = (buttonName: "music" | "sound") => {
    if (buttonName === activeButton) return;
    setIsLoading(true);
    setTimeout(() => {
      setActiveButton(buttonName);
      setIsLoading(false);
      // Pulisce lo stato di riproduzione quando si cambia categoria
      if (sound) {
        sound.unloadAsync();
        setSound(null);
        setPlayingId(null);
      }
    }, 500);
  };

  const handlePlayToggle = async (itemId: string, musicKey: string) => {
    // Trova il file audio corretto dalla mappa usando la chiave
    const musicUri = musicSources[musicKey as keyof typeof musicSources];

    if (!musicUri) {
      console.error("File audio non trovato per la chiave:", musicKey);
      return;
    }

    // ... il resto della tua logica di riproduzione
    if (playingId === itemId) {
      if (sound) {
        await sound.pauseAsync();
        await sound.unloadAsync();
        setSound(null);
      }
      setPlayingId(null);
    } else {
      if (sound) {
        await sound.unloadAsync();
      }
      try {
        const { sound: newSound } = await Audio.Sound.createAsync(musicUri, {
          shouldPlay: true,
        });

        setSound(newSound);
        setPlayingId(itemId);
      } catch (error) {
        console.error("Errore durante la riproduzione del suono:", error);
      }
    }
  };

  const handleFavoriteToggle = (itemId: string) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(itemId)) {
        return prevFavorites.filter((id) => id !== itemId);
      } else {
        return [...prevFavorites, itemId];
      }
    });
  };

  const isFavorite = (itemId: string): boolean => {
    return favorites.includes(itemId);
  };

  return (
    <SafeAreaView className="flex-1 bg-white pb-10">
      <ScrollView className="px-5">
        <View className="flex-row items-center justify-start py-3 ">
          <TouchableOpacity onPress={() => router.back()}>
            <IconSymbol size={28} name="chevron.left" color="black" />
          </TouchableOpacity>
          <View className="flex-1 items-center">
            <Text className="text-xl font-bold">Suoni e Musica</Text>
          </View>
          <View className="w-8" />
        </View>

        <View className="flex-row items-center justify-between mb-8 mt-3">
          <Text className="text-2xl font-semibold">
            {currentData.length}{" "}
            {activeButton === "music" ? "Music" : "Sounds"}{" "}
          </Text>
          <View className="flex-row gap-4 items-center ">
            <TouchableOpacity
              className={getButtonClass("music")}
              onPress={() => handleButtonPress("music")}
              activeOpacity={0.6}
            >
              <Text
                className={`font-semibold ${
                  activeButton === "music" ? "text-white" : "text-purple-600"
                }`}
              >
                Music
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={getButtonClass("sound")}
              onPress={() => handleButtonPress("sound")}
              activeOpacity={0.6}
            >
              <Text
                className={`font-semibold ${
                  activeButton === "sound" ? "text-white" : "text-purple-600"
                }`}
              >
                Sounds
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {isLoading ? (
          <View className="flex-1 pt-4 animate-pulse">
            <View className="mb-8">
              <View className="flex-row gap-5">
                <ScrollView showsHorizontalScrollIndicator={false}>
                  {[...Array(5)].map((_, index) => (
                    <View
                      className="flex-row items-center justify-between w-full h-[80px] rounded-2xl overflow-hidden bg-gray-100 p-3 mb-4 animate-pulse"
                      key={index}
                    >
                      <View className="w-[56px] h-[56px] bg-gray-200 rounded-lg" />
                      <View className="flex-1 ml-4">
                        <View className="h-4 w-3/4 bg-gray-300 rounded-md mb-2" />
                        <View className="h-3 w-1/2 bg-gray-300 rounded-md" />
                      </View>
                      <View className="w-7 h-7 rounded-full bg-gray-300 ml-4" />
                    </View>
                  ))}
                </ScrollView>
              </View>
            </View>
          </View>
        ) : (
          categories.map((category) => {
            const categoryItems = currentData.filter(
              (item) => item.category == category
            );

            return (
              <View key={category}>
                <View>
                  {categoryItems.map((item) => {
                    const isPlaying = playingId === String(item.id);
                    const isFav = isFavorite(String(item.id));
                    return (
                      <View
                        key={item.id}
                        className="flex-row items-center justify-between w-full h-[80px] rounded-2xl overflow-hidden bg-gray-100 p-3 mb-4"
                      >
                        <View className="rounded-lg overflow-hidden">
                          <Image
                            source={
                              imageSources[
                                item.imageKey as keyof typeof imageSources
                              ]
                            }
                            style={{ width: 56, height: 56 }}
                          />
                        </View>
                        <View className="flex-1 ml-4">
                          <Text className="font-bold text-lg ">
                            {item.title}
                          </Text>
                          <Text>{item.artist}</Text>
                        </View>
                        <View className="flex-row items-center">
                          <TouchableOpacity
                            onPress={() =>
                              handleFavoriteToggle(String(item.id))
                            }
                            className="p-2"
                          >
                            <IconSymbol
                              name={isFav ? "heart.fill" : "heart"}
                              size={22}
                              color={"#9333ea"}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() =>
                              handlePlayToggle(String(item.id), item.music)
                            }
                            className={`w-10 h-10 rounded-full items-center justify-center ml-4
                              ${isPlaying ? "bg-purple-600" : "bg-gray-400"}`}
                          >
                            <IconSymbol
                              name={isPlaying ? "pause.fill" : "play.fill"}
                              size={16}
                              color="white"
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
