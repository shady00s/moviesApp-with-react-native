import { View, Text } from "react-native";
import React, { FC } from "react"
import { TitleComponent } from "../titleComponent";
import { lightGreyColor, whiteColor } from './../../constants/Colors';
import { OptionsComponent } from "../smallMovieComponent";
export function PersonalDataComponent() {
    return (
        <View>
            <TitleComponent title={"My data"} allButton={false} />
            <DataComponent title={"Name:"} iconName={"edit"} optionsOnPress={function (): void {
            }} iconTitle={"edit username"} valueString={"shady safwat"} />

            <DataComponent title={"Email:"} iconName={"edit"} optionsOnPress={function (): void {
            }} iconTitle={"edit Email"} valueString={"SSK2312@test.com"} />

            <DataComponent title={"Phone Number:"} iconName={"edit"} optionsOnPress={function (): void {
            }} iconTitle={"edit phone number"} valueString={"01289344554"} />

            <DataComponent title={"Age:"} iconName={"edit"} optionsOnPress={function (): void {
            }} iconTitle={"edit age"} valueString={"21"} />



            <TitleComponent title={"My payment Info"} allButton={false} />
            <DataComponent title={"Name:"} iconName={"edit"} optionsOnPress={function (): void {
            }} iconTitle={"edit username"} valueString={"shady safwat"} />

            <DataComponent title={"Name:"} iconName={"edit"} optionsOnPress={function (): void {
            }} iconTitle={"edit username"} valueString={"shady safwat"} />

            <DataComponent title={"Name:"} iconName={"edit"} optionsOnPress={function (): void {
            }} iconTitle={"edit username"} valueString={"shady safwat"} />

            <DataComponent title={"Name:"} iconName={"edit"} optionsOnPress={function (): void {
            }} iconTitle={"edit username"} valueString={"shady safwat"} />

            <DataComponent title={"Name:"} iconName={"edit"} optionsOnPress={function (): void {
            }} iconTitle={"edit username"} valueString={"shady safwat"} />

            <DataComponent title={"Name:"} iconName={"edit"} optionsOnPress={function (): void {
            }} iconTitle={"edit username"} valueString={"shady safwat"} />

            <DataComponent title={"Name:"} iconName={"edit"} optionsOnPress={function (): void {
            }} iconTitle={"edit username"} valueString={"shady safwat"} />



        </View>
    )
}

export const DataComponent: FC<{ title: string, iconTitle: string, valueString: string, iconName: string, optionsOnPress: () => void }> = ({ valueString, iconTitle, title, iconName, optionsOnPress }) => {

    return (
        <View style={{ width: "100%", paddingVertical: 15, paddingHorizontal: 15, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Text style={{ top: 7, width: "30%", color: lightGreyColor, fontFamily: "lato-regular", fontSize: 16 }}>
                {title}
            </Text>

            <Text style={{ width: "50%", paddingLeft: 15, color: whiteColor, fontFamily: "lato-bold", fontSize: 18, textAlign: 'left' }}>
                {valueString}
            </Text>
            <View style={{ width: "10%", }}>
                <OptionsComponent optionsData={[{ title: iconTitle, iconName: iconName, onPress: optionsOnPress, }]} />

            </View>
        </View>
    )

}