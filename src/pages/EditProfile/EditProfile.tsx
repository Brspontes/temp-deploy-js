import React from 'react'
import { Form, Input, Button, Upload, Avatar, Spin } from 'antd'
import { ArrowLeftOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons'
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
        initialFormValues,
        isUploading,
        isUpdating,
        imageFile,
        isLoadingProfile,
        isProfileError,
        profileError
    } = useLogicEditProfile();

    if (isLoadingProfile) {
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
                <div className="loading-container">
                    <Spin 
                        indicator={<LoadingOutlined style={{ fontSize: 32 }} />} 
                        size="large" 
                    />
                    <p>Carregando dados do perfil...</p>
                </div>
            </div>
        );
    }

    if (isProfileError) {
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
                <div className="loading-container">
                    <p style={{ color: '#ff4d4f' }}>
                        Erro ao carregar dados do perfil: {profileError?.message}
                    </p>
                    <Button onClick={() => window.location.reload()}>
                        Tentar novamente
                    </Button>
                </div>
            </div>
        );
    }

    return (
    <div className="edit-profile-container">
      <div className="edit-profile-header">
        <Button 
          type="text" 
          icon={<ArrowLeftOutlined />} 
          onClick={handleGoBack}
          className="back-button"
          disabled={isUpdating}
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
            {isUploading && (
              <div className="avatar-loading-overlay">
                <Spin 
                  indicator={<LoadingOutlined style={{ fontSize: 24, color: '#fff' }} />} 
                />
              </div>
            )}
          </div>
          
          <div className="upload-controls">
            <Upload
              name="avatar"
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleUpload}
              accept=".png,.jpg,.jpeg"
              disabled={isUploading}
            >
              <Button 
                className="upload-button" 
                loading={isUploading}
                disabled={isUploading}
              >
                {isUploading ? 'Enviando...' : 'Enviar nova foto'}
              </Button>
            </Upload>
            
            <p className="upload-info">
              PNG, JPG e JPEG até 2MB.
              {imageFile && (
                <span className="pending-upload"> • Imagem pronta para envio</span>
              )}
            </p>
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
              <Input disabled={isUpdating} />
            </Form.Item>

            <Form.Item
              label="E-mail"
              name="email"
              className="form-field"
            >
              <Input disabled={isUpdating} />
            </Form.Item>
          </div>

          <div className="form-row">
            <Form.Item
              label="Telefone"
              name="phone"
              className="form-field"
            >
              <Input disabled={isUpdating} />
            </Form.Item>

            <Form.Item
              label="Código do País"
              name="countryCode"
              className="form-field"
            >
              <Input 
                placeholder="+351" 
                disabled={isUpdating} 
              />
            </Form.Item>
          </div>

          <div className="form-row">
            <Form.Item
              label="Instagram"
              name="instagram"
              className="form-field"
            >
              <Input disabled={isUpdating} />
            </Form.Item>

            <Form.Item
              label="Facebook"
              name="facebook"
              className="form-field"
            >
              <Input disabled={isUpdating} />
            </Form.Item>
          </div>

          <div className="form-row">
            <Form.Item
              label="LinkedIn"
              name="linkedin"
              className="form-field"
            >
              <Input disabled={isUpdating} />
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
                  disabled={isUpdating}
                />
                <EditOutlined className="edit-icon" />
              </div>
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
              disabled={isUpdating}
            />
          </Form.Item>

          <div className="legal-section">
            <h3>Informações Legais (Opcionais)</h3>
            <div className="form-row">
              <Form.Item
                label="Documento de Identificação"
                name="personalId"
                className="form-field"
              >
                <Input 
                  placeholder="Número do documento"
                  disabled={isUpdating} 
                />
              </Form.Item>

              <Form.Item
                label="NIF"
                name="nif"
                className="form-field"
              >
                <Input 
                  placeholder="Número de Identificação Fiscal"
                  disabled={isUpdating} 
                />
              </Form.Item>
            </div>
          </div>

          <div className="submit-section">
            <Button 
              type="primary" 
              htmlType="submit"
              className="save-button"
              loading={isUpdating}
              disabled={isUpdating || isUploading}
            >
              {isUpdating ? 'Salvando...' : 'Salvar alterações'}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default EditProfile
