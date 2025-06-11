// Mock database for demo - replace with actual database connection
const projects = [
  {
    id: 1,
    title: "Clean Water for Rural Schools",
    description: "Providing clean water access to 5 rural schools in Kenya, benefiting over 2000 students",
    target_amount: 50000,
    current_amount: 15000,
    image_url: "/placeholder.svg?height=300&width=400",
    category: "Education",
    status: "active",
  },
  {
    id: 2,
    title: "Food Security Program",
    description: "Supporting local farmers with seeds and tools to improve food security in drought-affected areas",
    target_amount: 75000,
    current_amount: 32000,
    image_url: "/placeholder.svg?height=300&width=400",
    category: "Agriculture",
    status: "active",
  },
  {
    id: 3,
    title: "Digital Learning Centers",
    description: "Setting up computer labs in underserved communities to bridge the digital divide",
    target_amount: 100000,
    current_amount: 45000,
    image_url: "/placeholder.svg?height=300&width=400",
    category: "Technology",
    status: "active",
  },
  {
    id: 4,
    title: "Healthcare Mobile Clinics",
    description: "Funding mobile clinics to provide healthcare services to remote communities",
    target_amount: 120000,
    current_amount: 67000,
    image_url: "/placeholder.svg?height=300&width=400",
    category: "Healthcare",
    status: "active",
  },
]

const donations = []

export const db = {
  projects: {
    getAll: () => projects,
    getById: (id) => projects.find((p) => p.id === Number.parseInt(id)),
    updateAmount: (id, amount) => {
      const project = projects.find((p) => p.id === Number.parseInt(id))
      if (project) {
        project.current_amount += amount
      }
    },
  },
  donations: {
    create: (donation) => {
      const newDonation = {
        id: donations.length + 1,
        ...donation,
        created_at: new Date().toISOString(),
      }
      donations.push(newDonation)
      return newDonation
    },
    getAll: () => donations,
    getByProject: (projectId) => donations.filter((d) => d.project_id === Number.parseInt(projectId)),
  },
}
