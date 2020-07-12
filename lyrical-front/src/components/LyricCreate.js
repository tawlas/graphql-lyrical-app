import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import fetchSongQuery from '../queries/fetchSong';

const LyricCreate = (props) => {
  const [lyric, SetLyric] = useState('');
  const [addLyricToSong, { loading, error, data }] = useMutation(
    addLyricMutation
  );
  const onSubmit = (event) => {
    event.preventDefault();
    addLyricToSong({
      variables: { lyric, songId: props.songId },
      // refetchQueries: [{ query: fetchSongQuery }],
    }).then(() => {});
    SetLyric('');
  };

  return (
    <form onSubmit={onSubmit}>
      <label>Lyric Title:</label>
      <input value={lyric} onChange={(e) => SetLyric(e.target.value)} />
    </form>
  );
};

const addLyricMutation = gql`
  mutation AddLyric($lyric: String, $songId: ID) {
    addLyricToSong(content: $lyric, songId: $songId) {
      id
      lyrics {
        id
        content
        likes
      }
    }
  }
`;

export default LyricCreate;
