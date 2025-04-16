import React, { useState, ChangeEvent } from 'react';

interface InboxMessage {
  id: string;
  sender: string;
  subject: string;
  body: string;
}

type Props = {};

const MessagePage: React.FC<Props> = () => {
  // Hardcoded email for message
  const recipientEmail = "casterlinejoseph@gmail.com";

  const [subject, setSubject] = useState<string>('');
  const [body, setBody] = useState<string>('');

  // Toggle 
  const [activeTab, setActiveTab] = useState<'compose' | 'inbox'>('compose');

  // Dummy inbox messages
  const [inboxMessages, setInboxMessages] = useState<InboxMessage[]>([
    {
      id: '1',
      sender: 'Pep- Trainer',
      subject: 'Welcome!',
      body: 'Hi there, just wanted to introduce myself.',
    },
    {
      id: '2',
      sender: 'Pep- Trainer',
      subject: 'Meeting Reminder',
      body: 'Don’t forget our meeting at 3 PM tomorrow.',
    },
    {
      id: '3',
      sender: 'Pep- Trainer',
      subject: 'Kudos!',
      body: 'Great Job on your progress',
    },
  ]);

  // Send the message using a mailto link
  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
    // Optionally clear the form fields after sending
    setSubject('');
    setBody('');
  };

  // Delete a message from the inbox
  const handleDeleteMessage = (id: string) => {
    setInboxMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Message Center</h1>
      
      {/* Navigation */}
      <div style={styles.tabContainer}>
        <button
          onClick={() => setActiveTab('compose')}
          style={{
            ...styles.tabButton,
            ...(activeTab === 'compose' ? styles.activeTabButton : {}),
          }}
        >
          Compose
        </button>
        <button
          onClick={() => setActiveTab('inbox')}
          style={{
            ...styles.tabButton,
            ...(activeTab === 'inbox' ? styles.activeTabButton : {}),
          }}
        >
          Inbox
        </button>
      </div>

      {activeTab === 'compose' ? (
        <form onSubmit={handleSend} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>To:</label>
            <input
              type="email"
              value={recipientEmail}
              readOnly
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Subject:</label>
            <input
              type="text"
              value={subject}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSubject(e.target.value)
              }
              placeholder="Subject"
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Message:</label>
            <textarea
              value={body}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setBody(e.target.value)
              }
              placeholder="Write your message here..."
              style={styles.textarea}
            />
          </div>
          <button type="submit" style={styles.sendButton}>
            Send Email
          </button>
        </form>
      ) : (
        // Inbox View
        <div style={styles.inboxContainer}>
          {inboxMessages.length === 0 ? (
            <p style={styles.noMessages}>No messages in inbox.</p>
          ) : (
            inboxMessages.map((msg) => (
              <div key={msg.id} style={styles.messageCard}>
                <div style={styles.messageHeader}>
                  <strong>From:</strong> {msg.sender}
                </div>
                <div style={styles.messageHeader}>
                  <strong>Subject:</strong> {msg.subject}
                </div>
                <p style={styles.messageBody}>{msg.body}</p>
                <button
                  onClick={() => handleDeleteMessage(msg.id)}
                  style={styles.deleteButton}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: '600px',
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  tabContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  tabButton: {
    flex: 1,
    padding: '10px',
    cursor: 'pointer',
    backgroundColor: '#f0f0f0',
    border: '1px solid #ccc',
    borderBottom: 'none',
  },
  activeTabButton: {
    backgroundColor: '#fff',
    fontWeight: 'bold',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '5px',
    fontWeight: 600,
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  textarea: {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    height: '150px',
    resize: 'vertical',
  },
  sendButton: {
    padding: '12px 20px',
    fontSize: '16px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  inboxContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  noMessages: {
    textAlign: 'center',
    fontStyle: 'italic',
  },
  messageCard: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '10px',
  },
  messageHeader: {
    marginBottom: '5px',
  },
  messageBody: {
    marginBottom: '10px',
  },
  deleteButton: {
    padding: '8px 12px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default MessagePage;
