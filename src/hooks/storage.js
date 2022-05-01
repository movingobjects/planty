import { Storage } from 'aws-amplify';

export function useStorage() {

  const uploadFile = async (file, path) => {
    await Storage.put(path, file);
    return Promise.resolve(path);
  }

  const getFilePath = async (path) => {
    return await Storage.get(path);
  }

  return {
    uploadFile,
    getFilePath
  }

}
