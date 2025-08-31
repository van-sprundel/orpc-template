import { oc } from "@orpc/contract";
import z from "zod";
import { zLoginDto, zSocialLogin } from "../dto/login.js";
import { zSession } from "../dto/session.js";
import { zUser } from "../dto/user.js";

export const loginContract = oc.input(zLoginDto).output(zUser);

export const socialLoginContract = oc
	.input(zSocialLogin)
	.output(z.object({ redirect: z.boolean(), url: z.url().optional() }));

export const getSessionContract = oc.output(zSession.nullable());
