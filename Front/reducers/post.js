export const initialState = {
  mainPosts: [{
    id: 1,
    User: {
      id: 1,
      nickname: "슬깅",
    },
    content: "첫번째 게시글 #첫줄 #벚꽃 #봄",
    Images: [{
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2-vwknaKx809ep8zdiJu-rLTQBRMKSHVAbg&usqp=CAU",
    }, {
      src: "",
    }],
    Comments: [{
      User: {
        nickname: "blossom._.",
      },
      content: "벚꽃 사진 너무 이쁜거 같아요🥰",
    }, {
      User: {
        nickname: "spring_S2",
      },
      content: "벚꽃🌸",
    }]
  }],
  imagePaths: [],
  postAdded: false,
}

//게시글 작성 action
const ADD_POST = "ADD_POST";
export const addPost = {
  type: ADD_POST
}
const dummyPost = {
  id: 2,
  content: 'dummy data',
  User: {
    id: 1,
    nickname: "어피치",
  },
  Images: [],
  Comments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts], //앞에 추가해야 게시글이 위에서부터 추가됨
        postAdded: true,
      }
    default:
      return state;
  }
};

export default reducer;