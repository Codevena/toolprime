export interface TipPreset {
  slug: string
  amount: number
  title: string
  description: string
  tips: Array<{ percent: number; tipAmount: number; total: number }>
  faqs: Array<{ question: string; answer: string }>
  relatedTips: string[]
}

const tipPercents = [10, 15, 18, 20, 25]

const billAmounts = [
  10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 75, 80, 90, 100,
  120, 150, 175, 200, 250, 300, 350, 400, 500, 600, 750, 800, 1000,
]

function formatCurrency(n: number): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

function buildSlug(amount: number): string {
  return `tip-on-${amount}`
}

function getRelated(amount: number): string[] {
  return billAmounts
    .filter((a) => a !== amount)
    .sort((a, b) => Math.abs(a - amount) - Math.abs(b - amount))
    .slice(0, 8)
    .map(buildSlug)
}

export const tipPresets: TipPreset[] = billAmounts.map((amount) => {
  const tips = tipPercents.map((percent) => {
    const tipAmount = Math.round(amount * (percent / 100) * 100) / 100
    const total = Math.round((amount + tipAmount) * 100) / 100
    return { percent, tipAmount, total }
  })

  const slug = buildSlug(amount)
  const amountLabel = formatCurrency(amount)

  return {
    slug,
    amount,
    title: `Tip on ${amountLabel} Bill — How Much to Tip`,
    description: `Calculate the tip on a ${amountLabel} bill. At 15% the tip is ${formatCurrency(tips[1]!.tipAmount)}, at 20% it's ${formatCurrency(tips[3]!.tipAmount)}. See all tip percentages.`,
    tips,
    faqs: [
      {
        question: `How much should I tip on a ${amountLabel} bill?`,
        answer: `For a ${amountLabel} bill, a 15% tip is ${formatCurrency(tips[1]!.tipAmount)} (total ${formatCurrency(tips[1]!.total)}), an 18% tip is ${formatCurrency(tips[2]!.tipAmount)} (total ${formatCurrency(tips[2]!.total)}), and a 20% tip is ${formatCurrency(tips[3]!.tipAmount)} (total ${formatCurrency(tips[3]!.total)}).`,
      },
      {
        question: `What is 20% of ${amountLabel}?`,
        answer: `20% of ${amountLabel} is ${formatCurrency(tips[3]!.tipAmount)}. Adding this tip to the bill gives a total of ${formatCurrency(tips[3]!.total)}.`,
      },
      {
        question: `Is ${formatCurrency(tips[1]!.tipAmount)} a good tip on ${amountLabel}?`,
        answer: `${formatCurrency(tips[1]!.tipAmount)} on a ${amountLabel} bill is a 15% tip, which is the minimum standard for restaurant service in the US. For good service, consider tipping 18%–20% (${formatCurrency(tips[2]!.tipAmount)}–${formatCurrency(tips[3]!.tipAmount)}).`,
      },
    ],
    relatedTips: getRelated(amount),
  }
})

export function getTipBySlug(slug: string): TipPreset | undefined {
  return tipPresets.find((p) => p.slug === slug)
}
