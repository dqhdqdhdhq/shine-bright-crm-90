// Client Types
export type ClientType = 'residential' | 'commercial';
export type StaffRole = 'admin' | 'supervisor' | 'cleaner';

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface Contact {
  name: string;
  email: string;
  phone: string;
  isPrimary?: boolean;
}

export interface Client {
  id: string;
  type: ClientType;
  name: string;
  contacts: Contact[];
  addresses: Address[];
  notes: string;
  tags: string[];
  createdAt: string;
  lastService?: string;
  billingInfo?: {
    paymentMethod: string;
    accountNumber?: string;
  };
}

// Service Types
export type ServiceCategory = 'standard cleaning' | 'deep cleaning' | 'add-ons' | 'commercial' | 'specialized';

export interface Service {
  id: string;
  name: string;
  description: string;
  defaultDuration: number; // in minutes
  price: number;
  priceType: 'hourly' | 'flat' | 'sqft';
  tasks: string[];
  requiredSupplies: string[];
  clientType: ClientType | 'both';
  color?: string;
  category?: ServiceCategory;
  isActive?: boolean;
}

// Staff Types
export interface StaffMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: StaffRole;
  skills: string[];
  availability: {
    monday: { start?: string; end?: string };
    tuesday: { start?: string; end?: string };
    wednesday: { start?: string; end?: string };
    thursday: { start?: string; end?: string };
    friday: { start?: string; end?: string };
    saturday: { start?: string; end?: string };
    sunday: { start?: string; end?: string };
  };
  hireDate: string;
  avatar?: string;
  status?: 'active' | 'on-leave' | 'terminated';
  // Add the missing properties
  emergencyContact?: {
    name: string;
    phone: string;
  };
  address?: string;
  payRate?: string;
  notes?: string;
}

// Job/Schedule Types
export type JobStatus = 'scheduled' | 'in-progress' | 'completed' | 'cancelled';

export interface Job {
  id: string;
  clientId: string;
  clientName: string;
  serviceId: string;
  serviceName: string;
  status: JobStatus;
  date: string;
  startTime: string;
  endTime: string;
  assignedStaffIds: string[];
  address: Address;
  notes?: string;
  recurring?: 'none' | 'daily' | 'weekly' | 'biweekly' | 'monthly';
  checkinTime?: string;
  checkoutTime?: string;
  needsFollowUp?: boolean;
}

