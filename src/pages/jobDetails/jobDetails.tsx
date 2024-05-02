import './style.less'
import { useParams } from 'react-router-dom'
import useJobDetails from '../../hooks/useJobDetails'
import { FaCalendar, FaClock, FaUser, FaTshirt } from 'react-icons/fa'
import { Avatar, Tag } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { IoShirtOutline } from 'react-icons/io5'
import { PiPants, PiSneakerLight } from 'react-icons/pi'
import { FaLocationDot } from 'react-icons/fa6'

function JobDetails() {
  const { id } = useParams()
  const { data } = useJobDetails(`${id}`, true)

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
          <div className="summary-session">
            <h1 className="summary-title">{data?.title}</h1>
            <div className="summary-contents">
              <p>
                <FaCalendar className="icon" />{' '}
                {data?.eventStartDateHour
                  ? new Date(data?.eventStartDateHour).toLocaleDateString(
                      'pt-BR',
                    )
                  : '-'}
              </p>

              <p>
                <FaClock className="icon" />{' '}
                {data?.eventStartDateHour ? horarioInicio : '-'}{' '}
                <span style={{ margin: '0 7px' }}>-</span>
                {data?.eventFinishDateHour ? horarioFim : '-'}
              </p>
              <p>
                <FaLocationDot className="icon" />{' '}
                {data?.location ? data.location : '-'}
              </p>
              <div className="card-job-employee">
                <Tag
                  color="#6B65DE"
                  className="tag-rounded"
                  icon={<FaUser className="icon-color" />}
                >
                  {data?.people.men}
                </Tag>
                <Tag
                  color="#E89DE7"
                  className="tag-rounded"
                  icon={<FaUser className="icon-color" />}
                >
                  {data?.people.women}
                </Tag>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="details">
        <div className="header-details">
          <div className="function-info">
            <h3>Função</h3>
            <h2>{data?.jobFunction}</h2>
          </div>
          <div className="payment-info">
            <h1>{data?.salary}€</h1>
          </div>
        </div>
        <div className="company-info">
          {' '}
          {data?.companyPicture ? (
            <Avatar size={45} src={data?.companyPicture} />
          ) : (
            <Avatar size={45} icon={<UserOutlined />} />
          )}
          <p>{data?.companyName}</p>
        </div>
        <p className="job-description">{data?.description}</p>
        <div className="people-wear-section">
          <div className="wear-container">
            <Tag
              color="#6B65DE"
              className="tag-rounded"
              icon={<IoShirtOutline className="icon-wear" size={20} />}
            />
            <p>{data?.peopleWear.menTshirt}</p>
          </div>
          <div className="wear-container">
            <Tag
              color="#6B65DE"
              className="tag-rounded"
              icon={<PiPants className="icon-wear" size={20} />}
            />
            <p>{data?.peopleWear.menPants}</p>
          </div>
          <div className="wear-container">
            <Tag
              color="#6B65DE"
              className="tag-rounded"
              icon={<PiSneakerLight className="icon-wear" size={20} />}
            />
            <p>{data?.peopleWear.menShoes}</p>
          </div>
          <div className="wear-container">
            <Tag
              color="#E89DE7"
              className="tag-rounded"
              icon={<IoShirtOutline className="icon-wear" size={20} />}
            />
            <p>{data?.peopleWear.womenTshirt}</p>
          </div>
          <div className="wear-container">
            <Tag
              color="#E89DE7"
              className="tag-rounded"
              icon={<PiPants className="icon-wear" size={20} />}
            />
            <p>{data?.peopleWear.womenPants}</p>
          </div>
          <div className="wear-container">
            <Tag
              color="#E89DE7"
              className="tag-rounded"
              icon={<PiSneakerLight className="icon-wear" size={20} />}
            />
            <p>{data?.peopleWear.womenShoes}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobDetails
