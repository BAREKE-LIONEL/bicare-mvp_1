import React, { useContext } from "react";

export const LangCtx = React.createContext({ lang: "rw", setLang: () => {} });
export const useLang = () => useContext(LangCtx);
export const tr = (lang, rw, en) => (lang === "rw" ? rw : en);
export const T = ({ rw, en }) => {
  const { lang } = useLang();
  return <>{tr(lang, rw, en)}</>;
};

export default LangCtx;
