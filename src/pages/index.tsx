import { useEffect, useState } from 'react';
import io from 'socket.io-client';

let socket: ReturnType<typeof io>;

export default function Home() {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => setItems(data.items));

    if (!socket) {
      socket = io();

      socket.on('itemAdded', (item: any) => {
        setItems((prevItems) => [...prevItems, item]);
        console.log('itemAdded',item)
      });
    }

    return () => {
      socket.off('itemAdded');
    };
  }, []);

  return <h1>hello world</h1>
  // ...resto del código existente, incluida la función addItem...
}
