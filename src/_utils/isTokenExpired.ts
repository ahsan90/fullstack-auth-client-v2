import jwt, { JwtPayload } from "jsonwebtoken";

export const isTokenExpired = (token: string) => {
  try {
    // Decode the token without verifying the signature
    const decoded: JwtPayload = jwt.decode(token, {
      complete: true,
    }) as JwtPayload;

    if (!decoded) {
      return true;
    }

    // Check the expiration time (exp)
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.payload?.exp && currentTime > decoded.payload.exp) {
      return true;
    }
    return false;
  } catch (err) {
    return true;
  }
};
