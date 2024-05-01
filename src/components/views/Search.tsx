import { ChangeEvent, FormEvent, useCallback, useMemo, useState } from 'react';
import { makeSearchData } from '../../helpers/searchData';
import { useSearchParams } from 'react-router-dom';
import { Button, TextField, Typography } from '@mui/material';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const SearchRow = styled.form`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

const List = styled(Container)`
  gap: 1rem;
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid #4d4d4d;
`;

const Result = styled(Container)`
  gap: 0.25rem;
  padding: 1rem;
  border-radius: 6px;
  background-color: white;
  align-items: flex-start;
  width: 50vw;
  min-height: 10rem;
  text-align: left;
`;

const Row = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const ResultRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const Number = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  height: 3rem;
  width: 3rem;
  background-color: #4d4d4d;
  color: white;
  font-size: 2rem;
  font-weight: bold;
`;

const Divider = styled.div`
  height: 1px;
  width: 100%;
  margin: 0 auto;
  background-color: #e6e6e6;
  margin: 0.5rem 0;
`;

const Search = () => {
  const [searchParams, setSeachParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(() => searchParams.get('search') || '');

  const handleUpdateSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value?.replace(/[^A-Za-z0-9\s-]/, '');
    setSearchTerm(newSearch);
  }, []);

  const handleSubmitSearch = useCallback(() => {
    setSeachParams(params => {
      params.set('search', searchTerm);
      return params;
    });
  }, [searchTerm, setSeachParams]);

  const handleForm = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handleSubmitSearch();
    },
    [handleSubmitSearch]
  );

  const data = useMemo(
    () =>
      makeSearchData().filter(item => {
        const search = searchTerm.toLowerCase();
        return (
          item.id.includes(search) ||
          item.name.toLowerCase().includes(search) ||
          item.text?.toLowerCase().includes(search)
        );
      }),
    [searchTerm]
  );

  return (
    <Container>
      <SearchRow onSubmit={handleForm}>
        <TextField
          size='small'
          id='search-results-field'
          autoComplete='off'
          label='Search terms'
          value={searchTerm}
          onChange={handleUpdateSearch}
        />
        <Button variant='contained' type='submit' size='small'>
          Search
        </Button>
      </SearchRow>
      <List>
        {data.length ? (
          data.map((item, i) => (
            <Result key={item.id}>
              <ResultRow>
                <Row style={{ gap: '1.25rem' }}>
                  <Number>{i}</Number>
                  <Row>
                    <Typography>A: {item.propertyA ? 'Yes' : 'No'}</Typography>
                    <Typography>B: {item.propertyB ? 'Yes' : 'No'}</Typography>
                    <Typography>C: {item.propertyC ? 'Yes' : 'No'}</Typography>
                  </Row>
                </Row>
                <Button onClick={() => alert('click')} variant='contained'>
                  Action
                </Button>
              </ResultRow>
              <Typography>{item.name}</Typography>
              <Divider />
              <Typography>{item.text}</Typography>
            </Result>
          ))
        ) : (
          <Result
            style={{
              backgroundColor: 'transparent',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography>No results</Typography>
          </Result>
        )}
      </List>
    </Container>
  );
};

export default Search;
