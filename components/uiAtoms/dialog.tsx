import { Dialog as DialogBase, Transition } from "@headlessui/react";
import {
  Dispatch,
  Fragment,
  ReactNode,
  SetStateAction,
  useEffect,
} from "react";

const DIALOG_SIZES = {
  md: "max-w-md w-full",
  "5xl": "max-w-5xl w-full",
  auto: "md:w-auto max-w-5xl w-full",
} as const;

import Image from "next/image";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface DialogProps {
  children: ReactNode;
  title?: string | ReactNode;
  trigger?: ReactNode;
  setIsDialog: Dispatch<SetStateAction<boolean>>;
  handleAfterCloseAction?: () => void;
  isDialog?: boolean;
  widthMode?: keyof typeof DIALOG_SIZES;
  ariaLabel?: string;
  backgoundColorMode?: "bg-header" | "bg-gray-100";
}

export default function Dialog({
  children,
  title,
  trigger,
  widthMode = "5xl",
  isDialog = false,
  ariaLabel = "Modal dialog",
  backgoundColorMode = "bg-header",
  setIsDialog,
  handleAfterCloseAction,
}: DialogProps) {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isDialog) {
        setIsDialog(false);
        handleAfterCloseAction?.();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isDialog, setIsDialog, handleAfterCloseAction]);

  const handleClose = () => {
    setIsDialog(false);
    handleAfterCloseAction?.();
  };
  const { isScreenMobile } = useMediaQuery();
  return (
    <>
      {trigger && (
        <div
          className="cursor-pointer flex items-center justify-center"
          onClick={() => {
            setIsDialog?.(true);
          }}
          role="button"
        >
          {trigger}
        </div>
      )}

      <Transition.Root show={isDialog} as={Fragment}>
        <DialogBase
          className="relative z-10"
          onClose={handleClose}
          aria-label={ariaLabel}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-all duration-300 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition-all duration-200 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="fixed inset-0 bg-opacity-50 transition-opacity modal-overlay" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-300"
                  enterFrom="translate-y-full"
                  enterTo="translate-y-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-300"
                  leaveFrom="translate-y-0"
                  leaveTo="translate-y-full"
                >
                  <DialogBase.Panel className="pointer-events-auto relative w-screen">
                    <div
                      className={`animated-modal flex h-full items-center flex-col ${
                        isScreenMobile && "overflow-y-scroll"
                      }  bg-black-transparent  modal-overlay py-6 shadow-xl`}
                    >
                      <div className={`px-4 ${DIALOG_SIZES[widthMode]}`}>
                        <div
                          className={`flex justify-center flex-col rounded-2xl mt-8 md:mt-24 ${backgoundColorMode}`}
                        >
                          <div className="flex justify-center">
                            <div className="!pb-0 md:p-6 p-4 w-full">
                              <DialogBase.Title className="flex items-start justify-between">
                                {typeof title === "string" ? (
                                  <span className="text-base md:text-xl font-semibold pr-4 text-black">
                                    {title}
                                  </span>
                                ) : (
                                  title
                                )}

                                <Transition.Child
                                  as={Fragment}
                                  enter="ease-in-out duration-200"
                                  enterFrom="opacity-0"
                                  enterTo="opacity-100"
                                  leave="ease-in-out duration-200"
                                  leaveFrom="opacity-100"
                                  leaveTo="opacity-0"
                                >
                                  <button
                                    type="button"
                                    className="float-right focus:outline-none rounded-md text-gray-750 hover:text-primary"
                                    onClick={handleClose}
                                    aria-label="Close dialog"
                                  >
                                    <Image
                                      src={"/jam_close.png"}
                                      alt={"/jam_close.png"}
                                      width={35}
                                      height={35}
                                    />
                                  </button>
                                </Transition.Child>
                              </DialogBase.Title>
                            </div>
                          </div>

                          <div className="relative flex-1">
                            <div className="flex justify-center">
                              <div className=" w-full px-4 md:px-6">
                                {children}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DialogBase.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </DialogBase>
      </Transition.Root>
    </>
  );
}
