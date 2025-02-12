import Takeover from '@/components/shared/Takeover/Takeover';
import styles from './ChatroomTakeover.module.scss';
import { useState, useEffect, useRef } from 'react';
import { useUser } from 'context/user-context/user-context';
import { db } from '@/lib/firebase-utils';
import { TABLES } from '@/utils/constants';
import clsx from 'clsx';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

export default function ChatroomTakeover({ handleClose, leagueData }) {
  const user = useUser();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);
  const leagueId = leagueData.id;

  // Listen for new messages
  useEffect(() => {
    const messagesRef = collection(
      db,
      `${TABLES.CHATROOMS}/${leagueId}/messages`
    );
    const q = query(messagesRef, orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(q, snapshot => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    });

    return () => unsubscribe();
  }, [leagueId]);

  const sendMessage = async e => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    try {
      await addDoc(collection(db, `${TABLES.CHATROOMS}/${leagueId}/messages`), {
        text: newMessage,
        senderId: user.uid,
        senderName: `${user.firstName} ${user.lastName
          .charAt(0)
          .toUpperCase()}.`,
        timestamp: serverTimestamp(),
      });

      setNewMessage('');
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
      throw new Error('Error sending chatroom message:', error);
    }
  };

  return (
    <Takeover
      handleClose={handleClose}
      modalClassNames={styles.container}
      closeButtonClassNames={styles.closeButton}
    >
      <p className={styles.title}>{leagueData.name} ChatRoom</p>
      {messages?.length === 0 ? (
        <div>
          <p className={styles.noMessages}>No messages to show</p>
        </div>
      ) : (
        <div className={styles.messages}>
          {messages?.map(message => {
            const isCurrentUser = message.senderId === user.uid;
            return (
              <div
                key={message.id}
                className={isCurrentUser ? styles.currentUser : ''}
              >
                <div className={styles.row}>
                  <p className={styles.senderName}>
                    {!isCurrentUser ? message.senderName : ''}
                  </p>
                  <p className={clsx(styles.messageBubble)}>{message.text}</p>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      )}
      <form onSubmit={sendMessage} className={styles.form}>
        <input
          type="text"
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          placeholder="Type a message here..."
          className={styles.messageInput}
        />
        <button className={styles.button}>
          <FontAwesomeIcon icon={faPaperPlane} color="white" size="xl" />
        </button>
      </form>
    </Takeover>
  );
}
