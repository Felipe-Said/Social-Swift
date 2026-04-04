import { useState, useEffect } from "react";
import { Cloud, CloudRain, Sun, Moon, MapPin, Thermometer, CloudSnow, Wind, Droplets, Loader2, RefreshCw } from "lucide-react";
import { GlassCard } from "./glass-card";
import { motion, AnimatePresence } from "framer-motion";
import { useLogger } from "@/hooks/useLogger";
import { weatherService, WeatherData } from "@/services/weatherService";

export function WeatherBox() {
  const { logWeatherWidgetView } = useLogger();
  const [weather, setWeather] = useState<WeatherData>({
    location: "Carregando...",
    temperature: 0,
    condition: "sunny",
    time: "00:00",
    maxTemp: 0,
    minTemp: 0,
    description: "Carregando...",
    humidity: 0,
    windSpeed: 0,
    feelsLike: 0,
    icon: "01d"
  });

  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Função para obter dados meteorológicos
  const fetchWeatherData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const weatherData = await weatherService.getWeatherData();
      
      // Adicionar horário atual
      const updatedWeather = {
        ...weatherData,
        time: new Date().toLocaleTimeString('pt-BR', { 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      };
      
      setWeather(updatedWeather);
      
      // Log weather widget view
      await logWeatherWidgetView(updatedWeather.location);
      
    } catch (error) {
      console.error('Erro ao obter dados do clima:', error);
      setError('Erro ao carregar dados meteorológicos');
      
      // Dados de fallback em caso de erro
      const now = new Date();
      const hour = now.getHours();
      const isNight = hour >= 18 || hour < 6;
      
      setWeather({
        location: "Localização não disponível",
        temperature: 25,
        condition: isNight ? "night" : "sunny",
        time: now.toLocaleTimeString('pt-BR', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        maxTemp: 30,
        minTemp: 20,
        description: isNight ? "Noite clara" : "Ensolarado",
        humidity: 60,
        windSpeed: 5,
        feelsLike: 25,
        icon: isNight ? "01n" : "01d"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Função para atualizar dados manualmente
  const handleRefresh = async () => {
    weatherService.clearCache();
    await fetchWeatherData();
  };

  useEffect(() => {
    fetchWeatherData();
    
    // Atualizar a cada 10 minutos
    const interval = setInterval(fetchWeatherData, 10 * 60 * 1000);
    
    // Atualizar horário a cada segundo
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(timer);
    };
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
      case "stormy":
        return (
          <motion.div className="relative">
            <CloudRain className="h-12 w-12 text-purple-600" />
            <motion.div
              className="absolute top-2 right-2"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 0.5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <Wind className="h-6 w-6 text-yellow-300" />
            </motion.div>
          </motion.div>
        );
      case "snowy":
        return (
          <motion.div className="relative">
            <CloudSnow className="h-12 w-12 text-blue-300" />
            <div className="absolute top-12 left-1/2 transform -translate-x-1/2">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{ left: `${i * 3 - 10}px` }}
                  animate={{
                    y: [0, 15, 0],
                    opacity: [0, 1, 0],
                    scale: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </motion.div>
        );
      case "foggy":
        return (
          <motion.div className="relative">
            <Cloud className="h-12 w-12 text-gray-300" />
            <motion.div
              className="absolute inset-0 bg-white/20 rounded-full"
              animate={{ 
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
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

  if (isLoading) {
    return (
      <GlassCard className="p-4 relative overflow-hidden">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-text-dim">
            <MapPin className="h-4 w-4" />
            <span className="text-sm font-medium">Obtendo localização...</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="text-3xl font-bold text-text">
                --°
              </div>
              <div className="text-sm text-text-dim">
                Carregando dados meteorológicos...
              </div>
            </div>
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          </div>
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard className={`p-4 relative overflow-hidden bg-gradient-to-br ${getBackgroundGradient()}`}>
      <div className="space-y-4">
        {/* Location */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-text-dim">
            <MapPin className="h-4 w-4" />
            <span className="text-sm font-medium">{weather.location}</span>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="p-1 hover:bg-white/10 rounded-full transition-colors disabled:opacity-50"
            title="Atualizar dados meteorológicos"
          >
            <RefreshCw className={`h-4 w-4 text-text-dim ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="text-xs text-red-400 bg-red-900/20 p-2 rounded">
            {error}
          </div>
        )}

        {/* Weather Icon and Temperature */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="text-3xl font-bold text-text">
              {weather.temperature}°
            </div>
            <div className="text-sm text-text-dim capitalize">
              {weather.description}
            </div>
            <div className="text-xs text-text-dim">
              Sensação de {weather.feelsLike}°
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

        {/* Additional Weather Info */}
        <div className="flex items-center justify-between text-xs text-text-dim">
          <div className="flex items-center gap-1">
            <Droplets className="h-3 w-3" />
            <span>{weather.humidity}%</span>
          </div>
          <div className="flex items-center gap-1">
            <Wind className="h-3 w-3" />
            <span>{weather.windSpeed} km/h</span>
          </div>
        </div>
      </div>

      {/* Background animations */}
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
        
        {weather.condition === "snowy" && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/60 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '-10px'
                }}
                animate={{
                  y: [0, 200],
                  x: [0, Math.random() * 20 - 10],
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
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