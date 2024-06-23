type FastApiUserPublic = {
  id: number;
  email: string;
};

type FastApiUser = {
  id: number;
  username: string;
  email: string;
  disabled: boolean;
  posts: FastApiPost[];
  followers: FastApiUserPublic[];
  following: FastApiUserPublic[];
};

type FastApiPost = {
  id: number;
  owner_id: number;
  public: boolean;
  items: FastApiPostItem[];
  time_created: string;
};

type FastApiPostItem = {
  id: number;
  post_id: number;
  text: string;
};

type FastApiPostCreate = {
  public: boolean;
  post_texts: string[];
};

type FastApiStatusResponse = {
  success: boolean;
  status: number;
  detail: string;
};

export type {
  FastApiPost,
  FastApiPostItem,
  FastApiUser,
  FastApiUserPublic,
  FastApiPostCreate,
  FastApiStatusResponse,
};
