import { imageSources } from "@/assets/images";
import { IconSymbol } from "@/components/ui/IconSymbol";
import music from "@/database/music.json";
import sounds from "@/database/sounds.json";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [activeButton, setActiveButton] = useState<"music" | "sound">("music");
  const [isLoading, setIsLoading] = useState(false); // Nuovo stato per il caricamento

  // Funzione per ottenere le classi dinamiche
  const getButtonClass = (buttonName: "music" | "sound") => {
    return `rounded-full px-8 py-3 ${
      activeButton === buttonName
        ? "bg-purple-600 text-white border border-transparent"
        : "bg-transparent text-purple-600 border-2 border-purple-600"
    }`;
  };

  // Seleziona il dataset corretto in base allo stato
  const currentData = activeButton === "music" ? music : sounds;

  // Estrae le categorie uniche dal dataset corrente
  const categories = Array.from(
    new Set(currentData.map((item) => item.category))
  );

  // Funzione di utilità per formattare il titolo della categoria
  const formatCategoryTitle = (categoryName: string) => {
    return categoryName
      .replace(/_/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Nuova funzione per gestire il cambio di stato con ritardo
  const handleButtonPress = (buttonName: "music" | "sound") => {
    if (buttonName === activeButton) return; // Evita di ricaricare se è già attivo

    setIsLoading(true);
    setTimeout(() => {
      setActiveButton(buttonName);
      setIsLoading(false);
    }, 500); // Ritardo di 500ms per simulare una chiamata di rete
  };

  return (
    <SafeAreaView className="flex-1 bg-white pb-10">
      <ScrollView className="px-5">
        {/* Header */}
        <View className="flex-row items-center justify-between mt-4 mb-6">
          <Text className="text-3xl font-bold">Hi, Stefano</Text>

          <View className="flex-row gap-2">
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => router.push("/profile")}
            >
              <IconSymbol size={28} name="gear" color={"black"} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Categorie */}
        <View className="flex-row gap-4 mb-8 items-center">
          <TouchableOpacity
            className={getButtonClass("music")}
            onPress={() => handleButtonPress("music")} // Usa la nuova funzione
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
            onPress={() => handleButtonPress("sound")} // Usa la nuova funzione
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

        {/* Contenuto dinamico o indicatore di caricamento */}
        {isLoading ? (
          // Skeleton Loader
          <View className="flex-1 pt-4 animate-pulse">
            {/* Skeleton per la categoria 1 (singolo elemento) */}
            <View className="mb-8">
              <View className="h-8 w-48 bg-gray-200 rounded-lg mb-4" />
              <View className="flex-row gap-5">
                <View className="w-full h-72 bg-gray-200 rounded-2xl overflow-hidden shadow-lg">
                  <View className="w-full h-full bg-gray-300 rounded-2xl" />
                  <View className="absolute top-6 left-6">
                    <View className="h-6 w-40 bg-gray-200 rounded-md" />
                  </View>
                </View>
              </View>
            </View>

            {/* Skeleton per la categoria 2 */}
            <View className="mb-8">
              <View className="h-8 w-40 bg-gray-200 rounded-lg mb-4" />
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="flex-row gap-5">
                  {[...Array(3)].map((_, index) => (
                    <View
                      key={index}
                      className="w-64 h-72 bg-gray-200 rounded-2xl overflow-hidden shadow-lg"
                    >
                      <View className="w-full h-full bg-gray-300 rounded-2xl" />
                      <View className="absolute top-6 left-6">
                        <View className="h-6 w-40 bg-gray-200 rounded-md" />
                      </View>
                    </View>
                  ))}
                </View>
              </ScrollView>
            </View>
          </View>
        ) : (
          categories.map((category) => {
            const categoryItems = currentData.filter(
              (item) => item.category == category
            );
            const isSingleItem = categoryItems.length == 1;

            return (
              <View key={category} className="mb-8">
                <Text className="text-3xl font-bold mb-4">
                  {formatCategoryTitle(category)}
                </Text>

                {isSingleItem ? (
                  categoryItems.map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      activeOpacity={0.8}
                      className="w-full rounded-2xl overflow-hidden shadow-lg"
                      onPress={() =>
                        router.push({
                          pathname: "/screens/MusicDetailScreen",
                          params: {
                            imageKey: item.imageKey,
                            title: item.title,
                            music: item.music,
                            // time: item.time,
                            favorite: `${item.favorite}`,
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
                      <View className="absolute top-6 left-0 w-full">
                        <View className="flex flex-row justify-between mx-6">
                          <Text className="text-white text-lg font-semibold">
                            {item.title}
                          </Text>

                          {item.favorite && (
                            <IconSymbol
                              size={28}
                              name="heart.fill"
                              color={"white"}
                            />
                          )}
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))
                ) : (
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View className="flex-row gap-5">
                      {categoryItems.map((item) => (
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
                                // time: item.time,
                                music: item.music,
                                favorite: `${item.favorite}`,
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
                          <View className="absolute top-6 left-0 w-full">
                            <View className="flex flex-row justify-between mx-6">
                              <Text className="text-white text-lg font-semibold">
                                {item.title}
                              </Text>
                              {item.favorite && (
                                <IconSymbol
                                  size={28}
                                  name="heart.fill"
                                  color={"white"}
                                />
                              )}
                            </View>
                          </View>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </ScrollView>
                )}
              </View>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
