import './style.less'
import { useParams } from 'react-router-dom'
import useJobDetails from '../../hooks/useJobDetails'
import { FaCalendar, FaClock } from 'react-icons/fa'

function JobDetails() {
  const { id } = useParams()
  const { data, isSuccess } = useJobDetails(`${id}`, true)

  const horarioInicio = data?.eventStartDateHour.match(/T(.{5})/)?.[1]
  const horarioFim = data?.eventFinishDateHour.match(/T(.{5})/)?.[1]

  return (
    <div className="job-details-container">
      <h1 className="job-title">{data?.title}</h1>

      <div className="header">
        <img
          className="image-header"
          src={data?.image.imagePath}
          alt="header"
        />
        <div className="image-title">
          <div className="summary-contents">
            <h1>{data?.jobFunction}</h1>
            <div className="summary-dates">
              <p>
                <FaCalendar />{' '}
                {data?.eventStartDateHour
                  ? new Date(data?.eventStartDateHour).toLocaleDateString(
                      'pt-BR',
                    )
                  : '-'}
              </p>

              <p>
                <FaClock /> {data?.eventStartDateHour ? horarioInicio : '-'}-
                {data?.eventFinishDateHour ? horarioFim : '-'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobDetails
