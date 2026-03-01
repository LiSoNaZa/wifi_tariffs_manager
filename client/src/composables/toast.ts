import { ref } from 'vue'

const isVisible = ref(false)
const message = ref('')
const type = ref<'success' | 'error'>('success')
let timeout: number | null = null

export function toast() {
  const showToast = (msg: string, toastType: 'success' | 'error' = 'success') => {
    message.value = msg
    type.value = toastType
    isVisible.value = true

    if (timeout) clearTimeout(timeout)
    
    timeout = window.setTimeout(() => {
      isVisible.value = false
    }, 3000)
  }

  return {
    isVisible,
    message,
    type,
    showToast
  }
}