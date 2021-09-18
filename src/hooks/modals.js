import { useHash } from 'react-use';

export function useCloseModal() {

  const [ hash, setHash ] = useHash();

  const closeModal = () => {

    const pageId = hash
      .split('/')
      .slice(1)
      .shift();

    setHash(`#/${pageId}`);

  };

  return {
    closeModal
  };

}
