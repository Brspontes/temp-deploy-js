import React from 'react'
import { Form, Input, Button, Upload, Avatar } from 'antd'
import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons'
import { useLogicEditProfile } from './useLogicEditProfile'
import './style.less'

const EditProfile: React.FC = () => {
  const {
    form,
    imageUrl,
    handleSubmit,
    handleUpload,
    beforeUpload,
    handleGoBack,
    initialFormValues
  } = useLogicEditProfile()

  return (
    <div className="edit-profile-container">
      <div className="edit-profile-header">
        <Button 
          type="text" 
          icon={<ArrowLeftOutlined />} 
          onClick={handleGoBack}
          className="back-button"
        >
          Editar Perfil
        </Button>
      </div>

      <div className="edit-profile-content">
        <div className="profile-photo-section">
          <div className="avatar-container">
            <Avatar
              size={100}
              src={imageUrl}
              className="profile-avatar"
            />
          </div>
          
          <div className="upload-controls">
            <Upload
              name="avatar"
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleUpload}
              accept=".png,.jpg,.jpeg"
            >
              <Button className="upload-button">
                Enviar nova foto
              </Button>
            </Upload>
            
            <p className="upload-info">PNG, JPG e JPEG.</p>
          </div>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="profile-form"
          initialValues={initialFormValues}
        >
          <div className="form-row">
            <Form.Item
              label="Nome"
              name="name"
              className="form-field"
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="E-mail"
              name="email"
              className="form-field"
            >
              <Input />
            </Form.Item>
          </div>

          <div className="form-row">
            <Form.Item
              label="Telefone"
              name="phone"
              className="form-field"
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Palavra-passe"
              name="password"
              className="form-field"
            >
              <div className="password-field">
                <Input 
                  placeholder="Alterar a palavra-passe"
                  type="password"
                />
                <EditOutlined className="edit-icon" />
              </div>
            </Form.Item>
          </div>

          <div className="form-row">
            <Form.Item
              label="Instagram"
              name="instagram"
              className="form-field"
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Facebook"
              name="facebook"
              className="form-field"
            >
              <Input />
            </Form.Item>
          </div>

          <Form.Item
            label="Descrição"
            name="description"
            className="full-width-field"
          >
            <Input.TextArea 
              rows={4}
              autoSize={{ minRows: 4, maxRows: 6 }}
            />
          </Form.Item>

          <div className="submit-section">
            <Button 
              type="primary" 
              htmlType="submit"
              className="save-button"
            >
              Salvar alterações
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default EditProfile
