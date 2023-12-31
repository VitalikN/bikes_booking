import {
  useAddBikeMutation,
  useDeleteBikeMutation,
  useUpdateBikeStatusMutation,
} from "@/redux/userBikesBookingApi/userBikesBookingApi";
import { ErrorMessage } from "formik";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";

import authSelector from "@/redux/authApi/authSelector";
import { useSelector } from "react-redux";
import {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
} from "@/redux/authApi/authAPI";
import styles from "../sass/layouts/signIn.module.scss";

import {
  ErrorFeedbackProps,
  FormValuesAdd,
  FormValuesRegister,
} from "@/utils/type";

import { useEffect, useState } from "react";
import { useGetAllbikesQuery } from "@/redux/bikesBookingApi/bikesBookingApi";

export const useAddBikeFormik = ({ refetch }: { refetch: () => void }) => {
  const token = useSelector(authSelector.selectToken);
  const [addBike] = useAddBikeMutation();
  const id = nanoid();
  const [value, setValue] = useState("");
  const [size, setSize] = useState("");

  const handleSubmit = async (
    values: FormValuesAdd,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      if (!token) {
        toast.error("User is not authenticated. Please sign in.");
        return;
      }
      const updatedValues = { ...values, id, price: value, size: size };

      await addBike(updatedValues);
      toast.success(`AddBike`);

      resetForm();
      setSize("");
      setValue("");
      refetch();
    } catch (error) {
      toast.error("");
    }
  };

  return {
    id,
    value,
    setValue,
    size,
    setSize,
    handleSubmit,
  };
};

export const useBikesBooking = () => {
  const [itemsPerPage, setItemsPerPage] = useState<number>(6);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [bikeStatuses, setBikeStatuses] = useState<Record<string, string>>({});

  const { data, error, isLoading, refetch } = useGetAllbikesQuery({
    page: currentPage,
    limit: itemsPerPage,
  });
  const [updateMutation] = useUpdateBikeStatusMutation();
  const token = useSelector(authSelector.selectToken);

  const [deleteBike] = useDeleteBikeMutation();

  const handleDelete = async (_id: string) => {
    if (!token) {
      toast.error("User is not authenticated. Please sign in.");
      return;
    }
    await deleteBike(_id).unwrap();
    toast.success(`Товар видалино`);
    refetch();
  };

  useEffect(() => {
    refetch();
  }, [deleteBike, refetch, updateMutation]);

  const handleStatusChange = async (
    event: React.ChangeEvent<HTMLSelectElement>,
    bikeId: string
  ) => {
    try {
      if (!token) {
        toast.error("User is not authenticated. Please sign in.");
        return;
      }
      const newType = event.target.value;

      setBikeStatuses((prevStatuses) => ({
        ...prevStatuses,
        [bikeId]: newType,
      }));
      await updateMutation({
        bikeId: bikeId,
        newType: newType,
      });

      toast.success(`Status changed successfully to ${newType}!`);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  return {
    itemsPerPage,
    setItemsPerPage,
    currentPage,
    setCurrentPage,
    bikeStatuses,
    data,
    refetch,
    error,
    isLoading,
    handleDelete,
    handleStatusChange,
  };
};

export const useHeader = () => {
  const token = useSelector(authSelector.selectToken);
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout({});
      toast.success("Successfully logged out!");
      return;
    } catch (error) {}
  };

  return {
    token,
    handleLogout,
  };
};

export const useRegisterForm = () => {
  const [register, { isLoading }] = useRegisterMutation();

  const handleRegister = async (values: FormValuesRegister) => {
    try {
      const response = await register(values);
      if ("data" in response) {
        toast.success(
          "Successfully registered! Please proceed to sign in for confirmation."
        );
      } else {
        toast.error("Invalid login or password.");
      }
    } catch (error) {
      toast.error("Invalid login or password.");
    }
  };
  const ErrorFeedback: React.FC<ErrorFeedbackProps> = ({ name }) => {
    return (
      <ErrorMessage name={name}>
        {(errorMessage) => <span className={styles.error}>{errorMessage}</span>}
      </ErrorMessage>
    );
  };

  const handleSubmit = async (
    values: FormValuesRegister,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      await handleRegister(values);
      resetForm();
    } catch (error) {
      toast.error("Invalid login or password.");
    }
  };

  return { handleSubmit, ErrorFeedback, isLoading };
};
export const useSignInForm = () => {
  const [login, { isLoading }] = useLoginMutation();

  const ErrorFeedback: React.FC<ErrorFeedbackProps> = ({ name }) => {
    return (
      <ErrorMessage name={name}>
        {(errorMessage) => <span className={styles.error}>{errorMessage}</span>}
      </ErrorMessage>
    );
  };
  const handleLogin = async (values: FormValuesRegister) => {
    try {
      await login(values);
      toast.success("Successfully logged in!");
    } catch (error) {
      toast.error("Invalid login or password.");
    }
  };
  const handleSubmit = async (
    values: FormValuesRegister,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      await handleLogin(values);

      resetForm();
    } catch (error) {
      toast.error("Invalid login or password.");
    }
  };

  return { handleSubmit, ErrorFeedback, isLoading };
};
