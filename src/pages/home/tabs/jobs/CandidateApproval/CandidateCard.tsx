import { Button, Checkbox, Avatar, Card, Typography } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { Candidate } from './useLogicCandidateApproval'

const { Text } = Typography

interface CandidateCardProps {
  candidate: Candidate
  isSelected: boolean
  onSelectionChange: (candidateId: string, checked: boolean) => void
  variant?: 'pending' | 'approved' | 'rejected'
  onApprove?: (candidateId: string) => Promise<void>
  onReject?: (candidateId: string, jobPeriodId?: string) => Promise<void>
}

export const CandidateCard = ({ 
  candidate, 
  isSelected, 
  onSelectionChange, 
  variant = 'pending',
  onApprove,
  onReject 
}: CandidateCardProps) => {
  const renderActions = () => {
    if (variant === 'pending') {
      return (
        <div className="card-actions">
          <Button 
            type="text" 
            danger 
            icon={<CloseCircleOutlined />}
            size="small"
            onClick={() => onReject?.(candidate.id, candidate.jobPeriodId)}
          >
            Rejeitar
          </Button>
          <Button 
            type="text" 
            icon={<CheckCircleOutlined />}
            className="approve-btn"
            size="small"
            onClick={() => onApprove?.(candidate.id)}
          >
            Aprovar
          </Button>
        </div>
      )
    }
    
    if (variant === 'approved') {
      return (
        <div className="card-actions">
          <Button 
            type="text" 
            danger
            icon={<CloseCircleOutlined />}
            size="small"
            className="reject-approved-btn"
            onClick={() => onReject?.(candidate.id, candidate.jobPeriodId)}
          >
            Rejeitar
          </Button>
        </div>
      )
    }
    
    return null
  }

  return (
    <Card
      className={`candidate-card ${variant} ${isSelected ? 'selected' : ''}`}
      size="small"
      hoverable={variant === 'pending'}
    >
      <Checkbox 
        className="select-checkbox" 
        checked={isSelected}
        onChange={(e) => onSelectionChange(candidate.id, e.target.checked)}
      />
      <div className="card-content">
        <Avatar 
          size={64} 
          src={candidate.avatar}
          className="candidate-avatar"
        />
        <Text className="candidate-name">{candidate.name}</Text>
        {renderActions()}
      </div>
    </Card>
  )
}
