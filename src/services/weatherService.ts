interface WeatherData {
  location: string;
  temperature: number;
  condition: "sunny" | "cloudy" | "rainy" | "night" | "snowy" | "stormy" | "foggy";
  description: string;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
  maxTemp: number;
  minTemp: number;
  icon: string;
}

interface LocationData {
  lat: number;
  lon: number;
  city: string;
  country: string;
}

class WeatherService {
  private cache: Map<string, { data: WeatherData; timestamp: number }> = new Map();
  private readonly CACHE_DURATION = 10 * 60 * 1000; // 10 minutos

  // Obter localização do usuário
  async getCurrentLocation(): Promise<LocationData> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        // Fallback para São Paulo
        resolve({
          lat: -23.5505,
          lon: -46.6333,
          city: 'São Paulo',
          country: 'BR'
        });
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            // Tentar obter nome da cidade usando geocodificação reversa
            const cityName = await this.getCityName(latitude, longitude);
            
            resolve({
              lat: latitude,
              lon: longitude,
              city: cityName,
              country: 'BR'
            });
          } catch (error) {
            // Fallback para coordenadas
            resolve({
              lat: latitude,
              lon: longitude,
              city: `Lat: ${latitude.toFixed(2)}, Lon: ${longitude.toFixed(2)}`,
              country: 'BR'
            });
          }
        },
        (error) => {
          console.warn('Erro na geolocalização:', error);
          // Fallback para São Paulo
          resolve({
            lat: -23.5505,
            lon: -46.6333,
            city: 'São Paulo',
            country: 'BR'
          });
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutos
        }
      );
    });
  }

  // Obter nome da cidade baseado nas coordenadas
  private async getCityName(lat: number, lon: number): Promise<string> {
    // Mapeamento de coordenadas para cidades brasileiras
    const cities = [
      { lat: -23.5505, lon: -46.6333, name: 'São Paulo', state: 'SP' },
      { lat: -22.9068, lon: -43.1729, name: 'Rio de Janeiro', state: 'RJ' },
      { lat: -15.7801, lon: -47.9292, name: 'Brasília', state: 'DF' },
      { lat: -12.9714, lon: -38.5014, name: 'Salvador', state: 'BA' },
      { lat: -19.9167, lon: -43.9345, name: 'Belo Horizonte', state: 'MG' },
      { lat: -25.4244, lon: -49.2654, name: 'Curitiba', state: 'PR' },
      { lat: -30.0346, lon: -51.2177, name: 'Porto Alegre', state: 'RS' },
      { lat: -8.0476, lon: -34.8770, name: 'Recife', state: 'PE' },
      { lat: -3.1190, lon: -60.0217, name: 'Manaus', state: 'AM' },
      { lat: -15.7801, lon: -47.9292, name: 'Fortaleza', state: 'CE' },
      { lat: -16.6864, lon: -49.2643, name: 'Goiânia', state: 'GO' },
      { lat: -12.9714, lon: -38.5014, name: 'Aragarças', state: 'GO' }
    ];

    // Encontrar cidade mais próxima
    let closestCity = cities[0];
    let minDistance = this.calculateDistance(lat, lon, closestCity.lat, closestCity.lon);

    for (const city of cities) {
      const distance = this.calculateDistance(lat, lon, city.lat, city.lon);
      if (distance < minDistance) {
        minDistance = distance;
        closestCity = city;
      }
    }

    return `${closestCity.name}, ${closestCity.state}`;
  }

  // Calcular distância entre duas coordenadas
  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Raio da Terra em km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI/180);
  }

  // Gerar dados meteorológicos baseados na localização e hora
  async getWeatherData(): Promise<WeatherData> {
    try {
      const location = await this.getCurrentLocation();
      const cacheKey = `${location.lat},${location.lon}`;
      
      // Verificar cache
      const cached = this.cache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
        return cached.data;
      }

      const weatherData = await this.generateWeatherData(location);
      
      // Salvar no cache
      this.cache.set(cacheKey, {
        data: weatherData,
        timestamp: Date.now()
      });

      return weatherData;
    } catch (error) {
      console.error('Erro ao obter dados meteorológicos:', error);
      throw error;
    }
  }

  // Gerar dados meteorológicos realistas baseados na localização
  private async generateWeatherData(location: LocationData): Promise<WeatherData> {
    const now = new Date();
    const hour = now.getHours();
    const month = now.getMonth();
    const isNight = hour >= 18 || hour < 6;
    
    // Fatores baseados na localização
    const latitude = Math.abs(location.lat);
    const isTropical = latitude < 23.5; // Zona tropical
    const isCoastal = this.isCoastalCity(location.city);
    
    // Temperatura baseada na localização e estação
    const baseTemp = this.calculateBaseTemperature(location, month, hour);
    
    // Condição do tempo baseada em probabilidades realistas
    const condition = this.determineWeatherCondition(location, month, hour, isNight);
    
    // Variações baseadas na condição
    const tempVariation = this.getTemperatureVariation(condition);
    const temperature = Math.round(baseTemp + tempVariation);
    
    // Outros dados meteorológicos
    const humidity = this.calculateHumidity(condition, isCoastal, isTropical);
    const windSpeed = this.calculateWindSpeed(condition, isCoastal);
    const feelsLike = this.calculateFeelsLike(temperature, humidity, windSpeed);
    
    // Temperaturas min/max baseadas na temperatura atual
    const maxTemp = temperature + Math.round(Math.random() * 8 + 2);
    const minTemp = temperature - Math.round(Math.random() * 6 + 2);

    return {
      location: `${location.city}, ${location.country}`,
      temperature,
      condition,
      description: this.getWeatherDescription(condition),
      humidity: Math.round(humidity),
      windSpeed: Math.round(windSpeed),
      feelsLike: Math.round(feelsLike),
      maxTemp,
      minTemp,
      icon: this.getWeatherIcon(condition, isNight)
    };
  }

  // Calcular temperatura base baseada na localização
  private calculateBaseTemperature(location: LocationData, month: number, hour: number): number {
    const lat = Math.abs(location.lat);
    const isTropical = lat < 23.5;
    const isSouthern = location.lat < 0;
    
    // Temperatura base por região
    let baseTemp = 25; // Temperatura padrão
    
    if (isTropical) {
      baseTemp = 28; // Mais quente em regiões tropicais
    } else if (lat > 30) {
      baseTemp = 20; // Mais frio em regiões temperadas
    }
    
    // Ajuste sazonal (invertido para hemisfério sul)
    const seasonalAdjustment = isSouthern 
      ? Math.sin((month - 6) * Math.PI / 6) * 8 // Invertido para hemisfério sul
      : Math.sin((month - 0) * Math.PI / 6) * 8;
    
    // Ajuste diário (mais frio à noite)
    const dailyAdjustment = isNight ? -8 : (hour - 12) * 1.5;
    
    return baseTemp + seasonalAdjustment + dailyAdjustment;
  }

  // Determinar condição do tempo
  private determineWeatherCondition(location: LocationData, month: number, hour: number, isNight: boolean): WeatherData['condition'] {
    const random = Math.random();
    const isTropical = Math.abs(location.lat) < 23.5;
    const isCoastal = this.isCoastalCity(location.city);
    
    // Probabilidades baseadas na localização e hora
    let sunnyProb = 0.4;
    let cloudyProb = 0.3;
    let rainyProb = 0.2;
    let stormyProb = 0.05;
    let foggyProb = 0.05;
    
    // Ajustes por localização
    if (isTropical) {
      rainyProb += 0.1; // Mais chuva em regiões tropicais
      stormyProb += 0.05;
    }
    
    if (isCoastal) {
      foggyProb += 0.1; // Mais neblina em cidades costeiras
    }
    
    if (isNight) {
      sunnyProb = 0; // Sem sol à noite
      cloudyProb += 0.2;
    }
    
    // Ajuste sazonal
    if (month >= 10 || month <= 2) { // Verão no hemisfério sul
      rainyProb += 0.1;
      stormyProb += 0.05;
    }
    
    // Determinar condição baseada nas probabilidades
    if (random < sunnyProb) return 'sunny';
    if (random < sunnyProb + cloudyProb) return 'cloudy';
    if (random < sunnyProb + cloudyProb + rainyProb) return 'rainy';
    if (random < sunnyProb + cloudyProb + rainyProb + stormyProb) return 'stormy';
    if (random < sunnyProb + cloudyProb + rainyProb + stormyProb + foggyProb) return 'foggy';
    
    return isNight ? 'night' : 'sunny';
  }

  // Verificar se é cidade costeira
  private isCoastalCity(cityName: string): boolean {
    const coastalCities = ['Rio de Janeiro', 'Salvador', 'Recife', 'Fortaleza', 'Santos', 'Florianópolis'];
    return coastalCities.some(city => cityName.includes(city));
  }

  // Obter variação de temperatura baseada na condição
  private getTemperatureVariation(condition: WeatherData['condition']): number {
    const variations = {
      sunny: 2,
      cloudy: -2,
      rainy: -5,
      stormy: -8,
      snowy: -10,
      foggy: -3,
      night: -5
    };
    
    return variations[condition] + (Math.random() - 0.5) * 4;
  }

  // Calcular umidade
  private calculateHumidity(condition: WeatherData['condition'], isCoastal: boolean, isTropical: boolean): number {
    const baseHumidity = {
      sunny: 40,
      cloudy: 60,
      rainy: 85,
      stormy: 90,
      snowy: 70,
      foggy: 95,
      night: 70
    };
    
    let humidity = baseHumidity[condition];
    
    if (isCoastal) humidity += 10;
    if (isTropical) humidity += 5;
    
    return Math.min(95, Math.max(20, humidity + (Math.random() - 0.5) * 20));
  }

  // Calcular velocidade do vento
  private calculateWindSpeed(condition: WeatherData['condition'], isCoastal: boolean): number {
    const baseWindSpeed = {
      sunny: 5,
      cloudy: 8,
      rainy: 12,
      stormy: 25,
      snowy: 10,
      foggy: 3,
      night: 6
    };
    
    let windSpeed = baseWindSpeed[condition];
    
    if (isCoastal) windSpeed += 5;
    
    return windSpeed + (Math.random() - 0.5) * 10;
  }

  // Calcular sensação térmica
  private calculateFeelsLike(temperature: number, humidity: number, windSpeed: number): number {
    // Fórmula simplificada de sensação térmica
    const heatIndex = temperature + (humidity - 50) * 0.1;
    const windChill = temperature - (windSpeed * 0.2);
    
    return Math.round((heatIndex + windChill) / 2);
  }

  // Obter descrição do tempo
  private getWeatherDescription(condition: WeatherData['condition']): string {
    const descriptions = {
      sunny: 'Ensolarado',
      cloudy: 'Nublado',
      rainy: 'Chuva',
      stormy: 'Tempestade',
      snowy: 'Neve',
      foggy: 'Neblina',
      night: 'Noite clara'
    };
    
    return descriptions[condition];
  }

  // Obter ícone do tempo
  private getWeatherIcon(condition: WeatherData['condition'], isNight: boolean): string {
    const icons = {
      sunny: isNight ? '01n' : '01d',
      cloudy: isNight ? '02n' : '02d',
      rainy: '10d',
      stormy: '11d',
      snowy: '13d',
      foggy: '50d',
      night: '01n'
    };
    
    return icons[condition];
  }

  // Limpar cache
  clearCache(): void {
    this.cache.clear();
  }
}

export const weatherService = new WeatherService();
export type { WeatherData, LocationData };
