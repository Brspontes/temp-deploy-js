import { Skeleton } from 'antd'
import ShortjobDisplay from '../../../../../components/ShortJobDisplay/ShortJobDisplay'
import useJobList from '../../../../../hooks/useJobList'
import './style.less'

function OpenJobs() {
  const { data, isSuccess, isFetching } = useJobList()
  return (
    <div className="open-jobs-container">
      <h3>Trabalhos Em Aberto</h3>
      {!isFetching && isSuccess ? (
        data?.map((job) => (
          <ShortjobDisplay
            id={job.jobId}
            company={job.companyName}
            function={job.jobFunction}
            jobDate={job.eventStartDateHour}
            location={job.location}
            mens={job.people.men.toString()}
            womans={job.people.women.toString()}
            image={job.image}
            key={job.jobId}
          />
        ))
      ) : (
        <Skeleton active />
      )}
    </div>
  )
}

export default OpenJobs
