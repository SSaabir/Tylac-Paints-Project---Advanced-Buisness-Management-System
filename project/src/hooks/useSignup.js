import { useAuthContext } from './useAuthContext';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export const useSignup = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setErrorMessage] = useState(null);
    const { dispatch } = useAuthContext();

    const signup = async (formData) => {
        setLoading(true);
        setErrorMessage(null);

        try {
            const res = await fetch('/api/cust/signup', {
                method: 'POST',
                body: formData, // ⬅️ Send formData directly (no JSON.stringify)
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
                navigate('/dashboard');
            } catch (error) {
                throw new Error("Invalid JSON response from server");
            }
        } catch (err) {
            setLoading(false);
            setErrorMessage("Network error. Please try again.");
            console.error(err);
        }
    };

    return { signup, loading, error };
};
