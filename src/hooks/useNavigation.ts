import { RootStackParamList } from "../navigation/types";
import { NavigationProp, useNavigation } from "@react-navigation/native";

const fn = () => {
  return useNavigation<NavigationProp<RootStackParamList>>();
};

export { fn as useNavigation };
