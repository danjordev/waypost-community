/* ══════════════════════════════════════════════════
   WAYPOST — jobs.js
   Sample job listings for Fallbrook / North San Diego.
   Each listing is tagged with skill categories from
   translations.js so the passport can match them.
══════════════════════════════════════════════════ */

const JOBS = [
  {
    id: 'job-fallbrook-medical-receptionist',
    title: 'Medical Office Receptionist',
    employer: 'Fallbrook Medical Group',
    type: 'Full-time',
    location: 'Fallbrook, CA',
    pay: '$18–$22 / hr',
    description: 'Front-desk coordination for a busy multi-provider primary care practice. Responsibilities include patient check-in, appointment scheduling, insurance verification, and medical records management. Warm, organized personality essential.',
    categories: ['administrative', 'healthcare', 'customer-service'],
    tags: ['Military Spouse Friendly', 'Benefits Included'],
    contact: 'careers@fallbrookmedical.com'
  },
  {
    id: 'job-fuesd-substitute',
    title: 'Substitute Teacher (K–8)',
    employer: 'Fallbrook Union Elementary School District',
    type: 'Part-time / Per Diem',
    location: 'Fallbrook, CA',
    pay: '$150–$175 / day',
    description: 'Flexible day-to-day substitute positions across elementary and junior high schools in the FUESD network. California 30-day Sub Permit required — the district can walk you through the application process. Ideal for parents with school-age children.',
    categories: ['education'],
    tags: ['Flexible Schedule', 'Great for Parents', 'Permit Assistance Available'],
    contact: 'hr@fuesd.org'
  },
  {
    id: 'job-fallbrook-dental-assistant',
    title: 'Registered Dental Assistant',
    employer: 'Fallbrook Family Dentistry',
    type: 'Full-time',
    location: 'Fallbrook, CA',
    pay: '$20–$26 / hr',
    description: 'Chairside assistance for a well-established general and cosmetic dental practice. Duties include patient preparation, instrument handling, x-rays, and administrative support. RDA license required; active CA RDA or valid license from another state with reciprocity considered.',
    categories: ['healthcare', 'administrative'],
    tags: ['License Reciprocity Considered'],
    contact: 'office@fallbrookfamilydentistry.com'
  },
  {
    id: 'job-bank-teller',
    title: 'Bank Teller / Personal Banker',
    employer: 'U.S. Bank — Fallbrook Branch',
    type: 'Full-time',
    location: 'Fallbrook, CA',
    pay: '$17–$21 / hr',
    description: 'Process transactions, assist customers with account management, and support branch sales goals. Strong math, attention to detail, and customer service experience required. No prior banking experience necessary — full training provided.',
    categories: ['finance', 'customer-service', 'administrative'],
    tags: ['No Banking Experience Required', 'Training Provided', 'Military Discount Program'],
    contact: 'usbank.com/careers'
  },
  {
    id: 'job-preschool-aide',
    title: 'Preschool Teacher Assistant',
    employer: 'Fallbrook Community Center Preschool',
    type: 'Part-time',
    location: 'Fallbrook, CA',
    pay: '$16–$18 / hr',
    description: 'Support lead teachers in daily classroom activities for children ages 3–5. Responsibilities include activity setup, child supervision, snack coordination, and parent communication. 12 ECE units preferred but not required for assistant role.',
    categories: ['education', 'customer-service'],
    tags: ['Part-time', 'School Hours', 'ECE Units Helpful'],
    contact: '(760) 728-1911'
  },
  {
    id: 'job-tricounty-admin',
    title: 'Administrative Coordinator',
    employer: 'TriHealth North County',
    type: 'Full-time',
    location: 'Fallbrook / Bonsall area, CA',
    pay: '$22–$28 / hr',
    description: 'Coordinate administrative operations for a growing outpatient healthcare network. Duties include scheduling, patient records, vendor communications, and office management. Strong MS Office skills and 2+ years admin experience required.',
    categories: ['administrative', 'healthcare', 'management'],
    tags: ['Benefits', 'Growth Opportunities'],
    contact: 'admin@trihealthnorthcounty.com'
  },
  {
    id: 'job-ymca-coordinator',
    title: 'Youth Program Coordinator',
    employer: 'Fallbrook YMCA',
    type: 'Full-time',
    location: 'Fallbrook, CA',
    pay: '$19–$24 / hr',
    description: 'Plan and deliver youth programming including after-school care, camps, and sports leagues. Manage volunteer staff, parent communications, and program logistics. Experience in youth development, education, or nonprofit management preferred.',
    categories: ['education', 'nonprofit', 'management'],
    tags: ['Free YMCA Membership', 'Mission-Driven', 'Military Family Discount Available'],
    contact: 'programs@fallbrookymca.org'
  },
  {
    id: 'job-pharmacy-tech',
    title: 'Pharmacy Technician',
    employer: 'CVS Pharmacy — Fallbrook',
    type: 'Full-time or Part-time',
    location: 'Fallbrook, CA',
    pay: '$18–$22 / hr',
    description: 'Fill prescriptions, manage inventory, process insurance claims, and assist customers in a busy community pharmacy. CA Pharmacy Tech license required. CVS offers tuition assistance toward PTCE certification.',
    categories: ['healthcare', 'customer-service', 'administrative'],
    tags: ['Tuition Assistance', 'License Required', 'Flexible Shifts'],
    contact: 'cvs.com/careers'
  },
  {
    id: 'job-real-estate-assistant',
    title: 'Real Estate Administrative Assistant',
    employer: 'Century 21 North San Diego',
    type: 'Full-time',
    location: 'Fallbrook / Oceanside, CA',
    pay: '$20–$25 / hr',
    description: 'Support a high-performing residential real estate team with listing coordination, client communications, transaction management, and marketing materials. Strong organizational skills and a warm client-facing manner essential. Military relocation experience is a genuine asset in this role.',
    categories: ['administrative', 'sales', 'marketing'],
    tags: ['Military Relocation Market', 'Growth Path to Agent'],
    contact: 'careers@c21nsd.com'
  },
  {
    id: 'job-school-library-aide',
    title: 'School Library Aide',
    employer: 'Fallbrook Union High School District',
    type: 'Part-time',
    location: 'Fallbrook High School',
    pay: '$16–$18 / hr',
    description: 'Support the school library\'s daily operations including circulation, shelving, student assistance, and cataloging. School-year schedule with summers off. Ideal for candidates with attention to detail, patience, and genuine enjoyment of a school environment.',
    categories: ['education', 'administrative'],
    tags: ['School Calendar', 'Summers Off', 'Student-Facing'],
    contact: 'hr@fuhsd.net'
  },
  {
    id: 'job-chamber-marketing',
    title: 'Marketing & Social Media Coordinator',
    employer: 'Fallbrook Chamber of Commerce',
    type: 'Part-time',
    location: 'Fallbrook, CA',
    pay: '$18–$22 / hr',
    description: 'Create and schedule social media content, write newsletter copy, design flyers, and support event marketing for the local business community. Canva and basic social media management experience preferred. Flexible hours, mission-driven environment.',
    categories: ['marketing', 'creative', 'administrative'],
    tags: ['Flexible Hours', 'Local Impact', 'Canva Preferred'],
    contact: 'director@fallbrookchamber.com'
  },
  {
    id: 'job-ace-hardware-retail',
    title: 'Retail Sales Associate',
    employer: 'Ace Hardware — Fallbrook',
    type: 'Part-time or Full-time',
    location: 'Fallbrook, CA',
    pay: '$16–$19 / hr',
    description: 'Help customers find products, answer questions, process transactions, and support store operations. Ace Fallbrook has a long history of serving the military community and is actively seeking employees who understand that customer base.',
    categories: ['sales', 'customer-service'],
    tags: ['Military Community Focus', 'Flexible Scheduling', 'Employee Discount'],
    contact: '(760) 728-1256'
  },
  {
    id: 'job-bookkeeper',
    title: 'Bookkeeper / Accounting Assistant',
    employer: 'North County CPA Group',
    type: 'Part-time',
    location: 'Fallbrook, CA (Hybrid)',
    pay: '$22–$28 / hr',
    description: 'Manage accounts payable/receivable, bank reconciliations, payroll entry, and QuickBooks records for a portfolio of small business clients. 2+ years bookkeeping or accounting experience required. Hybrid remote/in-office schedule.',
    categories: ['finance', 'administrative'],
    tags: ['Hybrid Remote', 'QuickBooks Experience Preferred', 'Flexible Hours'],
    contact: 'admin@ncpacpa.com'
  },
  {
    id: 'job-community-health-worker',
    title: 'Community Health Worker',
    employer: 'Interfaith Community Services — North County',
    type: 'Full-time',
    location: 'Oceanside / Fallbrook area, CA',
    pay: '$20–$25 / hr',
    description: 'Connect underserved community members — including military families — with health, housing, and social services. Conduct client outreach, resource navigation, case tracking, and community education. Bilingual (Spanish/English) strongly preferred. CHW certificate a plus but not required.',
    categories: ['nonprofit', 'healthcare', 'customer-service'],
    tags: ['Mission-Driven', 'Military Families Served', 'Bilingual Preferred'],
    contact: 'hr@interfaithservices.org'
  },
  {
    id: 'job-hotel-front-desk',
    title: 'Front Desk Agent',
    employer: 'Pala Mesa Resort',
    type: 'Full-time or Part-time',
    location: 'Fallbrook, CA',
    pay: '$17–$21 / hr',
    description: 'Welcome guests, manage reservations, handle check-in/out, and ensure a seamless resort experience. Pala Mesa hosts a significant number of military events and VVIP guests throughout the year. Strong interpersonal skills and calm under pressure essential.',
    categories: ['customer-service', 'food-service', 'administrative'],
    tags: ['Resort Benefits', 'Military Events', 'Flexible Shifts'],
    contact: 'hr@palamesa.com'
  }
];

// ── Job Matching ───────────────────────────────────
//    Returns jobs sorted by number of category matches,
//    most relevant first. No fuzzy logic — clean set intersection.
function matchJobs(userCategories = []) {
  if (!userCategories.length) return JOBS;
  return JOBS
    .map(job => ({
      ...job,
      matchCount: job.categories.filter(c => userCategories.includes(c)).length
    }))
    .filter(job => job.matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount);
}
