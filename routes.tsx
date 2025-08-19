import { Navigate, createBrowserRouter } from 'react-router-dom'
import Home from './src/pages/home/Home'
import Login from './src/pages/login/Login'
import Register from './src/pages/register/Register'
import NewJob from './src/pages/home/tabs/newJob/NewJob'
import OpenJobs from './src/pages/home/tabs/jobs/openJobs/OpenJobs'
import JobDetails from './src/pages/jobDetails/jobDetails'
import Dashboard from './src/components/Dashboard/Dashboard'
import { isAuthenticated } from '@/utils/util'
import ForgotPassword from '@/pages/ForgotPassword/ForgotPassword'
import EmailVerificationPage from '@/pages/EmailVerification/EmailVerificationPage'
import CandidateApproval from '@/pages/home/tabs/jobs/CandidateApproval/CandidateApproval'
import EditProfile from '@/pages/EditProfile/EditProfile'

// eslint-disable-next-line react-refresh/only-export-components
const ProtectedRoute = ({
  element: Element,
  ...rest
}: {
  element: React.ComponentType<any>
}) => {
  return isAuthenticated() ? (
    <Element {...rest} />
  ) : (
    <>
      {localStorage.clear()}
      {localStorage.setItem('userLogged', 'false')}
      <Navigate to="/" />
    </>
  )
}

const router = createBrowserRouter([
  { path: '/', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/forgot-password' , element: <ForgotPassword /> },
  { path: '/email-verification', element: <EmailVerificationPage /> },
  {
    path: '/home',
    element: <ProtectedRoute element={Home} />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'new-job', element: <NewJob /> },
      { path: 'jobs/open-jobs', element: <OpenJobs /> },
      { path: 'jobs/open-jobs/:jobId/:companyId', element: <JobDetails /> },
      { path: 'jobs/aprovacao-candidatos/:jobId/:companyId', element: <CandidateApproval /> },
      { path: 'edit-profile', element: <EditProfile /> }, 
    ],
  },
])

export default router
