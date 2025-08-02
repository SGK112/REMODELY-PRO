'use client'

import { useState, useEffect } from 'react'
import {
    Plus,
    Calendar,
    MapPin,
    DollarSign,
    Clock,
    CheckSquare,
    Users,
    FileText,
    Camera,
    Edit,
    Trash2,
    Filter,
    Search,
    MoreHorizontal,
    AlertCircle,
    TrendingUp
} from 'lucide-react'
import Link from 'next/link'

// Project Status Types
type ProjectStatus = 'PLANNING' | 'IN_PROGRESS' | 'ON_HOLD' | 'COMPLETED' | 'CANCELLED'
type ProjectPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'

interface Project {
    id: string
    name: string
    description: string
    status: ProjectStatus
    priority: ProjectPriority
    customer: {
        name: string
        email: string
        phone: string
    }
    location: {
        address: string
        city: string
        state: string
    }
    budget: number
    actualCost: number
    startDate: Date
    endDate: Date
    progress: number
    tasks: {
        total: number
        completed: number
    }
    team: string[]
}

// Mock project data
const mockProjects: Project[] = [
    {
        id: '1',
        name: 'Kitchen Remodel - Johnson Residence',
        description: 'Complete kitchen renovation including cabinets, countertops, and appliances',
        status: 'IN_PROGRESS',
        priority: 'HIGH',
        customer: {
            name: 'Sarah Johnson',
            email: 'sarah@email.com',
            phone: '(555) 123-4567'
        },
        location: {
            address: '123 Oak Street',
            city: 'Phoenix',
            state: 'AZ'
        },
        budget: 45000,
        actualCost: 38000,
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-03-15'),
        progress: 75,
        tasks: { total: 12, completed: 9 },
        team: ['John Smith', 'Mike Wilson']
    },
    {
        id: '2',
        name: 'Bathroom Renovation - Davis Home',
        description: 'Master bathroom renovation with luxury finishes',
        status: 'PLANNING',
        priority: 'MEDIUM',
        customer: {
            name: 'Robert Davis',
            email: 'robert@email.com',
            phone: '(555) 987-6543'
        },
        location: {
            address: '456 Pine Avenue',
            city: 'Scottsdale',
            state: 'AZ'
        },
        budget: 28000,
        actualCost: 0,
        startDate: new Date('2024-03-01'),
        endDate: new Date('2024-04-30'),
        progress: 10,
        tasks: { total: 8, completed: 1 },
        team: ['John Smith']
    }
]

const statusColors = {
    'PLANNING': 'bg-blue-100 text-blue-800',
    'IN_PROGRESS': 'bg-yellow-100 text-yellow-800',
    'ON_HOLD': 'bg-orange-100 text-orange-800',
    'COMPLETED': 'bg-green-100 text-green-800',
    'CANCELLED': 'bg-red-100 text-red-800'
}

const priorityColors = {
    'LOW': 'bg-gray-100 text-gray-800',
    'MEDIUM': 'bg-blue-100 text-blue-800',
    'HIGH': 'bg-orange-100 text-orange-800',
    'URGENT': 'bg-red-100 text-red-800'
}

