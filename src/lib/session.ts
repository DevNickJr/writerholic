import 'server-only'
import { cookies } from 'next/headers'
import { JWTPayload, SignJWT, jwtVerify } from 'jose'
// import { SessionPayload } from '@/interfaces'

 
const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)
 
export async function encrypt(payload: JWTPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}
 
export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    console.log('Failed to verify session', error)
  }
}

 
export async function createSession(userId: string, role: string, remember?: boolean) {
  const expiresAt = new Date(Date.now() + (remember ? 30 : 1) * 24 * 60 * 60 * 1000)
  const session = await encrypt({ userId, expiresAt, role })
 
  cookies().set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}

export async function updateSession() {
  const session = cookies().get('session')?.value
  const payload = await decrypt(session)
 
  if (!session || !payload) {
    return null
  }
 
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  cookies().set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: 'lax',
    path: '/',
  })
}

export function deleteSession() {
  cookies().delete('session')
}
