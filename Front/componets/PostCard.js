import React, {useCallback, useState} from 'react';
import PropTypes from "prop-types";
import {Avatar, Button, Card, Comment, Image, List, Popover} from "antd";
import Connect from "react-redux/lib/connect/connect";
import {EllipsisOutlined, HeartOutlined, HeartTwoTone, MessageOutlined, RetweetOutlined} from "@ant-design/icons";
import {useSelector} from "react-redux";
import PostImages from "./PostImages";
import CommentForm from "./CommentForm";
import PostCardContent from "./PostCardContent";

const PostCard = ({post}) => {
  const [liked, setLiked] = useState(false);
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const onToggleLike = useCallback(() => {
    setLiked((prev) => !prev); //false는 true로, true는 false로 바뀜
  }, []);
  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev); //false는 true로, true는 false로 바뀜
  }, []);

  const id = useSelector((state) => state.user.me?.id); //옵셔널 체이닝
  return (
    <div>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images}/>} //이미지가 1개 이상 있을 때
        // 배열안에 jsx를 넣을때는 key를 넣어줘야함
        actions={[
          <RetweetOutlined key="retweet"/>,
          liked //좋아요를 눌렀을때 꽉 찬 하트
            ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onToggleLike}/>
            : <HeartOutlined key="heart" onClick={onToggleLike}/>,

          <MessageOutlined key="commit" onClick={onToggleComment}/>,
          <Popover key="more" content={(
            <Button.Group>
              {id && post.User.id === id
                ? ( //게시글 id와 로그인 id가 같다면
                  <>
                    <Button>수정</Button>
                    <Button type="danger">삭제</Button>
                  </>
                ) : <Button>신고</Button>}
            </Button.Group>
          )}>
            <EllipsisOutlined/>
          </Popover>
        ]}
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
          description={<PostCardContent postData={post.content}/>}
        />
      </Card>
      {commentFormOpened && (
        <div>
          <CommentForm post={post}/>
          <List
            header={`${post.Comments.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item)=>(
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                  content={item.content}
                />
              </li>
            )}
          />
        </div>)}
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({ //shape를 사용하여 더 상세하게 작성
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.object,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default PostCard;
