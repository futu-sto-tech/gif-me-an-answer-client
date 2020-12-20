import { useEffect, useMemo, useRef, useState } from 'react';

import { useRouter } from 'next/router';

export function useEventSource<T>(url: string | null): T | null {
  const events = useRef<EventSource | null>();
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    if (url) {
      events.current = new EventSource(url);

      events.current.addEventListener('playerjoined', (event) => {
        // @ts-expect-error unable to customize event type
        setData(JSON.parse(event.data));
      });
    }

    return () => {
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
