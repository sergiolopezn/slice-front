import type { MenuCategoryTab } from '../types/menu'

const tabs: { id: MenuCategoryTab; label: string }[] = [
  { id: 'pizzas', label: 'Pizzas' },
  { id: 'sides-drinks', label: 'Sides & Drinks' },
  { id: 'toppings', label: 'Toppings & Modifiers' },
]

type CategoryTabsProps = {
  activeTab: MenuCategoryTab
  onTabChange: (tab: MenuCategoryTab) => void
}

export function CategoryTabs({ activeTab, onTabChange }: CategoryTabsProps) {
  return (
    <nav aria-label="Menu categories" data-testid="category-tabs">
      <ul className="flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id

          return (
            <li key={tab.id}>
              <button
                type="button"
                role="tab"
                aria-selected={isActive}
                data-testid={`category-tab-${tab.id}`}
                onClick={() => onTabChange(tab.id)}
                className={`min-h-12 rounded-xl px-4 py-3 text-sm font-bold transition-colors ${
                  isActive
                    ? 'bg-nav-active text-nav-active-text'
                    : 'text-text-muted hover:bg-status-idle-gray hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
