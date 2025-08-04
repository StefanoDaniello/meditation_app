// import DateTimePicker from "@react-native-community/datetimepicker";
// import React, { useState } from "react";
// import { Dimensions, Text, TouchableOpacity, View } from "react-native";
// import { IconSymbol } from "./IconSymbol";

// const { height } = Dimensions.get("window");

// interface TimePickerProps {
//   initialTime: string;
//   onSave: (newTime: string) => void;
//   onCancel: () => void;
// }

// // Funzione per convertire la stringa "MM:SS" in un oggetto Date per il countdown
// const createDateFromTimeString = (timeString: string) => {
//   const [minutes, seconds] = timeString.split(":").map(Number);
//   const date = new Date();
//   date.setHours(0);
//   date.setMinutes(minutes);
//   date.setSeconds(seconds);
//   date.setMilliseconds(0);
//   return date;
// };

// // Funzione per formattare un oggetto Date in una stringa "MM:SS"
// const formatTimeToString = (date: Date) => {
//   const minutes = String(date.getMinutes()).padStart(2, "0");
//   const seconds = String(date.getSeconds()).padStart(2, "0");
//   return `${minutes}:${seconds}`;
// };

// const TimePicker: React.FC<TimePickerProps> = ({
//   initialTime,
//   onSave,
//   onCancel,
// }) => {
//   // Stato per il tempo selezionato, inizializzato con il tempo iniziale in formato "MM:SS"
//   const [date, setDate] = useState(() => createDateFromTimeString(initialTime));

//   const onChange = (event: any, selectedDate: any) => {
//     const currentDate = selectedDate;
//     setDate(currentDate);
//   };

//   // Funzione per resettare il tempo al valore iniziale
//   const resetTime = () => {
//     setDate(createDateFromTimeString(initialTime));
//   };

//   // Funzione per salvare il tempo selezionato
//   const saveTime = () => {
//     onSave(formatTimeToString(date));
//   };

//   return (
//     <View
//       style={{
//         position: "absolute",
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//       }}
//     >
//       <TouchableOpacity
//         style={{
//           flex: 1,
//           position: "absolute",
//           bottom: 0,
//           left: 0,
//           right: 0,
//           minHeight: height,
//           backgroundColor: "rgba(0,0,0,0.5)",
//         }}
//         onPress={onCancel}
//         activeOpacity={1}
//       />

//       <View
//         style={{
//           position: "absolute",
//           bottom: 0,
//           left: 0,
//           right: 0,
//           minHeight: height / 1.4,
//         }}
//         className="bg-[#e2e2e2] rounded-t-3xl p-6"
//       >
//         {/* Sezione superiore con freccia per annullare */}
//         <View className="flex-row justify-between items-center mb-4">
//           <TouchableOpacity
//             onPress={onCancel}
//             activeOpacity={0.6}
//             className="p-2"
//           >
//             <IconSymbol name="chevron.down" size={28} color="#000" />
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={resetTime}
//             activeOpacity={0.6}
//             className="p-2"
//           >
//             <Text className="text-purple-600 text-lg font-bold text-center">
//               Ripristina tempo
//             </Text>
//           </TouchableOpacity>
//         </View>

//         {/* Sezione centrale con il selettore */}
//         <View className="flex-row justify-center items-center my-8 ">
//           <DateTimePicker
//             testID="dateTimePicker"
//             value={date}
//             mode={"countdown"}
//             display="spinner"
//             onChange={onChange}
//             themeVariant="light"
//             accentColor="#9333ea"
//             minuteInterval={1}
//             locale="it"
//           />
//         </View>

//         {/* Nuovo contenitore per i pulsanti */}
//         <View className="mt-5">
//           {/* Pulsante Salva */}
//           <TouchableOpacity
//             className="bg-purple-600 px-6 py-3 rounded-xl"
//             onPress={saveTime}
//           >
//             <Text className="text-white text-lg font-bold text-center">
//               Salva
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default TimePicker;

