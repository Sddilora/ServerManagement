export enum DataState {
  LOADING_STATE = 'LOADING_STATE', // 0
  LOADED_STATE = 'LOADED_STATE', // 1
  ERROR_STATE = 'ERROR_STATE' // 2
}

// We dont have to use string representation of enum
// But it is more readable and easier to understand
// Because Typescript gives enum a numeric value (0, 1, 2, 3, ...)(index)
