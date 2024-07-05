import { useState, useEffect, useContext } from 'react';
import * as yup from 'yup';
import { showMessage } from 'react-native-flash-message';
import { PaymentContext } from '../../../context/Payment/PaymentContext';

const validationSchema = yup.object().shape({
  cardNumber: yup.string().required('El número de tarjeta es requerido').min(16, 'El número de tarjeta debe tener 16 dígitos'),
  expiryDate: yup.string().required('La fecha de vencimiento es requerida').matches(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/, 'Fecha de vencimiento no válida'),
  cvc: yup.string().required('El CVC es requerido').min(3, 'El CVC debe tener 3 dígitos'),
  amount: yup.number().required('El monto es requerido').positive('El monto debe ser positivo'),
});

const usePaymentViewModel = () => {
  const [values, setValues] = useState({ cardNumber: '', expiryDate: '', cvc: '', amount: '' });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});
  const { processPayment } = useContext(PaymentContext);

  const onChange = (property: string, value: any) => {
    setValues({ ...values, [property]: value });
  };

  const initiatePayment = async () => {
    try {
      setLoading(true);
      if (await isValidForm()) {
        const response = await processPayment(values);
        if (response.success) {
          showMessage({
            message: 'Pago realizado con éxito',
            type: 'success',
          });
        } else {
          setError('Error al procesar el pago');
        }
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      setError('Error al procesar el pago');
    } finally {
      setLoading(false);
    }
  };

  const isValidForm = async (): Promise<boolean> => {
    try {
      await validationSchema.validate(values, { abortEarly: false });
      return true;
    } catch (error: any) {
      const errors: Record<string, string> = {};
      if (error instanceof yup.ValidationError) {
        error.inner.forEach((e) => {
          if (e.path) {
            errors[e.path] = e.message;
          }
        });
        setErrorMessages(errors);
        return false;
      }
      return false;
    }
  };

  return {
    ...values,
    loading,
    error,
    onChange,
    initiatePayment,
    errorMessages,
  };
};

export default usePaymentViewModel;
