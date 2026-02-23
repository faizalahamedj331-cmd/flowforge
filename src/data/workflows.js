export const defaultWorkflows = [
  {
    id: 'job-application',
    name: 'Job Application Flow',
    description: 'Track job application process from apply to offer',
    steps: [
      { id: 'step-1', title: 'Apply', description: 'Submit application and resume' },
      { id: 'step-2', title: 'Screening', description: 'HR reviews application' },
      { id: 'step-3', title: 'Technical Interview', description: 'Technical skills assessment' },
      { id: 'step-4', title: 'HR Interview', description: 'Culture fit discussion' },
      { id: 'step-5', title: 'Offer', description: 'Receive job offer' }
    ]
  },
  {
    id: 'software-development',
    name: 'Software Development Flow',
    description: 'CI/CD pipeline for software delivery',
    steps: [
      { id: 'step-1', title: 'Code', description: 'Write and commit code' },
      { id: 'step-2', title: 'Build', description: 'Compile and build application' },
      { id: 'step-3', title: 'Test', description: 'Run automated tests' },
      { id: 'step-4', title: 'Deploy', description: 'Deploy to staging/production' },
      { id: 'step-5', title: 'Monitor', description: 'Monitor application health' }
    ]
  },
  {
    id: 'order-processing',
    name: 'Order Processing Flow',
    description: 'E-commerce order fulfillment process',
    steps: [
      { id: 'step-1', title: 'Order Received', description: 'New order placed' },
      { id: 'step-2', title: 'Payment Verification', description: 'Verify payment details' },
      { id: 'step-3', title: 'Inventory Check', description: 'Check product availability' },
      { id: 'step-4', title: 'Packaging', description: 'Package order for shipping' },
      { id: 'step-5', title: 'Shipping', description: 'Send to logistics partner' },
      { id: 'step-6', title: 'Delivered', description: 'Customer receives order' }
    ]
  },
  {
    id: 'onboarding',
    name: 'Employee Onboarding Flow',
    description: 'New employee integration process',
    steps: [
      { id: 'step-1', title: 'Welcome Email', description: 'Send welcome package' },
      { id: 'step-2', title: 'Documentation', description: 'Complete HR paperwork' },
      { id: 'step-3', title: 'IT Setup', description: 'Setup workstation and accounts' },
      { id: 'step-4', title: 'Training', description: 'Complete orientation training' },
      { id: 'step-5', title: 'Team Introduction', description: 'Meet the team' },
      { id: 'step-6', title: 'First Project', description: 'Assign first task' }
    ]
  },
  {
    id: 'bug-fix',
    name: 'Bug Fix Workflow',
    description: 'Issue tracking and resolution process',
    steps: [
      { id: 'step-1', title: 'Bug Reported', description: 'Issue logged in system' },
      { id: 'step-2', title: 'Triage', description: 'Assess bug severity' },
      { id: 'step-3', title: 'Investigation', description: 'Find root cause' },
      { id: 'step-4', title: 'Fix Implementation', description: 'Develop solution' },
      { id: 'step-5', title: 'Code Review', description: 'Peer review changes' },
      { id: 'step-6', title: 'QA Testing', description: 'Verify fix works' },
      { id: 'step-7', title: 'Deploy Fix', description: 'Release to production' }
    ]
  },
  // New Workflow 1: Cloud Deployment
  {
    id: 'cloud-deployment',
    name: 'Cloud Deployment Flow',
    description: 'Cloud infrastructure deployment and configuration',
    steps: [
      { id: 'step-1', title: 'Infrastructure Planning', description: 'Define resource requirements' },
      { id: 'step-2', title: 'Environment Setup', description: 'Configure cloud environment' },
      { id: 'step-3', title: 'Database Setup', description: 'Deploy and configure databases' },
      { id: 'step-4', title: 'Application Deployment', description: 'Deploy application containers' },
      { id: 'step-5', title: 'Load Balancer Config', description: 'Setup traffic distribution' },
      { id: 'step-6', title: 'SSL Configuration', description: 'Configure SSL certificates' },
      { id: 'step-7', title: 'Monitoring Setup', description: 'Deploy monitoring agents' },
      { id: 'step-8', title: 'Health Check', description: 'Verify all services are healthy' }
    ]
  },
  // New Workflow 2: Marketing Campaign
  {
    id: 'marketing-campaign',
    name: 'Marketing Campaign Flow',
    description: 'End-to-end marketing campaign execution',
    steps: [
      { id: 'step-1', title: 'Campaign Planning', description: 'Define campaign objectives and target audience' },
      { id: 'step-2', title: 'Content Creation', description: 'Design and create marketing assets' },
      { id: 'step-3', title: 'Channel Selection', description: 'Choose marketing channels' },
      { id: 'step-4', title: 'Campaign Setup', description: 'Configure campaign in marketing tools' },
      { id: 'step-5', title: 'Launch Campaign', description: 'Go live with campaign' },
      { id: 'step-6', title: 'Monitor Performance', description: 'Track key metrics' },
      { id: 'step-7', title: 'A/B Testing', description: 'Test variations and optimize' },
      { id: 'step-8', title: 'Generate Report', description: 'Compile campaign results' }
    ]
  },
  // New Workflow 3: Customer Support
  {
    id: 'customer-support',
    name: 'Customer Support Flow',
    description: 'Ticket resolution and customer satisfaction process',
    steps: [
      { id: 'step-1', title: 'Ticket Received', description: 'New support ticket created' },
      { id: 'step-2', title: 'Ticket Triage', description: 'Categorize and prioritize ticket' },
      { id: 'step-3', title: 'Initial Response', description: 'Acknowledge customer inquiry' },
      { id: 'step-4', title: 'Investigation', description: 'Research and analyze issue' },
      { id: 'step-5', title: 'Solution Development', description: 'Create fix or workaround' },
      { id: 'step-6', title: 'Customer Contact', description: 'Provide solution to customer' },
      { id: 'step-7', title: 'Resolution Confirmation', description: 'Verify issue is resolved' },
      { id: 'step-8', title: 'Follow-up Survey', description: 'Send satisfaction survey' }
    ]
  }
];

export const stepStatuses = {
  PENDING: 'pending',
  RUNNING: 'running',
  COMPLETED: 'completed',
  ERROR: 'error'
};

export const simulationSpeeds = {
  SLOW: 2000,
  NORMAL: 1000,
  FAST: 500
};
