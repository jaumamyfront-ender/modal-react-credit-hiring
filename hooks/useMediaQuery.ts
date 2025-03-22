import { useEffect, useState } from "react";

type KeyScreenValues =
  | "isScreenMobile"
  | "isScreenSm"
  | "isScreenMd"
  | "isScreenLg"
  | "isScreenXl"
  | "isScreen2xl"
  | "isScreenFullHd";

type ScreenValuesType = Record<KeyScreenValues, boolean>;

const queries: [KeyScreenValues, string][] = [
  ["isScreenMobile", "(max-width: 640px)"],
  ["isScreenSm", "(min-width: 640px)"],
  ["isScreenMd", "(min-width: 768px)"],
  ["isScreenLg", "(min-width: 1024px)"],
  ["isScreenXl", "(min-width: 1280px)"],
  ["isScreen2xl", "(min-width: 1536px)"],
  ["isScreenFullHd", "(min-width: 1920px)"],
];

const useMediaQuery = (): ScreenValuesType => {
  const [value, setValue] = useState<ScreenValuesType>(() =>
    queries.reduce((acc, [key]) => {
      acc[key] = false;
      return acc;
    }, {} as ScreenValuesType)
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQueryLists = queries.map(([key, query]) => [
      key,
      window.matchMedia(query),
    ]) as [KeyScreenValues, MediaQueryList][];

    const getValue = (): ScreenValuesType =>
      Object.fromEntries(
        mediaQueryLists.map(([key, mql]) => [key, mql.matches])
      ) as ScreenValuesType;

    const handler = () => setValue(getValue);

    mediaQueryLists.forEach(([_, mql]) =>
      mql.addEventListener("change", handler)
    );

    setValue(getValue);

    return () =>
      mediaQueryLists.forEach(([_, mql]) =>
        mql.removeEventListener("change", handler)
      );
  }, []);

  return value;
};

export { useMediaQuery };
