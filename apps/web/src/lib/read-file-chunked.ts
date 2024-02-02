export interface FileReaderChunked {
  start: () => void;
  abort: () => void;
}

export function readFileСhunked(
  file: File,
  chunkReadCallback: (_chunk: ArrayBuffer, _progress: number) => void,
  chunkErrorCallback: (_error: any) => void,
  success?: (_file: File) => void
): FileReaderChunked {
  const fileSize = file.size;
  const chunkSize = 1024 * 1024;
  let offset = 0;
  let isAborted = false;

  const onLoadHandler = (evt: ProgressEvent<FileReader>): void => {
    if (isAborted) {
      return;
    }
    if (evt.target?.error === null) {
      offset += (evt.target.result as ArrayBuffer).byteLength;
      chunkReadCallback(
        evt.target.result as ArrayBuffer,
        Math.round((offset / fileSize) * 100)
      );
    } else {
      chunkErrorCallback(evt.target?.error);
      return;
    }

    if (offset >= fileSize) {
      if (success !== undefined) {
        success(file);
      }
      return;
    }

    readBlock(offset, chunkSize, file);
  };

  const readBlock = (offsetBlock: number, length: number, f: File): void => {
    const reader = new FileReader();
    const blob = f.slice(offsetBlock, length + offsetBlock);

    reader.onload = onLoadHandler;

    reader.readAsArrayBuffer(blob);
  };

  const start = (): void => {
    isAborted = false;
    readBlock(offset, chunkSize, file);
  };

  const abort = (): void => {
    isAborted = true;
  };

  return { start, abort };
}
