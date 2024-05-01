import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { RouterPaths } from '../../routes';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography } from '@mui/material';
import styled from '@emotion/styled';

const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 350px;
`;

const Home = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleUpdateSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value?.replace(/[^A-Za-z0-9\s-]/, ''));
  }, []);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      navigate(`${RouterPaths.search}?search=${searchTerm.trim()}`);
    },
    [navigate, searchTerm]
  );

  return (
    <Container onSubmit={handleSubmit}>
      <Typography variant='h5' component='h1'>
        Enter your search
      </Typography>
      <TextField
        fullWidth
        size='small'
        id='home-search-field'
        autoComplete='off'
        placeholder='cool stuff'
        value={searchTerm}
        onChange={handleUpdateSearch}
      />
      <Button fullWidth variant='contained' type='submit' size='small'>
        Search
      </Button>
    </Container>
  );
};

export default Home;
