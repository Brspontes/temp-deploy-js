import { createBrowserRouter } from 'react-router-dom'
import Home from './src/pages/home/Home'
import Login from './src/pages/login/Login'
import NewJob from './src/pages/home/tabs/newJob/NewJob'
import OpenJobs from './src/pages/home/tabs/jobs/openJobs/OpenJobs'
import JobDetails from './src/pages/jobDetails/jobDetails'

const router = createBrowserRouter([
  { path: '/', element: <Login /> },
  {
    path: '/home',
    element: <Home />,
    children: [
      { path: 'new-job', element: <NewJob /> },
      { path: 'jobs/open-jobs', element: <OpenJobs /> },
      { path: 'jobs/open-jobs/:id', element: <JobDetails /> },
    ],
  },
])

export default router
