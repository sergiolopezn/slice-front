import { useEffect, useState } from 'react'
import { Badge, Card } from '@/shared/components/ui'
import type { StoreSettingsSnapshot } from '../types/settings'
import { BotIcon, LinkIcon } from './icons'

type TelegramIntegrationCardProps = {
  settings: Pick<
    StoreSettingsSnapshot,
    | 'botHandle'
    | 'botConnected'
    | 'webhookUrl'
    | 'webhookLatencyMs'
    | 'adminTelegramHandle'
    | 'adminTelegramChatId'
    | 'lastTestNotificationAt'
  >
  disabled?: boolean
  testSuccessMessage?: string | null
  onAdminHandleChange: (handle: string) => void
  onSendTest: () => void
}

export function TelegramIntegrationCard({
  settings,
  disabled,
  testSuccessMessage,
  onAdminHandleChange,
  onSendTest,
}: TelegramIntegrationCardProps) {
  const isLinked = settings.adminTelegramChatId !== null
  const [draftHandle, setDraftHandle] = useState('')

  useEffect(() => {
    if (isLinked) {
      setDraftHandle('')
      return
    }

    setDraftHandle(settings.adminTelegramHandle)
  }, [isLinked, settings.adminTelegramHandle])

  const helperId = 'admin-telegram-handle-helper'
  const inputValue = isLinked ? '' : draftHandle

  return (
    <Card className="p-5" data-testid="telegram-integration-card">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <BotIcon className="text-text-muted" />
          <div>
            <h2 className="text-base font-bold text-white">Telegram Integration & Admin Alerts</h2>
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

      <div className="mt-5">
        <label
          htmlFor="admin-telegram-handle"
          data-testid="admin-telegram-handle-label"
          className="text-xs font-bold uppercase tracking-wider text-status-prep-amber"
        >
          Admin Telegram Handle
        </label>
        <input
          id="admin-telegram-handle"
          data-testid="admin-telegram-handle-input"
          type="text"
          value={inputValue}
          placeholder="Manager official Telegram username"
          disabled={disabled}
          aria-describedby={helperId}
          onChange={(event) => setDraftHandle(event.target.value)}
          onBlur={() => {
            if (!isLinked && draftHandle !== settings.adminTelegramHandle) {
              onAdminHandleChange(draftHandle)
            }
          }}
          className="mt-2 min-h-12 w-full rounded-xl border border-surface-border bg-bg-app px-4 py-2 font-mono text-sm text-white placeholder:text-text-muted disabled:cursor-not-allowed disabled:opacity-50"
        />
        <p
          id={helperId}
          data-testid="admin-telegram-handle-helper"
          className="mt-2 text-xs text-status-prep-amber"
        >
          Only messages from this Telegram handle can trigger admin commands.
        </p>

        {isLinked ? (
          <div
            data-testid="admin-telegram-linked-status"
            className="mt-3 flex items-start gap-3 rounded-xl bg-bg-app px-4 py-3"
          >
            <LinkIcon className="mt-0.5 text-status-ready-mint" />
            <div>
              <p className="font-bold text-white">
                Linked Chat ID: {settings.adminTelegramChatId}
              </p>
              <p className="text-sm text-text-muted">({settings.adminTelegramHandle})</p>
            </div>
          </div>
        ) : null}
      </div>

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
    </Card>
  )
}
