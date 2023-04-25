

function passwordHaveNumberValidator(password:string): boolean {
    const numberRegExp = /\d/g;
    return numberRegExp.test(password);
  }

  function passwordHaveSpecialCharacter(password:string): boolean {
    const specialCharacterRegExp = /\W/g;
    return specialCharacterRegExp.test(password);
  }

  function passwordHaveCapitalLetter(password:string): boolean {
    const passwordHaveCapitalLetterRegExp = /[A-Z]/g;
    return passwordHaveCapitalLetterRegExp.test(password);
  }
  function passwordLength(password:string): boolean {
    const passLengthregexp = /[a-zA-Z\d\W]{8,}/g;
    return passLengthregexp.test(password);
  }

  export default {passwordHaveNumberValidator,passwordLength,passwordHaveCapitalLetter,passwordHaveSpecialCharacter}