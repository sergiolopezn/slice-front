import { useItemCompletion } from '../hooks/useItemCompletion'
import type { OrderLineItem } from '../types/order'

type OrderItemRowProps = {
  orderId: string
  item: OrderLineItem
}

export function OrderItemRow({ orderId, item }: OrderItemRowProps) {
  const toggleItem = useItemCompletion((state) => state.toggleItem)
  const isComplete = useItemCompletion((state) => state.isComplete(orderId, item.id))
  const checkboxId = `${orderId}-${item.id}`

  return (
    <label
      htmlFor={checkboxId}
      className="flex cursor-pointer items-start gap-3 py-1.5"
    >
      <input
        id={checkboxId}
        type="checkbox"
        checked={isComplete}
        onChange={() => toggleItem(orderId, item.id)}
        className="mt-0.5 size-4 shrink-0 accent-status-prep-amber"
      />
      <span className="min-w-0 flex-1">
        <span
          className={`text-sm font-medium ${isComplete ? 'text-text-muted line-through' : 'text-zinc-200'}`}
        >
          {item.label}
        </span>
        {item.modifiers ? (
          <span className="mt-0.5 block font-mono text-xs text-text-muted">
            {item.modifiers}
          </span>
        ) : null}
      </span>
    </label>
  )
}
