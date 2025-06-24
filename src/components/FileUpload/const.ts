const MAX_FILE_SIZE = 51 * 1024 * 1024;

const convertByteToString = (byte: number) => {
  if (byte < 1000) return `${byte}byte`;
  if (byte < 1000 ** 2) return `${(byte / 1000).toFixed(1)}KB`;
  if (byte < 1000 ** 3) return `${(byte / 1000 ** 2).toFixed(1)}MB`;
  return `${(byte / 1000 ** 3).toFixed(1)}GB`;
};

async function test(file: File[]) {
  console.log(file);

  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      if (Math.round(Math.random() * 10) % 2 === 0) {
        resolve();
      } else {
        reject();
      }
    }, 1000);
  });
}

export { MAX_FILE_SIZE, convertByteToString, test };
