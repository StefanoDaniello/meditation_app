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
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { IconSymbol } from "./IconSymbol";

const { height } = Dimensions.get("window");

interface TimePickerProps {
  initialTime: string;
  onSave: (newTime: string) => void;
  onCancel: () => void;
}

// Funzione per convertire la stringa "HH:MM" in un oggetto Date
const createDateFromTimeString = (timeString: string) => {
  const [hours, minutes] = timeString.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0); // Imposta ore, minuti, secondi e millisecondi
  return date;
};

// Funzione per formattare un oggetto Date in una stringa "HH:MM"
const formatTimeToString = (date: Date) => {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

const TimePicker: React.FC<TimePickerProps> = ({
  initialTime,
  onSave,
  onCancel,
}) => {
  // Stato per il tempo selezionato, inizializzato con il tempo iniziale
  const [date, setDate] = useState(() => createDateFromTimeString(initialTime));

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  // Funzione per resettare il tempo al valore iniziale
  const resetTime = () => {
    setDate(createDateFromTimeString(initialTime));
  };

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
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
          minHeight: height / 1.4,
        }}
        className="bg-[#e2e2e2] rounded-t-3xl p-6"
      >
        {/* Sezione superiore con freccia per annullare */}
        <View className="flex-row justify-between items-center mb-4">
          <TouchableOpacity
            onPress={onCancel}
            activeOpacity={0.6}
            className="p-2"
          >
            <IconSymbol name="chevron.down" size={28} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={resetTime}
            activeOpacity={0.6}
            className="p-2"
          >
            {/* <IconSymbol name="chevron.down" size={28} color="#000" /> */}
            <Text className="text-purple-600 text-lg font-bold text-center">
              Ripristina tempo
            </Text>
          </TouchableOpacity>
        </View>

        {/* Sezione centrale con il selettore */}
        <View className="flex-row justify-center items-center my-8 ">
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={"time"}
            is24Hour={true}
            display="spinner"
            onChange={onChange}
            themeVariant="light"
            accentColor="#9333ea"
          />
        </View>

        {/* Nuovo contenitore per i pulsanti, senza mt-auto */}
        <View className="mt-5">
          {/* Pulsante Salva */}
          <TouchableOpacity
            className="bg-purple-600 px-6 py-3 rounded-xl"
            onPress={() => onSave(formatTimeToString(date))}
          >
            <Text className="text-white text-lg font-bold text-center">
              Salva
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TimePicker;
