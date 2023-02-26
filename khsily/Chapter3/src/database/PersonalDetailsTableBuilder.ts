import { TableBuilder } from './TableBuilder';

export class PersonalDetailsTableBuilder {
  build(): TableBuilder {
    const tableBuilder: TableBuilder = new TableBuilder();
    tableBuilder
      .withDatabase('packt-advanced-typescript-ch3')
      .withTableName('People')
      .withPrimaryField('personId')
      .withIndexName('personId')
      .withVersion(1);
    return tableBuilder;
  }
}
