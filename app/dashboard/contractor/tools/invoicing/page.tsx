'use client'

import { useState, useEffect } from 'react'
import {
    CreditCard,
    Plus,
    Send,
    Download,
    Eye,
    Edit,
    Trash2,
    Search,
    Filter,
    DollarSign,
    Calendar,
    CheckCircle,
    AlertCircle,
    Clock,
    FileText,
    Users,
    TrendingUp,
    Crown,
    Mail
} from 'lucide-react'
import Link from 'next/link'

type InvoiceStatus = 'DRAFT' | 'SENT' | 'VIEWED' | 'PAID' | 'OVERDUE' | 'CANCELLED'

interface InvoiceLineItem {
    id: string
    description: string
    quantity: number
    unitPrice: number
    total: number
}

interface Invoice {
    id: string
    invoiceNumber: string
    title: string
    customerName: string
    customerEmail: string
    customerAddress: string
    status: InvoiceStatus
    lineItems: InvoiceLineItem[]
    subtotal: number
    taxRate: number
    taxAmount: number
    total: number
    amountPaid: number
    amountDue: number
    issueDate: Date
    dueDate: Date
    paidAt?: Date
    notes?: string
}

// Mock invoice data
const mockInvoices: Invoice[] = [
    {
        id: '1',
        invoiceNumber: 'INV-2024-001',
        title: 'Kitchen Remodel - Johnson Residence',
        customerName: 'Sarah Johnson',
        customerEmail: 'sarah@email.com',
        customerAddress: '123 Oak Street, Phoenix, AZ 85001',
        status: 'PAID',
        lineItems: [
            {
                id: '1',
                description: 'Cabinet Installation',
                quantity: 20,
                unitPrice: 225,
                total: 4500
            },
            {
                id: '2',
                description: 'Granite Countertops',
                quantity: 45,
                unitPrice: 80,
                total: 3600
            }
        ],
        subtotal: 8100,
        taxRate: 0.087,
        taxAmount: 704.7,
        total: 8804.7,
        amountPaid: 8804.7,
        amountDue: 0,
        issueDate: new Date('2024-01-15'),
        dueDate: new Date('2024-02-14'),
        paidAt: new Date('2024-02-10')
    },
    {
        id: '2',
        invoiceNumber: 'INV-2024-002',
        title: 'Bathroom Renovation - Davis Home',
        customerName: 'Robert Davis',
        customerEmail: 'robert@email.com',
        customerAddress: '456 Pine Avenue, Scottsdale, AZ 85260',
        status: 'OVERDUE',
        lineItems: [
            {
                id: '1',
                description: 'Tile Installation',
                quantity: 120,
                unitPrice: 21,
                total: 2520
            }
        ],
        subtotal: 2520,
        taxRate: 0.087,
        taxAmount: 219.25,
        total: 2739.25,
        amountPaid: 0,
        amountDue: 2739.25,
        issueDate: new Date('2024-01-01'),
        dueDate: new Date('2024-01-31')
    }
]

const statusColors = {
    'DRAFT': 'bg-gray-100 text-gray-800 border border-gray-300',
    'SENT': 'bg-blue-100 text-blue-800 border border-blue-300',
    'VIEWED': 'bg-yellow-100 text-yellow-800 border border-yellow-300',
    'PAID': 'bg-green-100 text-green-800 border border-green-300',
    'OVERDUE': 'bg-red-100 text-red-800 border border-red-300',
    'CANCELLED': 'bg-gray-100 text-gray-800 border border-gray-300'
}

const statusIcons = {
    'DRAFT': FileText,
    'SENT': Mail,
    'VIEWED': Eye,
    'PAID': CheckCircle,
    'OVERDUE': AlertCircle,
    'CANCELLED': Trash2
}

