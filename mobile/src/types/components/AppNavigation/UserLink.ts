import { StyleProp, ViewStyle } from "react-native";
import { ScreenNames } from "../../ScreenNames";
import ScreenLinkProps from "./ScreenLink";


export default interface UserLinkProps<nextScreen extends ScreenNames> extends ScreenLinkProps<nextScreen> {
    text: string;
    textStyle?: StyleProp<ViewStyle> 
}