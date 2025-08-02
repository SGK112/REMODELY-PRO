import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Extended Prisma schema for contractor tools
// This would be added to schema.prisma

const contractorToolsSchema = `
// Professional Tools & Services for Contractors

model ContractorSubscription {
  id            String   @id @default(cuid())
  contractorId  String
  contractor    Contractor @relation(fields: [contractorId], references: [id], onDelete: Cascade)
  
  // Subscription Details
  planType      SubscriptionPlan @default(FREE)
  status        SubscriptionStatus @default(ACTIVE)
  startDate     DateTime @default(now())
  endDate       DateTime?
  billingCycle  BillingCycle @default(MONTHLY)
  
  // Feature Access
  features      Json // Feature flags for what tools are enabled
  maxProjects   Int @default(3)
  maxClients    Int @default(10)
  maxInvoices   Int @default(5)
  maxEstimates  Int @default(10)
  
  // Billing
  monthlyPrice  Float @default(0)
  yearlyPrice   Float @default(0)
  lastBilled    DateTime?
  nextBilling   DateTime?
  
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

model Project {
  id            String   @id @default(cuid())
  contractorId  String
  contractor    Contractor @relation(fields: [contractorId], references: [id])
  customerId    String?
  customer      Customer? @relation(fields: [customerId], references: [id])
  
  // Project Details
  name          String
  description   String?
  status        ProjectStatus @default(PLANNING)
  priority      ProjectPriority @default(MEDIUM)
  
  // Dates & Timeline
  startDate     DateTime?
  endDate       DateTime?
  estimatedDuration Int? // in days
  actualDuration    Int? // in days
  
  // Financial
  budgetAmount  Float?
  actualCost    Float?
  profitMargin  Float?
  
  // Location
  address       String?
  city          String?
  state         String?
  zipCode       String?
  
  // Project Management
  tasks         Task[]
  milestones    Milestone[]
  documents     ProjectDocument[]
  photos        ProjectPhoto[]
  estimates     Estimate[]
  invoices      Invoice[]
  expenses      Expense[]
  timeEntries   TimeEntry[]
  
  // Communication
  notes         ProjectNote[]
  messages      ProjectMessage[]
  
  // Metadata
  tags          String[]
  customFields  Json?
  
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

model Task {
  id          String   @id @default(cuid())
  projectId   String
  project     Project @relation(fields: [projectId], references: [id], onDelete: Cascade)
  
  title       String
  description String?
  status      TaskStatus @default(TODO)
  priority    TaskPriority @default(MEDIUM)
  
  // Assignment
  assignedTo  String? // User ID
  assignedBy  String? // User ID
  
  // Dates
  dueDate     DateTime?
  startDate   DateTime?
  completedAt DateTime?
  
  // Dependencies
  dependencies String[] // Task IDs this task depends on
  
  // Time Tracking
  estimatedHours Float?
  actualHours    Float?
  
  // Checklist
  checklist   TaskChecklistItem[]
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Estimate {
  id            String   @id @default(cuid())
  contractorId  String
  contractor    Contractor @relation(fields: [contractorId], references: [id])
  customerId    String?
  customer      Customer? @relation(fields: [customerId], references: [id])
  projectId     String?
  project       Project? @relation(fields: [projectId], references: [id])
  
  // Estimate Details
  estimateNumber String @unique
  title         String
  description   String?
  status        EstimateStatus @default(DRAFT)
  
  // Financial
  subtotal      Float
  taxRate       Float @default(0)
  taxAmount     Float @default(0)
  discount      Float @default(0)
  total         Float
  
  // Validity
  validUntil    DateTime?
  
  // Line Items
  lineItems     EstimateLineItem[]
  
  // Conversion
  acceptedAt    DateTime?
  convertedQuoteId String?
  
  // Templates & Branding
  templateId    String?
  customBranding Json?
  
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

model Invoice {
  id            String   @id @default(cuid())
  contractorId  String
  contractor    Contractor @relation(fields: [contractorId], references: [id])
  customerId    String?
  customer      Customer? @relation(fields: [customerId], references: [id])
  projectId     String?
  project       Project? @relation(fields: [projectId], references: [id])
  
  // Invoice Details
  invoiceNumber String @unique
  title         String
  description   String?
  status        InvoiceStatus @default(DRAFT)
  
  // Financial
  subtotal      Float
  taxRate       Float @default(0)
  taxAmount     Float @default(0)
  discount      Float @default(0)
  total         Float
  amountPaid    Float @default(0)
  amountDue     Float
  
  // Dates
  issueDate     DateTime @default(now())
  dueDate       DateTime
  paidAt        DateTime?
  
  // Line Items
  lineItems     InvoiceLineItem[]
  
  // Payment Tracking
  payments      Payment[]
  
  // Recurring
  isRecurring   Boolean @default(false)
  recurringFrequency String?
  nextInvoiceDate DateTime?
  
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

model PriceList {
  id            String   @id @default(cuid())
  contractorId  String
  contractor    Contractor @relation(fields: [contractorId], references: [id])
  
  name          String
  description   String?
  isDefault     Boolean @default(false)
  isPublic      Boolean @default(false)
  
  // Categories and Items
  categories    PriceCategory[]
  items         PriceItem[]
  
  // Markup Settings
  laborMarkup   Float @default(0) // Percentage
  materialMarkup Float @default(0) // Percentage
  
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

model ClientPortal {
  id            String   @id @default(cuid())
  contractorId  String
  contractor    Contractor @relation(fields: [contractorId], references: [id])
  
  // Portal Settings
  isEnabled     Boolean @default(false)
  customDomain  String?
  branding      Json? // Logo, colors, etc.
  
  // Features
  allowProjectView      Boolean @default(true)
  allowDocumentDownload Boolean @default(true)
  allowPayments         Boolean @default(false)
  allowMessaging        Boolean @default(true)
  allowScheduling       Boolean @default(false)
  
  // Access Control
  accessCode    String?
  requireLogin  Boolean @default(true)
  
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

// Enums
enum SubscriptionPlan {
  FREE
  BASIC      // $29/month
  PROFESSIONAL // $59/month  
  ENTERPRISE // $99/month
}

enum SubscriptionStatus {
  ACTIVE
  INACTIVE
  CANCELLED
  PAST_DUE
  SUSPENDED
}

enum BillingCycle {
  MONTHLY
  YEARLY
}

enum ProjectStatus {
  PLANNING
  IN_PROGRESS
  ON_HOLD
  COMPLETED
  CANCELLED
}

enum ProjectPriority {
  LOW
  MEDIUM
  HIGH
  URGENT
}

enum TaskStatus {
  TODO
  IN_PROGRESS
  REVIEW
  COMPLETED
  CANCELLED
}

enum TaskPriority {
  LOW
  MEDIUM
  HIGH
  URGENT
}

enum EstimateStatus {
  DRAFT
  SENT
  VIEWED
  ACCEPTED
  REJECTED
  EXPIRED
}

enum InvoiceStatus {
  DRAFT
  SENT
  VIEWED
  PAID
  OVERDUE
  CANCELLED
}
`

export { contractorToolsSchema }
