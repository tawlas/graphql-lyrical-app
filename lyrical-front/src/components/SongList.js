import React from 'react';
import { Link } from 'react-router-dom';
import fetchSongsQuery from '../queries/fetchSongs';
import { useQuery } from '@apollo/react-hooks';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import styles from '../style/style.css';

const SongList = (props) => {
  // const [loading, SetLoading] = useState(props.data.loading);
  // useEffect(() => {}, [loading]);
  const { data, loading, error } = useQuery(fetchSongsQuery);
  const [deleteSong, deleteUtilities] = useMutation(deleteMutation);

  // console.log(data);
  if (loading) return <div>Loading...</div>;
  if (error) {
    // console.log(error);
    return <p>ERROR</p>;
  }
  if (!data) return <p>Not found</p>;

  const onSongDelete = (id) =>
    deleteSong({
      variables: { id },
      // refetchQueries: [{ query: fetchSongsQuery }],
    }).then(() => {
      console.log(deleteUtilities);
      deleteUtilities.data.refetch();
    });

  const renderSongs = () => {
    return data.songs.map(({ title, id }, i) => {
      return (
        <li key={id} className="collection-item">
          <Link to={`/songs/${id}`}>{title}</Link>
          <i className="material-icons" onClick={() => onSongDelete(id)}>
            delete
          </i>
        </li>
      );
    });
  };

  return (
    <div>
      <ul className="collection">{renderSongs()}</ul>
      <Link to="/songs/new" className="btn-floating btn-large red right">
        <i className="material-icons">add</i>
      </Link>
    </div>
  );
};

const deleteMutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

export default SongList;
// export default graphql(fetchSongsQuery)(SongList);
