export const ACCESS_TOKEN_KEY = "access_token";

export function setAccessToken(token: string) {
  if (typeof document === "undefined") return;

  document.cookie = `${ACCESS_TOKEN_KEY}=${encodeURIComponent(token)}; path=/; max-age=${60 * 60 * 24 * 7}; samesite=lax`;
}

export function getAccessToken() {
  if (typeof document === "undefined") return null;

  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${ACCESS_TOKEN_KEY}=`));

  return match ? decodeURIComponent(match.split("=")[1]) : null;
}

export function removeAccessToken() {
  if (typeof document === "undefined") return;

  document.cookie = `${ACCESS_TOKEN_KEY}=; path=/; max-age=0; samesite=lax`;
}
