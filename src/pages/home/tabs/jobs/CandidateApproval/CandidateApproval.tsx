import { useLogicCandidateApproval } from './useLogicCandidateApproval'
import { PageHeader } from './PageHeader'
import { CandidatesSection } from './CandidatesSection'
import './style.less'

function CandidateApproval() {
  const {
    candidatesPending,
    candidatesApproved,
    candidatesRejected,
    selectedPending,
    selectedApproved,
    selectedRejected,
    handlePendingSelection,
    handleApprovedSelection,
    handleRejectedSelection,
    approveCandidate,
    rejectCandidate,
    rejectApprovedCandidate,
    approvePendingBatch,
    rejectPendingBatch,
    rejectApprovedBatch,
    loading,
    error,
    refetch,
  } = useLogicCandidateApproval()

  const handleBack = () => {
    console.log('Voltar')
  }

  const handleOptions = () => {
    console.log('Opções')
  }

  if (loading) {
    return (
      <div className="candidate-approval-container">
        <PageHeader 
          title="Carregando..."
          onBack={handleBack}
          onOptions={handleOptions}
        />
        <div style={{ textAlign: 'center', padding: '50px' }}>
          Carregando candidaturas...
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="candidate-approval-container">
        <PageHeader 
          title="Erro"
          onBack={handleBack}
          onOptions={handleOptions}
        />
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <p>Erro ao carregar candidaturas: {error}</p>
          <button onClick={refetch} style={{ marginTop: '10px' }}>
            Tentar novamente
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="candidate-approval-container">
      <PageHeader 
        title="Ativação Dewar's"
        onBack={handleBack}
        onOptions={handleOptions}
      />

      <CandidatesSection
        title="Candidatos Pendentes"
        candidates={candidatesPending}
        selectedCandidates={selectedPending}
        onSelectionChange={handlePendingSelection}
        variant="pending"
        onApprove={approveCandidate}
        onReject={rejectCandidate}
        onApproveAll={approvePendingBatch}
        onRejectAll={rejectPendingBatch}
        loading={loading}
      />

      <CandidatesSection
        title="Candidatos Aprovados"
        candidates={candidatesApproved}
        selectedCandidates={selectedApproved}
        onSelectionChange={handleApprovedSelection}
        variant="approved"
        onReject={rejectApprovedCandidate}
        onRejectAll={rejectApprovedBatch}
        loading={loading}
      />

      <CandidatesSection
        title="Candidatos Rejeitados"
        candidates={candidatesRejected}
        selectedCandidates={selectedRejected}
        onSelectionChange={handleRejectedSelection}
        variant="rejected"
      />
    </div>
  )
}

export default CandidateApproval