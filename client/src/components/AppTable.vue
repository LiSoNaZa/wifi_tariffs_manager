<script setup lang="ts" generic="T extends CoreModel">
import type { TableColumn } from '../interfaces/table-config.interface'
import type { CoreModel } from '../interfaces/core.interfaces'

const props = defineProps<{
  data: T[]
  columns: TableColumn[]
}>()

const resolveValue = (obj: any, path: string) => {
  if (!obj || !path) return ''
  const value = path.split('.').reduce((acc, part) => acc && acc[part], obj)
  return value !== undefined && value !== null ? value : ''
}

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
          <th v-for="col in columns" :key="col.key">{{ col.header }}</th>
          <th v-if="$slots.actions"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in data" :key="row.id">
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
  .actions-header, .actions-cell {
    text-align: center;
  }

  .actions-cell {
    display: flex;
    gap: 8px;
    justify-content: center;
  }
}
</style>