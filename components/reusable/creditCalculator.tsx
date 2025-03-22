import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import { Button } from "./button";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export const CreditCalculator = () => {
  const [amount, setAmount] = useState<string>("");
  const [months, setMonths] = useState(12);
  const [view, setView] = useState<"monthly" | "yearly">("monthly");
  const [isClickTocalculate, setisClickTocalculate] = useState<boolean>(false);
  const [isActive, setisActive] = useState<boolean>(false);
  const { t } = useTranslation("");
  const { isScreenMobile } = useMediaQuery();

  //   const [amountError, setAmountError] = useState<string>("");
  const monthsOptions = [12, 24, 36, 48];
  const numericAmount = parseFloat(amount);
  const monthlyPayment = numericAmount && months ? numericAmount / months : 0;
  const yearlyPayment = monthlyPayment * 12;
  const displayPayment = view === "monthly" ? monthlyPayment : yearlyPayment;
  //   const handleCalculateClick = () => {
  //     if (amount.trim() === "") {
  //       setAmountError(t("common:amountRequired") || "Введите сумму");
  //       setisClickTocalculate(false);
  //       return;
  //     } else {
  //       setAmountError("");
  //       setisClickTocalculate(true);
  //       setisActive(true);
  //     }
  //   };

  return (
    <div className="space-y-4 mb-4 flex flex-col">
      <input
        type="number"
        className="w-full border border-gray-300 focus:border-black rounded-lg p-2 text-lg text-black text-left focus:outline-none appearance-none placeholder-gray-400"
        placeholder="Введите сумму"
        value={amount}
        onKeyDown={(e) => {
          if (e.key === " ") {
            e.preventDefault();
          }
        }}
        onChange={(e) => {
          const rawValue = e.target.value;
          const cleanedValue = rawValue.replace(/\s/g, "");
          if (cleanedValue === "") {
            setAmount("");
          } else {
            setAmount(cleanedValue);
          }
        }}
      />
      {/* {amountError && (
        <p className="text-red-500 text-sm mt-1">{amountError}</p>
      )} */}
      <button
        onClick={() => {
          if (isClickTocalculate) {
            setisClickTocalculate(false);
            setisActive(false);
          } else {
            setisClickTocalculate(true);
            setisActive(true);
          }
        }}
        className="text-[#FF5E56] hover:text-[#F53A31] font-semibold self-start cursor-pointer transition-colors duration-200"
      >
        {t("common:calculate")}
      </button>

      <div
        className={`flex ${
          isScreenMobile ? "flex-col items-start" : "flex-row items-center"
        } justify-between max-w-[400px] mt-2`}
      >
        <h2 className={`font-semibold text-black ${isScreenMobile && "mb-4"}`}>
          {" "}
          {t("common:monthsLabel")}
        </h2>
        <div className="flex justify-center gap-3">
          {monthsOptions.map((option) => (
            <button
              key={option}
              onClick={() => {
                setisActive(true), setMonths(option);
              }}
              className={`w-[41px] h-[36px] rounded-full ${
                isActive ? "text-white" : "text-black"
              }font-light ${
                months === option
                  ? "bg-[linear-gradient(to_right,#ff5e56,#dc3131)]"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      {isClickTocalculate && (
        <div className="space-y-2 flex flex-col ">
          <h2 className="text-black font-semibold">
            {t("common:paymentLabel")}
          </h2>
          <div className="flex flex-row self-start gap-3 pt-4">
            <button
              onClick={() => setView("yearly")}
              className={`px-4 py-2 rounded-full ${
                view === "yearly"
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {t("common:perYear")}
            </button>
            <button
              onClick={() => setView("monthly")}
              className={`px-4 py-2 rounded-full ${
                view === "monthly"
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {t("common:perMonth")}
            </button>
          </div>
          <div className="text-2xl text-black font-base mt-4">
            {displayPayment.toLocaleString("ru-RU")} {t("common:currency")}
          </div>
        </div>
      )}
      <Button isActive={isActive} />
    </div>
  );
};
