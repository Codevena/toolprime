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
import { toolContent5 } from './tool-content-5'
import { toolContent6 } from './tool-content-6'
import { toolContent7 } from './tool-content-7'
import { toolContent8 } from './tool-content-8'
import { toolContent9 } from './tool-content-9'
import { toolContent10 } from './tool-content-10'
import { toolContent11 } from './tool-content-11'
import { toolContent12 } from './tool-content-12'
import { toolContent13 } from './tool-content-13'

export const allToolContent: Record<string, ToolContent> = {
  ...toolContent1,
  ...toolContent2,
  ...toolContent3,
  ...toolContent4,
  ...toolContent5,
  ...toolContent6,
  ...toolContent7,
  ...toolContent8,
  ...toolContent9,
  ...toolContent10,
  ...toolContent11,
  ...toolContent12,
  ...toolContent13,
}
