import { useEffect, useState } from 'react';
import { Button, Col, Row } from 'reactstrap';
import { PersonRecord, RecordState } from '../recordState';
import { IPersonState } from '../state';
import FormValidation from './FormValidation';
import { database as dataLayer } from '../database';

const defaultPerson: Readonly<IPersonState> = {
  firstName: '',
  lastName: '',
  address1: '',
  address2: null,
  town: '',
  county: '',
  phoneNumber: '(123)123-1234',
  postcode: '',
  dateOfBirth: new Date().toISOString().substring(0, 10),
  personId: '',
};

const PersonalDetails = () => {
  const [person, setPerson] = useState(defaultPerson);
  const [people, setPeople] = useState<IPersonState[]>([]);
  const [canSave, setCanSave] = useState(false);

  const updateBinding = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPerson((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const userCanSave = (canSave: boolean) => {
    setCanSave(canSave);
  };

  const setActive = (e: React.MouseEvent<HTMLButtonElement>) => {
    const personId = e.currentTarget.value;
    const state = people.find((element) => element.personId === personId);
    if (state) setPerson(state);
  };

  const loadPeople = () => {
    dataLayer.read().then(setPeople);
  };

  const savePerson = async () => {
    if (!canSave) {
      alert(`Cannot save record with missing or incorrect items`);
      return;
    }

    const personState = new RecordState();
    personState.isActive = true;
    const state = { ...person, ...personState };

    if (state.personId === '') {
      state.personId = Date.now().toString();
      await dataLayer.create(state);
      loadPeople();
      clear();
    } else {
      dataLayer.update(state).then(loadPeople);
    }
  };

  const deletePerson = async (personId: string) => {
    const foundPerson = people.find((element) => element.personId === personId);
    if (!foundPerson) return;
    const personState = new RecordState();
    personState.isActive = false;
    const state: PersonRecord = { ...foundPerson, ...personState };
    await dataLayer.update(state);
    loadPeople();
    if (foundPerson.personId === person.personId) clear();
  };

  const clear = () => {
    setPerson(defaultPerson);
  };

  useEffect(() => {
    dataLayer.onReady(loadPeople);
  }, []);

  return (
    <Row>
      <Col lg='8'>
        <Row>
          <Col>
            <h4 className='mb-3'>Personal details</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <Row>
              <Col>
                <label htmlFor='firstName'>First name</label>
              </Col>
              <Col>
                <label htmlFor='lastName'>Last name</label>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <Row>
              <Col>
                <input
                  type='text'
                  id='firstName'
                  className='form-control'
                  placeholder='First name'
                  value={person.firstName}
                  onChange={updateBinding}
                />
              </Col>

              <Col>
                <input
                  type='text'
                  id='lastName'
                  className='form-control'
                  placeholder='Last name'
                  value={person.lastName}
                  onChange={updateBinding}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <label htmlFor='address1'>Address line 1</label>
          </Col>
        </Row>
        <Row>
          <Col>
            <input
              type='text'
              id='address1'
              className='form-control'
              placeholder='Address line 1'
              value={person.address1}
              onChange={updateBinding}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <label htmlFor='address2'>Address line 2</label>
          </Col>
        </Row>
        <Row>
          <Col>
            <input
              type='text'
              id='address2'
              className='form-control'
              placeholder='Address line 2'
              value={person.address2 ?? ''}
              onChange={updateBinding}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <label htmlFor='town'>Town</label>
          </Col>
        </Row>
        <Row>
          <Col>
            <input
              type='text'
              id='town'
              className='form-control'
              placeholder='Town'
              value={person.town}
              onChange={updateBinding}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <label htmlFor='county'>County</label>
          </Col>
        </Row>
        <Row>
          <Col>
            <input
              type='text'
              id='county'
              className='form-control'
              placeholder='County'
              value={person.county}
              onChange={updateBinding}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Row>
              <Col lg='3'>
                <label htmlFor='postcode'>Postal/ZipCode</label>
              </Col>
              <Col lg='4'>
                <label htmlFor='phoneNumber'>Phone number</label>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <Row>
              <Col lg='3'>
                <input
                  type='text'
                  id='postcode'
                  className='form-control'
                  value={person.postcode}
                  onChange={updateBinding}
                />
              </Col>
              <Col lg='4'>
                <input
                  type='text'
                  id='phoneNumber'
                  className='form-control'
                  value={person.phoneNumber}
                  onChange={updateBinding}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <label htmlFor='dateOfBirth'>Date of birth</label>
          </Col>
        </Row>
        <Row>
          <Col>
            <input type='date' id='dateOfBirth' value={person.dateOfBirth ?? ''} onChange={updateBinding} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button size='lg' color='primary' onClick={savePerson}>
              Save
            </Button>
          </Col>
          <Col>
            <Button size='lg' color='secondary' onClick={clear}>
              Clear
            </Button>
          </Col>
        </Row>
        <Row>
          <FormValidation currentState={person} canSave={userCanSave} />
        </Row>
      </Col>
      <Col>
        <Col>
          <Row>
            <Col>
              {people.map((p) => (
                <Row key={p.personId}>
                  <Col lg='6'>
                    <label>
                      {p.firstName} {p.lastName}
                    </label>
                  </Col>
                  <Col lg='3'>
                    <Button value={p.personId} color='link' onClick={setActive}>
                      Edit
                    </Button>
                  </Col>
                  <Col lg='3'>
                    <Button value={p.personId} color='link' onClick={(e) => deletePerson(e.currentTarget.value)}>
                      Delete
                    </Button>
                  </Col>
                </Row>
              ))}
            </Col>
          </Row>
        </Col>
      </Col>
    </Row>
  );
};

export default PersonalDetails;