// Mock Data
export const mockClients: Client[] = [
  {
    id: '1',
    type: 'residential',
    name: 'John Smith',
    contacts: [
      {
        name: 'John Smith',
        email: 'john@example.com',
        phone: '(555) 123-4567',
        isPrimary: true,
      },
    ],
    addresses: [
      {
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zipCode: '90210',
      },
    ],
    notes:
      'Has two dogs, preferred cleaning day is Tuesday. Allergic to strong fragrances.',
    tags: ['weekly', 'pet-owner'],
    createdAt: '2023-01-15',
    lastService: '2023-05-01',
    billingInfo: {
      paymentMethod: 'Credit Card',
      accountNumber: '**** **** **** 1234',
    },
  },
  {
    id: '2',
    type: 'commercial',
    name: 'ABC Corporation',
    contacts: [
      {
        name: 'Sarah Johnson',
        email: 'sarah@abccorp.com',
        phone: '(555) 987-6543',
        isPrimary: true,
      },
      {
        name: 'Mike Williams',
        email: 'mike@abccorp.com',
        phone: '(555) 876-5432',
      },
    ],
    addresses: [
      {
        street: '456 Business Ave, Suite 200',
        city: 'Commerce City',
        state: 'CA',
        zipCode: '90220',
      },
    ],
    notes: 'After-hours cleaning only (after 6pm). Security access required.',
    tags: ['daily', 'corporate'],
    createdAt: '2022-11-05',
    lastService: '2023-05-02',
    billingInfo: {
      paymentMethod: 'Invoice Net 30',
    },
  },
  {
    id: '3',
    type: 'residential',
    name: 'Emily Davis',
    contacts: [
      {
        name: 'Emily Davis',
        email: 'emily@example.com',
        phone: '(555) 234-5678',
        isPrimary: true,
      },
    ],
    addresses: [
      {
        street: '789 Oak Dr',
        city: 'Lakeside',
        state: 'CA',
        zipCode: '90230',
      },
    ],
    notes: 'Key under doormat. Please focus on kitchen and bathrooms.',
    tags: ['biweekly', 'vip'],
    createdAt: '2023-02-20',
    lastService: '2023-04-28',
    billingInfo: {
      paymentMethod: 'Credit Card',
      accountNumber: '**** **** **** 5678',
    },
  },
  {
    id: '4',
    type: 'commercial',
    name: 'Sunshine Dental Office',
    contacts: [
      {
        name: 'Dr. Robert Chen',
        email: 'drchen@sunshinedental.com',
        phone: '(555) 345-6789',
        isPrimary: true,
      },
      {
        name: 'Lisa Park',
        email: 'reception@sunshinedental.com',
        phone: '(555) 345-6780',
      },
    ],
    addresses: [
      {
        street: '567 Medical Plaza, Suite 10',
        city: 'Westside',
        state: 'CA',
        zipCode: '90240',
      },
    ],
    notes:
      'Requires specialized sanitization procedures. Cleaning must be done after 7pm on weeknights.',
    tags: ['weekly', 'medical', 'specialized'],
    createdAt: '2022-09-10',
    lastService: '2023-05-01',
    billingInfo: {
      paymentMethod: 'Invoice Net 15',
    },
  },
  {
    id: '5',
    type: 'residential',
    name: 'Maria Rodriguez',
    contacts: [
      {
        name: 'Maria Rodriguez',
        email: 'maria@example.com',
        phone: '(555) 456-7890',
        isPrimary: true,
      },
    ],
    addresses: [
      {
        street: '890 Pine Lane',
        city: 'Highland',
        state: 'CA',
        zipCode: '90250',
      },
    ],
    notes:
      'Has a cat that should be kept indoors. Prefers eco-friendly cleaning products only.',
    tags: ['monthly', 'pet-owner', 'eco-friendly'],
    createdAt: '2023-03-05',
    lastService: '2023-04-05',
    billingInfo: {
      paymentMethod: 'Cash',
    },
  },
];

