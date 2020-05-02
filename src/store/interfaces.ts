export interface IPage {
  id: string;
  pageId: string;
  title: string;
  body: string;
  isPublished: boolean;
  isFirst?: boolean;
  storyURL?: string;
  options?: string[];
  nextPages?: string[];
}

export interface IPageState {
  pageList: IPage[] | null,
}

export interface IStory {
  title: string;
  storyURL: string;
  owner: string;
  isPublished: boolean;
}

export interface IStoryState {
  currentStory: IStory | null;
  storyList: IStory[] | null;
  pageList: IPageState[] | null;
  pageNumber: number;
  pageCount: number;
}

export interface AuthInfo {
  login: string;
}

export interface IAuthState {
  token: string | null;
  authInfo: AuthInfo | null;
}

export interface IChat {
  id: string;
  members: Array<{ login: string }>;
}

export interface IMsg {
  text: string;
  chatID: string;
  author: { login: string };
}

export interface IChatState {
  chatList: IChat[] | null;
  msgList: IMsg[] | null;
}

export interface IUsersState {
  userInfo: object | null;
  userList: object[] | null;
  pageNumber: number;
  pageCount: number;
}

export interface IRootState {
  auth: IAuthState;
  users: IUsersState;
  pageList: IPageState;
  storyList: IStoryState;
}
