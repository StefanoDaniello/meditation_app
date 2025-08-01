// import React, { useState } from "react";
// import { Dimensions, Text, TouchableOpacity, View } from "react-native";
// import { Gesture, GestureDetector } from "react-native-gesture-handler";
// import Animated, {
//   useAnimatedStyle,
//   useSharedValue,
//   withSpring,
// } from "react-native-reanimated";
// import { IconSymbol } from "./IconSymbol";

// const { height } = Dimensions.get("window");

// interface TimePickerProps {
//   initialTime: string;
//   onSave: (newTime: string) => void;
//   onCancel: () => void;
// }

// // Funzione helper per formattare i numeri in un formato a due cifre
// const formatNumber = (num: number) => (num < 10 ? `0${num}` : num);

// const TimePicker: React.FC<TimePickerProps> = ({
//   initialTime,
//   onSave,
//   onCancel,
// }) => {
//   const [minutes, setMinutes] = useState(
//     parseInt(initialTime.split(":")[0], 10)
//   );
//   const [seconds, setSeconds] = useState(
//     parseInt(initialTime.split(":")[1], 10)
//   );

//   // Usa uno SharedValue per tenere traccia dello scorrimento
//   const translateY = useSharedValue(0);

//   // Definisci la gesture di trascinamento
//   const panGesture = Gesture.Pan()
//     .onUpdate((event) => {
//       translateY.value = event.translationY;
//     })
//     .onEnd(() => {
//       // Quando il gesto termina, se l'utente ha trascinato abbastanza, cambia il tempo
//       if (translateY.value > 20) {
//         setMinutes((prev) => (prev > 0 ? prev - 1 : 59));
//       } else if (translateY.value < -20) {
//         setMinutes((prev) => (prev < 59 ? prev + 1 : 0));
//       }
//       // Resetta la posizione in modo animato
//       translateY.value = withSpring(0);
//     });

//   // Stile animato per l'area del tempo
//   const animatedStyle = useAnimatedStyle(() => {
//     return {
//       transform: [{ translateY: translateY.value }],
//     };
//   });

//   return (
//     <View
//       style={{
//         position: "absolute",
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         backgroundColor: "rgba(0,0,0,0.5)",
//       }}
//     >
//       <TouchableOpacity
//         style={{ flex: 1 }}
//         onPress={onCancel}
//         activeOpacity={1}
//       />
//       <View
//         style={{
//           position: "absolute",
//           bottom: 0,
//           left: 0,
//           right: 0,
//           minHeight: height / 3,
//         }}
//         className="bg-white rounded-t-3xl p-6"
//       >
//         <View className="flex-row justify-between items-center mb-4">
//           <TouchableOpacity onPress={onCancel}>
//             <IconSymbol name="chevron.down" size={28} color="#000" />
//           </TouchableOpacity>
//           <Text className="text-xl font-bold">Modifica Tempo</Text>
//           <View style={{ width: 28 }} />
//         </View>

//         <GestureDetector gesture={panGesture}>
//           <Animated.View
//             className="flex-row justify-center items-center my-8"
//             style={animatedStyle}
//           >
//             <Text className="text-6xl font-bold">{formatNumber(minutes)}</Text>
//             <Text className="text-6xl font-bold mx-2">:</Text>
//             <Text className="text-6xl font-bold">{formatNumber(seconds)}</Text>
//           </Animated.View>
//         </GestureDetector>

//         <View className="flex-row justify-end mt-auto">
//           <TouchableOpacity
//             className="bg-blue-500 px-6 py-3 rounded-full"
//             onPress={() =>
//               onSave(`${formatNumber(minutes)}:${formatNumber(seconds)}`)
//             }
//           >
//             <Text className="text-white text-lg font-bold">Salva</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default TimePicker;
import React, { useState } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { IconSymbol } from "./IconSymbol";

const { height } = Dimensions.get("window");

interface TimePickerProps {
  initialTime: string;
  onSave: (newTime: string) => void;
  onCancel: () => void;
}

const TimePicker: React.FC<TimePickerProps> = ({
  initialTime,
  onSave,
  onCancel,
}) => {
  // Stato per il tempo selezionato, inizializzato con il tempo iniziale
  const [selectedTime, setSelectedTime] = useState(initialTime);

  // Funzione per formattare i numeri in un formato a due cifre
  const formatNumber = (num: number) => (num < 10 ? `0${num}` : num);

  // Estrae minuti e secondi dal tempo iniziale
  const initialMinutes = parseInt(initialTime.split(":")[0], 10);
  const initialSeconds = parseInt(initialTime.split(":")[1], 10);

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <TouchableOpacity
        style={{
          flex: 1,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          minHeight: height,
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
        onPress={onCancel}
        activeOpacity={1}
      />

      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          minHeight: height / 3,
        }}
        className="bg-white rounded-t-3xl p-6"
      >
        {/* Sezione superiore con freccia per annullare */}
        <View className="flex-row justify-between items-center mb-4">
          <TouchableOpacity
            onPress={onCancel}
            activeOpacity={0.6}
            className="p-2"
          >
            {/* L'icona per annullare */}
            <IconSymbol name="chevron.down" size={28} color="#000" />
          </TouchableOpacity>
          {/* Spazio vuoto per allineare gli elementi */}
          <View style={{ width: 28 }} />
        </View>

        {/* Sezione centrale con il tempo */}
        <View className="flex-row justify-center items-center my-8">
          <Text className="text-6xl font-bold">
            {formatNumber(initialMinutes)}
          </Text>
          <Text className="text-6xl font-bold mx-2">:</Text>
          <Text className="text-6xl font-bold">
            {formatNumber(initialSeconds)}
          </Text>
        </View>

        {/* Sezione inferiore con il bottone "Salva" */}
        <View className="flex-row justify-end mt-auto">
          <TouchableOpacity
            className="bg-blue-500 px-6 py-3 rounded-full"
            onPress={() => onSave(selectedTime)}
          >
            <Text className="text-white text-lg font-bold">Salva</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TimePicker;
