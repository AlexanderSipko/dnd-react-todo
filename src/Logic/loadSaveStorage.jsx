
const STORAGE_KEY = import.meta.env.VITE_NAME ?
  import.meta.env.VITE_UID || VITE_NAME.replace(' ', '-').toLowerCase() :
  'key-agt-123'

const KEY_PREFIX = '--under-t'

async function loadFromStorage(keyPrefix=KEY_PREFIX) {
  const storageString = localStorage.getItem(STORAGE_KEY + keyPrefix);
  
  return storageString
    ? (JSON.parse(storageString))
    : undefined;
}

async function saveToStorage(jsonBlocks, keyPrefix=KEY_PREFIX) {
  localStorage.setItem(STORAGE_KEY + keyPrefix, JSON.stringify(jsonBlocks));
}

export { loadFromStorage, saveToStorage }