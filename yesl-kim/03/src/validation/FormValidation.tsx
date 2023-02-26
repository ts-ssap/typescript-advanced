import React, { useState } from 'react'
import { Col, Row } from 'reactstrap'
import { IPersonState } from '../state'
import { Validation } from '../types'

import { AddressValidation } from './AddressValidation'
import { NameValidation } from './NameValidation'
import { PhoneValidation } from './PhoneValidation'

interface FormValidationProps {
  currentstate: IPersonState
  canSave: (_canSave: boolean) => void
}

// export const FormValidation = ({
//   currentstate,
//   canSave,
// }: FormValidationProps) => {
//   const [validations, setValidations] = useState([
//     new AddressValidation(),
//     new NameValidation(),
//     new PhoneValidation(),
//   ])

//   const validate = () => {
//     const failures: string[] = []

//     validations.forEach(validation => {
//       validation.validate(currentstate, failures)
//     })
//   }
// }

export class FormValidation extends React.Component<FormValidationProps> {
  private failures: string[]
  private validations: Validation[]
  // ref vs 전역변수 :
  // 개별 컨포넌트가 모두 다른 인스턴스를 가져야할 경우 ref,
  // 모든 컴포넌트에서 공통된 인스턴스를 참조할 경우 전역에서 할당하는 것이 좋음 (like 싱글톤)

  constructor(props: FormValidationProps) {
    super(props)
    this.failures = []
    this.validations = [
      new AddressValidation(),
      new NameValidation(),
      new PhoneValidation(),
    ]
  }

  private validate() {
    this.failures = []
    this.validations.forEach((validation) => {
      validation.validate(this.props.currentstate, this.failures)
    })

    console.log('can save: ', this.failures.length > 0)
    this.props.canSave(this.failures.length > 0)
  }

  public render() {
    this.validate()
    return (
      <Col>
        {this.failures.map((failure) => (
          <Row key={failure}>
            <Col>
              <label>{failure}</label>
            </Col>
          </Row>
        ))}
      </Col>
    )
  }
}
