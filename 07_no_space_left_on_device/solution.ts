class FileSystemObject {
  name: string;

  isFile(): this is File {
    return this instanceof File;
  }

  isDirectory(): this is Directory {
    return this instanceof Directory;
  }

  constructor(name: string) {
    this.name = name;
  }
}

class Directory extends FileSystemObject {
  parent: Directory | null;
  children: FileSystemObject[];

  constructor(name: string, parent: Directory | null) {
    super(name);
    this.parent = parent;
    this.children = [];
  }

  addFile(file: File): void {
    this.children.push(file);
  }

  addChildDir(name: string): Directory {
    const newChildDir = new Directory(name, this);
    this.children.push(newChildDir);
    return newChildDir;
  }

  flattenDirectoryTree(): Directory[] {
    const childrenFlattened = this.children
      .filter((child): child is Directory => child.isDirectory())
      .flatMap((childDir) => {
        return childDir.flattenDirectoryTree();
      });

    return [this, ...childrenFlattened];
  }

  getSizeRecursive(): number {
    return this.children
      .map((fileSystemObject) => {
        if (fileSystemObject.isDirectory()) {
          return fileSystemObject.getSizeRecursive();
        } else if (fileSystemObject.isFile()) {
          return fileSystemObject.size;
        }
        return 0;
      })
      .reduce((a, b) => a + b);
  }
}

class File extends FileSystemObject {
  size: number;

  constructor(name: string, size: number) {
    super(name);
    this.size = size;
  }
}

export class FileSystem {
  rootDir = new Directory("/", null);
  currentDir: Directory = this.rootDir;
}

interface Command {
  [name: string]: (fileSystem: FileSystem, argument: string | undefined) => void;
}

export function part1(inputLines: string[]): void {
  const fileSystem = parseFileSystem(inputLines);

  // Find all of the directories with a total size of at most 100_000. What is the sum of the total sizes of those directories?
  const totalSize = fileSystem.rootDir
    .flattenDirectoryTree()
    .map((directory) => directory.getSizeRecursive())
    .filter((size) => size <= 100_000)
    .reduce((a, b) => a + b);

  console.log(`Total size of directories with size of at most 100000 is ${totalSize}`);
}

export function part2(inputLines: string[]): void {
  const fileSystem = parseFileSystem(inputLines);

  const totalDiskSpace = 70_000_000;
  const usedSpace = fileSystem.rootDir.getSizeRecursive();
  const unusedSpace = totalDiskSpace - usedSpace;

  const unusedSpaceRequired = 30_000_000;

  const needsToBeDeleted = unusedSpaceRequired - unusedSpace;

  const sizeOfBestCandidate = Math.min(
    ...fileSystem.rootDir
      .flattenDirectoryTree()
      .map((directory) => directory.getSizeRecursive())
      .filter((size) => size >= needsToBeDeleted)
  );

  // Find the smallest directory that, if deleted, would free up enough space on the filesystem to run the update. What is the total size of that directory?
  console.log(`Smallest directory size is ${sizeOfBestCandidate}`);
}

const COMMANDS_BY_NAME: Command = {
  ls: () => {},
  cd: executeCd,
} as const;

function executeCd(fs: FileSystem, argument: string | undefined): void {
  switch (argument) {
    case "/":
      fs.currentDir = fs.rootDir;
      break;
    case "..":
      fs.currentDir = fs.currentDir.parent != null ? fs.currentDir.parent : fs.currentDir;
      break;
    case undefined:
      // No arguments, stay within existing dir
      break;
    default:
      fs.currentDir = fs.currentDir.addChildDir(argument);
      break;
  }
}

export function parseFileSystem(inputLines: string[]): FileSystem {
  const fileSystem = new FileSystem();
  inputLines.forEach((line) => {
    if (line.startsWith("$")) {
      const [commandName, argument] = line.slice(1).trim().split(" ");
      COMMANDS_BY_NAME[commandName](fileSystem, argument);
    } else if (!line.startsWith("dir")) {
      const [size, name] = line.split(" ");
      fileSystem.currentDir.addFile(new File(name, Number(size)));
    }
  });
  return fileSystem;
}
