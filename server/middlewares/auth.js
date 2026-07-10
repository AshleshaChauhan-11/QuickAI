import { clerkClient } from "@clerk/express";

export const auth = async (req, res, next) => {
  try {
    const authData = await req.auth();

    console.log("========== AUTH ==========");
    console.log(authData);
    console.log("==========================");

    if (!authData.userId) {
      console.log("No valid Clerk user found.");
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const userId = authData.userId;

    const hasPremiumPlan = await authData.has({
      plan: "premium",
    });

    const user = await clerkClient.users.getUser(userId);

    let free_usage =
      Number(user.privateMetadata?.free_usage ?? 0);

    req.userId = userId;
    req.plan = hasPremiumPlan ? "premium" : "free";
    req.free_usage = free_usage;

    next();
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};