import { useState } from 'react'
import { supabase } from './supabaseClient'

function App() {
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error} = await supabase.auth.signInWithPassword({
      email: usuario,
      password: senha,
    })

    if (error) {
      alert(`Erro no login: ${error.message})`)
    } else {
      alert("Login realizado com sucesso!")
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