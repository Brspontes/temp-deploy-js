import { Button, Space } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'

interface BatchActionsProps {
  selectedCount: number
  onApproveAll: () => Promise<void>
  onRejectAll: () => Promise<void>
  variant: 'pending' | 'approved' | 'rejected'
  disabled?: boolean
}

export const BatchActions = ({
  selectedCount,
  onApproveAll,
  onRejectAll,
  variant,
  disabled = false
}: BatchActionsProps) => {
  if (selectedCount === 0 || variant === 'rejected') {
    return null
  }

  const renderActions = () => {
    if (variant === 'pending') {
      return (
        <Space>
          <Button 
            type="default" 
            danger 
            icon={<CloseCircleOutlined />}
            onClick={onRejectAll}
            disabled={disabled}
          >
            Rejeitar Selecionados ({selectedCount})
          </Button>
          <Button 
            type="primary" 
            icon={<CheckCircleOutlined />}
            onClick={onApproveAll}
            disabled={disabled}
          >
            Aprovar Selecionados ({selectedCount})
          </Button>
        </Space>
      )
    }
    
    if (variant === 'approved') {
      return (
        <Button 
          type="default" 
          danger 
          icon={<CloseCircleOutlined />}
          onClick={onRejectAll}
          disabled={disabled}
        >
          Rejeitar Selecionados ({selectedCount})
        </Button>
      )
    }
    
    return null
  }

  return (
    <div className={`batch-actions ${variant}`} style={{ margin: '16px 0' }}>
      {renderActions()}
    </div>
  )
}
