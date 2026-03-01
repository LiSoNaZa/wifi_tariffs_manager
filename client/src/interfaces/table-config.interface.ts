export interface TableColumn {
  index: string
  header: string
  key: string
  type: 'string' | 'price'
  displayValue?: (val: any) => string
}