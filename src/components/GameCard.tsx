import React, { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "./auth/AuthModal";
import PurchaseModal from "./PurchaseModal";

interface GameCardProps {
  id: string;
  title: string;
  coverImage: string;
  originalPrice: number;
  discountPercentage: number;
  description?: string;
  platforms?: string[];
  onClick?: (id: string) => void;
}

const GameCard = ({
  id = "1",
  title = "Game Title",
  coverImage = "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=600&q=80",
  originalPrice = 59.99,
  discountPercentage = 25,
  description = "A captivating adventure game with stunning visuals and immersive gameplay.",
  platforms = ["PC", "PS5", "Xbox"],
  onClick = () => {},
}: GameCardProps) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const { user } = useAuth();
  const salePrice = originalPrice * (1 - discountPercentage / 100);

  const handlePurchaseClick = () => {
    if (!user) {
      setShowAuthModal(true);
    } else {
      setShowPurchaseModal(true);
    }
  };

  const gameData = {
    id,
    title,
    coverImage,
    originalPrice,
    discountPercentage,
    description,
    platforms,
  };

  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ scale: 1.03, y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full flex flex-col overflow-hidden border-0 rounded-lg bg-black text-white">
        <div className="relative overflow-hidden">
          <img
            src={coverImage}
            alt={title}
            className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
          />
          {discountPercentage > 0 && (
            <Badge
              variant="destructive"
              className="absolute top-2 right-2 bg-red-600 text-white font-bold"
            >
              -{discountPercentage}%
            </Badge>
          )}
        </div>

        <CardContent className="flex-grow p-4">
          <h3 className="text-lg font-semibold mb-1 line-clamp-1">{title}</h3>

          <div className="flex items-center space-x-2 mb-2">
            {platforms.map((platform, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs bg-transparent"
              >
                {platform}
              </Badge>
            ))}
          </div>

          <motion.div
            className="text-sm text-gray-300 mb-3 line-clamp-2 overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            whileHover={{ height: "auto", opacity: 1 }}
          >
            {description}
          </motion.div>

          <div className="flex items-center space-x-2">
            {discountPercentage > 0 ? (
              <>
                <span className="text-gray-400 line-through text-sm">
                  ₱{originalPrice.toFixed(2)}
                </span>
                <span className="text-green-500 font-bold">
                  ₱{salePrice.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="font-bold">₱{originalPrice.toFixed(2)}</span>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button
            onClick={handlePurchaseClick}
            className="w-full bg-gray-800 hover:bg-gray-700 text-white"
            variant="outline"
          >
            {user ? "Buy Now" : "Sign In to Purchase"}
          </Button>
        </CardFooter>
      </Card>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultMode="login"
      />

      {/* Purchase Modal */}
      <PurchaseModal
        isOpen={showPurchaseModal}
        onClose={() => setShowPurchaseModal(false)}
        game={gameData}
      />
    </motion.div>
  );
};

export default GameCard;
