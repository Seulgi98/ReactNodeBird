import React, {useCallback, useState} from 'react';
import PropTypes from "prop-types";
import {Avatar, Button, Card, Comment, List, Popover} from "antd";
import {EllipsisOutlined, HeartOutlined, HeartTwoTone, MessageOutlined, RetweetOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import styled from 'styled-components';
import Link from 'next/link';

import PostImages from "./PostImages";
import CommentForm from "./CommentForm";
import PostCardContent from "./PostCardContent";
// import FollowButton from './FollowButton';
import {REMOVE_POST_REQUEST} from "../reducers/post";

const CardWrapper = styled.div`
  margin-bottom: 20px;
`;

const PostCard = ({post}) => {
  const dispatch = useDispatch();
  const { removePostLoading } = useSelector((state) => state.post);
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const [liked, setLiked] = useState(false);
  const { me } = useSelector((state) => state.user);
  const id = me && me.id;

  const onToggleLike = useCallback(() => {
    setLiked((prev) => !prev); //false는 true로, true는 false로 바뀜
  }, []);
  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev); //false는 true로, true는 false로 바뀜
  }, []);
  const onRemovePost = useCallback(() => {
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id, //사용자 id는 user me.id에 있음
    })
  }, []);

  // const id = useSelector((state) => state.user.me?.id); //옵셔널 체이닝
  return (
    <CardWrapper key={post.id}>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images}/>} //이미지가 1개 이상 있을 때
        // 배열안에 jsx를 넣을때는 key를 넣어줘야함
        actions={[
          <RetweetOutlined key="retweet"/>,
          liked //좋아요를 눌렀을때 꽉 찬 하트
            ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onToggleLike}/>
            : <HeartOutlined key="heart" onClick={onToggleLike}/>,
          <MessageOutlined key="commit" onClick={onToggleComment}/>,
          <Popover key="ellipsis" content={(
            <Button.Group>
              {id && post.User.id === id
                ? ( //게시글 id와 로그인 id가 같다면
                  <>
                    <Button>수정</Button>
                    <Button type="danger" loading={removePostLoading} onClick={onRemovePost}>삭제</Button>
                  </>
                ) : <Button>신고</Button>}
            </Button.Group>
          )}>
            <EllipsisOutlined/>
          </Popover>
        ]}
        // extra={<FollowButton post={post} />}
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
          description={<PostCardContent postData={post.content}/>}
        />
      </Card>
      {commentFormOpened && (
        <>
          <CommentForm post={post}/>
          <List
            header={`${post.Comments ? post.Comments.length : 0} 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments || []}
            renderItem={(item)=>(
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={(
                    <Link href={{ pathname: '/user', query: { id: item.User.id } }} as={`/user/${item.User.id}`}>
                      <a><Avatar>{item.User.nickname[0]}</Avatar></a>
                    </Link>
                  )}
                  content={item.content}
                />
              </li>
            )}
          />
        </>
        )}
    </CardWrapper>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    UserId: PropTypes.number,
    content: PropTypes.string,
    createdAt: PropTypes.object,
    Comments: PropTypes.arrayOf(PropTypes.any),
    Images: PropTypes.arrayOf(PropTypes.any),
  }).isRequired,
};

export default PostCard;
