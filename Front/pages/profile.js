import React from 'react';
import Head from 'next/head';

import AppLayout from "../componets/AppLayout";
import NicknameEditForm from "../componets/NicknameEditForm";
import FollowList from "../componets/FollowList";

const Profile = () => {
  const followerList = [{nickname: '리액트'}, {nickname: '공부'}, {nickname: '화이팅'}];
  const followingList = [{nickname: '드라마'}, {nickname: '스포'}, {nickname: '금지'}]

  return (
    <>
      <Head>
        <title> 내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm/>
        <FollowList header="팔로잉 목록" data={followingList}/>
        <FollowList header="팔로워 목록" data={followerList}/>
      </AppLayout>
    </>
  );
};

export default Profile;
