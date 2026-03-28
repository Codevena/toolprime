export interface ToolContentSection {
  title: string
  description: string
}

export interface ToolComparison {
  heading: string
  headers: string[]
  rows: string[][]
}

export interface ToolContent {
  whatIs: {
    heading: string
    body: string
  }
  useCases: {
    heading: string
    items: ToolContentSection[]
  }
  tips: {
    heading: string
    items: ToolContentSection[]
  }
  comparison?: ToolComparison
}

import { toolContent1 } from './tool-content-1'
import { toolContent2 } from './tool-content-2'
import { toolContent3 } from './tool-content-3'
import { toolContent4 } from './tool-content-4'

export const allToolContent: Record<string, ToolContent> = {
  ...toolContent1,
  ...toolContent2,
  ...toolContent3,
  ...toolContent4,
}
