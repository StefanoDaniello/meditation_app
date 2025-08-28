import { IconSymbol } from "@/components/ui/IconSymbol";
import { Image } from "expo-image";
import { router } from "expo-router";
import i18next from "i18next";
import { useState } from "react";
import { ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const flags = {
    it: "https://flagcdn.com/it.svg",
    en: "https://flagcdn.com/gb.svg",
  };

  const currentLanguage = i18next.language;
  return (
    <SafeAreaView className="flex-1 bg-white pb-10">
      <ScrollView className="px-5">
        <View className="space-y-6">
          <View className="rounded-xl shadow-md bg-white mt-4 mb-6">
            <TouchableOpacity
              className="flex-row items-center  rounded-xl py-3 px-4 gap-4 border-b-[0.2px] border-b-gray-400"
              onPress={() => router.push("/screens/editProfile")}
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
                    {`${i18next.t(`MeditationLevel.${"Meditatore base"}`)}`}
                  </Text>
                </View>
                <IconSymbol size={16} name="chevron.right" color="#9CA3AF" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-row items-center rounded-xl bg-white py-3 gap-3 border-b-[0.2px] border-b-gray-400"
              onPress={() => router.push("/screens/privacyTips")}
              activeOpacity={0.5}
            >
              <View className="flex-1 flex-row items-center justify-between px-3">
                <Text className="text-lg font-medium text-gray-800">
                  {`${i18next.t("Suggerimenti per la privacy")}`}
                </Text>
                <View className="flex-row justify-between items-center">
                  <Text className="text-lg font-medium rounded-full bg-purple-600 px-2 mr-2 text-white">
                    4
                  </Text>
                  <IconSymbol size={16} name="chevron.right" color="#9CA3AF" />
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View className="mt-2">
            <View className="rounded-xl shadow-md bg-white mt-12">
              {/* Modifica Password */}
              <TouchableOpacity
                className="flex-row items-center rounded-xl bg-white py-3 gap-3 border-b-[0.2px] border-b-gray-400"
                onPress={() => router.push("/screens/changePassword")}
                activeOpacity={0.5}
              >
                <View className="ml-3 p-3 bg-purple-100 rounded-md w-8 h-8 flex-row items-center justify-center">
                  <IconSymbol size={16} name="key.fill" color={"#7C3AED"} />
                </View>
                <View className="flex-1 flex-row items-center justify-between pr-3">
                  <Text className="text-lg font-medium text-gray-800">
                    {`${i18next.t("Modifica password")}`}
                  </Text>
                  <IconSymbol size={16} name="chevron.right" color="#9CA3AF" />
                </View>
              </TouchableOpacity>

              {/* Cambia Lingua */}
              {/* <TouchableOpacity
                className="flex-row items-center rounded-xl bg-white py-3 gap-3 border-b-[0.2px] border-b-gray-400"
                onPress={() => setShowLanguageSelector(true)}
                activeOpacity={0.5}
              >
                <View className="ml-3 p-3 bg-purple-100 rounded-md w-8 h-8 flex-row items-center justify-center">
                  <IconSymbol size={16} name="globe" color={"#7C3AED"} />
                </View>
                <View className="flex-1 flex-row items-center justify-between pr-3">
                  <Text className="text-lg font-medium text-gray-800">
                    {`${i18next.t("Lingua")}`}
                  </Text>
                  <View className="flex-row items-center">
                    <Text className="text-sm font-medium text-gray-500 mr-2">
                      {currentLanguage.toUpperCase()}
                    </Text>
                    <IconSymbol
                      size={16}
                      name="chevron.right"
                      color="#9CA3AF"
                    />
                  </View>
                </View>
              </TouchableOpacity> */}

              {/* Notifiche */}
              <View className="flex-row items-center rounded-xl bg-white py-3 gap-3 border-b-[0.2px] border-b-gray-400">
                <View className="ml-3 p-3 bg-purple-200 rounded-md w-8 h-8 flex-row items-center justify-center">
                  <IconSymbol size={16} name="bell.fill" color={"#7C3AED"} />
                </View>
                <View className="flex-1 flex-row items-center justify-between pr-3">
                  <Text className="text-lg font-medium text-gray-800">
                    {`${i18next.t("Notifiche")}`}
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

              {/* Musica e Suoni */}
              <TouchableOpacity
                className="flex-row items-center rounded-xl bg-white py-3 gap-3 border-b-[0.2px] border-b-gray-400"
                activeOpacity={0.5}
                onPress={() => router.push("/screens/musicSound")}
              >
                <View className="ml-3 p-3 bg-purple-100 rounded-md w-8 h-8 flex-row items-center justify-center">
                  <IconSymbol size={16} name="music.note" color={"#7C3AED"} />
                </View>
                <View className="flex-1 flex-row items-center justify-between pr-3">
                  <Text className="text-lg font-medium text-gray-800">
                    {`${i18next.t("Musica e Suoni")}`}
                  </Text>
                  <IconSymbol size={16} name="chevron.right" color="#9CA3AF" />
                </View>
              </TouchableOpacity>

              {/* Obiettivi */}
              <TouchableOpacity
                className="flex-row items-center rounded-xl bg-white py-3 gap-3 border-b-[0.2px] border-b-gray-400"
                onPress={() => router.push("/screens/Objectives")}
                activeOpacity={0.5}
              >
                <View className="ml-3 p-3 bg-purple-100 rounded-md w-8 h-8 flex-row items-center justify-center">
                  <IconSymbol size={16} name="target" color={"#7C3AED"} />
                </View>
                <View className="flex-1 flex-row items-center justify-between pr-3">
                  <Text className="text-lg font-medium text-gray-800">
                    {`${i18next.t("Obiettivi")}`}
                  </Text>
                  <IconSymbol size={16} name="chevron.right" color="#9CA3AF" />
                </View>
              </TouchableOpacity>
            </View>

            <View className="rounded-xl shadow-md bg-white mt-12">
              <TouchableOpacity
                className="flex-row items-center justify-between p-4"
                onPress={() => router.push("/(auth)")}
                activeOpacity={0.7}
              >
                <View className="flex-row items-center gap-3">
                  <View className="p-2 bg-red-100 rounded-lg flex-row items-center justify-center">
                    <IconSymbol
                      size={20}
                      name="rectangle.portrait.and.arrow.right"
                      color={"#ef4444"}
                    />
                  </View>
                  <Text className="text-base font-semibold text-gray-800">
                    {`${i18next.t("Esci")}`}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
