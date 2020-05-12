import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: `GoStack ${Date.now()}`,
      url: "https://github.com/marcioestevao/gostack",
      techs: [
        `nodeJS_${Date.now()}`,
        `reactJS_${Date.now()}`,
        `ReactNative_${Date.now()}`,
      ],
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    api.delete("repositories/" + id);

    //Retira da lista o itme deletado
    const newState = repositories.filter((repository) => repository.id !== id);

    //Atualiza o State com a lista atualizada
    setRepositories(newState);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
