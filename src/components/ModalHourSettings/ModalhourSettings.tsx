import { ArrowLeftOutlined, DeleteOutlined } from '@/utils/icons'
import './style.less'
import { Button, DatePicker, Modal, Table, TimePicker, InputNumber, Select } from 'antd'
import { LuPlusCircle } from 'react-icons/lu'
import dayjs, { Dayjs } from 'dayjs'
import { useEffect, useState } from 'react'
import { EventDatesHour } from '@/domain/interfaces/newJob.interface'

interface ModalHourSettingsProps {
  eventDates: EventDatesHour[]
  open: boolean
  handleOk: () => void
  handleCancel: () => void
  setState: React.Dispatch<React.SetStateAction<EventDatesHour[]>>
}

interface DataSourceItem {
  key: string
  date: Dayjs | null
  totalSalary: number
  paymentType: string
  currency: string
}

const dateFormat = 'DD/MM/YYYY'
const format = 'HH:mm'

export default function ModalHourSettings(props: ModalHourSettingsProps) {
  const [dataSource, setDataSource] = useState<DataSourceItem[]>([])

  const columns = [
    {
      title: 'Data',
      dataIndex: 'date',
      render: (date: any, record: any) => {
        return (
          <DatePicker
            format={dateFormat}
            value={date ? dayjs(date) : null}
            onChange={(date) => {
              const newData = [...dataSource]
              const index = newData.findIndex((item) => record.key === item.key)
              if (index > -1) {
                const newValue = [...props.eventDates]

                const updatedDate = date

                newValue[index] = {
                  ...newValue[index],
                  eventStartDateHour: updatedDate,
                  eventFinishDateHour: updatedDate,
                }

                props.setState(newValue)
                setDataSource(newData)
              }
            }}
          />
        )
      },
    },
    {
      title: 'Horário de Início',
      dataIndex: 'startHour',
      render: (_: any, record: any) => (
        <TimePicker
          needConfirm={false}
          format={format}
          onChange={(time) => {
            const newData = [...dataSource]
            const index = newData.findIndex((item) => record.key === item.key)

            const newValue = [...props.eventDates]

            const updatedDate = newValue[index].eventStartDateHour
              .hour(time.hour())
              .minute(time.minute())
              .second(0)

            newValue[index] = {
              ...newValue[index],
              eventStartDateHour: updatedDate,
            }

            props.setState(newValue)
          }}
        />
      ),
    },
    {
      title: 'Horário Final',
      dataIndex: 'finishHour',
      render: (_: any, record: any) => (
        <TimePicker
          needConfirm={false}
          format={format}
          onChange={(time) => {
            const newData = [...dataSource]
            const index = newData.findIndex((item) => record.key === item.key)

            const newValue = [...props.eventDates]

            const updatedDate = newValue[index].eventFinishDateHour
              .hour(time.hour())
              .minute(time.minute())
              .second(0)

            newValue[index] = {
              ...newValue[index],
              eventFinishDateHour: updatedDate,
            }

            props.setState(newValue)
          }}
        />
      ),
    },
    {
      title: 'Salário Total',
      dataIndex: 'totalSalary',
      render: (_: any, record: any) => (
          <InputNumber
            min={0}
            precision={2}
            placeholder="0.00"
            value={props.eventDates[Number(record.key)]?.totalSalary}
            formatter={(value) => {
              const currency = props.eventDates[Number(record.key)]?.currency
              if (currency === 'EUR') {
                if (value !== undefined && value !== null && Number(value) % 1 === 0) {
                  return String(Number(value).toFixed(0))
                }
                return value !== undefined && value !== null ? String(value) : ''
              }
              return value !== undefined && value !== null ? String(value) : ''
            }}
            onChange={(value) => {
              const index = Number(record.key)
              const newValue = [...props.eventDates]
              if (newValue[index]) {
                newValue[index] = {
                  ...newValue[index],
                  totalSalary: value || 0,
                }
                props.setState(newValue)
              }
            }}
          />
      ),
    },
    {
      title: 'Tipo de Pagamento',
      dataIndex: 'paymentType',
      render: (_: any, record: any) => (
        <Select
          placeholder="Selecione"
          value={props.eventDates[Number(record.key)]?.paymentType}
          onChange={(value) => {
            const index = Number(record.key)
            const newValue = [...props.eventDates]
            
            if (newValue[index]) {
              newValue[index] = {
                ...newValue[index],
                paymentType: value,
              }
              props.setState(newValue)
            }
          }}
          options={[
            { value: 'Hour', label: 'Por Hora' },
            { value: 'Day', label: 'Por Dia' },
            { value: 'Fixed', label: 'Valor Fixo' },
          ]}
        />
      ),
    },
    {
      title: 'Moeda',
      dataIndex: 'currency',
      render: (_: any, record: any) => (
        <Select
          placeholder="Moeda"
          value={props.eventDates[Number(record.key)]?.currency}
          onChange={(value) => {
            const index = Number(record.key)
            const newValue = [...props.eventDates]
            
            if (newValue[index]) {
              newValue[index] = {
                ...newValue[index],
                currency: value,
              }
              props.setState(newValue)
            }
          }}
          options={[
            { value: 'EUR', label: 'EUR (€)' }
          ]}
        />
      ),
    },
    {
      title: 'Ações',
      dataIndex: 'actions',
      width: 80,
      render: (_: any, record: any) => (
        <Button
          type="text"
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record.key)}
        />
      ),
    },
  ]

  useEffect(() => {
    const result = props.eventDates.map((eventDate, index) => {
      return {
        date: eventDate.eventStartDateHour,
        key: `${index}`,
        totalSalary: eventDate.totalSalary || 0,
        paymentType: eventDate.paymentType || 'Hour',
        currency: eventDate.currency || 'EUR',
      }
    })
    setDataSource(result)
  }, [props.eventDates])

  const handleDelete = (key: string) => {
    const newData = dataSource.filter((_, index) => index !== Number(key))
    const newValue = props.eventDates.filter(
      (_, index) => index !== Number(key),
    )

    setDataSource(newData)
    props.setState(newValue)
  }

  const addNewField = () => {
    const newKey = dataSource.length
      ? String(Number(dataSource[dataSource.length - 1].key) + 1)
      : '0'

    const newDataSourceItem = { 
      key: newKey, 
      date: null,
      totalSalary: 0,
      paymentType: 'Hour',
      currency: 'EUR'
    }

    const newEventDate = {
      eventStartDateHour: dayjs(),
      eventFinishDateHour: dayjs(),
      totalSalary: 0,
      paymentType: 'Hour',
      currency: 'EUR'
    }

    const result = [...dataSource, newDataSourceItem]
    const newEventDates = [...props.eventDates, newEventDate]
    
    setDataSource(result)
    props.setState(newEventDates)
  }

  return (
    <Modal
      open={props.open}
      onOk={props.handleOk}
      okText={'Salvar'}
      onCancel={props.handleCancel}
      cancelButtonProps={{ style: { display: 'none' } }}
      width={1200}
    >
      <div className="hour-setting-content">
        <div className="hour-setting-header">
          <ArrowLeftOutlined />
          <div className="hour-setting-header-text">
            <p>Novo Anúncio</p>
            <h3>Horário Personalziado</h3>
          </div>
        </div>
        <p>
          Configure abaixo os horários de cada dia e em seguida clique em Salvar
          para não perder suas alterações.
        </p>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          scroll={{ x: 'max-content' }}
          style={{ borderRadius: '10px' }}
          footer={() => (
            <Button
              icon={<LuPlusCircle />}
              className="btn-new-date"
              onClick={addNewField}
            >
              Adicionar nova data
            </Button>
          )}
        />
      </div>
    </Modal>
  )
}
