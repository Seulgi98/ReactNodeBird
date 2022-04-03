import React from 'react';
import Head from 'next/head';

import AppLayout from "../componets/AppLayout";

const Profile = () => {
  return (
    <>
      <Head>
        <title> 내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="팔로잉 목록"/>
        <FollowList header="팔로워 목록"/>
      </AppLayout>
    </>
  );
};

export default Profile;
