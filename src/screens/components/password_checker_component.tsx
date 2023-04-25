import { useCallback, useEffect, useState } from "react"
import { View, StyleSheet, Text, Dimensions } from "react-native"
import React from "react"
import { subBackGround } from "../../constants"

interface Ipassword {
    password: string
}
interface Ierror {
    errorColor: string,
    errorIndex: number
}
interface IerrorData {
    errorType: string,
    errorColor: string,
    errorText: string,
    id: number
}
interface IpasswordDgree {
    testType: string,
    passed: boolean
}

const initialColors = [


]
const width = Dimensions.get('screen').width
const PasswordCheckerComponent: React.FC<Ipassword> = (props) => {
    const [text, setText] = useState("very weak")
    const [color, setColor] = useState("red")
    const [errors, setErrors] = useState<IerrorData[]>([])
    const [powerStrengthStyle, setPowerStrengthStyle] = useState(initialColors)

    const passwordLengthTest: IpasswordDgree = {
        passed: false, testType: "length"
    };
    const passwordContainCapitalLetterTest: IpasswordDgree = {
        passed: false, testType: "capitalType"
    };
    const passwordContainNumberTest: IpasswordDgree = {
        passed: false, testType: "numberType"
    };
    const passwordContainSymbolLetterTest: IpasswordDgree = {
        passed: false, testType: "symbol"
    };

    const [passwordStrength, setpasswordStrength] = useState<IpasswordDgree[]>([passwordLengthTest, passwordContainCapitalLetterTest, passwordContainNumberTest, passwordContainSymbolLetterTest])


    function removePasswordStrengthError(passwordInterface: IpasswordDgree) {
        let index = passwordStrength.findIndex(data => data.testType === passwordInterface.testType)
        if (index !== -1) {
            const newObject = { passed: true, testType: passwordInterface.testType }
            setpasswordStrength(() => passwordStrength.map(data => {
                if (data.testType === passwordInterface.testType) {
                    return newObject
                }
                return data
            }))

        }
    }


    const checkPasswordLength = useCallback(() => {
        const passLengthregexp = /[a-zA-Z\d\W]{8,}/g
        if (!passLengthregexp.test(props.password)) {
            if (!errors.find((data) => data.errorType === "lowLength")) {

                setErrors((prevErrors) => [
                    ...prevErrors,
                    {
                        id: Math.round(Math.random() * 1000),
                        errorType: "lowLength",
                        errorColor: "red",
                        errorText: "password must have at least 8 characters.",
                    },
                ]);
            }


        } else {
            removePasswordStrengthError(passwordLengthTest)

            setErrors((prevErrors) =>
                prevErrors.filter((data) => data.errorType !== "lowLength")
            );


        }
    }, [props.password]);



    const checkPasswordHaveNumber = useCallback(() => {
        const checkForNumberExpReg = /\d/g
        if (!checkForNumberExpReg.test(props.password)) {
            if (!errors.find(data => data.errorType === "number")) {
                setErrors(() => [...errors, { id: Math.round(Math.random() * 1000), errorType: "number", errorColor: "red", errorText: "password must have at least one  number." }])
            }

        } else {
            removePasswordStrengthError(passwordContainNumberTest)
            setErrors((prevErrors) =>
                prevErrors.filter((data) => data.errorType !== "number")
            );
        }
    }, [props.password])

    const checkPasswordHaveCapitalLetter = useCallback(() => {
        const passwordHaveCapitalLetterRegex = /[A-Z]/g

        if (!passwordHaveCapitalLetterRegex.test(props.password)) {

            if (!errors.find(data => data.errorType === "weakPass")) {
                setErrors(() => [...errors, { id: Math.round(Math.random() * 1000), errorType: "weakPass", errorColor: "red", errorText: "password must have at least one capital character." }])

            }

        }
        else {

            removePasswordStrengthError(passwordContainCapitalLetterTest)
            setErrors(() => errors.filter((data => data.errorType !== "weakPass")))

        }
    }, [props.password])

    const checkForSymbols = useCallback(() => {
        const passwordSymbol = /\W/g
        if (!passwordSymbol.test(props.password)) {

            if (!errors.find(data => data.errorType === "symbols")) {
                setErrors(() => [...errors, { id: Math.round(Math.random() * 1000), errorType: "symbols", errorColor: "red", errorText: "password must have at least one special character." }])

            }
        }
        else {
            removePasswordStrengthError(passwordContainSymbolLetterTest)

            setErrors(() => errors.filter((data => data.errorType !== "symbols")))

        }

    }, [props.password])

    useEffect(() => {
        checkPasswordLength();
        checkForSymbols();
        checkPasswordHaveCapitalLetter();
        checkPasswordHaveNumber();
    }, [props.password])


    useEffect(() => {
        let passedTests = 0
        for (let index = 0; index < passwordStrength.length; index++) {
            if (passwordStrength[index].passed) {
               
              
                passedTests++
            }else{
                passedTests > 0 ?passedTests-- :passedTests = 0
            }
        }
        console.log(passedTests);

    }, [passwordStrength])
    return (

        <View style={[props.password === "" ? { ...style.hideContainer } : { ...style.mainContainer }]}>
            <View style={style.indecatorContainer}>
                <View style={[props.password === "" ? { ...style.hideContainer } : { ...style.checkerContainer }]}>
                    {powerStrengthStyle.map((data, index) => <View key={index} style={{ ...style.containerInitStyle, backgroundColor: data }}></View>)}

                </View>
                <Text style={{ color, fontFamily: "normal" }}>{text}</Text>

            </View>
            {errors.map(data => <Text key={
                data.id
            } style={style.errorText}>{data.errorText}</Text>)}

        </View>
    )
}
const style = StyleSheet.create({
    mainContainer: {
        margin: 2,
        padding: 3,

        width: "90%",
        flexDirection: "column",
        overflow: "hidden",
        alignItems: "center"
    },
    hideContainer: {
        display: "none",
        padding: 0,
        margin: 0,
        height: 0,
        width: 0
    },
    indecatorContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: 'center'
    },
    containerInitStyle: {
        height: 5,
        margin: 1,
        padding: 2,
        width: width * 0.12
    },

    checkerContainer: {
        width: "80%",
        height: "80%",
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    errorText: {
        color: "orange"
    }
})
export default PasswordCheckerComponent