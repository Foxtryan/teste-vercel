export default function handler(request, response) {
  // A Vercel recebe os dados aqui
  const { usuario, senha } = request.body;

  // Simulação de verificação (em um caso real, você consultaria um banco aqui)
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