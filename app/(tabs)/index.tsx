import { IconSymbol } from "@/components/ui/IconSymbol";
import { Image } from "expo-image";
import { router } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
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
            activeOpacity={0.6}
            className="bg-purple-600 rounded-full px-10 py-3"
          >
            <Text className="text-white font-semibold">Music</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            className="rounded-full px-8 py-3 border-2 border-purple-600"
          >
            <Text className="text-purple-600 font-semibold">Sounds</Text>
          </TouchableOpacity>
        </View>

        {/* New Releases */}
        <View className="mb-8">
          <Text className="text-3xl font-bold mb-4">New Releases</Text>
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/screens/MusicDetailScreen", // Usa il pathname del file
                params: {
                  imageKey: "bosco",
                  title: "Blue Night",
                },
              })
            }
            activeOpacity={0.8}
            className="rounded-2xl overflow-hidden shadow-lg"
          >
            <Image
              source={require("@/assets/images/music/bosco.jpg")}
              style={{ width: "100%", height: 200 }}
              className="rounded-2xl"
            />
            <View className="absolute top-6 left-6">
              <Text className="text-white text-lg font-semibold">
                Blue Night
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Recently Played */}
        <View className="mb-8">
          <Text className="text-3xl font-bold mb-4">Recently Played</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row gap-5">
              {/* Immagine 1 */}
              <TouchableOpacity
                activeOpacity={0.8}
                className="w-64 rounded-2xl overflow-hidden shadow-lg"
                onPress={() =>
                  router.push({
                    pathname: "/screens/MusicDetailScreen",
                    params: {
                      imageKey: "falo",
                      title: "Camping",
                    },
                  })
                }
              >
                <Image
                  source={require("@/assets/images/music/falo.webp")}
                  style={{ width: "100%", height: 300 }}
                  className="rounded-2xl"
                />
                <View className="absolute top-6 left-6">
                  <Text className="text-white text-lg font-semibold">
                    Camping
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Immagine 2 */}
              <TouchableOpacity
                activeOpacity={0.8}
                className="w-64 rounded-2xl overflow-hidden shadow-lg"
                onPress={() =>
                  router.push({
                    pathname: "/screens/MusicDetailScreen", // Usa il pathname del file
                    params: {
                      imageKey: "tramonto",
                      title: "Sunset",
                    },
                  })
                }
              >
                <Image
                  source={require("@/assets/images/music/tramonto.jpg")}
                  style={{ width: "100%", height: 300 }}
                  className="rounded-2xl"
                />
                <View className="absolute top-6 left-6">
                  <Text className="text-white text-lg font-semibold">
                    Sunset
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Immagine 3 */}
              <TouchableOpacity
                activeOpacity={0.8}
                className="w-64 rounded-2xl overflow-hidden shadow-lg"
                onPress={() =>
                  router.push({
                    pathname: "/screens/MusicDetailScreen", // Usa il pathname del file
                    params: {
                      imageKey: "bosco",
                      title: "Blue Night",
                    },
                  })
                }
              >
                <Image
                  source={require("@/assets/images/music/bosco.jpg")}
                  style={{ width: "100%", height: 300 }}
                  className="rounded-2xl"
                />
                <View className="absolute top-6 left-6">
                  <Text className="text-white text-lg font-semibold">
                    Blue Night
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
