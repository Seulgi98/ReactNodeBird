import React from 'react';
import AppLayout from "../componets/AppLayout";
import {useSelector} from "react-redux";

import PostForm from '../componets/PostForm';
import PostCard from '../componets/PostCard';

const Home = () => {
  const {isLoggedIn} = useSelector((state) => state.user);
  const {mainPosts} = useSelector((state) => state.post);

  return (
    <AppLayout>
      {/*로그인한 사용자만 볼 수 있음*/}
      {isLoggedIn && <PostForm /> }
      {mainPosts.map((post) => <PostCard key={post.id} post={post} />)}
    </AppLayout>
  );
}

export default Home;