import { WifiTariff } from "../../interfaces/wifi-tariff"

export const createInitialWifiTariffs = (count: number = 25): WifiTariff[] => {
  const names = ['Fiber', 'DSL', 'Cable', 'Office']
  
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    name: `${names[i % names.length]} ${Math.floor(i / 4) + 1}`,
    description: `Description for ${names[i % names.length]} ${Math.floor(i / 4) + 1}`,
    price: {
      yearly: parseFloat((105.90 + (i * 3.5)).toFixed(2)),
      monthly: parseFloat((8.82 + (i * 0.29)).toFixed(2)),
    },
    features: {
      bandwidth: `${(i % 5 + 1) * 50} Mbps`,
      onlineDuration: `${(i % 5 + 1) * 10} hours`,
      numberOfDevices: i % 5 + 1,
      numberOfSimultaneousConnections: i % 5 + 1,
    }
  }))
}