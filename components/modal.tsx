import useTranslation from "next-translate/useTranslation";
import { Dispatch, SetStateAction } from "react";
import Dialog from "./reusable/dialog";
import { CreditCalculator } from "./reusable/creditCalculator";
import { Description } from "./reusable/description";
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
        ariaLabel="calculate summ"
        backgoundColorMode="bg-gray-100"
      >
        <div className="min-w-[200px] max-w-[505px] pt-2.5">
          <Description />
          <CreditCalculator />
        </div>
      </Dialog>
    </>
  );
}
