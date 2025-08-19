import NewJob from './NewJob'
import { FormValues } from '@/domain/interfaces/newJob.interface'

export const CreateJobExample = () => {
  return <NewJob mode="create" />
}

export const EditJobExample = () => {
  const initialJobData: Partial<FormValues> = {
    title: 'Promotor para evento',
    client: 'Empresa XYZ',
    location: 'Lisboa',
    region: 'Lisboa',
    jobFunction: 'Promotor/a',
    totalSalary: 150,
    description: 'Descrição do trabalho...',
    womens: 2,
    mens: 1,
    both: 0,
    menTshirt: 'Camisa preta',
    menPants: 'Calça jeans',
    womenTshirt: 'Blusa branca',
    womenPants: 'Saia preta',
    menShoes: 'Tênis preto',
    womenShoes: 'Sapato social',
  }

  return (
    <NewJob
      mode="update"
      initialValues={initialJobData}
    />
  )
}

export const JobFormRouter = ({ isEditing }: { isEditing?: boolean }) => {
  const mode = isEditing ? 'update' : 'create'
  
  if (mode === 'update') {
    
    return (
      <NewJob
        mode="update"
        initialValues={{}}
      />
    )
  }
  
  return <NewJob mode="create" />
}
