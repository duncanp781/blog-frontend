
export interface Post {
  _id: string;
  title: string;
  content: string;
  public: boolean;
  createdAt: string;
  author: {
    username: string;
    _id: string;
  };
}
