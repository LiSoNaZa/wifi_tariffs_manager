<script setup lang="ts">
  import { onMounted, reactive, ref } from 'vue'
  import { WifiTariffs } from '../composables/wifiTariffs'
  import type { TableColumn } from '../interfaces/table-config.interface'
  import AppTable from '../components/AppTable.vue'
  import AppModal from '../components/AppModal.vue'
  import type { WifiTariff } from '../interfaces/wifi-tariff.interface'
import { toast } from '../composables/toast'

  const isModalOpen = ref(false)
  const modalTitle = ref('')
  const initialFormData = () => ({
    id: 0,
    name: '',
    description: '',
    price: {
      monthly: 0,
      yearly: 0
    },
    features: {
      bandwidth: '',
      onlineDuration: '',
      numberOfDevices: '',
      numberOfSimultaneousConnections: 0
    }
  })

  const form = reactive(initialFormData())

  const { showToast } = toast()
  const { wifiTariffs, isLoading, fetchWifiTariffs, saveWifiTariff, deleteWifiTariff } = WifiTariffs()

  const wifiTariffColumns: TableColumn[] = [
    { index: 'tariff_name', header: 'Tariff name', key: 'name', type: 'string' },
    { index: 'bandwidth', header: 'Bandwidth', key: 'features.bandwidth', type: 'string'},
    { index: 'onlineDuration', header: 'Online duration', key: 'features.onlineDuration', type: 'string' },
    { index: 'numberOfDevices', header: 'Number of devices', key: 'features.numberOfDevices', type: 'string'},
    { index: 'numberOfSimultaneousConnections', header: 'Number of simultaneous connections', key: 'features.numberOfSimultaneousConnections', type: 'string' },
    { index: 'price_monthly', header: 'Price monthly', key: 'price.monthly', type: 'price' },
    { index: 'price_yearly', header: 'Price yearly', key: 'price.yearly', type: 'price' } 
  ]

  onMounted(async () => {
    await fetchWifiTariffs()
  })

  /**
   * Reset from data to remove old data
   */
  const resetForm = () => {
    Object.assign(form, initialFormData())
  }

  /**
   * Handle delete of wifi tariff with confirmation
   * @param tariff 
   */
  const handleDelete = async (tariff: WifiTariff) => {
    const confirmed = confirm(`Do you want to delete ${tariff.name}?`)
    
    if (confirmed) {
      try {
        await deleteWifiTariff(tariff.id)
      } catch (err) {
        showToast(`Error while delete: ${err}`, 'error')
      }
    }
  }

  /**
   * Open Modal to create new wifi tariff
   */
  const openCreateModal = () => {
    resetForm()
    modalTitle.value = 'New Tariff'
    Object.assign(form, { id: null, name: '' })
    isModalOpen.value = true
  }

  /**
   * Open Modal to edit specific wifi tariff
   */
  const openEditModal = (tariff: any) => {
    resetForm()
    modalTitle.value = 'Edit Tariff'
    Object.assign(form, JSON.parse(JSON.stringify(tariff)))
    isModalOpen.value = true
  }

  /**
   * Handle save of wifi tariff with error handling
   */
  const handleSave = async () => {
    try {
      await saveWifiTariff({ ...form })
      isModalOpen.value = false
    } catch (err) {
      showToast(`Error while saving: ${err}`, 'error')
    }
  }
</script>

<template>
  <div class="page-container">
    <header class="page-header">
      <h1 class="page-title">Wifi Tariffs</h1>
      <button class="btn" @click="openCreateModal">
        <span class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
        </span>
        Add Tariff
      </button>
    </header>
    <main class="page-content">
      <div class="card">
        <AppTable
          v-if="wifiTariffs"
          :data="wifiTariffs"
          :columns="wifiTariffColumns"
          defaultSortIndex="tariff_name"
        >
          <template #actions="{ row }">
            <button class="btn btn-action edit" @click="openEditModal(row)" title="edit">
              <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#2233dd"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
            </button>
            <button class="btn btn-action delete" @click="handleDelete(row)" title="delete">
              <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#c01025"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
            </button>
          </template>
        </AppTable>
      </div>
    </main>

    <AppModal :show="isModalOpen" :title="modalTitle" @close="isModalOpen = false">
      <form @submit.prevent="handleSave" class="tariff-form">
        <section class="form-section">
          <div class="form-group">
            <label>Tariff name</label>
            <input v-model="form.name" required placeholder="Premium Fiber 100" />
          </div>
          <div class="form-group">
            <label>Description</label>
            <textarea v-model="form.description" placeholder="Short Tariff details..."></textarea>
          </div>
        </section>

        <section class="form-section">
          <div class="form-row">
            <div class="form-group">
              <label>Price (monthly) €</label>
              <input type="number" step="0.01" v-model.number="form.price.monthly" required />
            </div>
            <div class="form-group">
              <label>price (yearly) €</label>
              <input type="number" step="0.01" v-model.number="form.price.yearly" required />
            </div>
          </div>
        </section>

        <section class="form-section">
          <div class="form-row">
            <div class="form-group">
              <label>bandwidth</label>
              <input v-model="form.features.bandwidth" placeholder="100 Mbps" />
            </div>
            <div class="form-group">
              <label>Online duration</label>
              <input v-model="form.features.onlineDuration" placeholder="24 months" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Number of Devices</label>
              <input v-model="form.features.numberOfDevices" placeholder="5 Devices" />
            </div>
            <div class="form-group">
              <label>Simultaneous Connections</label>
              <input type="number" v-model.number="form.features.numberOfSimultaneousConnections" />
            </div>
          </div>
        </section>
        
        <div class="modal-actions">
          <button type="button" class="btn" @click="isModalOpen = false">cancel</button>
          <button type="submit" class="btn" :disabled="isLoading">
            Save
          </button>
        </div>
      </form>
    </AppModal>
  </div>
</template>

<style scoped lang="scss">
  .page {
    &-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      background-color: #f3f4f6;
    }
  
    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 0;
      background-color: #ffffff;
      border-bottom: 1px solid #e5e7eb;
    }
  
    &-title {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 600;
      color: #111827;
    }
  
    &-content {
      flex: 1;
      overflow: hidden;
    }
  }

  .btn-edit, .btn-delete {
    background-color: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
  }

  .modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
  }

  .tariff-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    max-height: 70vh;
    overflow-y: auto;
    padding-right: 0.5rem;

    .form-section {
      border-bottom: 1px solid #e5e7eb;
      padding-bottom: 1rem;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      margin-bottom: 0.8rem;

      label {
        font-size: 0.85rem;
        font-weight: 600;
        color: #374151;
      }

      input, textarea {
        padding: 0.6rem;
        border: 1px solid #e5e7eb;
        border-radius: 4px;
        font-size: 0.9rem;
        
        &:focus {
          outline: none;
          border-color: blue;
          box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
        }
      }

      textarea {
        resize: vertical;
        min-height: 60px;
      }
    }
  }
</style>
