import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api.js'

const RegisterPage = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)

    try {
      await api.post('/auth/register', {
        username: formData.get('name'),
        gmail: formData.get('email'),
        password: formData.get('password'),
      })
      navigate('/home')
    } catch (requestError) {
      setError(requestError.response?.data?.message ?? 'Unable to register. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="flex min-h-screen justify-center bg-[#f3f4f6] font-sans text-black">
      <section className="min-h-screen w-full max-w-101 bg-white pt-39.75">
        <form className="mx-auto w-[calc(100%-50px)] max-w-88.25" onSubmit={handleSubmit}>
          <h1 className="mb-7.25 text-center text-2xl font-bold leading-7.25">
            Create new account
          </h1>

          <div className="flex flex-col gap-3">
            <input
              aria-label="Name"
              autoComplete="name"
              className="h-14.25 rounded-[17px] bg-[#f4f0ea] px-5.25 text-sm outline-none placeholder:text-[#aaa5a0] focus:ring-2 focus:ring-black/15"
              name="name"
              placeholder="Name"
              required
            />
            <input
              aria-label="Email"
              autoComplete="email"
              className="h-14.25 rounded-[17px] bg-[#f4f0ea] px-5.25 text-sm outline-none placeholder:text-[#aaa5a0] focus:ring-2 focus:ring-black/15"
              name="email"
              placeholder="Email"
              required
              type="email"
            />
            <input
              aria-label="Password"
              autoComplete="new-password"
              className="h-14.25 rounded-[17px] bg-[#f4f0ea] px-5.25 text-sm outline-none placeholder:text-[#aaa5a0] focus:ring-2 focus:ring-black/15"
              name="password"
              placeholder="Password"
              required
              type="password"
            />
          </div>

          {error && (
            <p className="mt-3 text-center text-sm text-red-600" role="alert">
              {error}
            </p>
          )}

          <button
            className="mt-4 h-14.25 w-full rounded-[17px] bg-black text-sm text-white"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? 'Creating account...' : 'Register'}
          </button>

          <p className="mt-5.5 text-center text-sm text-[#a5a5b0]">
            Already have an account?{' '}
            <Link className="text-black underline" to="/login">
              Log In
            </Link>
          </p>
        </form>
      </section>
    </main>
  )
}

export default RegisterPage