import './style.less'
import { 
  Button, 
  Avatar, 
  Typography,
  Select,
  Space,
  Flex,
  Card,
  Row,
  Col
} from 'antd'
import { 
  CalendarOutlined
} from '@ant-design/icons'
import useLogicJobControl from './useLogicJobControl'

const { Title, Text } = Typography

function JobControl() {
  const {
    activeTab,
    handleMyAdClick,
    handleControlClick
  } = useLogicJobControl()

  return (
    <div className="job-control-container">
      <div className="control-header">
        <Space size="small" className="control-tabs">
          <Button 
            className={`tab-button ${activeTab === 'meu-anuncio' ? '' : 'inactive'}`} 
            type="text"
            onClick={handleMyAdClick}
          >
            Meu anúncio
          </Button>
          <Button 
            className={`tab-button ${activeTab === 'controlo' ? 'active' : 'inactive'}`} 
            type="text"
            onClick={handleControlClick}
          >
            Controlo
          </Button>
        </Space>
      </div>

      <div className="main-content">
        <Space direction="vertical" size="large" className="control-sections" style={{ width: '100%' }}>
          <div className="control-section">
            <Title level={3} className="section-title">Fotografias</Title>
            <Row gutter={[8, 8]} className="photos-grid">
              <Col span={6}>
                <div className="photo-item">
                  <img src="https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=120&h=80&fit=crop" alt="Bar foto 1" />
                </div>
              </Col>
              <Col span={6}>
                <div className="photo-item">
                  <img src="https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=120&h=80&fit=crop" alt="Bar foto 2" />
                </div>
              </Col>
              <Col span={6}>
                <div className="photo-item">
                  <img src="https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=120&h=80&fit=crop" alt="Bar foto 3" />
                </div>
              </Col>
              <Col span={6}>
                <div className="photo-item more-photos">
                  <span>+51</span>
                </div>
              </Col>
            </Row>
          </div>

          <div className="control-section">
            <Title level={3} className="section-title">Participantes</Title>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <Select
                defaultValue="em-aberto"
                className="filter-select"
                options={[
                  { 
                    value: 'em-aberto', 
                    label: (
                      <Flex align="center" gap="small">
                        <CalendarOutlined />
                        Em Aberto
                      </Flex>
                    )
                  },
                  { 
                    value: 'concluido', 
                    label: (
                      <Flex align="center" gap="small">
                        <CalendarOutlined />
                        Concluído
                      </Flex>
                    )
                  },
                  { 
                    value: 'todos', 
                    label: (
                      <Flex align="center" gap="small">
                        <CalendarOutlined />
                        Todos
                      </Flex>
                    )
                  }
                ]}
              />
              <Space direction="horizontal" wrap className="participants-grid">
                <Card size="small" className="participant-card">
                  <Flex align="center" gap="middle">
                    <Avatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&crop=face" size={48} />
                    <Space direction="vertical" size="small" className="participant-info">
                      <Text className="participant-name">Eduardo Maia e Moura</Text>
                      <Text className="participant-status not-checked">✗ Not Checked-In</Text>
                    </Space>
                  </Flex>
                </Card>
                <Card size="small" className="participant-card">
                  <Flex align="center" gap="middle">
                    <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face" size={48} />
                    <Space direction="vertical" size="small" className="participant-info">
                      <Text className="participant-name">Francisco Mestre</Text>
                      <Text className="participant-status checked-in">✓ Checked-In</Text>
                    </Space>
                  </Flex>
                </Card>
                <Card size="small" className="participant-card">
                  <Flex align="center" gap="middle">
                    <Avatar src="https://images.unsplash.com/photo-1494790108755-2616c75828c1?w=48&h=48&fit=crop&crop=face" size={48} />
                    <Space direction="vertical" size="small" className="participant-info">
                      <Text className="participant-name">Susana Pereira</Text>
                      <Text className="participant-status checked-out">✓ Checked-Out</Text>
                    </Space>
                  </Flex>
                </Card>
              </Space>
            </Space>
          </div>

          <div className="control-section">
            <Flex align="center" justify="flex-start" gap="small" className="section-title" style={{ marginBottom: '20px' }}>
              <Title level={3} style={{ margin: 0 }}>
                Questionário 
              </Title>
              <Button 
                type="text" 
                size="small" 
                className="add-question-btn"
                shape="circle"
                style={{ 
                  background: '#6B65DE', 
                  color: 'white', 
                  width: '24px', 
                  height: '24px', 
                  minWidth: '24px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                +
              </Button>
            </Flex>
            <Row gutter={[16, 16]} className="questions-grid">
              <Col span={12}>
                <Card size="small" className="question-card">
                  <Text>1. Quantas pessoas estavam no espaço?</Text>
                </Card>
              </Col>
              <Col span={12}>
                <Card size="small" className="question-card">
                  <Text>2. Quantas pessoas foram abordadas?</Text>
                </Card>
              </Col>
              <Col span={24}>
                <Card size="small" className="question-card">
                  <Text>3. Quantos tastings de Dewar's Portuguese Smooth foram dados?</Text>
                </Card>
              </Col>
              <Col span={12}>
                <Card size="small" className="question-card">
                  <Text>4. Quantos tastings de Dewar's Caribbean Smooth foram dados?</Text>
                </Card>
              </Col>
              <Col span={12}>
                <Card size="small" className="question-card">
                  <Text>5. Quantos cocktails de Dewar's foram vendidos?</Text>
                </Card>
              </Col>
            </Row>
          </div>

          <div className="control-section">
            <Title level={3} className="section-title">Documentos</Title>
            <Row gutter={[16, 16]} className="documents-grid" style={{ maxWidth: '600px' }}>
              <Col span={8}>
                <Card size="small" className="document-item">
                  <div className="document-icon">
                    <div className="doc-placeholder">
                      <div className="doc-header"></div>
                      <div className="doc-lines">
                        <div className="line"></div>
                        <div className="line"></div>
                        <div className="line"></div>
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
              <Col span={8}>
                <Card size="small" className="document-item">
                  <div className="document-icon">
                    <div className="doc-table">
                      <div className="table-row header"></div>
                      <div className="table-row"></div>
                      <div className="table-row"></div>
                      <div className="table-row"></div>
                    </div>
                  </div>
                </Card>
              </Col>
              <Col span={8}>
                <Card size="small" className="document-item more-documents">
                  <Flex align="center" justify="center" style={{ height: '100%' }}>
                    <Text strong style={{ color: '#6c757d', fontSize: '18px' }}>+2</Text>
                  </Flex>
                </Card>
              </Col>
            </Row>
          </div>
        </Space>
      </div>
    </div>
  )
}

export default JobControl
