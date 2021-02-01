const userType = (user: string | null, users: { [key: string]: string }): string | null => {
  if (!user) {
    return null;
  }
  return users[user];
};

export default userType;
