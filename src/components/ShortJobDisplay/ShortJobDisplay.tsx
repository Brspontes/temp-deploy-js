import { Avatar, Tag } from 'antd'
import './style.less'
import { UserOutlined } from '@ant-design/icons'
import { RiShoppingBagLine } from 'react-icons/ri'
import { FaUser } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
interface ShortjobDisplayProps {
  id: string
  company: string
  location: string
  function: string
  mens: string
  womans: string
  jobDate: Date
  image: {
    imagePath: string
  }
}

function ShortjobDisplay(props: ShortjobDisplayProps) {
  const navigate = useNavigate()
  return (
    <div
      className="card-contaianer"
      onClick={() => navigate(`/home/jobs/open-jobs/${props.id}`)}
    >
      {props.image ? (
        <Avatar size={53} src={props.image.imagePath} />
      ) : (
        <Avatar size={53} icon={<UserOutlined />} />
      )}

      <div className="card-company-data">
        <p className="company-data-title">{props.company}</p>
        <p className="company-data-subtitle">{props.location}</p>
      </div>
      <div className="card-job">
        <div className="card-job-function">
          <RiShoppingBagLine size={20} />
          <p>{props.function}</p>
        </div>
        <div className="card-job-employee">
          <div>
            <Tag
              color="#6B65DE"
              className="tag-rounded"
              icon={<FaUser className="icon-color" />}
            >
              {props.mens}
            </Tag>
            <Tag
              color="#E89DE7"
              className="tag-rounded"
              icon={<FaUser className="icon-color" />}
            >
              {props.womans}
            </Tag>
          </div>
          <p className="card-job-employee-created">{`${
            props.jobDate ? new Date(props.jobDate).toDateString() : '-'
          }`}</p>
        </div>
      </div>
    </div>
  )
}

export default ShortjobDisplay
