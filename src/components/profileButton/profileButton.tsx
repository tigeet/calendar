import React, { FormEvent, memo, useCallback, useRef, useState } from "react";

import IconButton from "@components/iconButton/iconButton";
import { cn } from "@bem-react/classname";
import { useProfile } from "@src/hooks/useProfile";
import useOutsideClick from "@src/hooks/useOutsideClick";

import SettingsIcon from "@static/settings.svg";
import PlusIcon from "@static/plus.svg";
import "./profileButton.css";
const cnProfileButton = cn("profileButton");

const ProfileButton = () => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [profileName, setProfileName] = useState("");
  const { profiles, addProfile, selected, setProfile } = useProfile();

  const ref = useOutsideClick<HTMLDivElement>({
    onClick: () => setPopupOpen(false),
    ignore: [buttonRef],
  });

  const handleProfileButtonClick = useCallback(() => setPopupOpen(true), []);

  const handleAddProfile = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (!profileName) return;
      addProfile(profileName);
      setProfileName("");
    },
    [addProfile, profileName]
  );

  return (
    <div className={cnProfileButton()}>
      <IconButton
        className={cnProfileButton("settingsButton")}
        size="md"
        onClick={handleProfileButtonClick}
        ref={buttonRef}
        icon={<SettingsIcon className={cnProfileButton("settingsIcon")} />}
      />
      {popupOpen && (
        <div className={cnProfileButton("popup")} ref={ref}>
          <div className={cnProfileButton("profiles")}>
            {profiles.map((profile) => (
              <div
                key={profile.id}
                className={cnProfileButton("profile")}
                onClick={() => setProfile(profile.id)}
              >
                <span>{profile.name}</span>
                {profile.id === selected.id && (
                  <span className={cnProfileButton("point")} />
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleAddProfile} className={cnProfileButton("form")}>
            <input
              name="name"
              placeholder="Profile Name"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
            />
            <IconButton icon={<PlusIcon />} />
          </form>
        </div>
      )}
    </div>
  );
};
export default memo(ProfileButton);
