import { getBase } from "./StreamRemoteService";

const PROFILES_BASE = `${getBase()}/api/profiles`;

export const getProfiles = () => fetch(PROFILES_BASE);

export const postProfile = profile =>
  fetch(PROFILES_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profile)
  });

export const deleteProfile = profile =>
  fetch(`${PROFILES_BASE}/${profile.id}`, { method: "DELETE" });