//Time

// import DateTimePicker from "@react-native-community/datetimepicker";
// import React, { useState } from "react";
// import { Dimensions, Text, TouchableOpacity, View } from "react-native";
// import { IconSymbol } from "./IconSymbol";

// const { height } = Dimensions.get("window");

// interface TimePickerProps {
//   initialTime: string;
//   onSave: (newTime: string) => void;
//   onCancel: () => void;
// }

// // Funzione per convertire la stringa "HH:MM" in un oggetto Date
// const createDateFromTimeString = (timeString: string) => {
//   const [hours, minutes] = timeString.split(":").map(Number);
//   const date = new Date();
//   date.setHours(hours, minutes, 0, 0); // Imposta ore, minuti, secondi e millisecondi
//   return date;
// };

// // Funzione per formattare un oggetto Date in una stringa "HH:MM"
// const formatTimeToString = (date: Date) => {
//   const hours = String(date.getHours()).padStart(2, "0");
//   const minutes = String(date.getMinutes()).padStart(2, "0");
//   return `${hours}:${minutes}`;
// };

// const TimePicker: React.FC<TimePickerProps> = ({
//   initialTime,
//   onSave,
//   onCancel,
// }) => {
//   // Stato per il tempo selezionato, inizializzato con il tempo iniziale
//   const [date, setDate] = useState(() => createDateFromTimeString(initialTime));

//   const onChange = (event: any, selectedDate: any) => {
//     const currentDate = selectedDate;
//     setDate(currentDate);
//   };

//   // Funzione per resettare il tempo al valore iniziale
//   const resetTime = () => {
//     setDate(createDateFromTimeString(initialTime));
//   };

//   return (
//     <View
//       style={{
//         position: "absolute",
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//       }}
//     >
//       <TouchableOpacity
//         style={{
//           flex: 1,
//           position: "absolute",
//           bottom: 0,
//           left: 0,
//           right: 0,
//           minHeight: height,
//           backgroundColor: "rgba(0,0,0,0.5)",
//         }}
//         onPress={onCancel}
//         activeOpacity={1}
//       />

//       <View
//         style={{
//           position: "absolute",
//           bottom: 0,
//           left: 0,
//           right: 0,
//           minHeight: height / 1.4,
//         }}
//         className="bg-[#e2e2e2] rounded-t-3xl p-6"
//       >
//         {/* Sezione superiore con freccia per annullare */}
//         <View className="flex-row justify-between items-center mb-4">
//           <TouchableOpacity
//             onPress={onCancel}
//             activeOpacity={0.6}
//             className="p-2"
//           >
//             <IconSymbol name="chevron.down" size={28} color="#000" />
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={resetTime}
//             activeOpacity={0.6}
//             className="p-2"
//           >
//             {/* <IconSymbol name="chevron.down" size={28} color="#000" /> */}
//             <Text className="text-purple-600 text-lg font-bold text-center">
//               Ripristina tempo
//             </Text>
//           </TouchableOpacity>
//         </View>

//         {/* Sezione centrale con il selettore */}
//         <View className="flex-row justify-center items-center my-8 ">
//           <DateTimePicker
//             testID="dateTimePicker"
//             value={date}
//             mode={"time"}
//             is24Hour={true}
//             display="spinner"
//             onChange={onChange}
//             themeVariant="light"
//             accentColor="#9333ea"
//           />
//         </View>

//         {/* Nuovo contenitore per i pulsanti, senza mt-auto */}
//         <View className="mt-5">
//           {/* Pulsante Salva */}
//           <TouchableOpacity
//             className="bg-purple-600 px-6 py-3 rounded-xl"
//             onPress={() => onSave(formatTimeToString(date))}
//           >
//             <Text className="text-white text-lg font-bold text-center">
//               Salva
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default TimePicker;

import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { IconSymbol } from "./IconSymbol";

