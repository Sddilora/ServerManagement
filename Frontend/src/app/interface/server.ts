import { Status } from "../enum/status.enum";

// When ever we are mapping everything to the frontend
// So when we make a request to the backend, we get the response to the frontend
// So this application will be able to map the servers or list of the servers into this interface
export interface Server {
  id : number;
  ipAddr : string;
  name : string;
  memory : string;
  type : string;
  imageUrl : string;
  status : Status;
}
