export interface DraggableItemsProps {
  initialItems: Array<{
    id: string | number
  }>
  delay?: number
  debounceMs?: number
  easeFunction?: string
}
