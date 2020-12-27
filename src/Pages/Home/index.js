import React, { useState } from 'react';
import axios from 'axios';
import * as S from './styled';
import { useHistory } from 'react-router-dom';

function App (props) {
  const history = useHistory();
  const [usuario, setUsuario] = useState("");
  const [erro, setErro] = useState(false);

  function handlePesquisa() {
    axios.get(`https://api.github.com/users/${usuario}/repos`)
      .then(response => {
        const repositories = response.data;
        const repositoriesName = [];
        repositories.map((repository) => {
          repositoriesName.push(repository.name);
        });
        localStorage.setItem('repositoriesName', JSON.stringify(repositoriesName));
        setErro(false);
        history.push('/repositories');
      })
      .catch(err => {
        setErro(true);
      });
  }

  return (
    <S.HomeContainer>
      <S.content>
        <S.Input className="usuarioInput" placeholder="Usuário" value={usuario} onChange={e => setUsuario (e.target.value)} />
        <S.button type="button" onClick={handlePesquisa}>Pesquisar</S.button>
      </S.content>
      { erro ? <S.errorMsg>Ocorreu um erro. Tente novamente. </S.errorMsg>: ''}
    </S.HomeContainer>
  );
}
 
export default App;