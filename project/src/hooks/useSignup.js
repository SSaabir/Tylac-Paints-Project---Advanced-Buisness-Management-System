import {useAuthContext} from './useAuthContext'
import { useState } from "react";

import React from 'react'

export const useSignup = () => {

    const [loading, setLoading] = useState(false);
    const [error, setErrorMessage] = useState(null);
    const {dispatch} = useAuthContext();

    const signup = async (formData) => {
        setLoading(true);
        setErrorMessage(null);
      
        try {
          const res = await fetch('/api/user/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
          });
      
          // 🔍 Check what response you're getting
          const text = await res.text();
          console.log("Raw response:", text);
      
          try {
            const json = JSON.parse(text); // ✅ Parse it manually
            if (!res.ok) {
              setLoading(false);
              setErrorMessage(json.error);
              return;
            }
      
            localStorage.setItem('user', JSON.stringify(json));
            dispatch({ type: 'LOGIN', payload: json });
            setLoading(false);
          } catch (error) {
            throw new Error("Invalid JSON response from server");
          }
        } catch (err) {
          setLoading(false);
          setErrorMessage("Network error. Please try again.");
          console.error(err);
        }
      };
      
    return {signup, loading, error}
}
