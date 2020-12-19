import { useEffect, useRef, useState } from 'react';

export function useEventSource<T>(url: string | null): T | null {
  const events = useRef<EventSource | null>();
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    if (url) {
      events.current = new EventSource(url);
      events.current.addEventListener('message', (event) => {
        console.log(event);
        setData(event.data);
      });
    }

    return () => events.current?.close();
  }, [url]);

  return data;
}
