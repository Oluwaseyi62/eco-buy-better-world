import React from "react";
import { Loader2 } from "lucide-react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const VerifyReset: React.FC = () => {
    const { userId, token } = useParams<{ userId: string; token: string }>();
    const [isLoading, setIsLoading] = useState(true);
     const [show, setShow] = useState(false);
    const [message, setMessage] = useState<string>("Verifying reset link...");
    const navigate = useNavigate();
    const verifyReset = async () => {
            try {
            const response =    await fetch("https://ecobuy-server.onrender.com/api/user/reset-password", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ userId, token }),
                });
                const data = await response.json();
                if(!response.ok) {
                    setIsLoading(false);
                    setShow(true)
                    setMessage(data.message);
                }
                if (response.ok) {
                    setIsLoading(false);
                    setShow(false);
                    setMessage("Reset link verified successfully. Redirecting.....");
                    // Optionally, redirect to the reset password page
                    navigate(`/auth/reset-password/${userId}`);
                }
            } catch (error) {
                console.error("Error verifying reset link:", error);
            }
        };

    useEffect(() => {
        

        if (userId && token) {
            verifyReset();
        }
    }, [userId, token]);
   
        console.log("userId:", userId, "token:", token);
   
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
    <div className="bg-card p-8 rounded-lg shadow-lg text-center">
      {isLoading && (
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
      )}
      <p className="text-xl font-semibold text-foreground">{message}</p>
    {show && (
    <button
        className="mt-6 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition"
           onClick={() => navigate("/auth/login")}
    >
        Back to Login
    </button>
    )}
    
    
    </div>
    </div>
  );
}

export default VerifyReset;