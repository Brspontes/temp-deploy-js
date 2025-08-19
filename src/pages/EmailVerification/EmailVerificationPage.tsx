import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import EmailVerification from '@/components/EmailVerification/EmailVerification'

function EmailVerificationPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [email, setEmail] = useState<string>('')

  useEffect(() => {
    const emailFromState = location.state?.email
    const emailFromStorage = localStorage.getItem('email')
    
    if (emailFromState) {
      setEmail(emailFromState)
    } else if (emailFromStorage) {
      setEmail(emailFromStorage)
    } else {
      navigate('/')
    }
  }, [location.state, navigate])

  const handleVerificationSuccess = () => {
    navigate('/')
  }

  if (!email) {
    return null
  }

  return (
    <EmailVerification 
      email={email} 
      onSuccess={handleVerificationSuccess}
      successRedirectPath="/"
    />
  )
}

export default EmailVerificationPage
