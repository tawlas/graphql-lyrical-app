import React from 'react';
import { Link } from 'react-router-dom';
import fetchSongsQuery from '../queries/fetchSongs';
import { useQuery } from '@apollo/react-hooks';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import styles from '../style/style.css';

const LyricList = (props) => {
  const { data, loading, error } = useQuery(fetchSongsQuery);
  const [likeLyric, _] = useMutation(likeLyricMutation);
  const { lyrics } = props;

  // console.log(data);
  if (loading) return <div>Loading...</div>;
  if (error) {
    // console.log(error);
    return <p>ERROR</p>;
  }
  if (!data) return <p>Not found</p>;

  const onLyricLike = (id, likes) =>
    likeLyric({
      variables: { id },
      optimisticResponse: {
        __typename: 'LyricType',
        likeLyric: { id, __typename: 'LyricType', likes: likes + 1 },
      },
      // refetchQueries: [{ query: fetchSongsQuery }],
    }).then(() => {});

  const renderLyrics = () => {
    return lyrics
      ? lyrics.map(({ id, content, likes }) => {
          return (
            <li className="collection-item" key={id}>
              {content}
              <div className="vote-box">
                {likes}
                <i
                  onClick={() => onLyricLike(id, likes)}
                  className="material-icons"
                >
                  thumb_up
                </i>
              </div>
            </li>
          );
        })
      : null;
  };

  return <ul className="collection">{renderLyrics()}</ul>;
};

const likeLyricMutation = gql`
  mutation LikeLyric($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;

export default LyricList;
// export default graphql(fetchSongsQuery)(SongList);
