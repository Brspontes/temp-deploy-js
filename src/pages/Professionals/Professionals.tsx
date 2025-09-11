import './style.less'
import { useState, useEffect } from 'react'
import { Card, Button, Row, Col, Select, Avatar, Typography, Space } from 'antd'
import { FilterOutlined, UserOutlined, RightOutlined } from '@ant-design/icons'

const { Option } = Select

interface Professional {
  id: string
  name: string
  role: string
  jobsCompleted: number
  age: number
  height: string
  experience?: string
  followers?: number
  avatar?: string
  category: 'promotor' | 'hospedeiro' | 'bartender'
  gender: 'male' | 'female'
}

const Professionals = () => {
  const [filteredProfessionals, setFilteredProfessionals] = useState<Professional[]>([])
  const [classification, setClassification] = useState('Relevância')

  useEffect(() => {
    const mockProfessionals: Professional[] = [
      {
        id: '1',
        name: 'Eduardo Maia e Moura',
        role: 'Promotor/Coordenador/Hospedeiro',
        jobsCompleted: 123,
        age: 28,
        height: '1,85m',
        experience: '1,65m',
        category: 'promotor',
        gender: 'male',
        avatar: '/src/assets/img/avatarlogo.png'
      },
      {
        id: '2',
        name: 'Teresa Guilhoto',
        role: 'Promotora/Bartender',
        jobsCompleted: 123,
        age: 28,
        height: '1,85m',
        experience: 'Carta AB',
        category: 'promotor',
        gender: 'female'
      },
      {
        id: '3',
        name: 'Eduardo Maia e Moura',
        role: 'Promotor/Coordenador/Hospedeiro',
        jobsCompleted: 123,
        age: 28,
        height: '1,85m',
        experience: 'Carta AB',
        category: 'promotor',
        gender: 'male'
      },
      {
        id: '4',
        name: 'Eduardo Maia e Moura',
        role: 'Promotor/Coordenador/Hospedeiro',
        jobsCompleted: 123,
        age: 28,
        height: '1,85m',
        experience: 'Carta AB',
        category: 'promotor',
        gender: 'male'
      },
      {
        id: '5',
        name: 'Beatriz Leonardo',
        role: 'Promotor/Coordenador/Hospedeiro',
        jobsCompleted: 123,
        age: 28,
        height: '1,82m',
        followers: 87,
        category: 'hospedeiro',
        gender: 'female'
      },
      {
        id: '6',
        name: 'Beatriz Leonardo',
        role: 'Promotor/Coordenador/Hospedeiro',
        jobsCompleted: 123,
        age: 28,
        height: '1,82m',
        followers: 87,
        category: 'hospedeiro',
        gender: 'female'
      },
      {
        id: '7',
        name: 'Teresa Guilhoto',
        role: 'Promotora/Bartender',
        jobsCompleted: 123,
        age: 28,
        height: '1,85m',
        experience: 'Carta AB',
        category: 'bartender',
        gender: 'female'
      },
      {
        id: '8',
        name: 'Teresa Guilhoto',
        role: 'Promotora/Bartender',
        jobsCompleted: 123,
        age: 28,
        height: '1,85m',
        experience: 'Carta AB',
        category: 'bartender',
        gender: 'female'
      }
    ]

    setFilteredProfessionals(mockProfessionals)
  }, [])

  const stats = {
    promotor: 32,
    hospedeiro: 32,
    bartender: 34,
    total: 203,
    rapazes: 102,
    raparigas: 101
  }

  const handleClassificationChange = (value: string) => {
    setClassification(value)
  }

  const getCardGradient = (professional: Professional) => {
    if (professional.gender === 'male') {
      return 'professional-card-male'
    }
    return 'professional-card-female'
  }

  return (
    <div className="professionals-page">
      <div className="stats-section">
        <Card className="main-functions-card">
          <Typography.Title level={4} style={{ margin: 0, marginBottom: 24 }}>
            Principais funções
          </Typography.Title>
          <div className="chart-content">
            <div className="pie-chart"></div>
            <div className="chart-legend">
              <Space direction="vertical" size="middle">
                <div className="legend-item">
                  <Space align="center">
                    <span className="color-dot promotor"></span>
                    <Typography.Text type="secondary">Promotor</Typography.Text>
                    <Typography.Text strong>{stats.promotor}</Typography.Text>
                  </Space>
                </div>
                <div className="legend-item">
                  <Space align="center">
                    <span className="color-dot hospedeiro"></span>
                    <Typography.Text type="secondary">Hospedeiro</Typography.Text>
                    <Typography.Text strong>{stats.hospedeiro}</Typography.Text>
                  </Space>
                </div>
                <div className="legend-item">
                  <Space align="center">
                    <span className="color-dot bartender"></span>
                    <Typography.Text type="secondary">Bartender</Typography.Text>
                    <Typography.Text strong>{stats.bartender}</Typography.Text>
                  </Space>
                </div>
              </Space>
            </div>
          </div>
        </Card>

        <div className="stats-cards">
          <Card className="stat-card total">
            <div className="stat-content-wrapper">
              <Avatar 
                size={48} 
                icon={<UserOutlined />}
                className="stat-icon"
              />
              <div className="stat-content">
                <Typography.Title level={1} style={{ margin: 0, fontSize: 48 }}>
                  {stats.total}
                </Typography.Title>
                <Typography.Text className="stat-label">
                  Todos trabalhadores
                </Typography.Text>
              </div>
              <RightOutlined className="stat-arrow" />
            </div>
          </Card>
          
          <Space direction="vertical" size="middle" className="stat-card-group">
            <Card className="stat-card rapazes">
              <div className="stat-content-wrapper">
                <Avatar 
                  size={48} 
                  icon={<UserOutlined />}
                  className="stat-icon"
                />
                <div className="stat-content">
                  <Typography.Title level={2} style={{ margin: 0, fontSize: 36 }}>
                    {stats.rapazes}
                  </Typography.Title>
                  <Typography.Text className="stat-label">
                    Rapazes
                  </Typography.Text>
                </div>
              </div>
            </Card>
            <Card className="stat-card raparigas">
              <div className="stat-content-wrapper">
                <Avatar 
                  size={48} 
                  icon={<UserOutlined />}
                  className="stat-icon"
                />
                <div className="stat-content">
                  <Typography.Title level={2} style={{ margin: 0, fontSize: 36 }}>
                    {stats.raparigas}
                  </Typography.Title>
                  <Typography.Text className="stat-label">
                    Raparigas
                  </Typography.Text>
                </div>
              </div>
            </Card>
          </Space>
        </div>
      </div>

      <div className="workers-section">
        <Row justify="space-between" align="middle" style={{ marginBottom: 20 }}>
          <Col>
            <Typography.Title level={3} style={{ margin: 0 }}>
              Trabalhadores
            </Typography.Title>
          </Col>
          <Col>
            <Space>
              <Space align="center">
                <Typography.Text type="secondary">Classificação:</Typography.Text>
                <Select
                  value={classification}
                  onChange={handleClassificationChange}
                  className="classification-select"
                  bordered={false}
                  style={{ minWidth: 120 }}
                >
                  <Option value="Relevância">Relevância</Option>
                  <Option value="Nome">Nome</Option>
                  <Option value="Idade">Idade</Option>
                </Select>
              </Space>
              <Button 
                icon={<FilterOutlined />} 
                className="filter-btn"
                type="default"
              >
                Filtro
              </Button>
            </Space>
          </Col>
        </Row>

        <Row gutter={[16, 16]} className="professionals-grid">
          {filteredProfessionals.map((professional) => (
            <Col xs={24} sm={12} lg={12} xl={12} key={professional.id}>
              <Card className={`professional-card ${getCardGradient(professional)}`}>
                <Row justify="space-between" align="top" className="card-header">
                  <Col flex="auto">
                    <Space align="start" size="middle">
                      <Avatar
                        size={48}
                        src={professional.avatar}
                        icon={<UserOutlined />}
                        className="professional-avatar"
                      />
                      <div className="info-text">
                        <Typography.Title level={5} style={{ margin: 0, marginBottom: 4 }}>
                          {professional.name}
                        </Typography.Title>
                        <Typography.Text className="role" style={{ display: 'block', marginBottom: 4 }}>
                          {professional.role}
                        </Typography.Text>
                        <Typography.Text className="jobs-completed">
                          Trabalhos realizados: {professional.jobsCompleted}
                        </Typography.Text>
                      </div>
                    </Space>
                  </Col>
                  <Col>
                    <Space>
                      <Button 
                        type="text" 
                        className="action-btn"
                        icon={<span style={{ fontSize: 16 }}>👥</span>}
                        size="small"
                      />
                      <Button 
                        type="text" 
                        className="action-btn"
                        icon={<span style={{ fontSize: 16 }}>💬</span>}
                        size="small"
                      />
                    </Space>
                  </Col>
                </Row>
                
                <Space className="professional-details" style={{ marginTop: 16 }}>
                  <Button type="text" className="detail-item" size="small">
                    {professional.age} anos
                  </Button>
                  <Button type="text" className="detail-item" size="small">
                    {professional.height}
                  </Button>
                  <Button type="text" className="detail-item" size="small">
                    {professional.followers ? `${professional.followers} seguidores` : professional.experience}
                  </Button>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  )
}

export default Professionals
