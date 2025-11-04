import {
  Button,
  DatePicker,
  DatePickerProps,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  Spin,
} from 'antd'
import './style.less'
import { UploadOutlined, LoadingOutlined } from '@/utils/icons'
import { useEffect, useState } from 'react'
import { usePostJob, useUpdateJob } from '@/hooks/useUploadImage'
import { buildJobPayload } from './buildJobPayload'
import { toast } from 'react-toastify'
import { toastErrorConfig, toastSucessConfig } from '@/utils/util'
import { systemMessage } from '@/utils/message'
import { LuSettings2 } from 'react-icons/lu'
import dayjs, { Dayjs } from 'dayjs'
import ModalHourSettings from '@/components/ModalHourSettings/ModalhourSettings'
import { FormValues, EventDatesHour } from '@/domain/interfaces/newJob.interface'

interface NewJobProps {
  mode?: 'create' | 'update'
  initialValues?: Partial<FormValues>
  avatarUrl?: string
}

const NewJob = ({ 
  mode = 'create', 
  initialValues,
  avatarUrl
}: NewJobProps = {}) => {
  const { mutate: createJob, isSuccess: isCreateSuccess, isError: isCreateError, isPending: isCreatePending } = usePostJob()
  const { mutate: updateJob, isSuccess: isUpdateSuccess, isError: isUpdateError, isPending: isUpdatePending } = useUpdateJob()
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [eventDates, setEventDates] = useState<EventDatesHour[]>([])
  const [datePickerValue, setDatePickerValue] = useState<Dayjs[]>([])
  const [uploadImage, setUploadImage] = useState<{
    image: File | null
    imageName: string
  } | null>(null)
  const handleRemoveImage = () => {
    setUploadImage(null)
    form.setFieldsValue({ uploadedImage: undefined })
  }
  
  const handleImageUpload = (file: File) => {
    setUploadImage({
      image: file,
      imageName: file.name,
    })
    form.setFieldsValue({ uploadedImage: file.name })
    return false
  }

  const isSuccess = isCreateSuccess || isUpdateSuccess
  const isError = isCreateError || isUpdateError
  const isPending = isCreatePending || isUpdatePending

  const defaultRulesRequired = [
    {
      required: true,
      message: 'Campo obrigatório',
    },
  ]

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  }

  useEffect(() => {
    if (isSuccess) {
      toast(systemMessage.createNewJob.successCreatingJob, toastSucessConfig)
    }
    if (isError) {
      toast(systemMessage.createNewJob.errorCreatingJob, toastErrorConfig)
    }
  }, [isSuccess, isError])

  useEffect(() => {
    const result = eventDates.map((date) => date.eventStartDateHour)
    setDatePickerValue(result)
  }, [eventDates])

  const [form] = Form.useForm()
  
  useEffect(() => {
    if (initialValues && mode === 'update') {
      form.setFieldsValue(initialValues)
    }
  }, [initialValues, mode, form])
  const onFinish = (values: FormValues) => {
    const jobPayload = {
      ...buildJobPayload(values, eventDates),
      isActive: true,
      isFinished: false,
    }

    if (mode === 'create') {
      createJob({
        job: jobPayload,
        jobImage: uploadImage?.image,
        imageName: uploadImage?.imageName,
      })
    } else {
      updateJob({
        job: jobPayload,
        jobImage: uploadImage?.image,
        imageName: uploadImage?.imageName,
      })
    }
  }

  const onChangeEventDates: DatePickerProps<Dayjs[]>['onChange'] = (date) => {
    const eventDates: EventDatesHour[] = date.map((d) => {
      return { 
        eventFinishDateHour: d, 
        eventStartDateHour: d,
        totalSalary: 0,
        paymentType: '',
        currency: 'EUR'
      }
    })
    setEventDates(eventDates ?? [])
  }

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }


  let uploadFieldContent: React.ReactNode
  if (uploadImage) {
    uploadFieldContent = (
      <div className="upload-field" style={{ minHeight: '52px', height: 'auto', padding: '19px 20px', boxSizing: 'border-box', width: '100%' }}>
        <span style={{ flex: 1, color: '#555', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {uploadImage.imageName}
        </span>
        <Button type="text" danger onClick={handleRemoveImage} style={{ padding: '0 8px', fontSize: 16 }}>
          Fechar
        </Button>
      </div>
    )
  } else if (avatarUrl) {
    uploadFieldContent = (
      <div className="upload-field" style={{ minHeight: '52px', height: 'auto', padding: '10px 20px', boxSizing: 'border-box', width: '100%', display: 'flex', alignItems: 'center', gap: 12 }}>
        <img src={avatarUrl} alt="Avatar" style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', marginRight: 12 }} />
        <span style={{ flex: 1, color: '#aaa' }}>Foto do avatar</span>
        <Upload
          maxCount={1}
          className="upload-container"
          beforeUpload={handleImageUpload}
          showUploadList={false}
        >
          <Button type="link" style={{ padding: 0, fontSize: 16 }}>Trocar imagem</Button>
        </Upload>
      </div>
    )
  } else {
    uploadFieldContent = (
      <Upload
        maxCount={1}
        className="upload-container"
        beforeUpload={handleImageUpload}
        showUploadList={false}
      >
        <div className="upload-field" style={{ minHeight: '52px', height: 'auto', padding: '19px 20px', boxSizing: 'border-box', width: '100%', cursor: 'pointer' }}>
          <span style={{ flex: 1, color: '#aaa' }}>Clica para anexar</span>
          <UploadOutlined style={{ color: '#aaa' }} />
        </div>
      </Upload>
    )
  }
  return (
    <>
      <ModalHourSettings
        eventDates={eventDates}
        setState={setEventDates}
        handleCancel={handleCancel}
        handleOk={handleOk}
        open={isModalOpen}
      />
      <div className="new-job-container">
        <div className="header-newJob-container">
          <div className="title-container">
            <h1 className="header-text">
              {mode === 'create' ? 'Novo Anúncio' : 'Editar Anúncio'}
            </h1>
            <Button className="btn-load-model" type="primary" ghost>
              Carregar Modelo
            </Button>
          </div>
          <p className="header-description">
            {mode === 'create' 
              ? 'Preencha os campos abaixo para adicionar um anúncio.'
              : 'Edite os campos abaixo para atualizar o anúncio.'
            }
          </p>
          <Form
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 12 }}
            layout="vertical"
            form={form}
            name="register"
            onFinish={onFinish}
            style={{
              maxWidth: '100%',
            }}
            scrollToFirstError
          >
            <div className="dados-anuncio">
              <h2>Dados do anúncio</h2>
              <div className="row">
                <Form.Item
                  className="form-group-item"
                  name="title"
                  label="Título"
                  style={{
                    display: 'inline-block',
                    width: '49%',
                  }}
                  rules={defaultRulesRequired}
                  wrapperCol={{ span: '100%' }}
                >
                  <Input className={'input-field'} />
                </Form.Item>
                <Form.Item
                  className="form-group-item"
                  name="client"
                  label="Cliente"
                  style={{
                    display: 'inline-block',
                    width: '49%',
                  }}
                  rules={defaultRulesRequired}
                  wrapperCol={{ span: '100%' }}
                >
                  <Input className={'input-field'} />
                </Form.Item>
              </div>
              <div className="row" style={{ marginBottom: 24 }}>
                <div
                  className="div-interval-date-modal"
                  style={{ display: 'inline-block', width: '49%' }}
                >
                  <p className="div-interval-date-label" style={{ marginTop: 0 }}>Intervalo de Data</p>
                  <DatePicker
                    multiple
                    maxTagCount={1}
                    className={'input-field'}
                    format={'DD/MM/YYYY'}
                    style={{ width: '100%', height: 56, minHeight: 56, paddingTop: 13, paddingBottom: 13, boxSizing: 'border-box', borderRadius: 16 }}
                    onChange={onChangeEventDates}
                    value={datePickerValue}
                    disabledDate={(current) => current && current < dayjs().startOf('day')}
                  />
                </div>
                <div
                  className="div-open-hour-modal"
                  style={{ display: 'inline-block', width: '49%' }}
                >
                  <p className="div-open-hour-label">Horário</p>
                  <Button
                    className="btn-config-hours input-field"
                    style={{
                      width: '100%',
                      height: 56,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0 20px',
                      borderRadius: 16,
                      boxSizing: 'border-box',
                      background: '#fff',
                      border: '1px solid #e5e5e5',
                      fontSize: 16,
                      fontFamily: 'inherit',
                      color: '#555',
                      fontWeight: 400,
                      outline: 'none',
                      boxShadow: 'none',
                      lineHeight: 'normal',
                    }}
                    onClick={showModal}
                    disabled={eventDates?.length === 0}
                  >
                    <span style={{ flex: 1, textAlign: 'left', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {eventDates?.length > 0
                        ? `Horários configurados (${eventDates.length})`
                        : 'Configurar horários aqui'}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', marginLeft: 8 }}>
                      <LuSettings2 color="gray" />
                    </span>
                  </Button>
                </div>
              </div>
              <div className="row">
                <Form.Item
                  className="form-group-item"
                  name="location"
                  label="Localização"
                  style={{
                    display: 'inline-block',
                    width: '49%',
                  }}
                  rules={defaultRulesRequired}
                  wrapperCol={{ span: '100%' }}
                >
                  <Input className={'input-field'} />
                </Form.Item>
                <Form.Item
                  className="form-group-item select-container"
                  name="region"
                  label="Região"
                  style={{
                    display: 'inline-block',
                    width: '49%',
                  }}
                  rules={defaultRulesRequired}
                  wrapperCol={{ span: '100%' }}
                >
                  <Select>
                    <Select.Option value="Norte">Norte</Select.Option>
                    <Select.Option value="Centro">Centro</Select.Option>
                    <Select.Option value="Lisboa">Lisboa</Select.Option>
                    <Select.Option value="Alentejo">Alentejo</Select.Option>
                    <Select.Option value="Algarve">Algarve</Select.Option>
                    <Select.Option value="Açores">Açores</Select.Option>
                    <Select.Option value="Madeira">Madeira</Select.Option>
                  </Select>
                </Form.Item>
              </div>
              <div className="row">
                <Form.Item
                  className="form-group-item"
                  name="uploadedImage"
                  label="Imagem de capa"
                  style={{
                    display: 'inline-block',
                    width: '49%',
                  }}
                  rules={defaultRulesRequired}
                  wrapperCol={{ span: '100%' }}
                >
                  <div style={{ position: 'relative', width: '100%' }}>
                    {uploadFieldContent}
                  </div>
                </Form.Item>
              </div>
            </div>
            <div className="detalhes">
              <h2>Detalhes</h2>
              <div className="row">
                <Form.Item
                  className="form-group-item select-container"
                  name="jobFunction"
                  label="Função"
                  style={{
                    display: 'inline-block',
                    width: '49%',
                  }}
                  rules={defaultRulesRequired}
                  wrapperCol={{ span: '100%' }}
                >
                  <Select>
                    <Select.Option value="Promotor/a">Promotor/a</Select.Option>
                    <Select.Option value="Hospedeiro/a">
                      Hospedeiro/a
                    </Select.Option>
                    <Select.Option value="Coordenador/a">
                      Coordenador/a
                    </Select.Option>
                    <Select.Option value="Animador/a">Animador/a</Select.Option>
                    <Select.Option value="Serviço de mesa">
                      Serviço de mesa
                    </Select.Option>
                    <Select.Option value="Outro">Outro</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  className="form-group-item select-container"
                  name="totalSalary"
                  label="Cachet"
                  style={{
                    display: 'inline-block',
                    width: '49%',
                  }}
                  rules={defaultRulesRequired}
                  wrapperCol={{ span: '100%' }}
                >
                  <Input className={'input-field'} prefix="€" suffix="EUR" />
                </Form.Item>
              </div>
              <div className="row">
                <Form.Item
                  className="form-group-item"
                  name="description"
                  label="Descrição"
                  style={{
                    display: 'inline-block',
                    width: '100%',
                    flex: '0 0 100%',
                  }}
                  rules={defaultRulesRequired}
                  wrapperCol={{ span: '100%' }}
                >
                  <Input.TextArea
                    className={'input-field'}
                    style={{ height: 120, resize: 'none' }}
                  />
                </Form.Item>
              </div>
              <div className="row">
                <Form.Item
                  className="form-group-item select-container"
                  name="womens"
                  label="Raparigas"
                  style={{
                    display: 'inline-block',
                    width: '33%',
                  }}
                  rules={defaultRulesRequired}
                  wrapperCol={{ span: '100%' }}
                >
                  <InputNumber className={'input-field'} />
                </Form.Item>
                <Form.Item
                  className="form-group-item select-container"
                  name="mens"
                  label="Rapazes"
                  style={{
                    display: 'inline-block',
                    width: '33%',
                  }}
                  rules={defaultRulesRequired}
                  wrapperCol={{ span: '100%' }}
                >
                  <InputNumber className={'input-field'} />
                </Form.Item>
                <Form.Item
                  className="form-group-item select-container"
                  name="both"
                  label="Ambos"
                  style={{
                    display: 'inline-block',
                    width: '33%',
                  }}
                  rules={defaultRulesRequired}
                  wrapperCol={{ span: '100%' }}
                >
                  <InputNumber className={'input-field'} />
                </Form.Item>
              </div>
            </div>
            <div className="farda">
              <h2>Farda</h2>
              <div className="row">
                <Form.Item
                  className="form-group-item select-container"
                  name="womenTshirt"
                  label="Farda cima Raparigas"
                  style={{
                    display: 'inline-block',
                    width: '49%',
                  }}
                  rules={defaultRulesRequired}
                  wrapperCol={{ span: '100%' }}
                >
                  <Input className={'input-field'} />
                </Form.Item>
                <Form.Item
                  className="form-group-item select-container"
                  name="menTshirt"
                  label="Farda cima Rapazes"
                  style={{
                    display: 'inline-block',
                    width: '49%',
                  }}
                  rules={defaultRulesRequired}
                  wrapperCol={{ span: '100%' }}
                >
                  <Input className={'input-field'} />
                </Form.Item>
              </div>
              <div className="row">
                <Form.Item
                  className="form-group-item select-container"
                  name="womenPants"
                  label="Farda baixo Raparigas"
                  style={{
                    display: 'inline-block',
                    width: '49%',
                  }}
                  rules={defaultRulesRequired}
                  wrapperCol={{ span: '100%' }}
                >
                  <Input className={'input-field'} />
                </Form.Item>
                <Form.Item
                  className="form-group-item select-container"
                  name="menPants"
                  label="Farda baixo Rapazes"
                  style={{
                    display: 'inline-block',
                    width: '49%',
                  }}
                  rules={defaultRulesRequired}
                  wrapperCol={{ span: '100%' }}
                >
                  <Input className={'input-field'} />
                </Form.Item>
              </div>
              <div className="row">
                <Form.Item
                  className="form-group-item select-container"
                  name="womenShoes"
                  label="Sapatos Raparigas"
                  style={{
                    display: 'inline-block',
                    width: '49%',
                  }}
                  rules={defaultRulesRequired}
                  wrapperCol={{ span: '100%' }}
                >
                  <Input className={'input-field'} />
                </Form.Item>
                <Form.Item
                  className="form-group-item select-container"
                  name="menShoes"
                  label="Sapatos Rapazes"
                  style={{
                    display: 'inline-block',
                    width: '49%',
                  }}
                  rules={defaultRulesRequired}
                  wrapperCol={{ span: '100%' }}
                >
                  <Input className={'input-field'} />
                </Form.Item>
              </div>
            </div>
            <Form.Item {...tailFormItemLayout}>
              <Button
                className="publish-button"
                type="primary"
                size="large"
                htmlType="submit"
                disabled={isPending}
              >
                {isPending ? (
                  <Spin
                    indicator={
                      <LoadingOutlined style={{ fontSize: 24 }} spin />
                    }
                  />
                ) : (
                  <>
                    {mode === 'create' ? 'Publicar' : 'Atualizar'}
                  </>
                )}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  )
}

export default NewJob
