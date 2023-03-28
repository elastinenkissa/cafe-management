import { Cafe } from "./cafe";

export interface Employee {
  id: string;
  username: string;
  name: string;
  token: string;
  cafe: Cafe
}
 