export const mockServices: Service[] = [
  {
    id: '1',
    name: 'Standard Residential Cleaning',
    description:
      'Comprehensive home cleaning including dusting, vacuuming, mopping, and bathroom/kitchen cleaning.',
    defaultDuration: 120, // 2 hours
    price: 150,
    priceType: 'flat',
    tasks: [
      'Dust all surfaces',
      'Vacuum all floors',
      'Mop hard floors',
      'Clean and sanitize bathrooms',
      'Clean and sanitize kitchen',
      'Make beds',
      'Empty trash',
    ],
    requiredSupplies: [
      'All-purpose cleaner',
      'Glass cleaner',
      'Bathroom cleaner',
      'Vacuum',
      'Mop',
      'Microfiber cloths',
    ],
    clientType: 'residential',
    color: '#0ea5e9',
    category: 'standard cleaning',
    isActive: true,
  },
  {
    id: '2',
    name: 'Deep Residential Cleaning',
    description:
      'Thorough cleaning of all areas including baseboards, inside appliances, and detailed attention to all surfaces.',
    defaultDuration: 240, // 4 hours
    price: 275,
    priceType: 'flat',
    tasks: [
      'All standard cleaning tasks',
      'Clean inside refrigerator',
      'Clean inside oven',
      'Clean baseboards',
      'Clean window sills and tracks',
      'Clean interior windows',
      'Dust ceiling fans',
      'Spot clean walls',
      'Clean under furniture',
    ],
    requiredSupplies: [
      'All standard supplies',
      'Degreaser',
      'Oven cleaner',
      'Limescale remover',
      'Extended duster',
    ],
    clientType: 'residential',
    color: '#06b6d4',
    category: 'deep cleaning',
    isActive: true,
  },
  {
    id: '3',
    name: 'Office Cleaning',
    description:
      'Cleaning services tailored for office environments, focusing on common areas, workspaces, and restrooms.',
    defaultDuration: 180, // 3 hours
    price: 45,
    priceType: 'hourly',
    tasks: [
      'Empty all trash bins',
      'Dust and clean all desk surfaces',
      'Clean and sanitize kitchen area',
      'Clean and sanitize restrooms',
      'Vacuum all carpeted areas',
      'Mop all hard floors',
      'Clean entrance glass doors',
      'Dust common areas',
    ],
    requiredSupplies: [
      'All-purpose cleaner',
      'Glass cleaner',
      'Bathroom cleaner',
      'Vacuum',
      'Mop',
      'Microfiber cloths',
      'Restroom supplies',
    ],
    clientType: 'commercial',
    color: '#14b8a6',
    category: 'commercial',
    isActive: true,
  },
  {
    id: '4',
    name: 'Move In/Out Cleaning',
    description:
      'Comprehensive cleaning for vacant properties, preparing them for new occupants or returning to landlords.',
    defaultDuration: 300, // 5 hours
    price: 350,
    priceType: 'flat',
    tasks: [
      'All deep cleaning tasks',
      'Clean inside all cabinets',
      'Clean inside all appliances',
      'Clean all windows interior',
      'Clean all light fixtures',
      'Scrub all showers/tubs',
      'Detailed floor cleaning',
      'Remove all cobwebs',
      'Clean all vents',
    ],
    requiredSupplies: [
      'All deep cleaning supplies',
      'Heavy-duty degreaser',
      'Scrub brushes',
      'Mold and mildew remover',
      'Ladder',
    ],
    clientType: 'residential',
    color: '#22c55e',
    category: 'deep cleaning',
    isActive: true,
  },
  {
    id: '5',
    name: 'Medical Office Sanitization',
    description:
      'Specialized cleaning for medical facilities with focus on sanitization and compliance with health regulations.',
    defaultDuration: 240, // 4 hours
    price: 60,
    priceType: 'hourly',
    tasks: [
      'Hospital-grade disinfection of all surfaces',
      'OSHA-compliant waste removal',
      'Sanitize all high-touch areas',
      'Clean and disinfect exam rooms',
      'Clean and sanitize restrooms',
      'Clean waiting areas',
      'Disinfect reception area',
      'Specialized floor care',
    ],
    requiredSupplies: [
      'Hospital-grade disinfectants',
      'Medical-grade cleaning supplies',
      'OSHA-compliant waste bags',
      'PPE for staff',
      'UV sanitizing equipment',
    ],
    clientType: 'commercial',
    color: '#f43f5e',
    category: 'specialized',
    isActive: true,
  },
  {
    id: '6',
    name: 'Window Cleaning',
    description: 'Professional interior and exterior window cleaning for crystal clear results.',
    defaultDuration: 120,
    price: 85,
    priceType: 'flat',
    tasks: [
      'Clean all interior windows',
      'Clean all exterior windows (first and second floor)',
      'Clean window tracks',
      'Clean window sills',
      'Polish glass surfaces',
    ],
    requiredSupplies: [
      'Professional window cleaner',
      'Microfiber cloths',
      'Squeegee',
      'Extension pole',
      'Ladder',
    ],
    clientType: 'both',
    color: '#3b82f6',
    category: 'add-ons',
    isActive: true,
  },
  {
    id: '7',
    name: 'Carpet Cleaning',
    description: 'Deep carpet cleaning using hot water extraction method.',
    defaultDuration: 180,
    price: 0.35,
    priceType: 'sqft',
    tasks: [
      'Pre-treat stains',
      'Hot water extraction cleaning',
      'Deodorize carpets',
      'Speed dry with fans',
    ],
    requiredSupplies: [
      'Carpet cleaning machine',
      'Carpet shampoo',
      'Stain pre-treatment',
      'Deodorizer',
      'Fans',
    ],
    clientType: 'both',
    color: '#8b5cf6',
    category: 'add-ons',
    isActive: false,
  },
];

