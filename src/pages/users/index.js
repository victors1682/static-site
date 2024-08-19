import React from 'react';
import Link from "next/link"
const Users = ({ users }) => {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>User List</h1>
      <ul style={styles.list}>
        {users.map((user) => (
          <li key={user.id} style={styles.listItem}>
            <img 
              src={user.avatar} 
              alt={`${user.name}'s avatar`} 
              style={styles.avatar} 
            />
            <Link href={`/users/${user.id}`} style={styles.nameLink}>
              <p style={styles.name}>{user.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
 
const styles = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    marginBottom: '10px',
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  avatar: {
    borderRadius: '50%',
    marginRight: '15px',
    width: '50px',
    height: '50px',
    objectFit: 'cover',
  },
  name: {
    margin: 0,
    fontWeight: 'bold',
    fontSize: '16px',
    color: '#555',
  },
};


export const getStaticProps = async () => {
  const res = await fetch('https://66c3652ed057009ee9c021a9.mockapi.io/users');
  const users = await res.json();

  return {
    props: {
      users,
    },
  };
};

export default Users;
