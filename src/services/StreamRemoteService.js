export const STREAM_REMOTE_SERVER_ADDRESS = "stream.remote.address";

export const getStreamRemoteServerAddress = () =>
  localStorage.getItem(STREAM_REMOTE_SERVER_ADDRESS);

export const setStreamRemoteServerAddress = value =>
  localStorage.setItem(STREAM_REMOTE_SERVER_ADDRESS, value);

export const getBase = () => `http://${getStreamRemoteServerAddress()}`;

export const getHealth = () => fetch(`${getBase()}/api/health`);
