import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'

function App() {
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  // persistencia login
  const [sessao, setSessao] = useState('')
  const [carregado, setCarregando] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({data: {session}}) => {
      setSessao(session)
      setCarregando(false)
    })
    const {data: {subscription}} = supabase.auth.onAuthStateChange((_event, session) => {
      setSessao(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSubmit = async (e) => {

    e.preventDefault();

    const {error} = await supabase.auth.signInWithPassword({
      email: usuario,
      password: senha,
    })

    if (error) alert(`Erro no login: ${error.message})`)
  }

  const handleLogout = async() => {
    await supabase.auth.signOut()
  }

  if (carregado) {
    return <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>Carregando...</div>
  }
  // Redirecionamento
  if (!sessao) {

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
  }

  return (
    <div style={{ display:'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw',  padding: '5px', textAlign: 'center' }}>
          <h1>Bem-vindo!</h1>
          <p>Você está logado como: {sessao.user.email}</p>
          <button onClick={handleLogout} style={{ backgroundColor: '#ff4444', color: 'white', border: 'none', padding: '10px 20px', cursor: 'pointer' }}>
            Sair / Logout
          </button>
        </div>
  )
}

export default App;