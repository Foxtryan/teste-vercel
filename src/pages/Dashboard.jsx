import { useAuth } from '../context/AuthContext'; // Importamos o hook que criamos antes
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const { user } = useAuth(); // Pega os dados do usuário logado
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert("Erro ao sair: " + error.message);
    } else {
      // Garantir que após o logout, o AuthContext atualiza o 'user', ProtectedRoute envia para login
      navigate('/');
    }
  };

  return (
    <div style={{display:'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', padding: '10px', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ccc', paddingBottom: '20px' }}>
        <h1>Bem Vindo!</h1>
        <button 
          onClick={handleLogout}
          style={{
            backgroundColor: '#e74c3c',
            color: 'white',
            border: 'none',
            padding: '10px 15px',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Sair do Sistema
        </button>
      </header>

      <main style={{ marginTop: '30px' }}>
        <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
          <h3>Dados do Usuário</h3>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>ID do Supabase:</strong> {user?.id}</p>
          <p><strong>Último Login:</strong> {new Date(user?.last_sign_in_at).toLocaleString()}</p>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;