export const mockStaff: StaffMember[] = [
  {
    id: '1',
    name: 'Maria Garcia',
    email: 'maria@shinecrm.com',
    phone: '(555) 111-2222',
    role: 'supervisor',
    skills: ['deep cleaning', 'team lead', 'commercial', 'training'],
    availability: {
      monday: { start: '08:00', end: '16:00' },
      tuesday: { start: '08:00', end: '16:00' },
      wednesday: { start: '08:00', end: '16:00' },
      thursday: { start: '08:00', end: '16:00' },
      friday: { start: '08:00', end: '16:00' },
      saturday: {},
      sunday: {},
    },
    hireDate: '2021-03-15',
  },
  {
    id: '2',
    name: 'James Wilson',
    email: 'james@shinecrm.com',
    phone: '(555) 222-3333',
    role: 'cleaner',
    skills: ['residential', 'carpet cleaning', 'window cleaning'],
    availability: {
      monday: { start: '09:00', end: '17:00' },
      tuesday: { start: '09:00', end: '17:00' },
      wednesday: { start: '09:00', end: '17:00' },
      thursday: { start: '09:00', end: '17:00' },
      friday: { start: '09:00', end: '17:00' },
      saturday: {},
      sunday: {},
    },
    hireDate: '2022-01-10',
  },
  {
    id: '3',
    name: 'Sophia Lee',
    email: 'sophia@shinecrm.com',
    phone: '(555) 333-4444',
    role: 'admin',
    skills: ['scheduling', 'client relations', 'inventory management'],
    availability: {
      monday: { start: '08:00', end: '17:00' },
      tuesday: { start: '08:00', end: '17:00' },
      wednesday: { start: '08:00', end: '17:00' },
      thursday: { start: '08:00', end: '17:00' },
      friday: { start: '08:00', end: '17:00' },
      saturday: {},
      sunday: {},
    },
    hireDate: '2020-06-05',
  },
  {
    id: '4',
    name: 'David Thompson',
    email: 'david@shinecrm.com',
    phone: '(555) 444-5555',
    role: 'cleaner',
    skills: ['commercial', 'floor care', 'medical facilities'],
    availability: {
      monday: {},
      tuesday: { start: '12:00', end: '20:00' },
      wednesday: { start: '12:00', end: '20:00' },
      thursday: { start: '12:00', end: '20:00' },
      friday: { start: '12:00', end: '20:00' },
      saturday: { start: '10:00', end: '18:00' },
      sunday: {},
    },
    hireDate: '2022-05-20',
  },
  {
    id: '5',
    name: 'Olivia Martinez',
    email: 'olivia@shinecrm.com',
    phone: '(555) 555-6666',
    role: 'cleaner',
    skills: ['residential', 'eco-friendly', 'deep cleaning'],
    availability: {
      monday: { start: '08:00', end: '16:00' },
      tuesday: { start: '08:00', end: '16:00' },
      wednesday: {},
      thursday: { start: '08:00', end: '16:00' },
      friday: { start: '08:00', end: '16:00' },
      saturday: { start: '09:00', end: '15:00' },
      sunday: {},
    },
    hireDate: '2022-08-15',
  },
];

export const mockJobs: Job[] = [
  {
    id: '1',
    clientId: '1',
    clientName: 'John Smith',
    serviceId: '1',
    serviceName: 'Standard Residential Cleaning',
    status: 'scheduled',
    date: '2025-05-06',
    startTime: '10:00',
    endTime: '12:00',
    assignedStaffIds: ['2', '5'],
    address: mockClients[0].addresses[0],
    notes: 'Focus on kitchen and living room area.',
    recurring: 'weekly',
    needsFollowUp: true,
  },
  {
    id: '2',
    clientId: '2',
    clientName: 'ABC Corporation',
    serviceId: '3',
    serviceName: 'Office Cleaning',
    status: 'scheduled',
    date: '2025-05-06',
    startTime: '18:00',
    endTime: '21:00',
    assignedStaffIds: ['1', '4'],
    address: mockClients[1].addresses[0],
    notes: 'Security will provide access. Ensure all lights are turned off when leaving.',
    recurring: 'daily',
    needsFollowUp: false,
  },
  {
    id: '3',
    clientId: '3',
    clientName: 'Emily Davis',
    serviceId: '2',
    serviceName: 'Deep Residential Cleaning',
    status: 'in-progress',
    date: '2025-05-04',
    startTime: '13:00',
    endTime: '17:00',
    assignedStaffIds: ['1', '5'],
    address: mockClients[2].addresses[0],
    checkinTime: '13:05',
    notes: 'Client wants extra attention to guest room as visitors are coming.',
    recurring: 'none',
    needsFollowUp: false,
  },
  {
    id: '4',
    clientId: '4',
    clientName: 'Sunshine Dental Office',
    serviceId: '5',
    serviceName: 'Medical Office Sanitization',
    status: 'completed',
    date: '2025-05-03',
    startTime: '19:00',
    endTime: '23:00',
    assignedStaffIds: ['1', '4'],
    address: mockClients[3].addresses[0],
    checkinTime: '19:00',
    checkoutTime: '23:15',
    notes: 'Use the specialized disinfectant for all surfaces in procedure rooms.',
    recurring: 'weekly',
    needsFollowUp: false,
  },
  {
    id: '5',
    clientId: '5',
    clientName: 'Maria Rodriguez',
    serviceId: '1',
    serviceName: 'Standard Residential Cleaning',
    status: 'cancelled',
    date: '2025-05-03',
    startTime: '14:00',
    endTime: '16:00',
    assignedStaffIds: ['2'],
    address: mockClients[4].addresses[0],
    notes: 'Cancelled by client - family emergency. Reschedule for next week.',
    recurring: 'monthly',
    needsFollowUp: true,
  },
  {
    id: '6',
    clientId: '1',
    clientName: 'John Smith',
    serviceId: '1',
    serviceName: 'Standard Residential Cleaning',
    status: 'scheduled',
    date: '2025-05-13',
    startTime: '10:00',
    endTime: '12:00',
    assignedStaffIds: ['2', '5'],
    address: mockClients[0].addresses[0],
    notes: 'Focus on kitchen and living room area.',
    recurring: 'weekly',
    needsFollowUp: false,
  },
  {
    id: '7',
    clientId: '3',
    clientName: 'Emily Davis',
    serviceId: '1',
    serviceName: 'Standard Residential Cleaning',
    status: 'scheduled',
    date: '2025-05-07',
    startTime: '09:00',
    endTime: '11:00',
    assignedStaffIds: ['5'],
    address: mockClients[2].addresses[0],
    notes: 'Use the client-provided cleaning products in laundry room.',
    recurring: 'biweekly',
    needsFollowUp: false,
  },
];

