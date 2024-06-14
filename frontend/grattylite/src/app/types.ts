type UserPublic = {
  id: string;
  username: string;
};

type User = {
  id: string;
  username: string;
  email: string;
  disabled: boolean;
  posts: Post[];
  followers: UserPublic[];
  following: UserPublic[];
};

type Post = {
  id: number;
  owner_id: string;
  public: boolean;
  items: PostItem[];
};

type PostItem = {
  id: number;
  post_id: number;
  text: string;
};
