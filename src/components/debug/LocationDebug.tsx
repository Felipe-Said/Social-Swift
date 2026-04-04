import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, RefreshCw, Thermometer, Droplets, Wind, Eye } from 'lucide-react';
import { weatherService, WeatherData } from '@/services/weatherService';

export function LocationDebug() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [locationInfo, setLocationInfo] = useState<any>(null);

  const fetchWeather = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const weatherData = await weatherService.getWeatherData();
      setWeather(weatherData);
      
      // Obter informações de localização para debug
      const location = await weatherService.getCurrentLocation();
      setLocationInfo(location);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const getConditionColor = (condition: string) => {
    const colors = {
      sunny: 'bg-yellow-500',
      cloudy: 'bg-gray-500',
      rainy: 'bg-blue-500',
      stormy: 'bg-purple-500',
      snowy: 'bg-blue-300',
      foggy: 'bg-gray-400',
      night: 'bg-indigo-500'
    };
    return colors[condition as keyof typeof colors] || 'bg-gray-500';
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Debug de Localização e Clima
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button 
              onClick={fetchWeather} 
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              Atualizar
            </Button>
            <Button 
              variant="outline" 
              onClick={() => weatherService.clearCache()}
            >
              Limpar Cache
            </Button>
          </div>

          {error && (
            <div className="p-3 bg-red-900/20 border border-red-500/50 rounded text-red-400">
              <strong>Erro:</strong> {error}
            </div>
          )}

          {locationInfo && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Informações de Localização</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Cidade:</span>
                    <span className="text-sm font-medium">{locationInfo.city}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">País:</span>
                    <span className="text-sm font-medium">{locationInfo.country}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Latitude:</span>
                    <span className="text-sm font-medium">{locationInfo.lat.toFixed(4)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Longitude:</span>
                    <span className="text-sm font-medium">{locationInfo.lon.toFixed(4)}</span>
                  </div>
                </CardContent>
              </Card>

              {weather && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Dados Meteorológicos</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Condição:</span>
                      <Badge className={`${getConditionColor(weather.condition)} text-white`}>
                        {weather.description}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Temperatura:</span>
                      <span className="text-sm font-medium flex items-center gap-1">
                        <Thermometer className="h-3 w-3" />
                        {weather.temperature}°C
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Sensação:</span>
                      <span className="text-sm font-medium">{weather.feelsLike}°C</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Umidade:</span>
                      <span className="text-sm font-medium flex items-center gap-1">
                        <Droplets className="h-3 w-3" />
                        {weather.humidity}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Vento:</span>
                      <span className="text-sm font-medium flex items-center gap-1">
                        <Wind className="h-3 w-3" />
                        {weather.windSpeed} km/h
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Min/Max:</span>
                      <span className="text-sm font-medium">
                        {weather.minTemp}° / {weather.maxTemp}°
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {weather && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Dados Completos (JSON)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="text-xs bg-muted p-3 rounded overflow-auto max-h-40">
                  {JSON.stringify(weather, null, 2)}
                </pre>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
