import { DataState } from "../enum/data-state.enum";

// This is going to represent the entire state of the application
export interface AppState <T>{
  // When we call the AppState interface, we can learn that if it is our app is in loading, loaded or error state.
  dataState : DataState;
  // We're not going to get data and error at the same time so they both are optional.
  appData? : T;
  error? : string;
}

// T is a generic type
// It is going to be replaced by the actual type
// when we use this interface
// For example, if we use this interface in server.service.ts
// it will be replaced by Server[]
// So it will be like this:
// export interface AppState {
//   dataState : DataState;
//   appData : Server[];
// }
