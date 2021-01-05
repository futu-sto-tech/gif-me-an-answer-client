import { useEffect, useMemo, useRef, useState } from 'react';

import { useRouter } from 'next/router';

export function useEventSource<T>(url: string | null): T | null {
  const events = useRef<EventSource | null>();
  const [data, setData] = useState<T | null>(null);
  const [eventTypes, setEventTypes] = useState<string[]>([]);

  useEffect(() => {
    if (url) {
      events.current = new EventSource(url);

      events.current.addEventListener('message', (event) => {
        const data = JSON.parse(event.data);
        if (data.event === 'init') {
          setEventTypes(data.supportedEvents);
        }
      });
    }

    return () => {
      events.current?.close();
    };
  }, [url]);

  useEffect(() => {
    function updateData(event: Event) {
      // @ts-expect-error unable to customize event type
      const data = JSON.parse(event.data);
      console.log(data);
      setData(data);
    }

    for (const eventType of eventTypes) {
      events.current?.addEventListener(eventType, updateData);
    }

    return () => {
      for (const eventType of eventTypes) {
        events.current?.removeEventListener(eventType, updateData);
      }
    };
  }, [eventTypes]);

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

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Get from local storage by key
      const item = window?.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: T) => {
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
