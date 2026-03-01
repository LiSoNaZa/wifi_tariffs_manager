import { BaseStorageService } from "../core/storage.service"
import { WifiTariff } from "../interfaces/wifi-tariff"
import { createInitialWifiTariffs } from "./wifi-tariff.base-data"


class WifiTariffService extends BaseStorageService<WifiTariff>{
  constructor() {
    super(createInitialWifiTariffs(25))
  }
}

export const wifiTariffsService = new WifiTariffService()