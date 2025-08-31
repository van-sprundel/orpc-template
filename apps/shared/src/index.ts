import {
	getSessionContract,
	loginContract,
	socialLoginContract,
} from "./contracts/auth.js";

export const routerContract = {
	auth: {
		login: loginContract,
		socialLogin: socialLoginContract,
		getSession: getSessionContract,
	},
};
