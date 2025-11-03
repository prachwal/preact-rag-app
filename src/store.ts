import { signal } from "@preact/signals";

type Store = {
  count: typeof count;
  inc: (val: number) => void;
  dec: (val: number) => void;
};

type StoreValue = {
  count: number;
  operation?: string;
};

const count = signal<StoreValue>({ count: 0, operation: '-' });

export function useStore() {
  const inc = (val: number) => {
    count.value = { ...count.value, count: count.value.count + val, operation: 'inc' };
  };
  const dec = (val: number) => {
    count.value = { ...count.value, count: count.value.count - val, operation: 'dec' };
  };

  return {
    count,
    inc,
    dec,
  } as Store;
}
