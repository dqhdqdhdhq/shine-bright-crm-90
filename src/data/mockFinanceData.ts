
import { mockClients, mockServices, mockStaff } from "./mockData";

export interface Invoice {
  id: string;
  clientId: string;
  clientName: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  number: string;
  issueDate: string;
  dueDate: string;
  total: number;
  paid: number;
  items: InvoiceItem[];
  notes?: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
  serviceId?: string;
}

export interface Expense {
  id: string;
  category: string;
  vendor: string;
  date: string;
  amount: number;
  description: string;
  receipt?: string;
  status: 'pending' | 'processed' | 'reconciled';
  paymentMethod: string;
  recurring?: boolean;
  lastProcessed?: string;
}

export interface PayrollEntry {
  id: string;
  employeeId: string;
  employeeName: string;
  payPeriodStart: string;
  payPeriodEnd: string;
  regularHours: number;
  overtimeHours: number;
  rate: number;
  grossPay: number;
  deductions: number;
  netPay: number;
  status: 'pending' | 'processed' | 'paid';
}

export const mockInvoices: Invoice[] = [
  {
    id: '1',
    clientId: '1',
    clientName: 'John Smith',
    status: 'paid',
    number: 'INV-2025-001',
    issueDate: '2025-04-01',
    dueDate: '2025-04-15',
    total: 150.00,
    paid: 150.00,
    items: [
      {
        id: '1',
        description: 'Standard Residential Cleaning',
        quantity: 1,
        rate: 150.00,
        amount: 150.00,
        serviceId: '1'
      }
    ],
    notes: 'Thank you for your business!'
  },
  {
    id: '2',
    clientId: '2',
    clientName: 'ABC Corporation',
    status: 'sent',
    number: 'INV-2025-002',
    issueDate: '2025-04-05',
    dueDate: '2025-05-05',
    total: 405.00,
    paid: 0,
    items: [
      {
        id: '1',
        description: 'Office Cleaning (3 hours)',
        quantity: 3,
        rate: 45.00,
        amount: 135.00,
        serviceId: '3'
      },
      {
        id: '2',
        description: 'Window Cleaning',
        quantity: 1,
        rate: 85.00,
        amount: 85.00,
        serviceId: '6'
      },
      {
        id: '3',
        description: 'Carpet Cleaning (500 sq ft)',
        quantity: 500,
        rate: 0.35,
        amount: 175.00,
        serviceId: '7'
      },
      {
        id: '4',
        description: 'Cleaning Supplies',
        quantity: 1,
        rate: 10.00,
        amount: 10.00
      }
    ]
  },
  {
    id: '3',
    clientId: '3',
    clientName: 'Emily Davis',
    status: 'overdue',
    number: 'INV-2025-003',
    issueDate: '2025-03-05',
    dueDate: '2025-03-20',
    total: 275.00,
    paid: 0,
    items: [
      {
        id: '1',
        description: 'Deep Residential Cleaning',
        quantity: 1,
        rate: 275.00,
        amount: 275.00,
        serviceId: '2'
      }
    ],
    notes: 'Payment overdue. Please remit as soon as possible.'
  },
  {
    id: '4',
    clientId: '4',
    clientName: 'Sunshine Dental Office',
    status: 'draft',
    number: 'INV-2025-004',
    issueDate: '2025-05-03',
    dueDate: '2025-05-18',
    total: 240.00,
    paid: 0,
    items: [
      {
        id: '1',
        description: 'Medical Office Sanitization (4 hours)',
        quantity: 4,
        rate: 60.00,
        amount: 240.00,
        serviceId: '5'
      }
    ]
  },
  {
    id: '5',
    clientId: '2',
    clientName: 'ABC Corporation',
    status: 'paid',
    number: 'INV-2025-005',
    issueDate: '2025-03-01',
    dueDate: '2025-04-01',
    total: 405.00,
    paid: 405.00,
    items: [
      {
        id: '1',
        description: 'Office Cleaning (3 hours)',
        quantity: 3,
        rate: 45.00,
        amount: 135.00,
        serviceId: '3'
      },
      {
        id: '2',
        description: 'Window Cleaning',
        quantity: 3,
        rate: 85.00,
        amount: 255.00,
        serviceId: '6'
      },
      {
        id: '3',
        description: 'Supplies fee',
        quantity: 1,
        rate: 15.00,
        amount: 15.00
      }
    ],
    notes: 'Paid via bank transfer'
  }
];

