export const extractTokens = (cookieString: string) => {
  const cookies = cookieString.split(",");
  let accessToken = "";
  let refreshToken = "";

  cookies.forEach((cookie) => {
    const [key, value] = cookie
      .split(";")[0]
      .split("=")
      .map((part) => part.trim());
    if (key === "accessToken") {
      accessToken = value;
    } else if (key === "refreshToken") {
      refreshToken = value;
    }
  });
  return { accessToken, refreshToken };
};

export default extractTokens;
