export const passwordLengthTest: IpasswordDgree = {
  testType: "length",
};
export const passwordContainCapitalLetterTest: IpasswordDgree = {
  testType: "capitalType",
};
export const passwordContainNumberTest: IpasswordDgree = {
  testType: "numberType",
};
export const passwordContainSymbolLetterTest: IpasswordDgree = {
  testType: "symbol",
};

export const passwordRepeatedLetter: IpasswordDgree = {
  testType: "repeatedLetter"
}
const reducer = (state: IerrorData[], action: Action): IerrorData[] => {
  switch (action.type) {
    case "length":
      return [...state, action.payload];
    case "removeLength":
      return state.filter((data) => data.errorType !== action.payload);

    case "capitalLetter":
      return [...state, action.payload];
    case "removeCapitalLetter":
      return state.filter((data) => data.errorType !== action.payload);

    case "symbol":
      return [...state, action.payload];
    case "removeSymbol":
      return state.filter((data) => data.errorType !== action.payload);

    case "number":
      return [...state, action.payload];
    case "RemoveNumber":
      return state.filter((data) => data.errorType !== action.payload);
    case "repeatedLetter":
      return [...state, action.payload];
    case "removeRepeatedLetter":
      return state.filter((data) => data.errorType !== action.payload);

    default:
      break;
  }
};

export default reducer