export const mockExpenses: Expense[] = [
  {
    id: '1',
    category: 'Supplies',
    vendor: 'Cleaning Supplies Co.',
    date: '2025-04-01',
    amount: 250.75,
    description: 'Monthly cleaning supplies',
    status: 'processed',
    paymentMethod: 'Credit Card',
    recurring: true,
    lastProcessed: '2025-04-01'
  },
  {
    id: '2',
    category: 'Vehicle',
    vendor: 'City Gas Station',
    date: '2025-05-02',
    amount: 75.50,
    description: 'Fuel for company vehicles',
    status: 'processed',
    paymentMethod: 'Company Card'
  },
  {
    id: '3',
    category: 'Equipment',
    vendor: 'CleanMachines Inc.',
    date: '2025-04-15',
    amount: 1200.00,
    description: 'New industrial vacuum cleaner',
    receipt: 'receipt-38472.pdf',
    status: 'reconciled',
    paymentMethod: 'Bank Transfer'
  },
  {
    id: '4',
    category: 'Insurance',
    vendor: 'SafeGuard Insurance',
    date: '2025-05-01',
    amount: 450.00,
    description: 'Monthly liability insurance premium',
    status: 'pending',
    paymentMethod: 'Automatic Withdrawal',
    recurring: true
  },
  {
    id: '5',
    category: 'Rent',
    vendor: 'Main Street Properties',
    date: '2025-05-01',
    amount: 1800.00,
    description: 'Office rent for May',
    status: 'processed',
    paymentMethod: 'Bank Transfer',
    recurring: true,
    lastProcessed: '2025-05-01'
  },
  {
    id: '6',
    category: 'Utilities',
    vendor: 'City Power & Water',
    date: '2025-04-25',
    amount: 235.67,
    description: 'Electricity and water bill',
    status: 'pending',
    paymentMethod: 'Automatic Withdrawal'
  }
];

export const mockPayroll: PayrollEntry[] = [
  {
    id: '1',
    employeeId: '1',
    employeeName: 'Maria Garcia',
    payPeriodStart: '2025-04-01',
    payPeriodEnd: '2025-04-15',
    regularHours: 80,
    overtimeHours: 5,
    rate: 25.00,
    grossPay: 2125.00, // 80hrs * $25 + 5hrs * $25 * 1.5
    deductions: 510.00,
    netPay: 1615.00,
    status: 'paid'
  },
  {
    id: '2',
    employeeId: '2',
    employeeName: 'James Wilson',
    payPeriodStart: '2025-04-01',
    payPeriodEnd: '2025-04-15',
    regularHours: 80,
    overtimeHours: 0,
    rate: 22.50,
    grossPay: 1800.00,
    deductions: 414.00,
    netPay: 1386.00,
    status: 'paid'
  },
  {
    id: '3',
    employeeId: '4',
    employeeName: 'David Thompson',
    payPeriodStart: '2025-04-01',
    payPeriodEnd: '2025-04-15',
    regularHours: 76,
    overtimeHours: 8,
    rate: 22.00,
    grossPay: 1936.00,
    deductions: 445.28,
    netPay: 1490.72,
    status: 'paid'
  },
  {
    id: '4',
    employeeId: '5',
    employeeName: 'Olivia Martinez',
    payPeriodStart: '2025-04-01',
    payPeriodEnd: '2025-04-15',
    regularHours: 72,
    overtimeHours: 0,
    rate: 21.00,
    grossPay: 1512.00,
    deductions: 347.76,
    netPay: 1164.24,
    status: 'paid'
  },
  {
    id: '5',
    employeeId: '1',
    employeeName: 'Maria Garcia',
    payPeriodStart: '2025-04-16',
    payPeriodEnd: '2025-04-30',
    regularHours: 80,
    overtimeHours: 4,
    rate: 25.00,
    grossPay: 2100.00,
    deductions: 504.00,
    netPay: 1596.00,
    status: 'pending'
  },
  {
    id: '6',
    employeeId: '2',
    employeeName: 'James Wilson',
    payPeriodStart: '2025-04-16',
    payPeriodEnd: '2025-04-30',
    regularHours: 80,
    overtimeHours: 2,
    rate: 22.50,
    grossPay: 1867.50,
    deductions: 429.53,
    netPay: 1437.97,
    status: 'pending'
  }
];

// Statistics for financial dashboard
export const mockFinancialStats = {
  profitLoss: {
    amount: 24500,
    trend: 12,
    trendDirection: 'up'
  },
  receivables: {
    amount: 18750,
    trend: 5,
    trendDirection: 'up',
    count: 15
  },
  payables: {
    amount: 7200,
    trend: -8,
    trendDirection: 'down',
    count: 8
  },
  cashOnHand: {
    amount: 42375,
    trend: 3,
    trendDirection: 'up'
  },
  monthlyRevenue: {
    amount: 32450,
    trend: 15,
    trendDirection: 'up'
  },
  monthlyExpenses: {
    amount: 19700,
    trend: 4,
    trendDirection: 'up'
  },
  payroll: {
    amount: 14750,
    trend: 0,
    trendDirection: 'stable'
  },
  topExpenseCategories: [
    { name: 'Payroll', amount: 14750, percentage: 48 },
    { name: 'Rent', amount: 3600, percentage: 12 },
    { name: 'Supplies', amount: 2850, percentage: 9 },
    { name: 'Insurance', amount: 1350, percentage: 4 },
    { name: 'Utilities', amount: 950, percentage: 3 },
    { name: 'Other', amount: 7200, percentage: 24 }
  ],
  quarterlyRevenue: [
    { quarter: 'Q1', amount: 86400 },
    { quarter: 'Q2', amount: 97500 },
    { quarter: 'Q3', amount: 104250 },
    { quarter: 'Q4', amount: 115000 }
  ],
  monthlyCashFlow: [
    { month: 'Jan', income: 28500, expenses: 17800 },
    { month: 'Feb', income: 27900, expenses: 18200 },
    { month: 'Mar', income: 30000, expenses: 19400 },
    { month: 'Apr', income: 32450, expenses: 19700 },
    { month: 'May', income: 34500, expenses: 20100 },
    { month: 'Jun', income: 36500, expenses: 21200 }
  ]
};
