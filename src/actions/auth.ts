import { deleteSession } from '@/lib/session'
import bcrypt from 'bcrypt'

export async function signup(state: any, formData: FormData) {
    // 1. Validate form fields
    // ...
   
    // 2. Prepare data for insertion into database
    // const { name, email, password } = validatedFields.data
    // e.g. Hash the user's password before storing it
    const hashedPassword = await bcrypt.hash('password', 10)
   
    // 3. Insert the user into the database or call an Auth Library's API
    // const data = await db
    //   .insert(users)
    //   .values({
    //     name,
    //     email,
    //     password: hashedPassword,
    //   })
    //   .returning({ id: users.id })
   
    // const user = data[0]
   
    // if (!user) {
    //   return {
    //     message: 'An error occurred while creating your account.',
    //   }
    // }
   
    // TODO:
    // 4. Create user session
    // 5. Redirect user
    // await createSession(user.id)
    // 5. Redirect user
    // redirect('/profile')
}
 

export async function logout() {
  deleteSession()
//   redirect('/login')
}