<script setup lang="ts">
import { toast } from '../composables/toast'

const { isVisible, message, type } = toast()
</script>

<template>
  <Transition name="toast">
    <div v-if="isVisible" class="toast-container" :class="type">
      {{ message }}
    </div>
  </Transition>
</template>

<style scoped lang="scss">
  .toast {
    &-container {
      position: fixed;
      bottom: 20px;
      right: 20px;
      padding: 12px 20px;
      border-radius: 8px;
      background-color: #1f2937;
      color: #ffffff;
      display: flex;
      align-items: center;
      gap: 10px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 9999;
      font-size: 0.9rem;
      font-weight: 500;
      min-width: 200px;
  
      &.success {
        border-left: 4px solid #10b981;
      }
  
      &.error {
        border-left: 4px solid #ef4444;
      }
    }
  
    &-enter-from, &-leave-to {
      opacity: 0;
      transform: translateY(20px);
    }
    &-enter-active, &-leave-active {
      transition: all 0.3s ease;
    }
  }
</style>