export default function InvoicingPage() {
    const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices)
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState<InvoiceStatus | 'ALL'>('ALL')
    const [showNewInvoice, setShowNewInvoice] = useState(false)

    const filteredInvoices = invoices.filter(invoice => {
        const matchesSearch = invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            invoice.title.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === 'ALL' || invoice.status === statusFilter
        return matchesSearch && matchesStatus
    })

    const calculateStats = () => {
        const totalInvoices = invoices.length
        const totalAmount = invoices.reduce((sum, inv) => sum + inv.total, 0)
        const paidAmount = invoices.reduce((sum, inv) => sum + inv.amountPaid, 0)
        const outstandingAmount = invoices.reduce((sum, inv) => sum + inv.amountDue, 0)
        const overdueAmount = invoices
            .filter(inv => inv.status === 'OVERDUE')
            .reduce((sum, inv) => sum + inv.amountDue, 0)

        return {
            totalInvoices,
            totalAmount,
            paidAmount,
            outstandingAmount,
            overdueAmount,
            paidCount: invoices.filter(inv => inv.status === 'PAID').length,
            overdueCount: invoices.filter(inv => inv.status === 'OVERDUE').length
        }
    }

    const stats = calculateStats()

    const getStatusIcon = (status: InvoiceStatus) => {
        const Icon = statusIcons[status]
        return <Icon size={16} />
    }

    const isOverdue = (invoice: Invoice) => {
        return invoice.status !== 'PAID' && new Date() > invoice.dueDate
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Invoicing & Payments</h1>
                        <p className="text-gray-600 mt-2">Professional billing and payment management</p>
                    </div>
                    <button
                        onClick={() => setShowNewInvoice(true)}
                        className="bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-700 transition-colors flex items-center"
                    >
                        <Plus className="mr-2" size={20} />
                        New Invoice
                    </button>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Invoices</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.totalInvoices}</p>
                            </div>
                            <FileText className="h-8 w-8 text-blue-600" />
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Amount</p>
                                <p className="text-2xl font-bold text-gray-900">${stats.totalAmount.toLocaleString()}</p>
                            </div>
                            <DollarSign className="h-8 w-8 text-purple-600" />
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Paid ({stats.paidCount})</p>
                                <p className="text-2xl font-bold text-green-900">${stats.paidAmount.toLocaleString()}</p>
                            </div>
                            <CheckCircle className="h-8 w-8 text-green-600" />
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Outstanding</p>
                                <p className="text-2xl font-bold text-yellow-900">${stats.outstandingAmount.toLocaleString()}</p>
                            </div>
                            <Clock className="h-8 w-8 text-yellow-600" />
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Overdue ({stats.overdueCount})</p>
                                <p className="text-2xl font-bold text-red-900">${stats.overdueAmount.toLocaleString()}</p>
                            </div>
                            <AlertCircle className="h-8 w-8 text-red-600" />
                        </div>
                    </div>
                </div>

                {/* Quick Actions Bar */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 flex-1">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search invoices..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                />
                            </div>

                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value as InvoiceStatus | 'ALL')}
                                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            >
                                <option value="ALL">All Status</option>
                                <option value="DRAFT">Draft</option>
                                <option value="SENT">Sent</option>
                                <option value="VIEWED">Viewed</option>
                                <option value="PAID">Paid</option>
                                <option value="OVERDUE">Overdue</option>
                                <option value="CANCELLED">Cancelled</option>
                            </select>
                        </div>

                        <div className="flex space-x-3">
                            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                                <Download className="mr-2" size={16} />
                                Export
                            </button>

                            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                <Send className="mr-2" size={16} />
                                Send Reminders
                            </button>
                        </div>
                    </div>
                </div>

                {/* Invoices Table */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">Invoices</h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="text-left py-4 px-6 font-medium text-gray-900">Invoice</th>
                                    <th className="text-left py-4 px-6 font-medium text-gray-900">Customer</th>
                                    <th className="text-left py-4 px-6 font-medium text-gray-900">Amount</th>
                                    <th className="text-left py-4 px-6 font-medium text-gray-900">Status</th>
                                    <th className="text-left py-4 px-6 font-medium text-gray-900">Due Date</th>
                                    <th className="text-right py-4 px-6 font-medium text-gray-900">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredInvoices.map((invoice) => (
                                    <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="py-4 px-6">
                                            <div>
                                                <div className="font-medium text-gray-900">{invoice.invoiceNumber}</div>
                                                <div className="text-sm text-gray-600">{invoice.title}</div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div>
                                                <div className="font-medium text-gray-900">{invoice.customerName}</div>
                                                <div className="text-sm text-gray-600">{invoice.customerEmail}</div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div>
                                                <div className="font-medium text-gray-900">${invoice.total.toLocaleString()}</div>
                                                {invoice.amountDue > 0 && (
                                                    <div className="text-sm text-red-600">Due: ${invoice.amountDue.toLocaleString()}</div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[invoice.status]}`}>
                                                <span className="mr-1">{getStatusIcon(invoice.status)}</span>
                                                {invoice.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className={`text-sm ${isOverdue(invoice) ? 'text-red-600 font-medium' : 'text-gray-900'}`}>
                                                {invoice.dueDate.toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <div className="flex justify-end space-x-2">
                                                <button className="text-gray-600 hover:text-gray-900 transition-colors p-1">
                                                    <Eye size={16} />
                                                </button>
                                                <button className="text-gray-600 hover:text-gray-900 transition-colors p-1">
                                                    <Edit size={16} />
                                                </button>
                                                <button className="text-gray-600 hover:text-gray-900 transition-colors p-1">
                                                    <Download size={16} />
                                                </button>
                                                <button className="text-gray-600 hover:text-gray-900 transition-colors p-1">
                                                    <Send size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredInvoices.length === 0 && (
                        <div className="text-center py-12">
                            <CreditCard className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No invoices found</h3>
                            <p className="text-gray-600 mb-4">
                                {searchTerm || statusFilter !== 'ALL'
                                    ? 'Try adjusting your search or filters'
                                    : 'Get started by creating your first invoice'
                                }
                            </p>
                            {!searchTerm && statusFilter === 'ALL' && (
                                <button
                                    onClick={() => setShowNewInvoice(true)}
                                    className="bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-700 transition-colors"
                                >
                                    Create Invoice
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* Payment Processing Section */}
                <div className="mt-8 bg-white rounded-xl shadow-sm p-8">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">Payment Processing</h2>
                            <p className="text-gray-600">Accept online payments and automate your billing process</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                            <span className="text-sm text-gray-600">Not Connected</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center p-6 border border-gray-200 rounded-xl">
                            <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="font-semibold text-gray-900 mb-2">Credit Cards</h3>
                            <p className="text-sm text-gray-600 mb-4">Accept Visa, Mastercard, American Express</p>
                            <div className="text-sm text-gray-500">2.9% + 30¢ per transaction</div>
                        </div>

                        <div className="text-center p-6 border border-gray-200 rounded-xl">
                            <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="font-semibold text-gray-900 mb-2">ACH/Bank Transfer</h3>
                            <p className="text-sm text-gray-600 mb-4">Direct bank account transfers</p>
                            <div className="text-sm text-gray-500">1% per transaction (max $10)</div>
                        </div>

                        <div className="text-center p-6 border border-gray-200 rounded-xl">
                            <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="font-semibold text-gray-900 mb-2">Recurring Billing</h3>
                            <p className="text-sm text-gray-600 mb-4">Automated subscription payments</p>
                            <div className="text-sm text-gray-500">Standard rates apply</div>
                        </div>
                    </div>

                    <div className="mt-6 text-center">
                        <button className="bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-orange-700 transition-colors">
                            Connect Payment Processor
                        </button>
                    </div>
                </div>

                {/* Upgrade Notice */}
                <div className="mt-8 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Crown className="h-6 w-6 mr-3" />
                            <div>
                                <h3 className="font-semibold">Upgrade for Advanced Invoicing</h3>
                                <p className="text-orange-100 text-sm">Get unlimited invoices, automated reminders, recurring billing, and integrated payments</p>
                            </div>
                        </div>
                        <Link
                            href="/dashboard/contractor/tools#pricing"
                            className="bg-white text-orange-600 px-4 py-2 rounded-lg font-medium hover:bg-orange-50 transition-colors"
                        >
                            Upgrade Now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
