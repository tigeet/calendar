import { DateContext } from "@providers/dateProvider";
import useStrictContext from "./useStrictContext";

export const useDate = () => useStrictContext(DateContext, "Date context");
