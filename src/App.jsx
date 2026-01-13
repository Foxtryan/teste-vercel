import { useState } from 'react'

function App() {
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({usuario,senha}),
      });

      const data = await response.json()
      if (response.ok) {
        alert(`Sucesso: ${data.message}`)
      } else {
        alert(`Erro: ${data.message}`)
      }
    } catch (error) {
      alert("Erro ao conectar ao servidor.")
    }
  };

  return (
    <div style={{ display:'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
      <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', width: '300px', gap: '10px'}}>
        <h2>Login</h2>
        <input style={{ padding: '8px' }}
         placeholder="Usuário" value={usuario} onChange={(e) => setUsuario(e.target.value)} required />
        <input style={{ padding: '8px' }}
        type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required  />
        <button type="submit"> Entrar </button>
      </form>
    </div>
  )
};

export default App;