import { Storage } from 'aws-amplify';

export function useStorage() {

  const uploadFile = async (file, path) => {
    await Storage.put(path, file);
    return Promise.resolve(path);
  }

  return {
    uploadFile
  }

}
