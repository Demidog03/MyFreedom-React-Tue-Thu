import { lazy } from "react";
import Loadable from "./shared/lib/hoc/Loadable";

export const HomePage = Loadable(lazy(async () => await import('./pages/HomePage')))
export const SignInPage = Loadable(lazy(async () => await import('./pages/SignInPage')))
export const SignUpPage = Loadable(lazy(async () => await import('./pages/SignUpPage')))