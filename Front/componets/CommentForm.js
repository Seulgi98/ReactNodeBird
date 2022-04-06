import {Button, Form, Input} from "antd";
import {useCallback} from "react";
import useInput from "../hooks/useInput";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";

const CommentForm = ({post}) => {
  const id = useSelector((state) => state.user.me?.id); //로그인을 안한 경우 me가 없기 때문에 작성
  const [commentText, onChangeCommentText] = useInput('');
  const onSubmitComment = useCallback(() => {
    console.log(post.id, commentText)
  }, [commentText]);
  return(
    <Form onFinish={onSubmitComment}>
      <Form.Item style={{position: "relative", margin: 0}}>
        <Input.TextArea value={commentText} onChange={onChangeCommentText} rows={4}/>
        <Button style={{position: "absolute", right: 0, bottom: -40}} type="primary" htmlType="submit">트윗</Button>
      </Form.Item>
    </Form>
  );
};

CommentForm.PropTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;