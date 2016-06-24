#Simple User Management System
- This is a simple User Management System, made as single page application.
- Please `clone` this repository and follow instructions.

##Technologies:
- I'm trying not to user a do-it-all framework, so we use the following libraries
  - `jquery`
  - `knockoutjs`: data binding
  - `sweetalert`: simple html dialog libraries
  - `font-awesome`: for font icons, used as a placeholder service
  - `gulp`
  - `bower`
  - `karma`
  - `jasmine`
  - `sass`
  - `requirejs`


##Simulated Server Mode:
- Since app hasn't a realy server, I used a server-simulating javascript Object
- It simulates all requests from server and stores it in simulated DB

##API Model:
-User:
  - `{username: string, role: string}`
-Group:
  - `{groupName: string, description: string}`
- UserVO:
  - `{username: string, role: string, groups: Group[]}`
- GroupVO:
  - `{groupName: string, description: string, users: User[]}`

##API Server calls:
- `get_all_users()`: `UserVO[]`
- `get_user(username)`: `UserVO`
- `add_user(username, role, [groupName])`: void
- `add_user_to_group(username, groupName)`: void
- `remove_user_from_group(username, groupName)`: void
- `delete_user(username)`: void
- `get_all_groups()`: `GroupVO[]`
- `get_group(groupName)`: `GroupVO`
- `addGroup(groupName, description)`: void
- `deleteGroup(groupName)`: void

##Instructions
- To start, run `npm install` then `bower install`
- To compile `sass` run `gulp`
- simulated db uses `localStorage`
