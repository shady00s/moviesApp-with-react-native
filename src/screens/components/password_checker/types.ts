interface Ipassword {
    password: string;
  }
  interface Ierror {
    errorColor: string;
    errorIndex: number;
  }
  interface IerrorData {
    errorType: string;
    errorColor: string;
    errorText: string;
    id: number;
  }
  interface IpasswordDgree {
    testType: string;
  }
  
  type Action =
    | { type: "removeLength"; payload: string }
    | { type: "length"; payload: IerrorData }
    | { type: "capitalLetter"; payload: IerrorData }
    | { type: "removeCapitalLetter"; payload: string }
    | { type: "number"; payload: IerrorData }
    | { type: "RemoveNumber"; payload: string }
    | { type: "symbol"; payload: IerrorData }
    | { type: "removeSymbol"; payload: string }
    | {type:"repeatedLetter";payload:IerrorData}
    | {type:"removeRepeatedLetter",payload:string};
  
  