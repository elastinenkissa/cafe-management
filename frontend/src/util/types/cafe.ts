import { Deptor } from "./deptor";
import { Menu } from "./menu";
import { Table } from "./table";

export interface Cafe {
  id: string;
  name: string;
  currency: string;
  owner: string;
  tables: Array<Table>;
  deptors: Array<Deptor>;
  menu: Array<Menu>;
}
