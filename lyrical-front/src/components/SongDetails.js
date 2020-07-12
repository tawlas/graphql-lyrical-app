import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';
import fetchSongQuery from '../queries/fetchSong';
const SongDetails = (props) => {
  const songId = props.match.params.id;
  const { data, loading, error } = useQuery(fetchSongQuery, {
    variables: { id: songId },
  });

  if (loading) return <div>Loading...</div>;
  if (error) {
    return <p>ERROR</p>;
  }
  if (!data) return <p>Not found</p>;
  const { song } = data;

  return (
    <div>
      <Link to="/">Go back</Link>
      <h3>{song.title}</h3>
      <LyricList lyrics={song.lyrics} />
      <LyricCreate songId={songId} />
    </div>
  );
};

export default SongDetails;
// export default graphql(fetchSongsQuery)(SongList);
