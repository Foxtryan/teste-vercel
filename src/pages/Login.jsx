import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    setCarregando(true);

    const {data, error} = await supabase.auth.signInWithPassword({
      email: usuario,
      password: senha,
    })

    if (error) {
      alert(`Erro no login: ${error.message}`)
      setCarregando(false)
    } else {
      navigate('/dashboard');
    }
  }


  return (
      <div style={styles.container}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h2>
          
          <label>E-mail</label>
          <input 
            style={styles.input}
            type="email"
            placeholder="seu@email.com" 
            value={usuario} 
            onChange={(e) => setUsuario(e.target.value)} 
            required 
          />

          <label>Senha</label>
          <input 
            style={styles.input}
            type="password" 
            placeholder="Sua senha" 
            value={senha} 
            onChange={(e) => setSenha(e.target.value)} 
            required  
          />

          <button 
            type="submit" 
            disabled={carregando}
            style={carregando ? styles.buttonDisabled : styles.button}
          > 
            {carregando ? 'Entrando...' : 'Entrar'} 
          </button>
        </form>
      </div>
  )
}

// css
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#0a2244'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '320px',
    padding: '30px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    gap: '10px',
    backgroundColor: '#1f4477'
  },
  input: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px'
  },
  button: {
    padding: '12px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '10px'
  },
  buttonDisabled: {
    padding: '12px',
    backgroundColor: '#93c5fd',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'not-allowed',
    marginTop: '10px'
  }
}

export default Login