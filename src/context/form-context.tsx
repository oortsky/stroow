"use client";

import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect
} from "react";

export type Form = {
  payer: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };
  payee: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    account_bank: string;
    account_number: string;
    account_holder_name: string;
    same_as_name: boolean;
  };
  transaction: {
    id: string;
    payer_id: string;
    payee_id: string;
    name: string;
    category: string;
    amount: number;
    service_fee: number;
    total: number;
    note?: string;
    status: string;
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
      promo_code: string;
    };
  };
  additional: {
    voucher?: string;
    isAcceptTnC: boolean;
  };
};

export interface FormContextProps {
  form: Form;
  updateForm: (property: Partial<Form>) => void;
  resetForm: () => void;
}

const defaultForm: Form = {
  payer: {
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: ""
  },
  payee: {
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    account_bank: "",
    account_number: "",
    account_holder_name: "",
    same_as_name: false
  },
  transaction: {
    id: "",
    payer_id: "",
    payee_id: "",
    name: "",
    category: "",
    amount: 0,
    service_fee: 0,
    total: 0,
    note: "",
    status: "",
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
      },
      promo_code: ""
    }
  },
  additional: {
    voucher: "",
    isAcceptTnC: false
  }
};

export const FormContext = createContext<FormContextProps>({
  form: defaultForm,
  updateForm: () => null,
  resetForm: () => null
});

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};

interface FormProviderProps {
  children: ReactNode;
}

const STORAGE_KEY = "escrow:form";

export function FormProvider({ children }: FormProviderProps) {
  const [form, setForm] = useState<Form>(defaultForm);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setForm(JSON.parse(saved));
      }
    } catch (err) {
      console.warn("Invalid form data in localStorage, resetting...");
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
  }, [form]);

  const updateForm = (values: Partial<Form>) => {
    setForm(prev => ({
      ...prev,
      ...values
    }));
  };

  const resetForm = () => {
    setForm(defaultForm);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <FormContext.Provider value={{ form, updateForm, resetForm }}>
      {children}
    </FormContext.Provider>
  );
}
