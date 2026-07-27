import {
  Badge,
  Button,
  Card,
  OrderCardHeader,
} from '@/shared/components/ui'

function App() {
  return (
    <main className="min-h-screen bg-bg-app p-6">
      <h1 className="mb-8 text-2xl font-bold tracking-tight text-white">
        SliceOS UI Components
      </h1>

      <section className="mb-10">
        <h2 className="mb-4 text-base font-bold text-white">Badges</h2>
        <div className="flex flex-wrap gap-3">
          <Badge variant="rush">RUSH</Badge>
          <Badge variant="prep">PREP</Badge>
          <Badge variant="ready">READY</Badge>
          <Badge variant="cod">COD</Badge>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-base font-bold text-white">Buttons</h2>
        <div className="grid max-w-md gap-3">
          <Button variant="bump">BUMP ORDER</Button>
          <Button variant="check-temp">CHECK TEMP</Button>
          <Button variant="complete">COMPLETE</Button>
          <Button variant="complete" disabled>
            COMPLETE (DISABLED)
          </Button>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-base font-bold text-white">Order Cards</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card>
            <OrderCardHeader orderNumber="#402" timer="12:06" status="rush" />
            <div className="p-4">
              <p className="text-base font-bold text-white">Marco Rossi</p>
              <p className="text-sm font-medium text-zinc-200">1x Large Pepperoni</p>
              <div className="mt-4">
                <Button variant="bump">BUMP ORDER</Button>
              </div>
            </div>
          </Card>

          <Card>
            <OrderCardHeader orderNumber="#398" timer="08:14" status="prep" />
            <div className="p-4">
              <p className="text-base font-bold text-white">David Chen</p>
              <p className="text-sm font-medium text-zinc-200">1x Caesar Salad</p>
              <div className="mt-4">
                <Button variant="check-temp">CHECK TEMP</Button>
              </div>
            </div>
          </Card>

          <Card>
            <OrderCardHeader orderNumber="#401" timer="00:00" status="ready" />
            <div className="p-4">
              <p className="text-base font-bold text-white">Sarah Kim</p>
              <p className="text-sm font-medium text-zinc-200">2x Margherita</p>
              <div className="mt-4">
                <Button variant="complete">COMPLETE</Button>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </main>
  )
}

export default App