export default function ProjectManagementPage() {
    const [projects, setProjects] = useState<Project[]>(mockProjects)
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'ALL'>('ALL')
    const [showNewProjectModal, setShowNewProjectModal] = useState(false)

    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.customer.name.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === 'ALL' || project.status === statusFilter
        return matchesSearch && matchesStatus
    })

    const calculateStats = () => {
        return {
            total: projects.length,
            inProgress: projects.filter(p => p.status === 'IN_PROGRESS').length,
            completed: projects.filter(p => p.status === 'COMPLETED').length,
            totalBudget: projects.reduce((sum, p) => sum + p.budget, 0),
            avgProgress: Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length)
        }
    }

    const stats = calculateStats()

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Project Management</h1>
                        <p className="text-gray-600 mt-2">Organize and track all your construction projects</p>
                    </div>
                    <button
                        onClick={() => setShowNewProjectModal(true)}
                        className="bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-700 transition-colors flex items-center"
                    >
                        <Plus className="mr-2" size={20} />
                        New Project
                    </button>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Projects</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                            </div>
                            <FileText className="h-8 w-8 text-blue-600" />
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">In Progress</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.inProgress}</p>
                            </div>
                            <Clock className="h-8 w-8 text-yellow-600" />
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Completed</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
                            </div>
                            <CheckSquare className="h-8 w-8 text-green-600" />
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Budget</p>
                                <p className="text-2xl font-bold text-gray-900">${stats.totalBudget.toLocaleString()}</p>
                            </div>
                            <DollarSign className="h-8 w-8 text-purple-600" />
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Avg Progress</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.avgProgress}%</p>
                            </div>
                            <TrendingUp className="h-8 w-8 text-indigo-600" />
                        </div>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search projects or customers..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            />
                        </div>

                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value as ProjectStatus | 'ALL')}
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        >
                            <option value="ALL">All Status</option>
                            <option value="PLANNING">Planning</option>
                            <option value="IN_PROGRESS">In Progress</option>
                            <option value="ON_HOLD">On Hold</option>
                            <option value="COMPLETED">Completed</option>
                            <option value="CANCELLED">Cancelled</option>
                        </select>
                    </div>
                </div>

                {/* Project Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredProjects.map((project) => (
                        <div key={project.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                            <div className="p-6">
                                {/* Project Header */}
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{project.name}</h3>
                                        <p className="text-gray-600 text-sm mb-2">{project.description}</p>

                                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                                            <div className="flex items-center">
                                                <Users className="mr-1" size={14} />
                                                {project.customer.name}
                                            </div>
                                            <div className="flex items-center">
                                                <MapPin className="mr-1" size={14} />
                                                {project.location.city}, {project.location.state}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2 ml-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[project.status]}`}>
                                            {project.status.replace('_', ' ')}
                                        </span>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[project.priority]}`}>
                                            {project.priority}
                                        </span>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="mb-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium text-gray-700">Progress</span>
                                        <span className="text-sm text-gray-600">{project.progress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-orange-600 h-2 rounded-full transition-all"
                                            style={{ width: `${project.progress}%` }}
                                        ></div>
                                    </div>
                                </div>

                                {/* Project Stats */}
                                <div className="grid grid-cols-3 gap-4 mb-4">
                                    <div className="text-center">
                                        <p className="text-lg font-semibold text-gray-900">${project.budget.toLocaleString()}</p>
                                        <p className="text-xs text-gray-600">Budget</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-lg font-semibold text-gray-900">{project.tasks.completed}/{project.tasks.total}</p>
                                        <p className="text-xs text-gray-600">Tasks</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-lg font-semibold text-gray-900">{project.team.length}</p>
                                        <p className="text-xs text-gray-600">Team</p>
                                    </div>
                                </div>

                                {/* Timeline */}
                                <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
                                    <div>
                                        Start: {project.startDate.toLocaleDateString()}
                                    </div>
                                    <div>
                                        End: {project.endDate.toLocaleDateString()}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                                    <div className="flex space-x-2">
                                        <button className="text-gray-600 hover:text-gray-900 transition-colors">
                                            <Edit size={18} />
                                        </button>
                                        <button className="text-gray-600 hover:text-gray-900 transition-colors">
                                            <Camera size={18} />
                                        </button>
                                        <button className="text-gray-600 hover:text-gray-900 transition-colors">
                                            <FileText size={18} />
                                        </button>
                                    </div>

                                    <Link
                                        href={`/dashboard/contractor/tools/project-management/${project.id}`}
                                        className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredProjects.length === 0 && (
                    <div className="text-center py-12">
                        <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
                        <p className="text-gray-600 mb-4">
                            {searchTerm || statusFilter !== 'ALL'
                                ? 'Try adjusting your search or filters'
                                : 'Get started by creating your first project'
                            }
                        </p>
                        {!searchTerm && statusFilter === 'ALL' && (
                            <button
                                onClick={() => setShowNewProjectModal(true)}
                                className="bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-700 transition-colors"
                            >
                                Create Project
                            </button>
                        )}
                    </div>
                )}

                {/* Upgrade Notice for Free Plan */}
                <div className="mt-8 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <AlertCircle className="h-6 w-6 mr-3" />
                            <div>
                                <h3 className="font-semibold">Upgrade to Professional</h3>
                                <p className="text-orange-100 text-sm">Get unlimited projects, advanced task management, and team collaboration tools</p>
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
