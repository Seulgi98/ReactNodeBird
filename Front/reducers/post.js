import shortId from "shortid";

export const initialState = {
  mainPosts: [{
    id: 1,
    User: {
      id: 1,
      nickname: "슬깅",
    },
    content: "첫번째 게시글 #첫줄 #벚꽃 #봄",
    Images: [{
      id: shortId.generate(),
      src: "https://blog.kakaocdn.net/dn/WMbvI/btqYnnXpwRW/BFbLIOsHKrp1FZD0YTUCuK/img.png",
    }, {
      id: shortId.generate(),
      src: "https://post-phinf.pstatic.net/MjAxOTA0MDFfMjM4/MDAxNTU0MTAxMjkzMTE1.ns8zZ25jJghGukeRs4eTiA7o4DlAHQGBNgXwqdqD-9Mg.PWgGjA_tnusYkRV_OD1KHQ128zEENwInRN-oGHO9R5kg.JPEG/Cherry_Blossom-Korea.jpg?type=w1200",
    }, {
      id: shortId.generate(),
      src: "https://cdn.mhns.co.kr/news/photo/202103/501656_602737_2119.jpg",
    }],
    Comments: [{
      id: shortId.generate(),
      User: {
        id: shortId.generate(),
        nickname: "blossom._.",
      },
      content: "벚꽃 사진 너무 이쁜거 같아요🥰",
    }, {
      id: shortId.generate(),
      User: {
        id: shortId.generate(),
        nickname: "spring_S2",
      },
      content: "벚꽃🌸",
    }]
  }],
  imagePaths: [],
  hasMorePosts: true,
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
}

//게시글 작성 action
export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

//동적 액션 크리에이터
export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

const dummyPost = (data) => ({
  id: data.id,
  content: data.content,
  User: {
    id: 1,
    nickname: "사용자",
  },
  Images: [],
  Comments: [],
});

const dummyComment = (data) => ({
  id: shortId.generate(),
  content: data,
  User: {
    id: 1,
    nickname: '사용자',
  },
});
// 이전 상태를 액션을 통해 다음 상태로 만들어내는 함수(불변성은 지키면서)
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostError: null,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        //sagas post로 부터 가져
        mainPosts: [dummyPost(action.data), ...state.mainPosts], //앞에 추가해야 게시글이 위에서부터 추가됨
        addPostLoading: false,
        addPostDone: true,
      };
    case REMOVE_POST_FAILURE:
      return {
        ...state,
        removePostLoading: false,
        removePostError: action.error,
      };
    case REMOVE_POST_REQUEST:
      return {
        ...state,
        removePostLoading: true,
        removePostDone: false,
        removePostError: null,
      };
    case REMOVE_POST_SUCCESS:
      return {
        ...state,
        //sagas post로 부터 가져
        mainPosts: state.mainPosts.filter((v) => v.id !== action.data),
        removePostLoading: false,
        removePostDone: true,
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        addPostLoading: false,
        addPostError: action.error,
      };
    case ADD_COMMENT_REQUEST: {
      // action.data.content, postId, userId
      // const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId);
      // const post = state.mainPosts[postIndex];
      // post.Comments = [dummyComment(action.data.content), ...post.Comments];
      // const mainPosts = [...state.mainPosts];
      // mainPosts[postIndex] = post;
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: null,
      };
    }
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        addCommentLoading: false,
        addCommentDone: true,
      };
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        addCommentLoading: false,
        addCommentError: action.error,
      };
    default:
      return state;
  }
};

export default reducer;