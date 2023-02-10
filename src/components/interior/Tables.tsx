import TableRow from './TableRow';

import { TABLES } from '../../util/data/tables';

import { Table } from '../../util/types/table';

const tableRowOne: Array<Table> = TABLES.slice(0, 4);
const tableRowTwo: Array<Table> = TABLES.slice(4, 6);
const tableRowThree: Array<Table> = TABLES.slice(6, 11);

const Tables: React.FC = () => {
  return (
    <>
      <TableRow tables={tableRowOne} />
      <TableRow tables={tableRowTwo} />
      <TableRow tables={tableRowThree} />
    </>
  );
};
 
export default Tables;
