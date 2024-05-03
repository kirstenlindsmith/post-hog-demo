import { ChangeEvent, FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import posthog from 'posthog-js';
import { makeSearchData } from '../../helpers/searchData';
import { useLocation, useSearchParams } from 'react-router-dom';
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
  const { pathname, search } = useLocation();
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

  const rawData = useMemo(() => makeSearchData(), []);

  const data = useMemo(
    () =>
      rawData.filter(item => {
        const lowercaseSearch = searchTerm.toLowerCase();
        return (
          item.id.includes(lowercaseSearch) ||
          item.name.toLowerCase().includes(lowercaseSearch) ||
          item.text?.toLowerCase().includes(lowercaseSearch)
        );
      }),
    [rawData, searchTerm]
  );

  useEffect(() => {
    if (data) {
      if (data.length > 0) {
        posthog.capture(data.length > 0 ? 'valid_results' : 'no_results', {
          url: `${pathname}${search}`,
          ids: data.map(item => item.id).join(', '),
        });
      } else {
        posthog.capture('no_results', { url: `${pathname}${search}` });
      }
    }
  }, [data, pathname, search]);

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
                  <Number>{i + 1}</Number>
                  <Row>
                    <Typography>A: {item.propertyA ? 'Yes' : 'No'}</Typography>
                    <Typography>B: {item.propertyB ? 'Yes' : 'No'}</Typography>
                    <Typography>C: {item.propertyC ? 'Yes' : 'No'}</Typography>
                  </Row>
                </Row>
              </ResultRow>
              <Typography>{item.name}</Typography>
              <Divider />
              <Typography>{item.text}</Typography>
              <Row style={{ marginTop: '1.5rem', width: '100%', justifyContent: 'flex-end' }}>
                <Button
                  onClick={() => {
                    posthog.capture('contact-PI', {
                      id: item.id,
                      position: i + 1,
                      url: `${pathname}${search}`,
                    });
                    alert('contacted PI');
                  }}
                  variant='contained'
                >
                  Contact PI
                </Button>
                <Button
                  onClick={() => {
                    posthog.capture('view-sites', {
                      id: item.id,
                      position: i + 1,
                      url: `${pathname}${search}`,
                    });
                    alert('viewed sites');
                  }}
                  variant='contained'
                >
                  View sites
                </Button>
                <Button
                  onClick={() => {
                    posthog.capture('request-slot-availability', {
                      id: item.id,
                      position: i + 1,
                      url: `${pathname}${search}`,
                    });
                    alert('requested slot availability');
                  }}
                  variant='contained'
                >
                  Request slot availability
                </Button>
                <Button
                  onClick={() => {
                    posthog.capture('refer-patient', {
                      id: item.id,
                      position: i + 1,
                      url: `${pathname}${search}`,
                    });
                    alert('referred patient');
                  }}
                  variant='contained'
                >
                  Refer patient
                </Button>
              </Row>
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
