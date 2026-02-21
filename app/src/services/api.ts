const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

/**
 * API service for authentication
 */
export const authService = {
  // Added Signup Function
  signup: async (name: string, email: string, password: string, role: string = "job_seeker") => {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Signup failed");
    }

    return response.json();
  },

  login: async (email: string, password: string, role: string = "user") => {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // Added role to the body payload
      body: JSON.stringify({ email, password, role }), 
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Login failed");
    }

    return response.json();
  },

  getCurrentUser: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    return response.json();
  },
  
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  getToken: () => localStorage.getItem("token"),
  getUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },
  setToken: (token: string) => localStorage.setItem("token", token),
  setUser: (user: any) => localStorage.setItem("user", JSON.stringify(user)),
};

/**
 * API service for job posting
 */
export const jobService = {
  createJob: async (jobData: any, token: string) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(jobData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Failed to create job");
    }

    return response.json();
  },

  getMyJobs: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/jobs/my-jobs`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch jobs");
    }

    return response.json();
  },

  getJob: async (jobId: string, token?: string) => {
    const headers: any = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/api/v1/jobs/${jobId}`, {
      headers,
    });

    if (!response.ok) {
      throw new Error("Failed to fetch job");
    }

    return response.json();
  },

  listJobs: async () => {
    const response = await fetch(`${API_BASE_URL}/api/v1/jobs`);

    if (!response.ok) {
      throw new Error("Failed to fetch jobs");
    }

    return response.json();
  },
};

/**
 * API service for admin operations
 */
export const adminService = {
  getPendingJobs: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/admin/jobs/pending`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch pending jobs");
    }

    return response.json();
  },

  approveJob: async (jobId: string, approved: boolean, rejectionReason?: string, token?: string) => {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/admin/jobs/${jobId}/approve`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          approved,
          rejection_reason: rejectionReason,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Failed to update job");
    }

    return response.json();
  },
};

/**
 * API service for employees
 */
export const employeeService = {
  getEmployeesByCompany: async (companyId: string) => {
    // Since we don't have a backend endpoint for employees yet,
    // we'll import the data directly
    const { getEmployeesByCompanyId } = await import('@/data/employees');
    return getEmployeesByCompanyId(companyId);
  },
};