import { Router, RootRoute, Route } from '@tanstack/react-router'
import { rootRoute } from './routes/__root'

// Import all page components
import Home from './routes/index'
import About from './routes/about'
import Contact from './routes/contact'
import Register from './routes/register'
import Privacy from './routes/privacy'
import DeleteRequest from './routes/deleterequest'
import Store from './routes/store'
import Workshops from './routes/workshops'
import Forum from './routes/forum'
import ForumSection from './routes/forum.$sectionId'
import ForumTopic from './routes/forum.$sectionId.$topicId'
import ForumPasswordReset from './routes/forum.password-reset'
import ForumEmailVerify from './routes/forum.email-verify'
import Blog from './routes/blog'
import BlogPost from './routes/blog.$postId'
import Profile from './routes/profile.$userId'
import Bookmarks from './routes/bookmarks'
import Messages from './routes/messages'
import MessagesWith from './routes/messages.$userId'
import Chat from './routes/chat'
import ChatRoom from './routes/chat.$roomId'
import ChatInviteJoin from './routes/chat.join.$token'
import AdminLogin from './routes/admin-login'
import Admin from './routes/admin'

// Public Routes
const homeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
})

const aboutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: About,
})

const contactRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: Contact,
})

const registerRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/register',
  component: Register,
})

const privacyRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/privacy',
  component: Privacy,
})

const deleteRequestRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/deleterequest',
  component: DeleteRequest,
})

const storeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/store',
  component: Store,
})

const workshopsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/workshops',
  component: Workshops,
})

// Forum Routes
const forumRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/forum',
  component: Forum,
})

const forumSectionRoute = new Route({
  getParentRoute: () => forumRoute,
  path: '$sectionId',
  component: ForumSection,
})

const forumTopicRoute = new Route({
  getParentRoute: () => forumSectionRoute,
  path: '$topicId',
  component: ForumTopic,
})

const forumPasswordResetRoute = new Route({
  getParentRoute: () => forumRoute,
  path: 'password-reset',
  component: ForumPasswordReset,
})

const forumEmailVerifyRoute = new Route({
  getParentRoute: () => forumRoute,
  path: 'email-verify',
  component: ForumEmailVerify,
})

// Blog Routes
const blogRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/blog',
  component: Blog,
})

const blogPostRoute = new Route({
  getParentRoute: () => blogRoute,
  path: '$postId',
  component: BlogPost,
})

// User Routes (LoginGate protected)
const profileRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/profile/$userId',
  component: Profile,
})

const bookmarksRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/bookmarks',
  component: Bookmarks,
})

const messagesRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/messages',
  component: Messages,
})

const messagesWithRoute = new Route({
  getParentRoute: () => messagesRoute,
  path: '$userId',
  component: MessagesWith,
})

// Chat Routes
const chatRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/chat',
  component: Chat,
})

const chatRoomRoute = new Route({
  getParentRoute: () => chatRoute,
  path: '$roomId',
  component: ChatRoom,
})

const chatInviteJoinRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/chat/join/$token',
  component: ChatInviteJoin,
})

// Admin Routes
const adminLoginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/admin-login',
  component: AdminLogin,
})

const adminRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: Admin,
})

// Create route tree
const routeTree = rootRoute.addChildren([
  homeRoute,
  aboutRoute,
  contactRoute,
  registerRoute,
  privacyRoute,
  deleteRequestRoute,
  storeRoute,
  workshopsRoute,
  forumRoute.addChildren([
    forumSectionRoute.addChildren([
      forumTopicRoute,
    ]),
    forumPasswordResetRoute,
    forumEmailVerifyRoute,
  ]),
  blogRoute.addChildren([
    blogPostRoute,
  ]),
  profileRoute,
  bookmarksRoute,
  messagesRoute.addChildren([
    messagesWithRoute,
  ]),
  chatRoute.addChildren([
    chatRoomRoute,
  ]),
  chatInviteJoinRoute,
  adminLoginRoute,
  adminRoute,
])

// Create the router
export const router = new Router({ routeTree })

// Register router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
