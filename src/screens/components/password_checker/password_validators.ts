

export function passwordHaveNumberValidator(password: string): boolean {
  const numberRegExp = /\d/g;
  return numberRegExp.test(password);
}

export function passwordHaveSpecialCharacter(password: string): boolean {
  const specialCharacterRegExp = /\W/g;
  return specialCharacterRegExp.test(password);
}

export function passwordHaveCapitalLetter(password: string): boolean {
  const passwordHaveCapitalLetterRegExp = /[A-Z]/g;
  return passwordHaveCapitalLetterRegExp.test(password);
}
export function passwordLength(password: string): boolean {
  const passLengthregexp = /[a-zA-Z\d\W]{8,}/g;
  return passLengthregexp.test(password);
}

export function passwordRepeatedLetterTest(password:string):boolean{
  const repeatedLetterRegEx = /(.)\1+/g

  return repeatedLetterRegEx.test(password)
}

