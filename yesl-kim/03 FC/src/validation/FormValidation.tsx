import React, { useEffect, useState } from 'react'
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

// ref vs 전역변수 :
// 개별 컨포넌트가 모두 다른 인스턴스를 가져야할 경우 ref,
// 모든 컴포넌트에서 공통된 인스턴스를 참조할 경우 전역에서 할당하는 것이 좋음 (like 싱글톤)

const validations = [
  new AddressValidation(),
  new NameValidation(),
  new PhoneValidation(),
]

export const FormValidation = ({
  currentstate,
  canSave,
}: FormValidationProps) => {
  const [failures, setFailures] = useState<string[]>([])

  const validate = () => {
    const _failures: string[] = []
    validations.forEach((validation) => {
      validation.validate(currentstate, _failures)
    })

    canSave(_failures.length > 0)
    setFailures(_failures)
  }

  useEffect(() => {
    validate()
  }, [currentstate])

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
  )
}
