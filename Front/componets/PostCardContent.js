import React from 'react';
import PropTypes from "prop-types";
import Link from 'next/link';

const PostCardContent = ({postData}) => { //첫번째 게시글 해시태그
  return (
    <div>
      {/*해시태그 정규표현식으로 찾기*/}
      {postData.split(/(#[^\s]+)/g).map((v, i) => {
        if (v.match(/(#[^\s]+)/)) {
          return <Link href={`/hashtag/${v.slice(1)}`} key={i}><a>{v}</a></Link>
        }
        return v;
        })}
    </div>
  );
};

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired
};

export default PostCardContent;
