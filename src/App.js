import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    loadList();
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
    loadList();
  }

  async function loadList() {
    api.get("./repositories").then((response) => {
      setRepositories(response.data);
    });
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
