import { musicSources } from "@/assets/audio";
import { imageSources } from "@/assets/images";
import { IconSymbol } from "@/components/ui/IconSymbol";
import music from "@/database/music.json";
import sounds from "@/database/sounds.json";
import { useAudioPlayer } from "expo-audio";
import { Image } from "expo-image";
import { router } from "expo-router";
import i18next from "i18next";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MusicSound() {
  const [activeButton, setActiveButton] = useState<"music" | "sound">("music");
  const currentData = activeButton === "music" ? music : sounds;
  const initialFavorites = currentData
    .filter((item) => item.favorite)
    .map((item) => String(item.id));

  const [favorites, setFavorites] = useState<string[]>(initialFavorites);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [currentMusicKey, setCurrentMusicKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const musicUri = currentMusicKey
    ? musicSources[currentMusicKey as keyof typeof musicSources]
    : null;
  const player = useAudioPlayer(musicUri);

  useEffect(() => {
    // Questo useEffect si attiva solo quando cambia il brano
    if (currentMusicKey) {
      player.play();
    }
  }, [currentMusicKey, player]);

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

  const handleButtonPress = async (buttonName: "music" | "sound") => {
    if (buttonName === activeButton) return;
    setIsLoading(true);

    if (player.playing) {
      player.pause();
    }
    setCurrentMusicKey(null);
    setPlayingId(null);

    setTimeout(() => {
      setActiveButton(buttonName);
      setIsLoading(false);
    }, 500);
  };

  const handlePlayToggle = async (itemId: string, musicKey: string) => {
    const isCurrentlyPlayingThisTrack = playingId == itemId;

    if (isCurrentlyPlayingThisTrack) {
      player.pause();
      setPlayingId(null);
    } else {
      if (player.playing) {
        player.pause();
      }
      setCurrentMusicKey(musicKey);
      setPlayingId(itemId);
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
            <Text className="text-xl font-bold">{`${i18next.t("Musica e Suoni")}`}</Text>
          </View>
          <View className="w-8" />
        </View>

        <View className="flex-row items-center justify-between mb-8 mt-3">
          <Text className="text-2xl font-semibold">
            {currentData.length} {`${i18next.t("Risultati")}`}
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
                {`${i18next.t("Musica")}`}
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
                {`${i18next.t("Suoni")}`}
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
                    const isSelected = playingId == String(item.id);
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
                          <Text className="font-bold text-lg">
                            {`${i18next.t(`MusicAndSoundTitle.${item.title}`)}`}
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
                              ${isSelected ? "bg-purple-600" : "bg-gray-400"}`}
                          >
                            <IconSymbol
                              name={isSelected ? "pause.fill" : "play.fill"}
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
