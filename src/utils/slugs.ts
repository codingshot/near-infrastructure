export const generateSlug = (name: string): string => {
  return name.toLowerCase().split(' ')[0].replace(/[^a-z0-9]/g, '');
};

export const findItemBySlug = <T extends { name: string }>(items: T[], slug: string): T | undefined => {
  return items.find(item => generateSlug(item.name) === slug);
};