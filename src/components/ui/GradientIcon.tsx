import * as LucideIcons from 'lucide-react'
import { categoryGradients, type ToolCategory } from '@/data/tools'

interface GradientIconProps {
  icon: string
  category: ToolCategory
  size?: number
}

export function GradientIcon({ icon, category, size = 32 }: GradientIconProps) {
  const IconComponent = (LucideIcons as Record<string, React.ComponentType<{ size: number; color: string }>>)[icon]
  const iconSize = Math.round(size * 0.5)

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.25,
        background: categoryGradients[category],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      {IconComponent ? (
        <IconComponent size={iconSize} color="white" />
      ) : (
        <span style={{ color: 'white', fontSize: iconSize, fontWeight: 700 }}>?</span>
      )}
    </div>
  )
}
