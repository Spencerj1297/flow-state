'use client'
import { useState } from "react";
import axios, { AxiosError } from 'axios'

const SignIn = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });


  const confirmUser = () => {


  };

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
 
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/create-new-user', formData);

      console.log('Signup successful:', response.data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error:', error.message);
      } else {
        console.error('Unknown error has occurred:', error);
      }
    }
  };

  
console.log(formData)

  return (
    <section className="min-h-screen">
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleInputChange} />
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
      <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} />
      <button type="submit">Sign Up</button>
    </form>
    </section>
  );
};

export default SignIn;
