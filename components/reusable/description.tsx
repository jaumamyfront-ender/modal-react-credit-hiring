import useTranslation from "next-translate/useTranslation";

export const Description = () => {
  const { t } = useTranslation("");
  return (
    <div>
      <p className="text-[14px] text-gray-400">{t("common:description")}</p>
      <p className="text-[14px] text-gray-400">
        {t("common:descriptionSecondary")}
      </p>
      <h2 className="text-black font-medium mt-4 mb-4">
        {t("common:loanAmountLabel")}
      </h2>
    </div>
  );
};
