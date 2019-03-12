import { getBase } from "./StreamRemoteService";

export const getProfiles = () => fetch(`${getBase()}/api/profiles`);
