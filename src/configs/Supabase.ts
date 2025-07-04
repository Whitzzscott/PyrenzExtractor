import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://cqtbishpefnfvaxheyqu.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxdGJpc2hwZWZuZnZheGhleXF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM4NDIwMDYsImV4cCI6MjA1OTQxODAwNn0.QXKAGYy2l21gwcfXlKLyCq8Te4yotrvgkLY4M1v0aCs'
)
