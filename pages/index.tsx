import { useState } from "react";
import useTranslation from "next-translate/useTranslation";
import ModalDialogCalculator from "@/components/home/page";

export default function Home() {
  const [isOpen, setModalIsOpen] = useState<boolean>(false);
  const { t } = useTranslation("");
  return (
    <div
      className={`h-screen flex justify-center items-center m-0 bg-gradient-to-br from-[#ff5e56] to-[#dc3131]`}
    >
      <section>
        <button
          className="self-center font-medium text-base leading-6 w-[194px] h-[56px] rounded-md bg-transparent text-white border border-white transition duration-300 ease-in-out hover:bg-white hover:text-[#dc3131]"
          onClick={() => {
            setModalIsOpen(true);
          }}
        >
          {t("common:title")}
        </button>
      </section>
      {isOpen && (
        <ModalDialogCalculator isDialog={isOpen} setIsDialog={setModalIsOpen} />
      )}
    </div>
  );
}
