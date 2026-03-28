import { useState, useCallback } from 'react'

interface LineItem {
  description: string
  quantity: number
  unitPrice: number
}

function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount)
}

export function InvoiceGenerator() {
  const [companyName, setCompanyName] = useState('')
  const [companyAddress, setCompanyAddress] = useState('')
  const [companyEmail, setCompanyEmail] = useState('')
  const [clientName, setClientName] = useState('')
  const [clientAddress, setClientAddress] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [invoiceNumber, setInvoiceNumber] = useState('INV-001')
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0])
  const [dueDate, setDueDate] = useState('')
  const [currency, setCurrency] = useState('USD')
  const [taxRate, setTaxRate] = useState(0)
  const [notes, setNotes] = useState('')
  const [items, setItems] = useState<LineItem[]>([
    { description: '', quantity: 1, unitPrice: 0 },
  ])
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState('')

  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
  const tax = subtotal * (taxRate / 100)
  const total = subtotal + tax

  function updateItem(index: number, field: keyof LineItem, value: string | number) {
    setItems(prev => prev.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    ))
  }

  function addItem() {
    setItems(prev => [...prev, { description: '', quantity: 1, unitPrice: 0 }])
  }

  function removeItem(index: number) {
    if (items.length <= 1) return
    setItems(prev => prev.filter((_, i) => i !== index))
  }

  const generatePDF = useCallback(async () => {
    setGenerating(true)
    setError('')
    try {
      const { default: jsPDF } = await import('jspdf')
      const doc = new jsPDF()
      const pageWidth = doc.internal.pageSize.getWidth()
      let y = 20

      // Header
      doc.setFontSize(24)
      doc.setFont('helvetica', 'bold')
      doc.text('INVOICE', pageWidth - 20, y, { align: 'right' })

      // Company info
      doc.setFontSize(12)
      doc.setFont('helvetica', 'bold')
      if (companyName) { doc.text(companyName, 20, y); y += 6 }
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(9)
      if (companyAddress) { doc.text(companyAddress, 20, y); y += 5 }
      if (companyEmail) { doc.text(companyEmail, 20, y); y += 5 }

      y = Math.max(y, 40) + 5

      // Invoice details
      doc.setFontSize(9)
      doc.text(`Invoice #: ${invoiceNumber}`, pageWidth - 20, 30, { align: 'right' })
      doc.text(`Date: ${invoiceDate}`, pageWidth - 20, 35, { align: 'right' })
      if (dueDate) doc.text(`Due: ${dueDate}`, pageWidth - 20, 40, { align: 'right' })

      // Bill to
      doc.setFontSize(10)
      doc.setFont('helvetica', 'bold')
      doc.text('Bill To:', 20, y); y += 6
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(9)
      if (clientName) { doc.text(clientName, 20, y); y += 5 }
      if (clientAddress) { doc.text(clientAddress, 20, y); y += 5 }
      if (clientEmail) { doc.text(clientEmail, 20, y); y += 5 }

      y += 10

      // Table header
      doc.setFillColor(240, 240, 240)
      doc.rect(20, y - 4, pageWidth - 40, 8, 'F')
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(9)
      doc.text('Description', 22, y)
      doc.text('Qty', 120, y, { align: 'center' })
      doc.text('Unit Price', 145, y, { align: 'center' })
      doc.text('Amount', pageWidth - 22, y, { align: 'right' })
      y += 8

      // Table rows
      doc.setFont('helvetica', 'normal')
      for (const item of items) {
        if (item.description || item.unitPrice > 0) {
          if (y > 260) { doc.addPage(); y = 20 }
          const descLines = doc.splitTextToSize(item.description || '—', 90)
          doc.text(descLines, 22, y)
          doc.text(String(item.quantity), 120, y, { align: 'center' })
          doc.text(formatCurrency(item.unitPrice, currency), 145, y, { align: 'center' })
          doc.text(formatCurrency(item.quantity * item.unitPrice, currency), pageWidth - 22, y, { align: 'right' })
          y += Math.max(7, descLines.length * 5)
        }
      }

      y += 5
      doc.setDrawColor(200, 200, 200)
      doc.line(20, y, pageWidth - 20, y)
      y += 8

      // Totals
      doc.setFontSize(9)
      doc.text('Subtotal:', 130, y)
      doc.text(formatCurrency(subtotal, currency), pageWidth - 22, y, { align: 'right' })
      y += 6
      if (taxRate > 0) {
        doc.text(`Tax (${taxRate}%):`, 130, y)
        doc.text(formatCurrency(tax, currency), pageWidth - 22, y, { align: 'right' })
        y += 6
      }
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(11)
      doc.text('Total:', 130, y)
      doc.text(formatCurrency(total, currency), pageWidth - 22, y, { align: 'right' })

      // Notes
      if (notes) {
        y += 15
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(9)
        doc.text('Notes:', 20, y)
        y += 5
        doc.setFont('helvetica', 'normal')
        const noteLines = doc.splitTextToSize(notes, pageWidth - 40)
        doc.text(noteLines, 20, y)
      }

      doc.save(`${invoiceNumber || 'invoice'}.pdf`)
    } catch (e) {
      console.error('Failed to generate PDF', e)
      setError('Failed to generate PDF. Please try again.')
    } finally {
      setGenerating(false)
    }
  }, [companyName, companyAddress, companyEmail, clientName, clientAddress, clientEmail, invoiceNumber, invoiceDate, dueDate, currency, taxRate, notes, items, subtotal, tax, total])

  const inputClass = 'w-full p-2 rounded border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]'
  const labelClass = 'block text-xs font-medium text-[var(--color-text-muted)] mb-1'

  return (
    <div className="space-y-6">
      {/* Company & Client */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h3 className="font-semibold text-sm">Your Company</h3>
          <div>
            <label className={labelClass}>Company Name</label>
            <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Your Company Name" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Address</label>
            <input type="text" value={companyAddress} onChange={(e) => setCompanyAddress(e.target.value)} placeholder="123 Main St, City" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Email</label>
            <input type="email" value={companyEmail} onChange={(e) => setCompanyEmail(e.target.value)} placeholder="you@company.com" className={inputClass} />
          </div>
        </div>
        <div className="space-y-3">
          <h3 className="font-semibold text-sm">Bill To</h3>
          <div>
            <label className={labelClass}>Client Name</label>
            <input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Client Name" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Address</label>
            <input type="text" value={clientAddress} onChange={(e) => setClientAddress(e.target.value)} placeholder="456 Client Ave, City" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Email</label>
            <input type="email" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} placeholder="client@example.com" className={inputClass} />
          </div>
        </div>
      </div>

      {/* Invoice details */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div>
          <label className={labelClass}>Invoice #</label>
          <input type="text" value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Date</label>
          <input type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Due Date</label>
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Currency</label>
          <select value={currency} onChange={(e) => setCurrency(e.target.value)} className={inputClass}>
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="CHF">CHF</option>
            <option value="JPY">JPY (¥)</option>
          </select>
        </div>
      </div>

      {/* Line items */}
      <div className="space-y-2">
        <h3 className="font-semibold text-sm">Line Items</h3>
        <div className="hidden sm:grid grid-cols-[1fr_80px_100px_auto] gap-2 text-xs font-medium text-[var(--color-text-muted)]">
          <span>Description</span><span>Qty</span><span>Unit Price</span><span />
        </div>
        {items.map((item, i) => (
          <div key={i} className="grid grid-cols-1 sm:grid-cols-[1fr_80px_100px_auto] gap-2 items-center">
            <input
              type="text"
              value={item.description}
              onChange={(e) => updateItem(i, 'description', e.target.value)}
              placeholder="Item description"
              className={inputClass}
            />
            <input
              type="number"
              min={1}
              value={item.quantity}
              onChange={(e) => updateItem(i, 'quantity', Math.max(1, Number(e.target.value)))}
              className={inputClass}
            />
            <input
              type="number"
              min={0}
              step={0.01}
              value={item.unitPrice || ''}
              onChange={(e) => updateItem(i, 'unitPrice', Number(e.target.value))}
              placeholder="0.00"
              className={inputClass}
            />
            {items.length > 1 && (
              <button
                onClick={() => removeItem(i)}
                className="px-2 py-1 text-sm rounded border border-[var(--color-border)] hover:bg-[var(--color-error-bg)] hover:text-[var(--color-error-text)] transition-colors"
              >
                ×
              </button>
            )}
          </div>
        ))}
        <button
          onClick={addItem}
          className="px-3 py-1.5 text-sm rounded-md border border-[var(--color-border)] bg-[var(--color-surface-alt)] hover:bg-[var(--color-border)] transition-colors"
        >
          + Add Item
        </button>
      </div>

      {/* Tax & Notes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Tax Rate (%)</label>
          <input type="number" min={0} max={100} step={0.1} value={taxRate || ''} onChange={(e) => setTaxRate(Number(e.target.value))} placeholder="0" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Notes</label>
          <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Payment terms, thank you note..." className={inputClass} />
        </div>
      </div>

      {/* Totals */}
      <div className="p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-[var(--color-text-muted)]">Subtotal</span>
          <span className="font-mono">{formatCurrency(subtotal, currency)}</span>
        </div>
        {taxRate > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-[var(--color-text-muted)]">Tax ({taxRate}%)</span>
            <span className="font-mono">{formatCurrency(tax, currency)}</span>
          </div>
        )}
        <div className="flex justify-between font-bold text-lg pt-2 border-t border-[var(--color-border)]">
          <span>Total</span>
          <span className="font-mono">{formatCurrency(total, currency)}</span>
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-lg text-sm" style={{ border: '1px solid var(--color-error-border)', background: 'var(--color-error-bg)', color: 'var(--color-error-text)' }}>
          {error}
        </div>
      )}

      {/* Generate button */}
      <button
        onClick={generatePDF}
        disabled={generating}
        className="w-full py-3 rounded-lg bg-[var(--color-primary)] text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {generating ? 'Generating PDF...' : 'Download PDF Invoice'}
      </button>
    </div>
  )
}
