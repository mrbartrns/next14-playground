function checkLocalStorage() {
  return typeof window !== 'undefined';
}

class FallbackStorage {
  fallbackStorage: {
    [key: string]: string;
  } = {};

  valid: boolean = checkLocalStorage();

  getItem(key: string) {
    const value = this.valid
      ? localStorage.getItem(key)
      : this.fallbackStorage[key];

    if (!value) return null;

    try {
      const parsed = JSON.parse(value);
      return parsed;
    } catch {
      return value || null;
    }
  }

  setItem(key: string, item: any) {
    const toString = typeof item === 'string' ? item : JSON.stringify(item);
    if (this.valid) {
      localStorage.setItem(key, toString);
      return;
    }

    this.fallbackStorage[key] = toString;
  }

  removeItem(key: string) {
    if (this.valid) {
      localStorage.removeItem(key);
      return;
    }

    delete this.fallbackStorage[key];
  }
}

const storage = new FallbackStorage();

export default storage;
