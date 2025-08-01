import { imageSources } from "@/assets/images";
import { IconSymbol } from "@/components/ui/IconSymbol";
import music from "@/database/music.json";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [activeButton, setActiveButton] = useState<"music" | "sound">("music");

  // Funzione per ottenere le classi dinamiche
  const getButtonClass = (buttonName: "music" | "sound") => {
    return `rounded-full px-8 py-3 ${
      activeButton === buttonName
        ? "bg-purple-600 text-white border border-transparent" // Classe per lo stato attivo
        : "bg-transparent text-purple-600 border-2 border-purple-600" // Classi per lo stato inattivo
    }`;
  };

  const filteredMusic = music.filter(
    (item: any) => item.category === "new_releases"
  );
  const isMultiple = filteredMusic.length > 1;

  return (
    <SafeAreaView className="flex-1 bg-white pb-10">
      <ScrollView className="px-5">
        {/* Header */}
        <View className="flex-row items-center justify-between mt-4 mb-6">
          <Text className="text-3xl font-bold">Hi, Roses</Text>
          <View className="flex-row gap-2">
            <TouchableOpacity activeOpacity={0.6}>
              <IconSymbol size={28} name="bell" color={"black"} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6}>
              <IconSymbol size={28} name="gear" color={"black"} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Categorie */}
        <View className="flex-row gap-4 mb-8 items-center">
          <TouchableOpacity
            className={getButtonClass("music")}
            onPress={() => setActiveButton("music")}
            activeOpacity={0.6}
          >
            <Text
              className={`font-semibold ${activeButton === "music" ? "text-white" : "text-purple-600"}`}
            >
              Music
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={getButtonClass("sound")}
            onPress={() => setActiveButton("sound")}
            activeOpacity={0.6}
          >
            <Text
              className={`font-semibold ${activeButton === "sound" ? "text-white" : "text-purple-600"}`}
            >
              Sounds
            </Text>
          </TouchableOpacity>
        </View>

        {/* New Releases */}
        <View className="mb-8">
          <Text className="text-3xl font-bold mb-4">New Releases</Text>
          {isMultiple ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row gap-5">
                {music
                  .filter((item) => item.category === "new_releases")
                  .map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      activeOpacity={0.8}
                      className="w-64 rounded-2xl overflow-hidden shadow-lg"
                      onPress={() =>
                        router.push({
                          pathname: "/screens/MusicDetailScreen",
                          params: {
                            imageKey: item.imageKey,
                            title: item.title,
                            time: item.time,
                          },
                        })
                      }
                    >
                      <Image
                        source={
                          imageSources[
                            item.imageKey as keyof typeof imageSources
                          ]
                        }
                        style={{ width: "100%", height: 300 }}
                        className="rounded-2xl"
                      />
                      <View className="absolute top-6 left-6">
                        <Text className="text-white text-lg font-semibold">
                          {item.title}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
              </View>
            </ScrollView>
          ) : (
            <View>
              {music
                .filter((item) => item.category === "new_releases")
                .map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    activeOpacity={0.8}
                    className=" rounded-2xl overflow-hidden shadow-lg"
                    onPress={() =>
                      router.push({
                        pathname: "/screens/MusicDetailScreen",
                        params: {
                          imageKey: item.imageKey,
                          title: item.title,
                          time: item.time,
                        },
                      })
                    }
                  >
                    <Image
                      source={
                        imageSources[item.imageKey as keyof typeof imageSources]
                      }
                      style={{ width: "100%", height: 300 }}
                      className="rounded-2xl"
                    />
                    <View className="absolute top-6 left-6">
                      <Text className="text-white text-lg font-semibold">
                        {item.title}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
            </View>
          )}
        </View>

        {/* Recently Played */}
        <View className="mb-8">
          <Text className="text-3xl font-bold mb-4">Recently Played</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row gap-5">
              {music
                .filter((item: any) => item.category === "recently_played")
                .map((item: any) => (
                  <TouchableOpacity
                    key={item.id}
                    activeOpacity={0.8}
                    className="w-64 rounded-2xl overflow-hidden shadow-lg"
                    onPress={() =>
                      router.push({
                        pathname: "/screens/MusicDetailScreen",
                        params: {
                          imageKey: item.imageKey,
                          title: item.title,
                          time: item.time,
                        },
                      })
                    }
                  >
                    <Image
                      source={
                        imageSources[item.imageKey as keyof typeof imageSources]
                      }
                      style={{ width: "100%", height: 300 }}
                      className="rounded-2xl"
                    />
                    <View className="absolute top-6 left-6">
                      <Text className="text-white text-lg font-semibold">
                        {item.title}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
