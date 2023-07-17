export const paths = {
  index: "/",
  dashboard: {
    admin: "dashboard/admin",
    employee: "dashboard/employee",
    user: "dashboard/user",
  },
  staff: {
    index: "/staff",
    details: (id) => `/staff/${id}`,
    edit: (id) => `/staff/${id}/edit`,
  },
  customers: {
    index: "/customers",
    details: (id) => `/customers/${id}`,
    edit: (id) => `/customers/${id}/edit`,
  },
  gyms: {
    index: "/gyms",
    details: (id) => `/gyms/${id}`,
    create: (id) => `/gyms/${id}/create`,
  },
  registers: {
    index: "/registers",
  },

  feedback: {
    index: "/feedback",
  },
  packages: {
    index: "/packages",
    create: "/packages/create",
  },

  401: "/401",
  404: "/404",
  500: "/500",
};
