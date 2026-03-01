import { ref } from 'vue';
import type { WifiTariff } from '../interfaces/wifi-tariff.interface';

export function WifiTariffs() {
  const wifiTariffs = ref<WifiTariff[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchWifiTariffs = async () => {
    loading.value = true
    error.value = null
    
    try {
      const response = await fetch('/api/v1/wifi-tariffs')
      
      if (!response.ok) throw new Error('Fehler beim Laden der Daten')
      
      const result = await response.json()
      wifiTariffs.value = result.data || result
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown Error'
    } finally {
      loading.value = false
    }
  };

  return {
    wifiTariffs,
    loading,
    error,
    fetchWifiTariffs
  }
}