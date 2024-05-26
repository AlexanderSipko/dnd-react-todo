
const STORAGE_KEY = import.meta.env.VITE_NAME ?
  import.meta.env.VITE_NAME.replace(' ', '-').toLowerCase() :
  'key-agt-123'

async function loadFromStorage() {
  const storageString = localStorage.getItem(STORAGE_KEY);
  
  return storageString
    ? (JSON.parse(storageString))
    : undefined;
}

async function saveToStorage(jsonBlocks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(jsonBlocks));
}

export { loadFromStorage, saveToStorage }