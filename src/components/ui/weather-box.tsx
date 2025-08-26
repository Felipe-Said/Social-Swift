import { useState, useEffect } from "react";
import { Cloud, CloudRain, Sun, Moon, MapPin, Thermometer } from "lucide-react";
import { GlassCard } from "./glass-card";
import { motion, AnimatePresence } from "framer-motion";

interface WeatherData {
  location: string;
  temperature: number;
  condition: "sunny" | "cloudy" | "rainy" | "night";
  time: string;
  maxTemp: number;
  minTemp: number;
  description: string;
}

export function WeatherBox() {
  const [weather, setWeather] = useState<WeatherData>({
    location: "Aragarças",
    temperature: 28,
    condition: "sunny",
    time: "14:30",
    maxTemp: 32,
    minTemp: 18,
    description: "Ensolarado"
  });

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      
      // Simulate weather condition based on time
      const hour = now.getHours();
      let condition: WeatherData["condition"] = "sunny";
      let description = "Ensolarado";
      
      if (hour >= 18 || hour < 6) {
        condition = "night";
        description = "Noite clara";
      } else if (Math.random() > 0.7) {
        condition = "rainy";
        description = "Chuva";
      } else if (hour < 8 || hour > 17) {
        condition = "cloudy";
        description = "Nublado";
      }

      setWeather(prev => ({
        ...prev,
        condition,
        description,
        time: now.toLocaleTimeString('pt-BR', { 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getWeatherIcon = () => {
    switch (weather.condition) {
      case "sunny":
        return (
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <Sun className="h-12 w-12 text-yellow-400" />
          </motion.div>
        );
      case "night":
        return (
          <motion.div
            animate={{ 
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <Moon className="h-12 w-12 text-blue-200" />
          </motion.div>
        );
      case "cloudy":
        return (
          <motion.div
            animate={{ 
              x: [-2, 2, -2]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <Cloud className="h-12 w-12 text-gray-400" />
          </motion.div>
        );
      case "rainy":
        return (
          <motion.div className="relative">
            <CloudRain className="h-12 w-12 text-blue-500" />
            <div className="absolute top-12 left-1/2 transform -translate-x-1/2">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-0.5 h-4 bg-blue-400 rounded-full"
                  style={{ left: `${i * 4 - 10}px` }}
                  animate={{
                    y: [0, 20, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </motion.div>
        );
      default:
        return <Sun className="h-12 w-12 text-yellow-400" />;
    }
  };

  const getBackgroundGradient = () => {
    const hour = currentTime.getHours();
    
    if (hour >= 6 && hour < 12) {
      // Morning
      return "from-orange-200/20 to-yellow-200/20";
    } else if (hour >= 12 && hour < 18) {
      // Afternoon
      return "from-blue-200/20 to-cyan-200/20";
    } else if (hour >= 18 && hour < 20) {
      // Evening
      return "from-orange-300/20 to-purple-300/20";
    } else {
      // Night
      return "from-indigo-300/20 to-purple-400/20";
    }
  };

  return (
    <GlassCard className={`p-4 relative overflow-hidden bg-gradient-to-br ${getBackgroundGradient()}`}>
      <div className="space-y-4">
        {/* Location */}
        <div className="flex items-center gap-2 text-text-dim">
          <MapPin className="h-4 w-4" />
          <span className="text-sm font-medium">{weather.location}</span>
        </div>

        {/* Weather Icon and Temperature */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="text-3xl font-bold text-text">
              {weather.temperature}°
            </div>
            <div className="text-sm text-text-dim">
              {weather.description}
            </div>
          </div>
          
          <div className="flex flex-col items-center space-y-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={weather.condition}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {getWeatherIcon()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Time */}
        <div className="text-center">
          <div className="text-lg font-semibold text-text">
            {weather.time}
          </div>
          <div className="text-xs text-text-dim">
            {currentTime.toLocaleDateString('pt-BR', { 
              weekday: 'long',
              day: 'numeric',
              month: 'long'
            })}
          </div>
        </div>

        {/* Min/Max Temperature */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <Thermometer className="h-4 w-4 text-blue-400" />
            <span className="text-text-dim">Min</span>
            <span className="font-semibold text-text">{weather.minTemp}°</span>
          </div>
          <div className="flex items-center gap-1">
            <Thermometer className="h-4 w-4 text-red-400" />
            <span className="text-text-dim">Máx</span>
            <span className="font-semibold text-text">{weather.maxTemp}°</span>
          </div>
        </div>
      </div>

      {/* Background animation for rain */}
      <AnimatePresence>
        {weather.condition === "rainy" && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-0.5 h-8 bg-blue-300/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '-10px'
                }}
                animate={{
                  y: [0, 200],
                  opacity: [0, 0.7, 0]
                }}
                transition={{
                  duration: Math.random() * 2 + 1,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "linear"
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </GlassCard>
  );
}