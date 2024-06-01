import { useLocalStorage } from "@hooks/useLocalStorage";
import { TProfile, TTodo } from "@src/types";
import { makeId } from "@utils/makeId";
import React, { createContext, useCallback } from "react";
type Props = {
  children?: React.ReactNode;
};

type TProfileContext = {
  profiles: TProfile[];
  addProfile: (name: string) => void;
  setProfile: (id: string) => void;
  selected: TProfile;
};

const defaultProfile = {
  id: makeId(),
  name: "Profile 1",
};

export const ProfileContext = createContext<null | TProfileContext>(null);

export const ProfileProvider = ({ children }: Props) => {
  const [profiles, setProfiles] = useLocalStorage<TProfile[]>({
    key: "profiles",
    defaultValue: [defaultProfile],
  });

  const [selected, setProfile] = useLocalStorage<TProfile>({
    key: "profile",
    defaultValue: profiles[0] ?? defaultProfile,
  });
  const addProfile = useCallback(
    (name: string) =>
      setProfiles((profiles) => [...profiles, { id: makeId(), name }]),
    [setProfiles]
  );

  const setProfileById = useCallback(
    (id: string) => {
      const nextProfile = profiles.find((profile) => profile.id === id);
      if (!nextProfile) return;
      setProfile(() => nextProfile);
    },
    [profiles, setProfile]
  );
  return (
    <ProfileContext.Provider
      value={{ profiles, selected, addProfile, setProfile: setProfileById }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
