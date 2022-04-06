import {Button, Form, Input} from 'antd';
import {useCallback, useRef, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";

import {addPost} from "../reducers/post";
import useInput from "../hooks/useInput";

const PostForm = () => {
  const {imagePaths, addPostDone} = useSelector((state) => state.post);
  const [text, onChangeText, setText] = useInput('');

  useEffect(() => {
    if (addPostDone) {
      setText('');
    }
  }, [addPostDone]);

  const dispatch = useDispatch();
  const onSubmit = useCallback(() => {
    dispatch(addPost(text));
    setText(''); //text를 초기화 시킴(트윗 날리고 초기화)
  }, [text]);

  const imageInput = useRef();
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  return (
    <Form style={{margin: "10px 0 20px"}} encType="multipart/form-data" onFinish={onSubmit}>
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="무슨 일이 일어나고 있나요?"
      />
      <div>
        <input type="file" multiple hidden ref={imageInput}/>
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button type="primary" style={{float: "right"}} htmlType="Submit">트윗</Button>
      </div>
      <div>
        {imagePaths.map((v)=>(
          <div key={v} style={{display: "inline-block"}}>
            <img src={v} style={{width: "200px"}} alt={v}/>
            <div>
              <Button>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
};

export default PostForm;
