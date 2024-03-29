import { useEffect, useMemo, useRef, useState } from 'react';

import { useRouter } from 'next/router';

export function useEventSource<T>(url: string | null): T | null {
  const events = useRef<EventSource | null>();
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    function updateEvents(event: Event) {
      // @ts-expect-error unable to customize event type
      const data = JSON.parse(event.data);
      if (data.event === 'init') {
        console.log('INIT EVENT', data.supportedEvents);
      } else {
        console.log(`NEW EVENT: ${data.event}`, data.data);
        setData(data.data);
      }
    }

    if (url) {
      events.current = new EventSource(url);
      events.current.addEventListener('message', updateEvents);
    }

    return () => {
      events.current?.removeEventListener('message', updateEvents);
      events.current?.close();
    };
  }, [url]);

  return data;
}

export function useNextQueryParam(key: string): string {
  const router = useRouter();

  const value = useMemo(() => {
    const res = router.asPath.match(new RegExp(`[&?]${key}=(.*)(&|$)`)) || [];
    return res[1];
  }, [router.asPath, key]);

  return value;
}

export function useLocalStorage<T>(key: string, initialValue?: T): [T, (value: T | null) => void] {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window !== 'undefined') {
        // Get from local storage by key
        const item = window?.localStorage.getItem(key);
        // Parse stored json or if none return initialValue
        return item ? JSON.parse(item) : initialValue;
      } else {
        return initialValue;
      }
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: T | null) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window?.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

export default function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
