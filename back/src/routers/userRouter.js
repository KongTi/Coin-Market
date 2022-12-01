import { Router } from "express";
import { userService } from "../services/userService";
import { loginRequired } from "../middlewares/loginRequired";

const userAuthRouter = Router();

//회원가입
userAuthRouter.post("/users/register", async (req, res, next) => {
  try {
    const data = req.body;
    const user = await userService.createUser(data);

    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

//로그인
userAuthRouter.post("/users/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const loginUser = await userService.login({ email, password });

    res.status(201).json(loginUser);
  } catch (err) {
    next(err);
  }
});

//회원정보조회
userAuthRouter.get("/users", loginRequired, async (req, res, next) => {
  try {
    const user = await userService.userInfo(req.userId);

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

//회원정보수정
userAuthRouter.put("/users", loginRequired, async (req, res, next) => {
  try {
    const user = await userService.userUpdate(req.userId, req.body);

    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

//비밀번호검증
userAuthRouter.post(
  "/users/pass/vrfct",
  loginRequired,
  async (req, res, next) => {
    try {
      const id = req.userId;
      const password = req.body.password;
      const user = await userService.verificationPassword(id, password);

      res.status(200).send("success");
    } catch (err) {
      next(err);
    }
  }
);

//비밀번호변경
userAuthRouter.put(
  "/users/pass/update",
  loginRequired,
  async (req, res, next) => {
    try {
      const id = req.userId;
      const password = req.body.password;

      const user = await userService.updatePassword(id, password);

      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  }
);

//회원탈퇴
userAuthRouter.put(
  "/users/withdrawal",
  loginRequired,
  async (req, res, next) => {
    try {
      const body = { role: "WITHDRAWAL" };
      const user = await userService.userUpdate(req.userId, body);

      res.status(204).send("회원탈퇴 신청이 완료되었습니다.");
    } catch (err) {
      next(err);
    }
  }
);

export { userAuthRouter };
