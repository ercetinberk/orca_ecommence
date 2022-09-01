import { useState, useEffect } from 'react';

const useForm = (callback, validate) => {
  const [values, setValues] = useState({
    email: '',name: '',message: '',password:'',
    companyname:'',address:'',address2:'',postcode:'',city:'',country:'',firstname:'',lastname:'',telephone:'',passwordConfirm:''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    
    setErrors(validate(values));
    setIsSubmitting(true);
  };
  const clearValues = ()=>{
    
    setValues({
      email: '',name: '',message: '',password:'',
      companyname:'',address:'',address2:'',postcode:'',city:'',country:'',firstname:'',lastname:'',telephone:'',passwordConfirm:''  
      });
  }

  useEffect(
    () => {
      const submit = async ()=>{
        if (Object.keys(errors).length === 0 && isSubmitting) {
          
          const returnValue = await callback(values)
          
          if(returnValue){
            clearValues()
          }
         }
      }
      submit()
    },
    [errors]
  );

  return { handleChange, handleSubmit, values, errors };
};

export default useForm;