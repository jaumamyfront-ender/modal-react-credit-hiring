import useTranslation from "next-translate/useTranslation";
import { Dispatch, SetStateAction } from "react";
import Dialog from "../uiAtoms/dialog";
import { CreditCalculatorPage } from "./additionalComponents/creditCalculatorPage";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface ModalDialog {
  isDialog: boolean;
  setIsDialog: Dispatch<SetStateAction<boolean>>;
  handleAfterCloseAction?: () => void;
}

export default function ModalDialogCalculator({
  isDialog,
  setIsDialog,
  handleAfterCloseAction,
}: ModalDialog) {
  const { t } = useTranslation("");
  const { isScreenMd } = useMediaQuery();

  return (
    <>
      <Dialog
        title={
          <span className="text-black text-2xl mt-[18px]">
            {t("common:title")}
          </span>
        }
        isDialog={isDialog}
        setIsDialog={setIsDialog}
        widthMode={isScreenMd ? "auto" : "md"}
        handleAfterCloseAction={handleAfterCloseAction}
        ariaLabel=""
        backgoundColorMode="bg-gray-100"
      >
        <div className="min-w-[200px] max-w-[505px] pt-2.5">
          <CreditCalculatorPage />
        </div>
      </Dialog>
    </>
  );
}
