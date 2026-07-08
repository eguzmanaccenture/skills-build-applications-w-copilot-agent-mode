export function buildApiUrl(resource) {
  const codeSpaceName = import.meta.env.VITE_CODESPACE_NAME;
  const baseUrl = codeSpaceName
    ? `https://${codeSpaceName}-8000.app.github.dev/api/${resource}/`
    : `/api/${resource}/`;

  return baseUrl;
}
