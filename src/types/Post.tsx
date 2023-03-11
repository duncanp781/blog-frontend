
export interface Post {
  _id: string;
  title: string;
  content: string;
  public: boolean;
  createdAt: string;
  isMD?: boolean,
  author: {
    username: string;
    _id: string;
  };
}
