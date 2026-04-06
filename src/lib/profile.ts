export function getSocialProfilePath(username?: string | null) {
  const safeUsername = username?.trim();
  if (!safeUsername) {
    return "/app/social/perfil";
  }

  return `/app/social/perfil/${safeUsername}`;
}
