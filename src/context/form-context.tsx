import { createContext, useState, useContext, ReactNode } from "react";
import { BankValue } from "@/lib/enums/banks";
import { CategoryValue } from "@/lib/enums/categories";
import { TransactionStatusEnum } from "@/lib/enums/transaction-status";

export type Form = {
  payer: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    account_bank: BankValue;
    account_number: string;
    account_holder_name: string;
    same_as_name: boolean;
  };
  payee: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    account_bank: BankValue;
    account_number: string;
    account_holder_name: string;
    same_as_name: boolean;
  };
  transaction: {
    id: string;
    payer_id: string;
    payee_id: string;
    name: string;
    category: CategoryValue;
    amount: number;
    service_fee: number;
    total: number;
    note?: string;
    status: TransactionStatusEnum;
    pin: string;
    snap: {
      transaction_details: {
        order_id: string;
        gross_amount: number;
      };
      item_details: {
        name: string;
        price: number;
        quantity: number;
      }[];
      customer_details: {
        first_name: string;
        last_name: string;
        email: string;
        phone: string;
      };
    };
  };
  additional: {
    isAcceptTnC: boolean;
  };
};

export interface FormContextProps {
  form: Form;
  updateForm: (property: Partial<Form>) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  totalSteps: number;
}

const defaultForm: Form = {
  payer: {
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    account_bank: "" as BankValue,
    account_number: "",
    account_holder_name: "",
    same_as_name: false
  },
  payee: {
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    account_bank: "" as BankValue,
    account_number: "",
    account_holder_name: "",
    same_as_name: false
  },
  transaction: {
    id: "",
    payer_id: "",
    payee_id: "",
    name: "",
    category: "" as CategoryValue,
    amount: 0,
    service_fee: 0,
    total: 0,
    note: "",
    status: TransactionStatusEnum.PENDING,
    pin: "",
    snap: {
      transaction_details: {
        order_id: "",
        gross_amount: 0
      },
      item_details: [],
      customer_details: {
        first_name: "",
        last_name: "",
        email: "",
        phone: ""
      }
    }
  },
  additional: {
    isAcceptTnC: false
  }
};

export const FormContext = createContext<FormContextProps>({
  form: defaultForm,
  updateForm: () => null,
  currentStep: 1,
  setCurrentStep: () => null,
  totalSteps: 4
});

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormContextProvider");
  }
  return context;
};

interface FormProviderProps {
  children: ReactNode;
}

export function FormProvider({ children }: FormProviderProps) {
  const [form, setForm] = useState<Form>(defaultForm);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 4;

  const updateForm = (values: Partial<Form>) => {
    setForm(prev => ({
      ...prev,
      ...values
    }));
  };

  return (
    <FormContext.Provider
      value={{ form, updateForm, currentStep, setCurrentStep, totalSteps }}
    >
      {children}
    </FormContext.Provider>
  );
}
