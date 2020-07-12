import React, { useState } from 'react';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import fetchSongsQuery from '../queries/fetchSongs';

const SongCreate = (props) => {
  const [title, SetTitle] = useState('');
  const [addSong, { loading, error, data }] = useMutation(mutation);
  const onSubmit = (event) => {
    event.preventDefault();
    addSong({
      variables: { title },
      refetchQueries: [{ query: fetchSongsQuery }],
    }).then(() => {
      console.log(data);
      props.history.push('/');
    });
    // this.props
    //   .mutate({
    //     variables: { title },
    //     refetchQueries: [{ query: fetchSongsQuery }],
    //   })
    //   .then(() => {
    //     props.history.push('/');
    //   });
    // console.log(props);
  };

  return (
    <div className="collection">
      <Link to="/">Go back</Link>
      <h3>Create a new song</h3>
      <form onSubmit={onSubmit}>
        <label>Song Title:</label>
        <input value={title} onChange={(e) => SetTitle(e.target.value)} />
      </form>
    </div>
  );
};

const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      id
      title
    }
  }
`;

export default SongCreate;
