import React from 'react';

type Video = {
  id: string;
  title: string;
};

const workoutVideos: Video[] = [
  {
    id: 'jjUyJufUKL8',
    title: 'Fiery Full Body Fat Burning Workout with Dumbbells'
  },
  {
    id: '1skBf6h2ksI',
    title: '10 Minute Abs Workout'
  },
  {
    id: '34LJX-arUo8', 
    title: 'Best Exercises for Strength'
  }
  
];

type Props = {};

const Workouts: React.FC<Props> = () => {
  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Workout Videos</h1>
      <div style={videosContainerStyle}>
        {workoutVideos.map((video) => (
          <div key={video.id} style={videoCardStyle}>
            <a
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
            >
              <img
                src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                alt={video.title}
                style={thumbnailStyle}
              />
              <p style={videoTitleStyle}>{video.title}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};


const containerStyle: React.CSSProperties = {
  maxWidth: '800px',
  margin: '20px auto',
  padding: '20px',
  textAlign: 'center',
  fontFamily: 'Arial, sans-serif',
};

const headerStyle: React.CSSProperties = {
  marginBottom: '20px',
};

const videosContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  gap: '20px',
};

const videoCardStyle: React.CSSProperties = {
  width: '300px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
  borderRadius: '8px',
  overflow: 'hidden',
  textAlign: 'left',
};

const linkStyle: React.CSSProperties = {
  textDecoration: 'none',
  color: 'inherit',
};

const thumbnailStyle: React.CSSProperties = {
  width: '100%',
  display: 'block',
};

const videoTitleStyle: React.CSSProperties = {
  padding: '10px',
  fontSize: '16px',
};

export default Workouts;