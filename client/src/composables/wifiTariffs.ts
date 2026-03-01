import { ref } from 'vue';
import type { WifiTariff } from '../interfaces/wifi-tariff.interface';
import { API_CONFIG } from '../config/api.config';

export function WifiTariffs() {
  const wifiTariffs = ref<WifiTariff[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const fetchWifiTariffs = async () => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await fetch(`${API_CONFIG.baseUrl}/wifi-tariffs`)
      
      if (!response.ok) throw new Error('Fehler beim Laden der Daten')
      
      const result = await response.json()
      wifiTariffs.value = result.data || result
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown Error'
    } finally {
      isLoading.value = false
    }
  }

  const saveWifiTariff = async (formData: any) => {
    const isEdit = !!formData.id
    const url = isEdit 
      ? `${API_CONFIG.baseUrl}/wifi-tariffs/${formData.id}` 
      : `${API_CONFIG.baseUrl}/wifi-tariffs`
    
    const response = await fetch(url, {
      method: isEdit ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })

    if (!response.ok) throw new Error('A problem while saving')
    
    await fetchWifiTariffs()
  }

  const deleteWifiTariff = async (id: number) => {
    const response = await fetch(`${API_CONFIG.baseUrl}/wifi-tariffs/${id}`, {
      method: 'DELETE'
    })
    if (!response.ok) throw new Error('A problem while delete')
    
    fetchWifiTariffs()
  }

  return {
    wifiTariffs,
    isLoading,
    error,
    fetchWifiTariffs,
    saveWifiTariff,
    deleteWifiTariff
  }
}