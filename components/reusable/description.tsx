import { useMediaQuery } from "@/hooks/useMediaQuery";
import useTranslation from "next-translate/useTranslation";

export const Description = () => {
  const { isScreenMobile } = useMediaQuery();
  const { t } = useTranslation("");
  return (
    <div>
      <p
        className={`${
          isScreenMobile ? "text-[14px]" : "text-[16px]"
        }  text-gray-400`}
      >
        {t("common:description")}
      </p>
      <p
        className={`${
          isScreenMobile ? "text-[14px]" : "text-[16px]"
        }  text-gray-400`}
      >
        {t("common:descriptionSecondary")}
      </p>
      <h2 className="text-black font-semibold mt-4 mb-4">
        {t("common:loanAmountLabel")}
      </h2>
    </div>
  );
};
