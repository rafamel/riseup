export async function dynamics(): Promise<any> {
  return (await import('./root.json')).default;
}
