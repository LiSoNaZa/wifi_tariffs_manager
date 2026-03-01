<script setup lang="ts">
import { onMounted } from 'vue';
import { WifiTariffs } from '../composables/wifiTariffs';

const { wifiTariffs, loading, error, fetchWifiTariffs } = WifiTariffs()

  onMounted(() => {
    fetchWifiTariffs()

    console.log(wifiTariffs.value)
    
  });
</script>

<template>
  <div class="card">
    Test
  </div>
</template>

<style scoped>
</style>
