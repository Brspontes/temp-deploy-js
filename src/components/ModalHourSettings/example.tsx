import { useState } from 'react';
import ModalHourSettings from './ModalhourSettings';
import dayjs from 'dayjs';
import { EventDatesHour } from '@/domain/interfaces/newJob.interface';

export function ExampleUsage() {
  const [open, setOpen] = useState(false)
  const [eventDates, setEventDates] = useState<EventDatesHour[]>([
    {
      eventStartDateHour: dayjs('2025-07-15T09:00:00.000Z'),
      eventFinishDateHour: dayjs('2025-07-15T17:00:00.000Z'),
      totalSalary: 80.00,
      paymentType: 'Hour',
      currency: 'EUR'
    },
    {
      eventStartDateHour: dayjs('2025-07-20T09:00:00.000Z'),
      eventFinishDateHour: dayjs('2025-07-20T14:00:00.000Z'),
      totalSalary: 50.00,
      paymentType: 'Hour',
      currency: 'EUR'
    }
  ])

  const handleOk = () => {
    console.log('Dados salvos:', eventDates)
    setOpen(false)
  }

  const handleCancel = () => {
    setOpen(false)
  }

  return (
    <div>
      <button onClick={() => setOpen(true)}>
        Abrir Configuração de Horários
      </button>
      
      <ModalHourSettings
        eventDates={eventDates}
        open={open}
        handleOk={handleOk}
        handleCancel={handleCancel}
        setState={setEventDates}
      />
    </div>
  )
}
