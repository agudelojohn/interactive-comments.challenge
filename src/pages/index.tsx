import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { IComment } from '../../utils/interfaces/comments';

let socket: ReturnType<typeof io>;

export default function Home() {
  const [comments, setComments] = useState<IComment[]>([]);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => setComments(data.comments));

    if (!socket) {
      socket = io();

      socket.on('itemAdded', (item: any) => {
        setComments((prevItems) => [...prevItems, item]);
        console.log('itemAdded',item)
      });
    }

    return () => {
      socket.off('itemAdded');
      console.log('Removed -> Socket Off')
    };
  }, []);

  return <h1>hello world</h1>
  // ...resto del código existente, incluida la función addItem...
}