// Dashboard Analytics & Stats
export const mockDashboardStats = {
  todaysJobs: 2,
  upcomingJobs: 5,
  completedJobs: 12,
  activeClients: 15,
  cancelledJobs: 1,
  monthlyRevenue: 8750,
  recentClientActivity: [
    {
      id: '1',
      clientName: 'John Smith',
      activity: 'New job scheduled',
      date: '2025-05-04',
      time: '09:15',
    },
    {
      id: '2',
      clientName: 'ABC Corporation',
      activity: 'Invoice paid',
      date: '2025-05-04',
      time: '08:30',
    },
    {
      id: '3',
      clientName: 'Emily Davis',
      activity: 'Service completed',
      date: '2025-05-03',
      time: '17:45',
    },
    {
      id: '4',
      clientName: 'Sunshine Dental Office',
      activity: 'Feedback provided',
      date: '2025-05-03',
      time: '10:15',
    },
  ],
  staffPerformance: [
    { name: 'Maria Garcia', jobsCompleted: 24, onTimeRate: 98 },
    { name: 'James Wilson', jobsCompleted: 18, onTimeRate: 95 },
    { name: 'Olivia Martinez', jobsCompleted: 15, onTimeRate: 100 },
    { name: 'David Thompson', jobsCompleted: 20, onTimeRate: 92 },
  ],
};

// Helper function to get today's jobs
export const getTodaysJobs = (): Job[] => {
  const today = new Date().toISOString().split('T')[0];
  return mockJobs.filter(job => job.date === today || job.date === '2025-05-04');
};

// Helper function to get this week's jobs
export const getThisWeeksJobs = (): Job[] => {
  // In a real app, we would calculate the week range
  // For mock purposes, we'll just include a few days
  return mockJobs.filter(job => 
    job.date >= '2025-05-04' && job.date <= '2025-05-10'
  );
};

// Helper function to get a client by ID
export const getClientById = (id: string): Client | undefined => {
  return mockClients.find(client => client.id === id);
};

// Helper function to get a service by ID
export const getServiceById = (id: string): Service | undefined => {
  return mockServices.find(service => service.id === id);
};

// Helper function to get staff by ID
export const getStaffById = (id: string): StaffMember | undefined => {
  return mockStaff.find(staff => staff.id === id);
};

// Helper function to get jobs by client ID
export const getJobsByClientId = (clientId: string): Job[] => {
  return mockJobs.filter(job => job.clientId === clientId);
};

// Helper function to get jobs by staff ID
export const getJobsByStaffId = (staffId: string): Job[] => {
  return mockJobs.filter(job => job.assignedStaffIds.includes(staffId));
};
