import { supabase } from '../lib/supabase'

export interface User {
  id: string
  email: string
  firstName?: string
  lastName?: string
  phone?: string
  createdAt: string
}

export interface AuthSession {
  user: User
  token: string
  expiresAt: number
}

export interface SignUpData {
  email: string
  password: string
  firstName?: string
  lastName?: string
}

export interface SignInData {
  email: string
  password: string
}

const AUTH_KEY = 'lucir-auth-session'

export const authService = {
  async signUp(data: SignUpData): Promise<{ ok: boolean; user?: User; error?: string }> {
    try {
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            first_name: data.firstName,
            last_name: data.lastName,
          },
        },
      })

      if (error) {
        return { ok: false, error: error.message }
      }

      if (!authData.user) {
        return { ok: false, error: 'Failed to create user' }
      }

      const user: User = {
        id: authData.user.id,
        email: authData.user.email || data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        createdAt: authData.user.created_at,
      }

      const session: AuthSession = {
        user,
        token: authData.session?.access_token || '',
        expiresAt: Date.now() + 3600000,
      }

      localStorage.setItem(AUTH_KEY, JSON.stringify(session))

      return { ok: true, user }
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : 'Sign up failed' }
    }
  },

  async signIn(data: SignInData): Promise<{ ok: boolean; user?: User; error?: string }> {
    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })

      if (error) {
        return { ok: false, error: error.message }
      }

      if (!authData.user) {
        return { ok: false, error: 'Invalid credentials' }
      }

      const user: User = {
        id: authData.user.id,
        email: authData.user.email || data.email,
        firstName: authData.user.user_metadata?.first_name,
        lastName: authData.user.user_metadata?.last_name,
        phone: authData.user.user_metadata?.phone,
        createdAt: authData.user.created_at,
      }

      const session: AuthSession = {
        user,
        token: authData.session?.access_token || '',
        expiresAt: Date.now() + 3600000,
      }

      localStorage.setItem(AUTH_KEY, JSON.stringify(session))

      return { ok: true, user }
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : 'Sign in failed' }
    }
  },

  async signOut(): Promise<void> {
    try {
      await supabase.auth.signOut()
    } catch (err) {
      console.error('Sign out error:', err)
    }
    localStorage.removeItem(AUTH_KEY)
  },

  getSession(): AuthSession | null {
    const stored = localStorage.getItem(AUTH_KEY)
    if (!stored) return null

    try {
      const session: AuthSession = JSON.parse(stored)
      if (session.expiresAt < Date.now()) {
        localStorage.removeItem(AUTH_KEY)
        return null
      }
      return session
    } catch {
      return null
    }
  },

  getCurrentUser(): User | null {
    const session = this.getSession()
    return session?.user || null
  },

  isAuthenticated(): boolean {
    return this.getSession() !== null
  },

  async updateProfile(data: Partial<User>): Promise<{ ok: boolean; error?: string }> {
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          first_name: data.firstName,
          last_name: data.lastName,
          phone: data.phone,
        },
      })

      if (error) {
        return { ok: false, error: error.message }
      }

      const session = this.getSession()
      if (session) {
        session.user = { ...session.user, ...data }
        localStorage.setItem(AUTH_KEY, JSON.stringify(session))
      }

      return { ok: true }
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : 'Update failed' }
    }
  },

  async resetPassword(email: string): Promise<{ ok: boolean; error?: string }> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      if (error) {
        return { ok: false, error: error.message }
      }

      return { ok: true }
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : 'Password reset failed' }
    }
  },

  async changePassword(newPassword: string): Promise<{ ok: boolean; error?: string }> {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      })

      if (error) {
        return { ok: false, error: error.message }
      }

      return { ok: true }
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : 'Password change failed' }
    }
  },
}
