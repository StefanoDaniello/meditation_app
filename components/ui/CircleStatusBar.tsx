import React, { useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";
interface CircularProgressBarProps {
  time: any; // Esempio: "5:00"
  size?: number;
  strokeWidth?: number;
  circleBackgroundColor?: string;
  circleProgressColor?: string;
  playing?: boolean;
}

// Funzione helper per convertire la stringa di tempo in secondi
const timeStringToSeconds = (timeString: string): number => {
  const [minutes, seconds] = timeString.split(":").map(Number);
  return minutes * 60 + seconds;
};

// Funzione helper per formattare i secondi in una stringa "M:SS"
const formatTime = (totalSeconds: number): string => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  time,
  size = 200,
  strokeWidth = 25,
  circleBackgroundColor = "#ffffff40",
  circleProgressColor = "#ffffff",
  playing = false,
}) => {
  // Stato per il tempo rimanente in secondi
  const [remainingSeconds, setRemainingSeconds] = useState(
    timeStringToSeconds(time)
  );
  // Ref per salvare il tempo iniziale totale
  const totalSecondsRef = useRef(timeStringToSeconds(time));

  // Effetto per impostare il tempo iniziale solo quando la prop 'time' cambia
  useEffect(() => {
    const newTotalSeconds = timeStringToSeconds(time);
    totalSecondsRef.current = newTotalSeconds;
    setRemainingSeconds(newTotalSeconds);
  }, [time]); // Si attiva solo quando la prop 'time' cambia

  // Effetto per gestire il countdown (start/stop)
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (playing && remainingSeconds > 0) {
      interval = setInterval(() => {
        setRemainingSeconds((prev) => prev - 1);
      }, 1000);
    } else if (remainingSeconds <= 0) {
      // Se il tempo è scaduto, interrompi il countdown
      if (interval) {
        clearInterval(interval);
      }
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [playing, remainingSeconds]); // Si attiva solo quando 'playing' o 'remainingSeconds' cambiano

  // Calcola la percentuale di progresso
  const progress = (remainingSeconds / totalSecondsRef.current) * 100;

  // Calcola l'offset per la barra di stato
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // Se il tempo è negativo, lo fissiamo a 0 per evitare bug
  const displayTime =
    remainingSeconds >= 0 ? formatTime(remainingSeconds) : "0:00";

  return (
    <View
      style={{ width: size, height: size }}
      className="relative flex items-center justify-center"
    >
      {remainingSeconds > 0 ? (
        <>
          <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {/* Cerchio di sfondo */}
            <Circle
              stroke={circleBackgroundColor}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            {/* Cerchio di progresso */}
            <Circle
              stroke={circleProgressColor}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
          </Svg>
          <Text className="absolute text-white text-3xl font-bold">
            {formatTime(remainingSeconds)}
          </Text>
        </>
      ) : (
        <View className="flex items-center justify-center">
          <Text className="text-white text-3xl font-bold text-center">
            Complimenti, hai concluso la tua meditazione
          </Text>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => setRemainingSeconds(timeStringToSeconds(time))}
            className="mt-6 flex flex-row items-center justify-center py-3  px-4 rounded-full bg-white/40"
          >
            {/* Icona SVG per il riavvio */}
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <Path
                d="M2.5 12a9.5 9.5 0 1 1 1.763 5.433"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M2.5 7v5h5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
            <Text className="ml-3 text-white text-lg font-bold  flex items-center ">
              Ricomincia da capo
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CircularProgressBar;
