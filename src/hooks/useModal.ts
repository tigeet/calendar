import { ModalContext } from "@providers/modalProvider";
import useStrictContext from "./useStrictContext";

export const useModal = () => useStrictContext(ModalContext, "Modal Context");
