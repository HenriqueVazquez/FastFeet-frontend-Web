/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';

import HeaderList from '~/components/HeaderList';

import api from '~/services/api';

import ProblemItem from './ProblemItem';
import { Container, Content, Grid, Button } from './styles';

export default function Problems() {
  const n = 3.14159;
  const r = 150;
  const a = n * r ** 2;
  console.log(`A= ${a}`);

  const [page, setPage] = useState(1);
  const [problems, setProblems] = useState([]);

  async function loadProblems() {
    const response = await api.get('/deliveries/problems', {
      params: {
        page,
      },
    });

    setProblems(response.data);
  }
  useEffect(() => {
    loadProblems();
  }, [page]); //eslint-disable-line

  return (
    <Container>
      <Content>
        <HeaderList title="Problemas na entrega" />
        <Grid>
          <section>
            <strong>ID encomenda</strong>
            <strong>ID da reclamação</strong>
            <strong>Problema</strong>
            <strong>Ações</strong>
          </section>
          {problems.map((problem) => (
            <ProblemItem
              updateProblems={loadProblems}
              key={problem._id}
              data={problem}
            />
          ))}
        </Grid>
        <section>
          <Button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            type="button"
          >
            voltar
          </Button>
          <Button
            disabled={problems.length < 5}
            type="button"
            onClick={() => setPage(page + 1)}
          >
            proximo
          </Button>
        </section>
      </Content>
    </Container>
  );
}
