import { Deptor } from "./deptor";
import { Employee } from "./employee";
import { Menu } from "./menu";
import { Table } from "./table";

export interface Cafe {
  id: string;
  name: string;
  currency: string;
  owner: Employee;
  tables: Array<Table>;
  deptors: Array<Deptor>;
  menu: Array<Menu>;
}
