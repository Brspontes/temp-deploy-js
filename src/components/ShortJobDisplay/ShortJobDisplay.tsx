import { Avatar, Tag } from 'antd'
import './style.less'
import { UserOutlined } from '@/utils/icons'
import { RiShoppingBagLine } from 'react-icons/ri'
import { FaUser } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
interface ShortjobDisplayProps {
  id: string
  companyId: string
  company: string
  location: string
  function: string
  mens?: number
  womans?: number
  jobDate: Date
  image: {
    imagePath: string
  }
}

function ShortjobDisplay(props: Readonly<ShortjobDisplayProps>) {
  const navigate = useNavigate()
  
  const handleCardClick = () => {
    navigate(`/home/jobs/open-jobs/${props.id}/${props.companyId}`)
  }
  
  return (
    <div
      className="card-contaianer"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleCardClick()
        }
      }}
    >
      {props.image?.imagePath && props.image.imagePath.trim() !== '' ? (
        <Avatar 
          size={53} 
          src={props.image.imagePath}
          alt={props.company}
        />
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
            {props.mens !== undefined && props.mens !== null && props.mens > 0 && (
              <Tag
                className="tag-rounded tag-men"
                icon={<FaUser className="icon-color" />}
              >
                {props.mens}
              </Tag>
            )}
            {props.womans !== undefined && props.womans !== null && props.womans > 0 && (
              <Tag
                className="tag-rounded tag-women"
                icon={<FaUser className="icon-color" />}
              >
                {props.womans}
              </Tag>
            )}
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
