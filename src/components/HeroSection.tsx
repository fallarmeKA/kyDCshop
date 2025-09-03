import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface Game {
  id: string;
  title: string;
  imageUrl: string;
  originalPrice: number;
  discountPercentage: number;
  salePrice: number;
  description: string;
}

interface HeroSectionProps {
  games?: Game[];
}

const HeroSection = ({ games = [] }: HeroSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Default games if none are provided
  const defaultGames: Game[] = [
    {
      id: "1",
      title: "Cyberpunk 2077",
      imageUrl:
        "https://images.unsplash.com/photo-1605899435973-ca2d1a8431cf?w=1200&q=80",
      originalPrice: 59.99,
      discountPercentage: 50,
      salePrice: 29.99,
      description:
        "An open-world, action-adventure RPG set in the megalopolis of Night City.",
    },
    {
      id: "2",
      title: "Elden Ring",
      imageUrl:
        "https://images.unsplash.com/photo-1605899435973-ca2d1a8431cf?w=1200&q=80",
      originalPrice: 69.99,
      discountPercentage: 30,
      salePrice: 48.99,
      description:
        "A fantasy action-RPG adventure set within a world created by Hidetaka Miyazaki and George R. R. Martin.",
    },
    {
      id: "3",
      title: "God of War Ragnarök",
      imageUrl:
        "https://images.unsplash.com/photo-1605899435973-ca2d1a8431cf?w=1200&q=80",
      originalPrice: 49.99,
      discountPercentage: 25,
      salePrice: 37.49,
      description:
        "Join Kratos and Atreus on a mythic journey for answers before Ragnarök arrives.",
    },
  ];

  const displayGames = games.length > 0 ? games : defaultGames;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % displayGames.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + displayGames.length) % displayGames.length,
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 5 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, displayGames.length]);

  return (
    <div className="relative w-full h-[500px] overflow-hidden bg-black">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>

      {/* Carousel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${displayGames[currentIndex].imageUrl})`,
            }}
          >
            <div className="absolute inset-0 bg-black/40"></div>{" "}
            {/* Darken overlay */}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <div className="container px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="max-w-2xl mx-auto md:ml-0 text-center md:text-left"
          >
            <Badge variant="destructive" className="mb-4 text-lg font-bold">
              {displayGames[currentIndex].discountPercentage}% OFF
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {displayGames[currentIndex].title}
            </h1>

            <p className="text-lg md:text-xl text-gray-200 mb-6">
              {displayGames[currentIndex].description}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-8 justify-center md:justify-start">
              <div className="flex items-center gap-2">
                <span className="text-gray-400 line-through text-lg">
                  ${displayGames[currentIndex].originalPrice.toFixed(2)}
                </span>
                <span className="text-white text-2xl font-bold">
                  ${displayGames[currentIndex].salePrice.toFixed(2)}
                </span>
              </div>

              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white px-8"
              >
                Buy Now
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Navigation arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 text-white rounded-full h-12 w-12"
        onClick={() => {
          prevSlide();
          setIsAutoPlaying(false);
          setTimeout(() => setIsAutoPlaying(true), 5000);
        }}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 text-white rounded-full h-12 w-12"
        onClick={() => {
          nextSlide();
          setIsAutoPlaying(false);
          setTimeout(() => setIsAutoPlaying(true), 5000);
        }}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Dots navigation */}
      <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center gap-2">
        {displayGames.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/70"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
