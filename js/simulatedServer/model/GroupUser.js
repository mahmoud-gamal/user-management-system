define(() => {
  // many-to-many
  const GroupUser = function(username, groupName) {
    this.username = username;
    this.groupName = groupName;
  };
  return GroupUser;
});
