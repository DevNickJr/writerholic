import 'server-only'
import { cookies } from 'next/headers'
import { decrypt } from '@/lib/session'
import { cache } from 'react'
import { redirect } from 'next/navigation'
import { RoleEnum } from '@/interfaces'
 
export const verifySession = cache(async (role?: string) => {
  const cookie = cookies().get('session')?.value
  const session = await decrypt(cookie)
 
  if (!session?.userId) {
    redirect('/login')
  }

  if (!!role && role !== session.role) {
    redirect('/login')
  }

  return { isAuth: true, userId: session.userId, role: session.role }
})


export const apiVerifySession = cache(async (role?: string, required: boolean = true) => {
  const cookie = cookies().get('session')?.value
  const session = await decrypt(cookie)

  if (!!required) {
    if (!session?.userId) {
     throw new Error('You are not authorised to perform this function');
    }
  
    if (!!role && role !== session.role) {
     throw new Error('You are not authorised to perform this function');
    }

    return { isAuth: true, userId: session.userId || '', role: session.role }
  }

  return { isAuth: !!session?.userId, userId: session?.userId || '', role: session?.role || '' }
})

export const getUser = cache(async () => {
    const session = await verifySession()
    if (!session) return null
   
    try {
    //   const data = await db.query.users.findMany({
    //     where: eq(users.id, session.userId),
    //     // Explicitly return the columns you need rather than the whole user object
    //     columns: {
    //       id: true,
    //       name: true,
    //       email: true,
    //     },
    //   })
   
    //   const user = data[0]
   
      return { user: '' }
    } catch (error: unknown) {
      console.log('Failed to fetch user', error)
      return null
    }
})

export const confirmAdminLogin = cache(async () => {
  const cookie = cookies().get('session')?.value
  const session = await decrypt(cookie)
 
  if (session?.userId && session?.role === RoleEnum.admin) {
    redirect('/admin')
  }
})