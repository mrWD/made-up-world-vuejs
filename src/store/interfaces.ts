export interface ChatListWithLogin {
  id: string;
  login: string;
}

export interface MsgListWithLogin {
  text: string;
  chatID: string;
  login: string;
}

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
  pageList: IPage[],
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

export interface IReqStatusState {
  isLoading: boolean;
  requestCount: number;
  errors: string[];
}

export interface IChatState {
  currentChat: string | null;
  chatList: IChat[];
  msgList: IMsg[];
}

export interface IUsersState {
  userInfo: object | null;
  userList: object[] | null;
  destination: string;
  pageNumber: number;
  pageCount: number;
  newFollowings: string[];
  newUnfollowings: string[];
}

export interface IRootState {
  auth: IAuthState;
  users: IUsersState;
  pages: IPageState;
  stories: IStoryState;
}
