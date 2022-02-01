export function slug(text: string): any {
  text = text.toLowerCase();
  text = text.replace(/[^a-z0-9 -]/g, '');
  text = text.replace(/\s+/g, '-');
  text = text.replace(/-+/g, '-');
  return text;
}