// Definiamo un'altezza di base per l'elemento, che sarà scalabile
const ITEM_HEIGHT = 48;
// Un numero di elementi visibili, per calcolare il padding dinamico
const VISIBLE_ITEMS = 5;

// Interfaccia delle props
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
  const { height } = Dimensions.get("window");

  // Stato per l'altezza del selettore calcolata dinamicamente
  const [pickerHeight, setPickerHeight] = useState(0);

  const [initialMinutes, initialSeconds] = initialTime.split(":").map(Number);
  const [selectedMinutes, setSelectedMinutes] = useState(initialMinutes);
  const [selectedSeconds, setSelectedSeconds] = useState(initialSeconds);

  // const minutesScrollRef = useRef(null);
  // const secondsScrollRef = useRef(null);

  const minutesScrollRef = useRef<ScrollView>(null);
  const secondsScrollRef = useRef<ScrollView>(null);
  // Aggiungiamo dei ref per tenere traccia dell'offset di scorrimento in tempo reale
  const minutesScrollOffsetRef = useRef(initialMinutes * ITEM_HEIGHT);
  const secondsScrollOffsetRef = useRef(initialSeconds * ITEM_HEIGHT);

  const minutes = Array.from({ length: 60 }, (_, i) => i);
  const seconds = Array.from({ length: 60 }, (_, i) => i);

  // Effetto per lo scroll iniziale quando il componente viene montato
  useEffect(() => {
    if (pickerHeight > 0) {
      setTimeout(() => {
        if (minutesScrollRef.current) {
          minutesScrollRef.current.scrollTo({
            y: initialMinutes * ITEM_HEIGHT,
            animated: false,
          });
        }
        if (secondsScrollRef.current) {
          secondsScrollRef.current.scrollTo({
            y: initialSeconds * ITEM_HEIGHT,
            animated: false,
          });
        }
      }, 0);
    }
  }, [initialMinutes, initialSeconds, pickerHeight]);

  // Gestione dello scroll in tempo reale per l'effetto di transizione
  const handleScroll = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
    type: string
  ) => {
    const y = event.nativeEvent.contentOffset.y;
    // Aggiorniamo il ref con l'offset corrente
    if (type === "minutes") {
      minutesScrollOffsetRef.current = y;
    } else {
      secondsScrollOffsetRef.current = y;
    }
    // Ricalcoliamo lo stato per forzare un re-render e aggiornare i colori
    const index = Math.round(y / ITEM_HEIGHT);
    if (type === "minutes") {
      setSelectedMinutes(index);
    } else {
      setSelectedSeconds(index);
    }
  };

  // Gestione dello scroll quando si ferma per la selezione finale
  const handleScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
    type: string
  ) => {
    const y = event.nativeEvent.contentOffset.y;
    let index = Math.round(y / ITEM_HEIGHT);

    if (type === "minutes") {
      index = Math.max(0, Math.min(index, minutes.length - 1));
      setSelectedMinutes(index);
    } else {
      index = Math.max(0, Math.min(index, seconds.length - 1));
      setSelectedSeconds(index);
    }
  };

  const renderItem = (value: number, selectedValue: number, type: string) => {
    const isSelected = value === selectedValue;
    const currentOffset =
      type === "minutes"
        ? minutesScrollOffsetRef.current
        : secondsScrollOffsetRef.current;

    // Calcoliamo la posizione dell'elemento rispetto al centro del selettore
    const itemPosition = value * ITEM_HEIGHT;
    const centerPosition = currentOffset + pickerHeight / 2 - ITEM_HEIGHT / 2;
    const distance = Math.abs(itemPosition - centerPosition);

    // Calcoliamo l'opacità e la dimensione del font in base alla distanza dal centro
    const maxDistance = (ITEM_HEIGHT * (VISIBLE_ITEMS - 1)) / 2;
    const opacity = Math.max(0.4, 1 - distance / maxDistance);
    const fontSize = isSelected ? 48 : 36;

    return (
      <View
        key={value}
        className={`w-full items-center justify-center`}
        style={{ height: ITEM_HEIGHT }}
      >
        <Text
          className={`font-bold`}
          style={{
            color: isSelected ? "black" : "#A0A0A0", // Grado di grigio per transizione
            fontSize: isSelected ? 48 : 36,
          }}
        >
          {value}
        </Text>
      </View>
    );
  };

  const formatTimeToString = (min: number, sec: number) => {
    const formattedMinutes = String(min);
    const formattedSeconds = String(sec);
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const resetTime = () => {
    setSelectedMinutes(initialMinutes);
    setSelectedSeconds(initialSeconds);
    if (minutesScrollRef.current) {
      minutesScrollRef.current.scrollTo({
        y: initialMinutes * ITEM_HEIGHT,
        animated: true,
      });
    }
    if (secondsScrollRef.current) {
      secondsScrollRef.current.scrollTo({
        y: initialSeconds * ITEM_HEIGHT,
        animated: true,
      });
    }
  };

  const paddingVertical = (pickerHeight - ITEM_HEIGHT) / 2;
  const styles = StyleSheet.create({
    scrollViewContent: {
      paddingVertical: paddingVertical,
    },
  });

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
        }}
        className="bg-[#e2e2e2] rounded-t-3xl p-6"
      >
        {/* Sezione superiore con freccia per annullare e ripristinare */}
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
            <Text className="text-purple-600 text-lg font-bold text-center">
              Ripristina tempo
            </Text>
          </TouchableOpacity>
        </View>

        {/* Sezione centrale con il selettore minuti e secondi */}
        <View
          className="flex-row items-center justify-center my-8"
          onLayout={(event) => {
            const { height } = event.nativeEvent.layout;
            if (height > 0) {
              setPickerHeight(height);
            }
          }}
          style={{ height: ITEM_HEIGHT * VISIBLE_ITEMS }}
        >
          {/* Contenitore per il selettore dei minuti e l'etichetta */}
          <View className="flex-1 flex-row items-center justify-end relative">
            <View className="flex-1 items-center justify-center h-full">
              <ScrollView
                ref={minutesScrollRef}
                showsVerticalScrollIndicator={false}
                snapToInterval={ITEM_HEIGHT}
                decelerationRate="fast"
                contentContainerStyle={styles.scrollViewContent}
                onScroll={(e) => handleScroll(e, "minutes")}
                onMomentumScrollEnd={(e) => handleScrollEnd(e, "minutes")}
                scrollEventThrottle={16}
              >
                {minutes.map((m) => renderItem(m, selectedMinutes, "minutes"))}
              </ScrollView>
            </View>
            <Text className="text-xl font-bold text-gray-500 ml-2">min</Text>
          </View>

          {/* Separatore */}
          <View className="items-center justify-center">
            <Text className="text-5xl font-bold text-gray-400 mx-4">:</Text>
          </View>

          {/* Contenitore per il selettore dei secondi e l'etichetta */}
          <View className="flex-1 flex-row items-center justify-start relative">
            <View className="flex-1 items-center justify-center h-full">
              <ScrollView
                ref={secondsScrollRef}
                showsVerticalScrollIndicator={false}
                snapToInterval={ITEM_HEIGHT}
                decelerationRate="fast"
                contentContainerStyle={styles.scrollViewContent}
                onScroll={(e) => handleScroll(e, "seconds")}
                onMomentumScrollEnd={(e) => handleScrollEnd(e, "seconds")}
                scrollEventThrottle={16}
              >
                {seconds.map((s) => renderItem(s, selectedSeconds, "seconds"))}
              </ScrollView>
            </View>
            <Text className="text-xl font-bold text-gray-500 ml-2">sec</Text>
          </View>
        </View>

        {/* Contenitore per i pulsanti */}
        <View className="mt-5">
          <TouchableOpacity
            className="bg-purple-600 px-6 py-3 rounded-xl"
            onPress={() =>
              onSave(formatTimeToString(selectedMinutes, selectedSeconds))
            }
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
