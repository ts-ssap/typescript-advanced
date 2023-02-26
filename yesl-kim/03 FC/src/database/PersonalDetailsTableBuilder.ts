import { TableBuilder } from './TableBuilder'

export class PersonalDetailsTableBuilder {
  public build(): TableBuilder {
    const tableBuilder: TableBuilder = new TableBuilder()
    tableBuilder
      .withDatabase('packt-advanced-typescript-ch3')
      .withTableName('people')
      .withPrimaryField('personId')
      .withIndexName('personId')
      .withVersion(1)
    return tableBuilder
  }
}
