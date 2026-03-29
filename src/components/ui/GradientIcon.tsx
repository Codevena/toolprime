import {
  Braces, KeyRound, Palette, Image, Type, Lock, QrCode, FileText,
  Link, ArrowLeftRight, Clock, Regex, Database, GitCompare, ImageDown,
  Binary, Percent, CaseSensitive, Fingerprint, Blend, Receipt,
  FileCode, FileDown, Table, FileImage, Code, Bot, Timer, Paintbrush,
  Home, Heart, HandCoins, DollarSign, Calendar, Divide, Globe, CalendarDays,
  TrendingUp,
} from 'lucide-react'
import { categoryGradients, type ToolCategory } from '@/data/tools'
import type { LucideIcon } from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  Braces, KeyRound, Palette, Image, Type, Lock, QrCode, FileText,
  Link, ArrowLeftRight, Clock, Regex, Database, GitCompare, ImageDown,
  Binary, Percent, CaseSensitive, Fingerprint, Blend, Receipt,
  FileCode, FileDown, Table, FileImage, Code, Bot, Timer, Paintbrush,
  Home, Heart, HandCoins, DollarSign, Calendar, Divide, Globe, CalendarDays,
  TrendingUp,
}

interface GradientIconProps {
  icon: string
  category: ToolCategory
  size?: number
}

export function GradientIcon({ icon, category, size = 32 }: GradientIconProps) {
  const IconComponent = iconMap[icon]
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
