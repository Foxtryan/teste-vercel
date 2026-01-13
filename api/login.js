export default function handler(request, response) {

  const { usuario, senha } = request.body;

  if (usuario === 'admin' && senha === 'admin') {
    return response.status(200).json({ 
      message: 'Login realizado com sucesso!',
      token: 'abc-123-token-de-seguranca' 
    });
  } else {
    return response.status(401).json({ 
      message: 'Usuário ou senha incorretos.' 
    });
  }
}