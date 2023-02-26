import { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import { IPersonState } from '../state';
import { AddressValidation } from '../validation/AddressValidation';
import { PersonValidation } from '../validation/PersonValidation';
import { PhoneValidation } from '../validation/PhoneValidation';

interface FormValidationProps {
  currentState: IPersonState;
  canSave: (canSave: boolean) => void;
}

const validations = [new PersonValidation(), new AddressValidation(), new PhoneValidation()];

const FormValidation: React.FC<FormValidationProps> = ({ currentState, canSave }) => {
  const [failures, setFailures] = useState<string[]>([]);

  const validate = () => {
    const failures = validations.map((validation) => validation.validate(currentState)).flat();
    setFailures(failures);
    canSave(failures.length === 0);
  };

  useEffect(validate, [currentState]);

  return (
    <Col>
      {failures.map((failure) => (
        <Row key={failure}>
          <Col>
            <label>{failure}</label>
          </Col>
        </Row>
      ))}
    </Col>
  );
};

export default FormValidation;
