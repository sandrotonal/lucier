import { supabase } from '../lib/supabase'

export interface PhoneAuthData {
  phone: string
  code?: string
}

export const phoneAuthService = {
  async sendOTP(phone: string): Promise<{ ok: boolean; error?: string }> {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone,
        options: {
          channel: 'sms',
        },
      })

      if (error) {
        return { ok: false, error: error.message }
      }

      return { ok: true }
    } catch (err) {
      return {
        ok: false,
        error: err instanceof Error ? err.message : 'Failed to send OTP',
      }
    }
  },

  async verifyOTP(phone: string, token: string): Promise<{ ok: boolean; error?: string }> {
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        phone,
        token,
        type: 'sms',
      })

      if (error) {
        return { ok: false, error: error.message }
      }

      if (!data.user) {
        return { ok: false, error: 'Verification failed' }
      }

      return { ok: true }
    } catch (err) {
      return {
        ok: false,
        error: err instanceof Error ? err.message : 'Verification failed',
      }
    }
  },

  async enable2FA(phone: string): Promise<{ ok: boolean; error?: string }> {
    try {
      const { error } = await supabase.auth.mfa.enroll({
        factorType: 'phone',
        phone,
      })

      if (error) {
        return { ok: false, error: error.message }
      }

      return { ok: true }
    } catch (err) {
      return {
        ok: false,
        error: err instanceof Error ? err.message : 'Failed to enable 2FA',
      }
    }
  },

  async verify2FA(factorId: string, code: string): Promise<{ ok: boolean; error?: string }> {
    try {
      const { data, error } = await supabase.auth.mfa.challenge({
        factorId,
      })

      if (error) {
        return { ok: false, error: error.message }
      }

      const { error: verifyError } = await supabase.auth.mfa.verify({
        factorId,
        challengeId: data.id,
        code,
      })

      if (verifyError) {
        return { ok: false, error: verifyError.message }
      }

      return { ok: true }
    } catch (err) {
      return {
        ok: false,
        error: err instanceof Error ? err.message : '2FA verification failed',
      }
    }
  },

  formatPhoneNumber(phone: string): string {
    const cleaned = phone.replace(/\D/g, '')
    
    if (cleaned.startsWith('0')) {
      return `+90${cleaned.substring(1)}`
    }
    
    if (cleaned.startsWith('90')) {
      return `+${cleaned}`
    }
    
    if (!cleaned.startsWith('+')) {
      return `+90${cleaned}`
    }
    
    return cleaned
  },

  validatePhoneNumber(phone: string): boolean {
    const cleaned = phone.replace(/\D/g, '')
    return cleaned.length >= 10 && cleaned.length <= 15
  },
}
