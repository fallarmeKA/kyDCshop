import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { Loader2, CreditCard, Shield } from "lucide-react";

// const { email, gameTitle, amount } = await req.json();
// this is where the user completed their purchase 
// use supabase to handle emailing system
//

interface Game {
  id: string;
  title: string;
  coverImage: string;
  originalPrice: number;
  discountPercentage: number;
  description?: string;
  platforms?: string[];
}

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  game: Game | null;
}

const PurchaseModal = ({ isOpen, onClose, game }: PurchaseModalProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [purchaseComplete, setPurchaseComplete] = useState(false);
  const { user } = useAuth();

  if (!game) return null;

  const salePrice = game.originalPrice * (1 - game.discountPercentage / 100);

  const handlePurchase = async () => {
    if (!user) return;

    setIsProcessing(true);

    try {
      // Create transaction record
      const transactionData = {
        user_id: user.id,
        game_id: game.id,
        game_title: game.title,
        amount: salePrice,
        status: "pending",
        payment_method: "credit_card",
      };

      // For demo purposes, we'll simulate the transaction without actual database calls
      console.log("Creating transaction:", transactionData);

      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate successful transaction
      console.log("Transaction completed successfully");

      // In a real app, you would:
      // 1. Create the transaction record in the database
      // 2. Process the payment with Stripe/PayPal
      // 3. Update the transaction status
      // 4. Add the game to user's library

      setPurchaseComplete(true);
    } catch (error) {
      console.error("Purchase error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    setPurchaseComplete(false);
    onClose();
  };

  if (purchaseComplete) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md bg-gray-900 border-gray-700">
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Purchase Successful!
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              {game.title} has been added to your library.
            </p>
            <Button
              onClick={handleClose}
              className="bg-white text-black hover:bg-gray-200"
            >
              Continue Shopping
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-gray-900 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-white text-xl">
            Complete Purchase
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Game Info */}
          <div className="flex gap-4">
            <img
              src={game.coverImage}
              alt={game.title}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="text-white font-semibold">{game.title}</h3>
              <div className="flex items-center gap-2 mt-1">
                {game.platforms?.map((platform, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {platform}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Price Info */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400">Original Price:</span>
              <span className="text-gray-400 line-through">
                ₱{game.originalPrice.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400">
                Discount ({game.discountPercentage}%):
              </span>
              <span className="text-green-500">
                -₱{(game.originalPrice - salePrice).toFixed(2)}
              </span>
            </div>
            <div className="border-t border-gray-600 pt-2">
              <div className="flex justify-between items-center">
                <span className="text-white font-semibold">Total:</span>
                <span className="text-white font-bold text-lg">
                  ₱{salePrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <CreditCard className="h-5 w-5 text-gray-400" />
              <span className="text-white font-medium">Payment Method</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg">
              <div className="w-8 h-5 bg-blue-500 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">VISA</span>
              </div>
              <span className="text-white">•••• •••• •••• 4242</span>
            </div>
          </div>

          {/* Security Notice */}
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Shield className="h-4 w-4" />
            <span>Your payment information is secure and encrypted</span>
          </div>

          {/* Purchase Button */}
          <Button
            onClick={handlePurchase}
            disabled={isProcessing}
            className="w-full bg-white text-black hover:bg-gray-200 h-12 text-lg font-semibold"
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing Payment...
              </>
            ) : (
              `Purchase for ₱${salePrice.toFixed(2)}`
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PurchaseModal;
