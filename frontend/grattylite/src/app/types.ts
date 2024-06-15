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
};

type FastApiPostItem = {
  id: number;
  post_id: number;
  text: string;
};

export type { FastApiPost, FastApiPostItem, FastApiUser, FastApiUserPublic };
