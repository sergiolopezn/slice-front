export type OrderStatus = 'rush' | 'prep' | 'ready'

const statusClasses: Record<OrderStatus, string> = {
  rush: 'bg-status-urgent-red text-white',
  prep: 'bg-status-prep-amber text-black',
  ready: 'bg-status-ready-mint text-black',
}

type OrderCardHeaderProps = {
  orderNumber: string
  timer: string
  status: OrderStatus
}

export function OrderCardHeader({ orderNumber, timer, status }: OrderCardHeaderProps) {
  return (
    <div
      className={`flex items-center justify-between px-4 py-2 font-mono text-lg font-bold ${statusClasses[status]}`}
    >
      <span>{orderNumber}</span>
      <span>{timer}</span>
    </div>
  )
}
