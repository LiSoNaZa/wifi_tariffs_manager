<script setup lang="ts" generic="T extends CoreModel">
  import { ref, computed } from 'vue'
  import type { TableColumn } from '../interfaces/table-config.interface'
  import type { CoreModel } from '../interfaces/core.interfaces'

  const props = defineProps<{
    data: T[]
    columns: TableColumn[]
    defaultSortIndex?: string
  }>()

  const sortOrder = ref<string>(props.defaultSortIndex || '')
  const sortDirection = ref<number>(props.defaultSortIndex ? 1 : 0)

  /**
   * Helper function to display values in table that are nested in data object
   * @param obj 
   * @param path 
   */
  const resolveValue = (obj: any, path: string) => {
    if (!obj || !path) return ''
    return path.split('.').reduce((acc, part) => acc && acc[part], obj)
  }

  /**
   * Handle sort for table data locally
   * @param col
   */
  const handleSort = (col: TableColumn) => {
    if (sortOrder.value === col.index) {
      sortDirection.value = sortDirection.value === 1 ? 2 : 1
    } else {
      sortOrder.value = col.index
      sortDirection.value = 1
    }
  }

  /**
   * Sorting algorithm for table data with index and sorting direction
   */
  const sortedData = computed(() => {
    if (!sortOrder.value || sortDirection.value === 0) return props.data

    const activeCol = props.columns.find(c => c.index === sortOrder.value)
    if (!activeCol) return props.data

    return [...props.data].sort((a, b) => {
      let valA = resolveValue(a, activeCol.key)
      let valB = resolveValue(b, activeCol.key)

      const numA = Number(valA)
      const numB = Number(valB)
      
      if (!isNaN(numA) && !isNaN(numB) && valA !== '' && valB !== '') {
        valA = numA
        valB = numB
      }

      if (valA < valB) return sortDirection.value === 1 ? -1 : 1
      if (valA > valB) return sortDirection.value === 1 ? 1 : -1
      return 0
    })
  })

  /**
   * Format display value for different column data types
   * @param row 
   * @param col 
   */
  const formatDisplay = (row: T, col: TableColumn) => {
    const rawValue = resolveValue(row, col.key)

    if (col.displayValue) {
      return col.displayValue(rawValue)
    }

    if (col.type === 'price') {
      const num = Number(rawValue)
      if (isNaN(num) || rawValue === null || rawValue === undefined) {
        return '0,00 €'
      }
      return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(num)
    }

    return rawValue ?? ''
  }
</script>

<template>
  <div class="table-wrapper">    
    <table class="table">
      <thead>
        <tr>
          <th 
            v-for="col in columns" 
            :key="col.key"
            @click="handleSort(col)"
            class="sortable-header"
          >
            <div class="header-content">
              {{ col.header }}
              <span v-if="sortOrder === col.index" class="sort-icon">
                <span v-if="sortDirection === 1">
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000"><path d="m280-400 200-200 200 200H280Z"/></svg>
                </span>
                <span v-else>
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000"><path d="M480-360 280-560h400L480-360Z"/></svg>
                </span>
              </span>
            </div>
          </th>
          <th v-if="$slots.actions"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in sortedData" :key="row.id">
          <td v-for="col in columns" :key="col.key">
            {{ formatDisplay(row, col) }}
          </td>
          <td v-if="$slots.actions" class="actions-cell">
            <slot name="actions" :row="row"></slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss">
.table-wrapper {
  height: 100%;
  overflow-y: auto;
  border: 1px solid #ddd;
  position: relative;
}

.table {
  width: 100%;
  border-collapse: collapse;

  thead {
    position: sticky;
    top: -1px;
    z-index: 10;
    background: #f4f4f4;
  }

  th {
    padding: 12px 10px;
    text-align: left;
    box-shadow: inset 0 -2px 0 #ddd;
    
    &.sortable-header {
      cursor: pointer;
      user-select: none;
      
      &:hover {
        background-color: #ebebeb;
      }
    }
  }

  .header-content {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .sort-icon {
    font-size: 0.7rem;
    color: #2233dd;
  }

  td {
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }

  tbody tr {
    &:nth-child(even) {
      background-color: #fafafa;
    }

    &:last-child td {
      border-bottom: none;
    }
  }
  
  .actions-cell {
    text-align: center;
    display: flex;
    gap: 8px;
    justify-content: center;
  }
}
</style>