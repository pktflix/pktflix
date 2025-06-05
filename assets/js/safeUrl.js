function safeUrl(url) {
  try {
    const parsed = new URL(url);
    const allowedProtocols = ['http:', 'https:'];
    const allowedExtensions = ['.mp4', '.m3u8', '.webm'];

    if (!allowedProtocols.includes(parsed.protocol)) return '';
    if (!allowedExtensions.some(ext => parsed.pathname.endsWith(ext))) return '';

    return url;
  } catch (e) {
    return '';
  }
}