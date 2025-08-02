import { Metadata } from 'next'
import ContractorDashboard from '@/components/dashboard/ContractorDashboard'

export const metadata: Metadata = {
    title: 'PRO Dashboard | REMODELY AI PRO',
    description: 'Manage your contracting business, view leads, and track performance with REMODELY AI PRO.',
}

export default function ContractorDashboardPage() {
    return <ContractorDashboard />
}
