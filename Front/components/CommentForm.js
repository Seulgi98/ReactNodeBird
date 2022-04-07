import { Button, Form, Input } from 'antd';
import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import useInput from '../hooks/useInput';
import { ADD_COMMENT_REQUEST } from '../reducers/post';

const CommentForm = ({post}) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.me?.id); //로그인을 안한 경우 me가 없기 때문에 작성
  const {addCommentDone, addCommentLoading} = useSelector((state) => state.post);
  const [commentText, onChangeCommentText, setCommentText] = useInput('');

  useEffect(() => {
    if (addCommentDone) {
      setCommentText('');
    }
  }, [addCommentDone]);

  const onSubmitComment = useCallback(() => {
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: {content: commentText, userId: id, postId: post.id},
    });
  }, [commentText, id]);

  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item style={{position: "relative", margin: 0}}>
        <Input.TextArea value={commentText} onChange={onChangeCommentText} rows={4}/>
        <Button style={{position: "absolute", right: 0, bottom: -40, zIndex: 1}}
                type="primary"
                htmlType="submit"
                loading={addCommentLoading}
        >트윗</Button>
      </Form.Item>
    </Form>
  );
};

CommentForm.PropTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;