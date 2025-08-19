import './style.less'
import { 
  Tag, 
  Button, 
  Card, 
  Avatar, 
  Typography, 
  Space, 
  Flex
} from 'antd'
import { 
  CalendarOutlined, 
  ClockCircleOutlined, 
  UserOutlined,
  EnvironmentOutlined,
  ArrowLeftOutlined,
  StarOutlined,
  ArrowRightOutlined
} from '@ant-design/icons'
import { IoShirtOutline } from 'react-icons/io5'
import { PiPants, PiSneakerLight } from 'react-icons/pi'
import TagWear from '@/components/TagWear/TagWear'
import useLogicJobDetails from './useLogicJobDetails'

const { Title, Text, Paragraph } = Typography

function JobDetails() {
  const {
    data,
    isExpanded,
    activeTab,
    handleGoBack,
    toggleDescription,
    handleControlClick,
    handleMyAdClick,
    handleCandidatesClick
  } = useLogicJobDetails()

  return (
    <div className="job-details-container">
      <div className="header-banner">
        <img
          className="banner-image"
          src={data?.image}
          alt={data?.title}
        />
        <div className="banner-overlay">
          <div className="banner-content">
            <Flex justify="space-between" align="flex-start" className="banner-top">
              <Button 
                className="back-button" 
                onClick={handleGoBack}
                icon={<ArrowLeftOutlined />}
                shape="round"
                size="middle"
              >
                Ativação Dewar's
              </Button>
              <Space size="large" className="banner-controls">
                <Button 
                  className={`control-button ${activeTab === 'meu-anuncio' ? 'active' : ''}`} 
                  type="text"
                  onClick={handleMyAdClick}
                >
                  Meu anúncio
                </Button>
                <Button 
                  className={`control-button ${activeTab === 'controlo' ? 'active' : ''}`} 
                  type="text"
                  onClick={handleControlClick}
                >
                  Controlo
                </Button>
              </Space>
            </Flex>
            
            <Flex justify="space-between" align="flex-end" className="banner-bottom">
              <div className="banner-info-left">
                <Title level={1} className="banner-title">{data?.title}</Title>
                <Space size="large" className="banner-details">
                  <Space size="small">
                    <CalendarOutlined className="banner-icon" />
                    <Text>{data?.eventDates?.[0]?.startDate ? new Date(data.eventDates[0].startDate).toLocaleDateString() : 'Data não informada'}</Text>
                  </Space>
                  <Space size="small">
                    <ClockCircleOutlined className="banner-icon" />
                    <Text>
                      {data?.eventDates?.[0]?.startDate && data?.eventDates?.[0]?.finishDate 
                        ? `${new Date(data.eventDates[0].startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${new Date(data.eventDates[0].finishDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                        : 'Horário não informado'
                      }
                    </Text>
                  </Space>
                  <Space size="small">
                    <EnvironmentOutlined className="banner-icon" />
                    <Text>{data?.location}</Text>
                  </Space>
                </Space>
              </div>
              
              <Space size="small" className="banner-people-tags">
                <Tag
                  color="#6B65DE"
                  className="banner-people-tag"
                  icon={<UserOutlined />}
                >
                  {data?.people.men}
                </Tag>
                <Tag
                  color="#E89DE7"
                  className="banner-people-tag"
                  icon={<UserOutlined />}
                >
                  {data?.people.women}
                </Tag>
              </Space>
            </Flex>
          </div>
        </div>
      </div>

      <div className="main-content">
        <Flex justify="space-between" align="flex-start" className="job-header">
          <div className="job-title-section">
            <Text type="secondary" className="job-category">FUNÇÃO</Text>
            <Title level={1} className="job-title">{data?.jobFunction}</Title>
          </div>
          
          <div className="job-price">
            <Title level={1} className="price-total">
              {data?.totalSalary?.value || data?.totalSalary}€
            </Title>
            <Text type="secondary" className="price-per-hour">
              {(() => {
                const salaryValue = data?.salary?.value || data?.salary;
                if (!salaryValue || salaryValue === "Infinity") {
                  return "Valor por hora não informado";
                }
                return `${salaryValue}€/ hora`;
              })()}
            </Text>
          </div>
        </Flex>

        <div className="company-section">
          <Flex align="center" gap="middle">
            <Avatar 
              size={52} 
              src={data?.companyPicture} 
              icon={<UserOutlined />} 
              className="company-avatar" 
            />
            <Flex vertical className="company-details">
              <Title level={4} className="company-name">{data?.companyName}</Title>
              <Flex align="center" gap="middle" className="company-location">
                <Flex align="center" gap="small">
                  <EnvironmentOutlined style={{ color: '#dc3545', fontSize: '12px' }} />
                  <Text type="secondary" style={{ fontSize: '14px' }}>
                    {data?.companyLocation || 'Localização não informada'}
                  </Text>
                </Flex>
                <Flex align="center" gap="small">
                  <StarOutlined style={{ color: '#ffc107', fontSize: '12px' }} />
                  <Text type="secondary" style={{ fontSize: '14px' }}>
                    {data?.companyAnnouncimentsQuantity || 0} anúncios ativos
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </div>

        {/* Descrição */}
        <div className="description-section">
          <Paragraph>
            {isExpanded ? data?.description : data?.description?.substring(0, 150) + '...'}
          </Paragraph>
          <Button 
            type="link" 
            className="read-more" 
            onClick={toggleDescription}
          >
            {isExpanded ? 'Ler menos' : 'Ler mais'}
          </Button>
        </div>

        <Flex justify="space-between" align="flex-end" gap="large" className="clothing-and-candidates-section">
          <div className="clothing-tags">
            <Flex vertical gap="middle">
              <Flex gap="middle" wrap="wrap">
                <TagWear
                  color="#6B65DE"
                  text={data?.peopleWear.menTshirt || "T-shirt fornecida"}
                  icon={<IoShirtOutline size={16} />}
                />
                <TagWear
                  color="#6B65DE"
                  text={data?.peopleWear.menPants || "Calças pretas"}
                  icon={<PiPants size={16} />}
                />
                <TagWear
                  color="#6B65DE"
                  text={data?.peopleWear.menShoes || "Ténis Brancos"}
                  icon={<PiSneakerLight size={16} />}
                />
              </Flex>
              <Flex gap="middle" wrap="wrap">
                <TagWear
                  color="#E89DE7"
                  text={data?.peopleWear.womenTshirt || "T-shirt fornecida"}
                  icon={<IoShirtOutline size={16} />}
                />
                <TagWear
                  color="#E89DE7"
                  text={data?.peopleWear.womenPants || "Calções pretos de ciclista"}
                  icon={<PiPants size={16} />}
                />
                <TagWear
                  color="#E89DE7"
                  text={data?.peopleWear.womenShoes || "Ténis Brancos"}
                  icon={<PiSneakerLight size={16} />}
                />
              </Flex>
            </Flex>
          </div>

          <Card className="candidates-card">
            <Button 
              type="text" 
              size="large"
              className="candidates-button"
              onClick={handleCandidatesClick}
            >
              <Flex justify="space-between" align="center" className="candidates-content">
                <Flex vertical>
                  <Text className="candidates-label">Até o momento:</Text>
                  <Title level={3} className="candidates-number">{data?.candidatesDetails.totalCandidates || 0} candidatos</Title>
                </Flex>
                <ArrowRightOutlined className="candidates-arrow" />
              </Flex>
            </Button>
          </Card>
        </Flex>
      </div>
    </div>
  )
}

export default JobDetails
