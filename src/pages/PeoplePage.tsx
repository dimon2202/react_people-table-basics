import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { PersonLink } from '../components/PersonLink';
import { Person } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>([]);
  const [loadingPeople, setLoadingPeople] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setErrorMessage('');
    setLoadingPeople(true);

    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setLoadingPeople(false));
  }, []);

  const findEqualName = (parentName: string | null) => {
    return people?.find(person => person.name === parentName);
  };

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {loadingPeople && <Loader />}

          {!loadingPeople && errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!loadingPeople && !errorMessage && (
            <table
              data-cy="peopleTable"
              className="table is-striped is-hoverable is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Sex</th>
                  <th>Born</th>
                  <th>Died</th>
                  <th>Mother</th>
                  <th>Father</th>
                </tr>
              </thead>

              <tbody>
                {people?.map(person => (
                  <PersonLink
                    key={person.slug}
                    person={person}
                    findEqualName={findEqualName}
                  />
                ))}
              </tbody>
            </table>
          )}

          {!loadingPeople && !errorMessage && people?.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
        </div>
      </div>
    </>
  );
};
