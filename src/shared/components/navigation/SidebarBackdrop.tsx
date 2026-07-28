type SidebarBackdropProps = {
  isOpen: boolean
  onClose: () => void
}

export function SidebarBackdrop({ isOpen, onClose }: SidebarBackdropProps) {
  if (!isOpen) return null

  return (
    <button
      type="button"
      data-testid="sidebar-backdrop"
      aria-label="Close navigation menu"
      onClick={onClose}
      className="fixed inset-0 z-30 bg-black/60 lg:hidden"
    />
  )
}
