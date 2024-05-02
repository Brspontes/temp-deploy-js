import {
  Alert,
  Button,
  DatePicker,
  Input,
  InputNumber,
  TimePicker,
  Upload,
} from 'antd'
import './style.less'
import { UploadOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import {
  IJob,
  People,
  PeopleWear,
} from '../../../../domain/entities/job.entity'
import dayjs, { Dayjs } from 'dayjs'
import { usePostJob } from '../../../../hooks/useUploadImage'
import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'

const NewJob = () => {
  const { mutate, isSuccess, isError, isPending } = usePostJob()
  const [data, setData] = useState<Dayjs | null>(null)
  const [horaInicio, setHoraInicio] = useState<Dayjs | null>(null)
  const [horaFim, setHoraFim] = useState<Dayjs | null>(null)
  const [mostrarAlerta, setMostrarAlerta] = useState(false)

  const [womens, setWomens] = useState<number | null>(null)
  const [mens, setMens] = useState<number | null>(null)
  const [both, setBoth] = useState<number | null>(null)

  const [fardaCimaRapariga, setFardaCimaRapariga] = useState<string | null>(
    null,
  )
  const [fardaCimaRapazes, setFardaCimaRapazes] = useState<string | null>(null)
  const [fardaBaixoRaparigas, setFardaBaixoRaparigas] = useState<string | null>(
    null,
  )
  const [fardaBaixoRapazes, setFardaBaixoRapazes] = useState<string | null>(
    null,
  )
  const [sapatosRaparigas, setSapatosRaparigas] = useState<string | null>(null)
  const [sapatosRapazes, setSapatosRapazes] = useState<string | null>(null)

  const [uploadImage, setUploadImage] = useState<{
    image: Buffer
    imageName: string
  } | null>(null)

  const [form, setForms] = useState<IJob | null>(null)

  function handleInputChange(inputValue: IJob) {
    setForms((prevState) => ({ ...prevState, ...inputValue }))
  }

  async function handleOnClick() {
    mutate({
      job: form,
      companyEmail: 'apple@outlook.com',
      jobImage: uploadImage?.image,
      imageName: uploadImage?.imageName,
    })
  }

  useEffect(() => {
    if (data && horaInicio) {
      const datetime = dayjs(
        data.format('YYYY-MM-DD') + ' ' + horaInicio.format('HH:mm'),
      )
      setForms((prevState) => ({
        ...prevState,
        eventStartDateHour: datetime.toDate(),
      }))
    }
    if (data && horaFim) {
      const datetime = dayjs(
        data.format('YYYY-MM-DD') + ' ' + horaFim.format('HH:mm'),
      )
      setForms((prevState) => ({
        ...prevState,
        eventFinishDateHour: datetime.toDate(),
      }))
    }
  }, [data, horaInicio, horaFim])

  useEffect(() => {
    if (uploadImage) {
      setForms((prevState) => ({
        ...prevState,
        image: uploadImage,
      }))
    }
  }, [uploadImage])

  useEffect(() => {
    if (womens != null && mens != null && both != null) {
      const people = new People(womens, mens, both)

      console.log(people)
      setForms((prevState) => ({
        ...prevState,
        people,
      }))
    }
  }, [womens, mens, both])

  useEffect(() => {
    if (isSuccess || isError) {
      setMostrarAlerta(true)

      const timeout = setTimeout(() => {
        setMostrarAlerta(false)
      }, 3000)
      return () => clearTimeout(timeout)
    }
  }, [isSuccess, isError])

  useEffect(() => {
    if (
      fardaCimaRapariga &&
      fardaCimaRapazes &&
      fardaBaixoRaparigas &&
      fardaBaixoRapazes &&
      sapatosRaparigas &&
      sapatosRapazes
    ) {
      const peopleWear = new PeopleWear(
        fardaCimaRapazes,
        fardaBaixoRapazes,
        fardaCimaRapariga,
        fardaBaixoRaparigas,
        sapatosRapazes,
        sapatosRaparigas,
      )

      console.log(peopleWear)

      setForms((prevState) => ({
        ...prevState,
        peopleWear,
      }))
    }
  }, [
    fardaCimaRapariga,
    fardaCimaRapazes,
    fardaBaixoRaparigas,
    fardaBaixoRapazes,
    sapatosRaparigas,
    sapatosRapazes,
  ])

  return (
    <>
      <div className="new-job-container">
        {mostrarAlerta && (
          <Alert
            message={
              isSuccess ? 'Job incluído com sucesso!' : 'Falha ao incluir o Job'
            }
            type={isSuccess ? 'success' : 'error'}
            showIcon
            closable
            onClose={() => setMostrarAlerta(false)}
            style={{
              marginTop: '10px',
              position: 'fixed',
              top: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: '5',
            }}
          />
        )}
        <div className="header-newJob-container">
          <h1 className="header-text">Novo Anúncio</h1>
          <p className="header-description">
            Preencha os campos abaixo para adicionar um anúncio.
          </p>
        </div>
        <div className="dados-anuncio">
          <h2>Dados do anúncio</h2>
          <div className="form-newJob-container">
            <div className="input-container">
              <label className="input-label">Título</label>
              <Input
                className={'input-field'}
                onChange={(e) => handleInputChange({ title: e.target.value })}
              />
            </div>
            <div className="input-container">
              <label className="input-label">Cliente</label>
              <Input
                className={'input-field'}
                onChange={(e) => handleInputChange({ client: e.target.value })}
              />
            </div>
            <div className="input-container">
              <label className="input-label">Data</label>
              <DatePicker
                className={'input-field'}
                format={'DD/MM/YYYY'}
                value={data}
                onChange={(date) => setData(date)}
              />
            </div>
            <div
              className="input-container"
              style={{
                flex: '0 0 24%',
              }}
            >
              <label className="input-label">Horário de início</label>
              <TimePicker
                className={'input-field'}
                format={'HH:mm'}
                value={horaInicio}
                onChange={(time) => setHoraInicio(time)}
              />
            </div>
            <div
              className="input-container"
              style={{
                flex: '0 0 24%',
              }}
            >
              <label className="input-label">Horário de fim</label>
              <TimePicker
                className={'input-field'}
                format={'HH:mm'}
                value={horaFim}
                onChange={(time) => setHoraFim(time)}
              />
            </div>
            <div className="input-container">
              <label className="input-label">Localização</label>
              <Input
                className={'input-field'}
                onChange={(e) =>
                  handleInputChange({ location: e.target.value })
                }
              />
            </div>
            <div className="input-container">
              <label className="input-label">Região</label>
              <select
                className={'input-field'}
                value={form?.region}
                onChange={(e) => handleInputChange({ region: e.target.value })}
              >
                <option value="">Selecione uma opção</option>
                <option value="Norte">Norte</option>
                <option value="Centro">Centro</option>
                <option value="Lisboa">Lisboa</option>
                <option value="Alentejo">Alentejo</option>
                <option value="Algarve">Algarve</option>
                <option value="Açores">Açores</option>
                <option value="Madeira">Madeira</option>
              </select>
            </div>
            <div className="input-container">
              <label className="input-label">Imagem de capa </label>
              <Upload
                className="input-field upload-container"
                maxCount={1}
                beforeUpload={(file) => {
                  const reader = new FileReader()

                  reader.onload = (e) => {
                    const arrayBuffer = e.target?.result as Buffer
                    setUploadImage({ image: arrayBuffer, imageName: file.name })
                  }
                  reader.readAsArrayBuffer(file)
                  return false
                }}
                listType="picture"
              >
                <Button className="upload-field" icon={<UploadOutlined />}>
                  Clica para anexar
                </Button>
              </Upload>
            </div>
            <div
              className="input-container"
              style={{ justifyContent: 'flex-start' }}
            >
              <label className="input-label">Publicar para: </label>
              <select
                className={'input-field'}
                onChange={(e) =>
                  handleInputChange({ publishTo: e.target.value })
                }
              >
                <option value="">Selecione uma opção</option>
                <option value="Todos">Todos</option>
              </select>
            </div>
          </div>
        </div>
        <div className="detalhes">
          <h2>Detalhes</h2>
          <div className="form-newJob-container">
            <div className="input-container">
              <label className="input-label">Função</label>
              <select
                className={'input-field'}
                value={form?.jobFunction}
                onChange={(e) =>
                  handleInputChange({ jobFunction: e.target.value })
                }
              >
                <option value="">Selecione uma opção</option>
                <option value="Promotor/a">Promotor/a</option>
                <option value="Hospedeiro/a">Hospedeiro/a</option>
                <option value="Coordenador/a">Coordenador/a</option>
                <option value="Alentejo">Coordenador/a</option>
                <option value="Animador/a">Animador/a</option>
                <option value="Serviço de mesa">Serviço de mesa</option>
                <option value="Outro">Outro</option>
              </select>
            </div>
            <div className="input-container">
              <label className="input-label">Cachet</label>
              <Input
                className={'input-field'}
                prefix="€"
                suffix="EUR"
                onChange={(e) =>
                  handleInputChange({ salary: Number(e.target.value) })
                }
              />
            </div>
            <div
              className="input-container"
              style={{
                flex: '0 0 100%',
              }}
            >
              <label className="input-label">Descrição</label>
              <Input.TextArea
                className={'input-field'}
                style={{ height: 120, resize: 'none' }}
                onChange={(e) =>
                  handleInputChange({ description: e.target.value })
                }
              />
            </div>
            <div className="input-container" style={{ flex: '0 0 33%' }}>
              <label className="input-label">Raparigas</label>
              <InputNumber
                className={'input-field'}
                onChange={(value) =>
                  setWomens(typeof value === 'string' ? parseInt(value) : value)
                }
              />
            </div>
            <div className="input-container" style={{ flex: '0 0 33%' }}>
              <label className="input-label">Rapazes</label>
              <InputNumber
                className={'input-field'}
                onChange={(value) =>
                  setMens(typeof value === 'string' ? parseInt(value) : value)
                }
              />
            </div>
            <div className="input-container" style={{ flex: '0 0 33%' }}>
              <label className="input-label">Ambos</label>
              <InputNumber
                className={'input-field'}
                onChange={(value) =>
                  setBoth(typeof value === 'string' ? parseInt(value) : value)
                }
              />
            </div>
          </div>
        </div>
        <div className="farda">
          <h2>Farda</h2>
          <div className="form-newJob-container">
            <div className="input-container">
              <label className="input-label">Farda cima Raparigas</label>
              <Input
                className={'input-field'}
                onChange={(e) => setFardaCimaRapariga(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label className="input-label">Farda cima Rapazes</label>
              <Input
                className={'input-field'}
                onChange={(e) => setFardaCimaRapazes(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label className="input-label">Farda baixo Raparigas</label>
              <Input
                className={'input-field'}
                onChange={(e) => setFardaBaixoRaparigas(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label className="input-label">Farda baixo Rapazes</label>
              <Input
                className={'input-field'}
                onChange={(e) => setFardaBaixoRapazes(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label className="input-label">Sapatos Raparigas</label>
              <Input
                className={'input-field'}
                onChange={(e) => setSapatosRaparigas(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label className="input-label">Sapatos Rapazes</label>
              <Input
                className={'input-field'}
                onChange={(e) => setSapatosRapazes(e.target.value)}
              />
            </div>
          </div>
          <button
            className="publish-button"
            onClick={handleOnClick}
            disabled={isPending}
          >
            {isPending ? (
              <Spin
                indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
              />
            ) : (
              'Publicar'
            )}
          </button>
        </div>
      </div>
    </>
  )
}

export default NewJob
