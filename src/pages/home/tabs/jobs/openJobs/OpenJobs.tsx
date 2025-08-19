import { Skeleton, Pagination } from 'antd'
import ShortjobDisplay from '@/components/ShortJobDisplay/ShortJobDisplay'
import type { IShortJobDto } from '@/dtos/shortJob.interface'
import useLogicOpenJobs from './useLogicOpenJobs'
import './style.less'

function OpenJobs() {
  const {
    currentPage,
    pageSize,
    totalItems,
    paginatedData,
    isSuccess,
    isFetching,
    handlePageChange,
  } = useLogicOpenJobs()

  return (
    <div className="open-jobs-container">
      <h3>Trabalhos Em Aberto</h3>
      {!isFetching && isSuccess ? (
        <>
          {paginatedData.map((job: IShortJobDto) => (
            <ShortjobDisplay
              id={job.jobId}
              companyId={job.companyId}
              company={job.client}
              function={job.jobFunction}
              jobDate={new Date()}
              location={job.title}
              mens={job.people.men}
              womans={job.people.women}
              image={{ imagePath: job.image }}
              key={job.jobId}
            />
          ))}
          {totalItems > pageSize && (
            <div className="pagination-container">
              <Pagination
                current={currentPage}
                total={totalItems}
                pageSize={pageSize}
                onChange={handlePageChange}
                showSizeChanger={false}
                showTotal={(total, range) =>
                  `${range[0]}-${range[1]} de ${total} trabalhos`
                }
              />
            </div>
          )}
        </>
      ) : (
        <Skeleton active />
      )}
    </div>
  )
}

export default OpenJobs
