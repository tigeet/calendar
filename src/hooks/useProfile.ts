import useStrictContext from "./useStrictContext";
import { ProfileContext } from "@src/providers/profileProvider";

export const useProfile = () =>
  useStrictContext(ProfileContext, "Profile Context");
