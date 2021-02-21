const relativeToPackage = '../../../';

export function relativePathToPackage(absolutePath: string): string;

export function relativePathToPackage(absolutePaths: string[]): string[];

// workaround for https://github.com/microsoft/TypeScript/issues/29172
export function relativePathToPackage(
  absolutePaths: string | string[],
): string | string[] {
  if (typeof absolutePaths === 'string') {
    return `${relativeToPackage}${absolutePaths}`;
  }
  return absolutePaths.map((path) => `${relativeToPackage}${path}`);
}
