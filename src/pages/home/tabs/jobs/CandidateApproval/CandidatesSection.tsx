import { Typography } from 'antd'
import { Candidate } from './useLogicCandidateApproval'
import { CandidateCard } from './CandidateCard'
import { BatchActions } from './BatchActions'

const { Title } = Typography

interface CandidatesSectionProps {
  title: string
  candidates: Candidate[]
  selectedCandidates: string[]
  onSelectionChange: (candidateId: string, checked: boolean) => void
  variant: 'pending' | 'approved' | 'rejected'
  onApprove?: (candidateId: string) => Promise<void>
  onReject?: (candidateId: string, jobPeriodId?: string) => Promise<void>
  onApproveAll?: () => Promise<void>
  onRejectAll?: () => Promise<void>
  loading?: boolean
}

export const CandidatesSection = ({
  title,
  candidates,
  selectedCandidates,
  onSelectionChange,
  variant,
  onApprove,
  onReject,
  onApproveAll,
  onRejectAll,
  loading = false
}: CandidatesSectionProps) => {
  return (
    <div className="section">
      <Title level={3} className={`section-title ${variant}`}>
        {title}
      </Title>
      
      <BatchActions 
        selectedCount={selectedCandidates.length}
        onApproveAll={onApproveAll || (() => Promise.resolve())}
        onRejectAll={onRejectAll || (() => Promise.resolve())}
        variant={variant}
        disabled={loading}
      />
      
      <div className={`cards-row ${variant}`}>
        {candidates.map((candidate) => (
          <CandidateCard
            key={candidate.id}
            candidate={candidate}
            isSelected={selectedCandidates.includes(candidate.id)}
            onSelectionChange={onSelectionChange}
            variant={variant}
            onApprove={onApprove}
            onReject={onReject}
          />
        ))}
      </div>
    </div>
  )
}
