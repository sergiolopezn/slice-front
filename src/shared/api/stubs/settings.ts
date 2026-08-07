export type StoreSettingsStub = {
  storeName: string
}

const NOT_IMPLEMENTED = 'Settings API not implemented — backend route pending.'

export async function fetchStoreSettings(): Promise<StoreSettingsStub> {
  throw new Error(NOT_IMPLEMENTED)
}
