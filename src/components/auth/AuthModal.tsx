import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: "login" | "signup";
}

const AuthModal = ({
  isOpen,
  onClose,
  defaultMode = "login",
}: AuthModalProps) => {
  const [mode, setMode] = useState<"login" | "signup">(defaultMode);

  const handleSuccess = () => {
    onClose();
  };

  const switchToSignUp = () => {
    setMode("signup");
  };

  const switchToLogin = () => {
    setMode("login");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-black border-gray-700 p-0">
        <DialogHeader className="sr-only">
          <h2>{mode === "login" ? "Sign In" : "Sign Up"}</h2>
        </DialogHeader>
        <div className="p-6">
          {mode === "login" ? (
            <LoginForm
              onSuccess={handleSuccess}
              onSwitchToSignUp={switchToSignUp}
            />
          ) : (
            <SignUpForm
              onSuccess={handleSuccess}
              onSwitchToLogin={switchToLogin}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
