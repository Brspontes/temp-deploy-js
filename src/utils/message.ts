export const systemMessage = {
  createNewJob: {
    errorCreatingJob: 'Falha ao cadastrar o trabalho, tente novamente',
    successCreatingJob: 'Trabalho cadastrado com sucesso!',
  },
  login: {
    unauthorizedPage: 'É necessário estar logado para acessar a página',
  },
  register: {
    successRegister: 'Registro realizado com sucesso!',
    errorRegister: 'Erro ao realizar registro, tente novamente',
    userAlreadyExists: 'Este e-mail já está registado. Tente fazer login ou use outro e-mail.',
    passwordMismatch: 'As palavras-passe não coincidem',
    termsRequired: 'É necessário aceitar os termos e condições',
  },
  forgotPassword: {
    invalidEmail: 'Por favor, insira um e-mail válido',
    codeSent: 'Código de verificação enviado para o seu e-mail',
    codeSendError: 'Não foi possível enviar o código de verificação',
    invalidCode: 'Por favor, insira o código de 5 dígitos',
    codeValidated: 'Código validado com sucesso',
    codeValidationError: 'Código inválido ou expirado',
    emptyPassword: 'Por favor, insira uma nova palavra-passe',
    passwordMismatch: 'As palavras-passe não coincidem',
    passwordChanged: 'Palavra-passe alterada com sucesso',
    passwordChangeError: 'Não foi possível alterar a palavra-passe'
  }
}