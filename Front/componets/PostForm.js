import {Button, Form, Input} from 'antd';
import {useCallback, useState, useRef} from "react";
import {useSelector, useDispatch} from "react-redux";
import {addPost} from "../reducers/post";

const PostForm = () => {
  const {imagePaths} = useSelector((state) => state.post);
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const imageInput = useRef();
  //글자 입력 보여주기
  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);
  const onSubmit = useCallback(() => {
    dispatch(addPost)
    setText('');
  }, []);

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
