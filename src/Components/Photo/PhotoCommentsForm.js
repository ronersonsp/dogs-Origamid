import React from 'react';
import { ReactComponent as Enviar } from '../../Assets/enviar.svg';
import useFetch from '../../Hooks/useFetch';
import { COMMENT_POST } from '../../api';
import Error from '../Helper/Error';
import styles from './PhotoCommentsForm.module.css';

const PhotoCommentsForm = ({ id, setComments, single }) => {
  const [comment, setComment] = React.useState('');
  const { loading, request, error } = useFetch();

  function handleKeyDown(event) {
    if (event.keyCode === 13 && !loading) handleSubmit(event);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const { url, options } = COMMENT_POST(id, { comment });
    const { response, json } = await request(url, options);
    if (response.ok) {
      setComments((comments) => [...comments, json]);
      setComment('');
    }
  }

  return (
    <form
      className={`${styles.form} ${single ? styles.single : ''}`}
      onSubmit={handleSubmit}
      onKeyDown={handleKeyDown}
    >
      <textarea
        className={styles.textarea}
        id='comment'
        name='comment'
        placeholder='Comente...'
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />
      {loading ? (
        <button className={styles.button} disabled>
          <Enviar />
        </button>
      ) : (
        <button className={styles.button}>
          <Enviar />
        </button>
      )}
      <Error error={error} />
    </form>
  );
};

export default PhotoCommentsForm;
