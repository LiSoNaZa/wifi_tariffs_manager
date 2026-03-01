import { CoreModel } from "./core";

export interface WifiTariff extends CoreModel {
  name: string
  description: string
  price: WifiTariffPrice
  features: WifiTariffFeature
}

export interface WifiTariffPrice {
  monthly: number
  yearly: number
}

export interface WifiTariffFeature {
  bandwidth?: string
  onlineDuration?: string
  numberOfDevices?: number
  numberOfSimultaneousConnections?: number
}