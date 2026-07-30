import { Badge, Card } from '@/shared/components/ui'
import type { NotificationTrigger, StoreSettingsSnapshot } from '../types/settings'
import { NOTIFICATION_TRIGGER_LABELS } from '../types/settings'
import { BotIcon } from './icons'
import { SettingsToggle } from './SettingsToggle'

type TelegramBotConfigCardProps = {
  settings: Pick<
    StoreSettingsSnapshot,
    | 'botHandle'
    | 'botConnected'
    | 'webhookUrl'
    | 'webhookLatencyMs'
    | 'notificationTriggers'
    | 'lastTestNotificationAt'
  >
  disabled?: boolean
  testSuccessMessage?: string | null
  onTriggerChange: (trigger: NotificationTrigger, enabled: boolean) => void
  onSendTest: () => void
}

export function TelegramBotConfigCard({
  settings,
  disabled,
  testSuccessMessage,
  onTriggerChange,
  onSendTest,
}: TelegramBotConfigCardProps) {
  return (
    <Card className="p-5" data-testid="telegram-bot-config-card">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <BotIcon className="text-text-muted" />
          <div>
            <h2 className="text-base font-bold text-white">Telegram Bot Status</h2>
            <p className="mt-1 font-mono text-sm text-status-prep-amber">{settings.botHandle}</p>
          </div>
        </div>
        <Badge
          variant={settings.botConnected ? 'ready' : 'rush'}
          data-testid="bot-connection-badge"
          className="inline-flex items-center gap-1.5 normal-case tracking-normal"
        >
          <span aria-hidden="true">{settings.botConnected ? '🟢' : '🔴'}</span>
          {settings.botConnected ? 'Connected' : 'Disconnected'}
        </Badge>
      </div>

      <dl className="mt-5 space-y-3 text-sm">
        <div>
          <dt className="text-text-muted">Webhook URL</dt>
          <dd className="mt-1 break-all font-mono text-white">{settings.webhookUrl}</dd>
        </div>
        <div>
          <dt className="text-text-muted">Latency</dt>
          <dd className="mt-1 font-mono text-status-prep-amber" data-testid="webhook-latency">
            {settings.webhookLatencyMs}ms
          </dd>
        </div>
      </dl>

      <button
        type="button"
        data-testid="send-test-notification"
        disabled={disabled}
        onClick={onSendTest}
        className="mt-5 min-h-12 w-full rounded-xl border border-surface-border px-4 py-2 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-status-idle-gray disabled:opacity-50"
      >
        Send Test Notification
      </button>

      {testSuccessMessage ? (
        <p className="mt-3 text-sm font-medium text-status-ready-mint" data-testid="test-notification-success">
          {testSuccessMessage}
        </p>
      ) : null}

      {settings.lastTestNotificationAt ? (
        <p className="mt-2 text-xs text-text-muted">
          Last test: {settings.lastTestNotificationAt}
        </p>
      ) : null}

      <div className="mt-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-text-muted">
          Notification Triggers
        </h3>
        <div className="mt-3 space-y-3">
          {(Object.keys(NOTIFICATION_TRIGGER_LABELS) as NotificationTrigger[]).map((trigger) => (
            <div key={trigger} className="flex items-center justify-between gap-4">
              <label htmlFor={`trigger-${trigger}`} className="text-sm font-medium text-white">
                {NOTIFICATION_TRIGGER_LABELS[trigger]}
              </label>
              <SettingsToggle
                id={`trigger-${trigger}`}
                label={NOTIFICATION_TRIGGER_LABELS[trigger]}
                checked={settings.notificationTriggers[trigger]}
                disabled={disabled}
                onChange={(enabled) => onTriggerChange(trigger, enabled)}
              />
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
