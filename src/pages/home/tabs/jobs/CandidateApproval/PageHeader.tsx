import { Button, Tag, Typography, Space } from 'antd'
import { ArrowLeftOutlined, MoreOutlined } from '@ant-design/icons'

const { Title, Text } = Typography

interface PageHeaderProps {
  title: string
  onBack?: () => void
  onOptions?: () => void
}

export const PageHeader = ({ title, onBack, onOptions }: PageHeaderProps) => {
  return (
    <>
      <div className="header">
        <Button 
          type="text" 
          icon={<ArrowLeftOutlined />} 
          className="back-btn"
          onClick={onBack}
        />
        <Title level={1} className="page-title">{title}</Title>
        <Button 
          type="text" 
          icon={<MoreOutlined />} 
          className="options-btn"
          onClick={onOptions}
        />
      </div>

      <div className="filters-row">
        <Space size="small">
          <Text className="filters-label">Filtros:</Text>
          <Tag color="default">Masculino</Tag>
          <Tag color="default">Feminino</Tag>
          <Tag color="blue">Aprovados</Tag>
          <Tag color="orange">Pendentes</Tag>
          <Tag color="red">Rejeitados</Tag>
        </Space>
        <Text className="mass-action">Ações em massa:</Text>
      </div>
    </>
  )
}
