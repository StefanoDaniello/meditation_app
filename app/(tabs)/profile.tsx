import { IconSymbol } from "@/components/ui/IconSymbol";
import { Image } from "expo-image";
import { useState } from "react";
import { ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <SafeAreaView className="flex-1 bg-white pb-10">
      <ScrollView className="px-5">
        <View className="space-y-6">
          <View className="rounded-xl shadow-md bg-white mt-4 mb-6">
            <TouchableOpacity
              className="flex-row items-center  rounded-xl py-3 px-4 gap-4 border-b-[0.2px] border-b-gray-400"
              activeOpacity={0.5}
            >
              {/* Avatar */}
              <View className="rounded-full overflow-hidden border-2 border-purple-500">
                <Image
                  style={{ width: 80, height: 80 }}
                  source={require("@/assets/images/music/falo.webp")}
                />
              </View>

              {/* Info utente */}
              <View className="flex-1 flex-row items-center justify-between">
                <View>
                  <Text className="text-xl font-bold text-gray-900">
                    Stefano D'aniello
                  </Text>
                  <Text className="text-md font-extralight text-purple-600">
                    Meditatore base
                  </Text>
                </View>
                <IconSymbol size={16} name="chevron.right" color="#9CA3AF" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-row items-center rounded-xl bg-white py-3 gap-3 border-b-[0.2px] border-b-gray-400"
              activeOpacity={0.5}
            >
              <View className="flex-1 flex-row items-center justify-between px-3">
                <Text className="text-lg font-medium text-gray-800">
                  Suggerimenti per la privacy
                </Text>
                <View className="flex-row justify-between items-center">
                  <Text className="text-lg font-medium rounded-full bg-purple-600 px-2 mr-2 text-white">
                    2
                  </Text>
                  <IconSymbol size={16} name="chevron.right" color="#9CA3AF" />
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View className="mt-2">
            <View className="rounded-xl shadow-md bg-white mt-12">
              <TouchableOpacity
                className="flex-row items-center rounded-xl bg-white py-3 gap-3 border-b-[0.2px] border-b-gray-400"
                activeOpacity={0.5}
              >
                <View className="ml-3 p-3 bg-purple-100 rounded-md w-8 h-8 flex-row items-center justify-center">
                  <IconSymbol size={16} name="key.fill" color={"#7C3AED"} />
                </View>
                <View className="flex-1 flex-row items-center justify-between pr-3">
                  <Text className="text-lg font-medium text-gray-800">
                    Modifica Password
                  </Text>
                  <IconSymbol size={16} name="chevron.right" color="#9CA3AF" />
                </View>
              </TouchableOpacity>

              <View className="flex-row items-center rounded-xl bg-white py-3 gap-3 border-b-[0.2px] border-b-gray-400">
                <View className="ml-3 p-3 bg-purple-200 rounded-md w-8 h-8 flex-row items-center justify-center">
                  <IconSymbol size={16} name="bell.fill" color={"#7C3AED"} />
                </View>
                <View className="flex-1 flex-row items-center justify-between pr-3">
                  <Text className="text-lg font-medium text-gray-800">
                    Notifiche
                  </Text>
                  <View style={{ transform: [{ scale: 0.8 }] }}>
                    <Switch
                      trackColor={{ false: "#D1D5DB", true: "#C4B5FD" }}
                      thumbColor={isEnabled ? "#7C3AED" : "#E5E7EB"}
                      ios_backgroundColor="#E5E7EB"
                      onValueChange={toggleSwitch}
                      value={isEnabled}
                    />
                  </View>
                </View>
              </View>

              <TouchableOpacity
                className="flex-row items-center rounded-xl bg-white py-3 gap-3 border-b-[0.2px] border-b-gray-400"
                activeOpacity={0.5}
              >
                <View className="ml-3 p-3 bg-purple-100 rounded-md w-8 h-8 flex-row items-center justify-center">
                  <IconSymbol size={16} name="music.note" color={"#7C3AED"} />
                </View>
                <View className="flex-1 flex-row items-center justify-between pr-3">
                  <Text className="text-lg font-medium text-gray-800">
                    Suoni e Musica
                  </Text>
                  <IconSymbol size={16} name="chevron.right" color="#9CA3AF" />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-row items-center rounded-xl bg-white py-3 gap-3 border-b-[0.2px] border-b-gray-400"
                activeOpacity={0.5}
              >
                <View className="ml-3 p-3 bg-purple-100 rounded-md w-8 h-8 flex-row items-center justify-center">
                  <IconSymbol size={16} name="target" color={"#7C3AED"} />
                </View>
                <View className="flex-1 flex-row items-center justify-between pr-3">
                  <Text className="text-lg font-medium text-gray-800">
                    Obiettivi
                  </Text>
                  <IconSymbol size={16} name="chevron.right" color="#9CA3AF" />
                </View>
              </TouchableOpacity>
            </View>

            <View className="rounded-xl shadow-md bg-white mt-12">
              <TouchableOpacity
                className="flex-row items-center justify-between p-4"
                activeOpacity={0.7}
              >
                <View className="flex-row items-center gap-3">
                  <View className="p-2 bg-red-100 rounded-lg flex-row items-center justify-center">
                    <IconSymbol
                      size={20} // Increased icon size for better visibility
                      name="rectangle.portrait.and.arrow.right"
                      color={"#ef4444"}
                    />
                  </View>
                  <Text className="text-base font-semibold text-gray-800">
                    Esci
                  </Text>
                </View>
                {/* <IconSymbol
                  size={16}
                  name="chevron.right" // Added a chevron to indicate a forward action
                  color={"#d1d5db"} // Lighter gray for subtlety
                /> */}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
