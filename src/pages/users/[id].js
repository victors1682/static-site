import React from 'react';
import { useRouter } from 'next/router';

const UserDetail = ({ user }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <img src={user.avatar} alt={`${user.name}'s avatar`} style={styles.avatar} />
        <h1 style={styles.name}>{user.name}</h1>
        <p style={styles.info}>ID: {user.id}</p>
        <p style={styles.info}>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const res = await fetch('https://66c3652ed057009ee9c021a9.mockapi.io/users');
  const users = await res.json();

  const paths = users.map((user) => ({
    params: { id: user.id },
  }));

  return { paths, fallback: true };
};


export const getStaticProps = async ({ params }) => {
  const res = await fetch(`https://66c3652ed057009ee9c021a9.mockapi.io/users/${params.id}`);
  const user = await res.json();

  return {
    props: { user },
    revalidate: 5,
  };
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
    fontFamily: 'Arial, sans-serif',
  },
  card: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    maxWidth: '400px',
    width: '100%',
  },
  avatar: {
    borderRadius: '50%',
    width: '150px',
    height: '150px',
    objectFit: 'cover',
    marginBottom: '20px',
  },
  name: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    margin: '10px 0',
  },
  info: {
    fontSize: '16px',
    color: '#777',
    margin: '5px 0',
  },
};

export default UserDetail;
