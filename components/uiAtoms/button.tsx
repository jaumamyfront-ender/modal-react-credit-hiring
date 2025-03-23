import useTranslation from "next-translate/useTranslation";

interface ButtonProps {
  isActive?: boolean;
}
export const Button = (props: ButtonProps) => {
  const { t } = useTranslation("");
  return (
    <section>
      <button
        className={`w-full h-[56px] rounded-[8px] text-white text-center ${
          props.isActive
            ? " bg-[#FF5E56] hover:bg-[#EA0029] [box-shadow:1px_1px_20px_5px_#d029294d]  transition-colors duration-200"
            : "bg-gray-300"
        } self-center mt-10 mb-4`}
      >
        {t("common:addButton")}
      </button>
    </section>
  );
};
