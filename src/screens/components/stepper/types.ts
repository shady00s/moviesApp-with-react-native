interface Ipagination{
    screensNumber:number,
    currentIndex:number
}
interface screenInterface {
    title: string;
    screen: React.FC
  }
  
  interface IstepperNavButton {
    isMiddle: boolean;
    navToNextPage:boolean;
    screensNumber:number
  
  }


  interface stepperModel {
    screens: screenInterface[];
    indexColor: string;
  }
  
  interface separator {
    number: number;
    color: string;
  }


  interface IstepperColor{
    backGroundColor: string, color: string, index: number
  }