import { createClient, SupabaseClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://cqtbishpefnfvaxheyqu.supabase.co'
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxdGJpc2hwZWZuZnZheGhleXF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM4NDIwMDYsImV4cCI6MjA1OTQxODAwNn0.QXKAGYy2l21gwcfXlKLyCq8Te4yotrvgkLY4M1v0aCs'

export class SupabaseConfig {
  public supabase: SupabaseClient

  constructor() {
    this.supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  }
}

export class Api {
  private baseUrl: string

  constructor(baseUrl: string = 'https://api.pyrenzai.com') {
    this.baseUrl = baseUrl
  }

  private async request<T>(url: string, method: string, data?: any): Promise<T> {
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : undefined,
    }

    const response = await fetch(`${this.baseUrl}${url}`, options)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  }

  async get<T>(url: string): Promise<T> {
    return this.request<T>(url, 'GET')
  }

  async post<T>(url: string, data: any): Promise<T> {
    return this.request<T>(url, 'POST', data)
  }

  async put<T>(url: string, data: any): Promise<T> {
    return this.request<T>(url, 'PUT', data)
  }

  async delete<T>(url: string): Promise<T> {
    return this.request<T>(url, 'DELETE')
  }
}
