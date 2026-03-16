export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const getUserInitials = () => {
  const user = getUser();
  if (!user?.name) return "U";
  return user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};
