import { ArrowLeftOutlined, DeleteOutlined } from '@/utils/icons'
import './style.less'
import { Button, DatePicker, Modal, Table, TimePicker } from 'antd'
import { LuPlusCircle } from 'react-icons/lu'
import dayjs, { Dayjs } from 'dayjs'
import { useEffect, useState } from 'react'

interface EventDatesHour {
  eventStartDateHour: Dayjs
  eventFinishDateHour: Dayjs
}

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
      title: 'Ações',
      dataIndex: 'actions',
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

    const result = [...dataSource, { key: newKey, date: null }]
    setDataSource(result)
  }

  return (
    <Modal
      open={props.open}
      onOk={props.handleOk}
      okText={'Salvar'}
      onCancel={props.handleCancel}
      cancelButtonProps={{ style: { display: 'none' } }}
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
