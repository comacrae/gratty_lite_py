type FastApiUserPublic = {
  id: string;
  username: string;
};

type FastApiUser = {
  id: string;
  username: string;
  email: string;
  disabled: boolean;
  posts: FastApiPost[];
  followers: FastApiUserPublic[];
  following: FastApiUserPublic[];
};

type FastApiPost = {
  id: number;
  owner_id: string;
  public: boolean;
  items: FastApiPostItem[];
};

type FastApiPostItem = {
  id: number;
  post_id: number;
  text: string;
};

export type { FastApiPost, FastApiPostItem, FastApiUser, FastApiUserPublic };
