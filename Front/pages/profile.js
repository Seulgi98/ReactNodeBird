import React from 'react';
import Head from 'next/head';

import AppLayout from "../componets/AppLayout";
import NicknameEditForm from "../componets/NicknameEditForm";
import FollowList from "../componets/FollowList";
import {useSelector} from "react-redux";

const Profile = () => {
  const {me} = useSelector((state) => state.user);

  return (
    <>
      <Head>
        <title> 내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm/>
        <FollowList header="팔로잉" data={me.following}/>
        <FollowList header="팔로워" data={me.follower}/>
      </AppLayout>
    </>
  );
};

export default Profile;
