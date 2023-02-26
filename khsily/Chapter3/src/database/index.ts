import { PersonRecord } from '../recordState';
import { Database } from './Database';
import { PersonalDetailsTableBuilder } from './PersonalDetailsTableBuilder';

const builder = new PersonalDetailsTableBuilder();
export const database = new Database<PersonRecord>(builder.build());
