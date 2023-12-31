export type FormValuesAdd = {
  id: string;
  name: string;
  type: string;
  color: string;
  size: number;
  price: number;
  description: string;
};

export const initialValuesAdd = {
  id: "",
  name: "",
  type: "",
  color: "",
  size: 0,
  price: 0,
  description: "",
};

export interface ErrorFeedbackProps {
  name: string;
}

export type Bike = {
  _id: string;
  id: string;
  name: string;
  color: string;
  price: number;
  type: "Available" | "Busy" | "Unavailable";
};
export interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  currentPage: number;
}
export interface FormValuesRegister {
  name?: string;
  email: string;
  password: string;
}
