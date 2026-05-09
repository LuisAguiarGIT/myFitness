import { useEffect, useState } from 'react';

interface ITag {
  name: string;
}

export function useTags() {
  const [tags, setTags] = useState<ITag[]>([]);

  useEffect(() => {
    fetch('/api/getAllTags')
      .then((res) => res.json())
      .then((data) => setTags(data))
      .catch(console.error);
  }, []);

  return tags;
}
