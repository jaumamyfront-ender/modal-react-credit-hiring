import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import { Button } from "../../uiAtoms/button";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export const CreditCalculatorPage = () => {
  const { t } = useTranslation("common");
  const { isScreenMobile } = useMediaQuery();

  const [amount, setAmount] = useState<string>("");
  const [months, setMonths] = useState<number>(12);
  const [view, setView] = useState<"monthly" | "yearly">("monthly");
  const [isClickTocalculate, setIsClickTocalculate] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [amountError, setAmountError] = useState<string>("");

  const monthsOptions = [12, 24, 36, 48];
  const numericAmount = parseFloat(amount);
  const monthlyPayment = numericAmount && months ? numericAmount / months : 0;
  const yearlyPayment = monthlyPayment * 12;
  const displayPayment = view === "monthly" ? monthlyPayment : yearlyPayment;

  return (
    <div className="space-y-8">
      <Description />
      <Calculate
        amount={amount}
        setAmount={setAmount}
        months={months}
        setMonths={setMonths}
        isClickTocalculate={isClickTocalculate}
        setIsClickTocalculate={setIsClickTocalculate}
        isActive={isActive}
        setIsActive={setIsActive}
        monthsOptions={monthsOptions}
        t={t}
        isScreenMobile={isScreenMobile}
        amountError={amountError}
        setAmountError={setAmountError}
      />
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isClickTocalculate
            ? "opacity-100 translate-y-0 max-h-[500px]"
            : "opacity-0 translate-y-[-10px] max-h-0 pointer-events-none"
        }`}
      >
        <Summary
          view={view}
          setView={setView}
          displayPayment={displayPayment}
          t={t}
        />
      </div>
      <Button isActive={isActive} />
    </div>
  );
};

interface CalculateProps {
  amount: string;
  setAmount: (value: string) => void;
  months: number;
  setMonths: (value: number) => void;
  isClickTocalculate: boolean;
  setIsClickTocalculate: (value: boolean) => void;
  isActive: boolean;
  setIsActive: (value: boolean) => void;
  monthsOptions: number[];
  t: (key: string) => string;
  isScreenMobile: boolean;
  amountError: string;
  setAmountError: (msg: string) => void;
}

const Calculate = ({
  amount,
  setAmount,
  months,
  setMonths,
  isClickTocalculate,
  setIsClickTocalculate,
  setIsActive,
  monthsOptions,
  t,
  isScreenMobile,
  amountError,
  setAmountError,
}: CalculateProps) => {
  return (
    <div className="space-y-4 mb-4 flex flex-col">
      <input
        type="number"
        className="w-full border border-gray-300 focus:border-black rounded-lg p-2 text-lg text-black text-left focus:outline-none appearance-none placeholder-gray-400"
        placeholder={t("common:labelInput")}
        value={amount}
        onKeyDown={(e) => {
          if (e.key === " ") {
            e.preventDefault();
          }
        }}
        onChange={(e) => {
          const rawValue = e.target.value;
          const cleanedValue = rawValue.replace(/\s/g, "");
          setAmount(cleanedValue);

          if (cleanedValue !== "") {
            setAmountError("");
          }
        }}
      />
      {amountError && (
        <p className="text-red-500 text-sm mt-1">{amountError}</p>
      )}

      <button
        onClick={() => {
          const trimmedAmount = amount.trim();

          if (trimmedAmount === "") {
            setAmountError(t("common:InputOnError") || "Введите сумму");
            setIsClickTocalculate(false);
            setIsActive(false);
            return;
          }
          setAmountError("");
          if (isClickTocalculate) {
            setIsClickTocalculate(false);
            setIsActive(false);
          } else {
            setIsClickTocalculate(true);
            setIsActive(true);
          }
        }}
        className="text-[#FF5E56] hover:text-[#F53A31] font-semibold self-start cursor-pointer transition-colors duration-200"
      >
        {t("calculate")}
      </button>

      <div
        className={`flex ${
          isScreenMobile ? "flex-col items-start" : "flex-row items-center"
        } justify-between max-w-[400px] mt-2`}
      >
        <h2 className={`font-semibold text-black ${isScreenMobile && "mb-4"}`}>
          {t("monthsLabel")}
        </h2>
        <div className="flex justify-center gap-3">
          {monthsOptions.map((option) => (
            <button
              key={option}
              onClick={() => {
                setIsActive(true);
                setMonths(option);
              }}
              className={`w-[41px] h-[36px] rounded-full ${
                months === option
                  ? "bg-[linear-gradient(to_right,#ff5e56,#dc3131)] text-white"
                  : "bg-gray-200 text-gray-800"
              } font-light`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

interface SummaryProps {
  view: "monthly" | "yearly";
  setView: (value: "monthly" | "yearly") => void;
  displayPayment: number;
  t: (key: string) => string;
}

const Summary = ({ view, setView, displayPayment, t }: SummaryProps) => {
  return (
    <div className="space-y-2 flex flex-col">
      <h2 className="text-black font-semibold">{t("paymentLabel")}</h2>
      <div className="flex flex-row self-start gap-3 pt-4">
        <button
          onClick={() => setView("yearly")}
          className={`px-4 py-2 rounded-full ${
            view === "yearly"
              ? "bg-red-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {t("perYear")}
        </button>
        <button
          onClick={() => setView("monthly")}
          className={`px-4 py-2 rounded-full ${
            view === "monthly"
              ? "bg-red-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {t("perMonth")}
        </button>
      </div>
      <div className="text-2xl text-black font-base mt-4">
        {displayPayment.toLocaleString("ru-RU")} {t("currency")}
      </div>
    </div>
  );
};

const Description = () => {
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
