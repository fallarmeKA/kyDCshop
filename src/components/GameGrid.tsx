import React, { useState, useEffect } from "react";
import GameCard from "./GameCard";
import { motion } from "framer-motion";

interface Game {
  id: string;
  title: string;
  coverImage: string;
  originalPrice: number;
  discountPercentage: number;
  salePrice: number;
  description: string;
  platforms: string[];
  genre: string;
}

interface GameGridProps {
  games?: Game[];
  selectedCategory?: string;
}

// ✅ Move defaultGames outside component to avoid re-creation on every render
const defaultGames: Game[] = [
  {
    id: "1",
    title: "Cyberpunk 2077",
    coverImage:
      "https://images.unsplash.com/photo-1605899435973-ca2d1a8431cf?w=600&q=80",
    originalPrice: 2999.5,
    discountPercentage: 33,
    salePrice: 1999.67,
    description:
      "An open-world, action-adventure RPG set in the megalopolis of Night City.",
    platforms: ["PC", "PlayStation", "Xbox"],
    genre: "Action",
  },
  {
    id: "2",
    title: "Elden Ring",
    coverImage:
      "https://images.unsplash.com/photo-1616729613029-a3fda0e3a6e2?w=600&q=80",
    originalPrice: 3499.5,
    discountPercentage: 15,
    salePrice: 2974.58,
    description:
      "An action RPG developed by FromSoftware and published by Bandai Namco Entertainment.",
    platforms: ["PC", "PlayStation", "Xbox"],
    genre: "Action",
  },
  {
    id: "3",
    title: "Civilization VI",
    coverImage:
      "https://images.unsplash.com/photo-1559081632-5c4f6b5c8b13?w=600&q=80",
    originalPrice: 2499.5,
    discountPercentage: 75,
    salePrice: 624.88,
    description:
      "A turn-based strategy game in which you attempt to build an empire to stand the test of time.",
    platforms: ["PC", "Switch", "Mobile"],
    genre: "Strategy",
  },
  {
    id: "4",
    title: "Hades",
    coverImage:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&q=80",
    originalPrice: 1249.5,
    discountPercentage: 20,
    salePrice: 999.6,
    description:
      "A rogue-like dungeon crawler where you defy the god of the dead as you hack and slash out of the Underworld.",
    platforms: ["PC", "PlayStation", "Xbox", "Switch"],
    genre: "Action",
  },
  {
    id: "5",
    title: "Stardew Valley",
    coverImage:
      "https://images.unsplash.com/photo-1566837945700-30057527ade0?w=600&q=80",
    originalPrice: 749.5,
    discountPercentage: 40,
    salePrice: 449.7,
    description:
      "An open-ended country-life RPG where you inherit your grandfather's old farm plot.",
    platforms: ["PC", "PlayStation", "Xbox", "Switch", "Mobile"],
    genre: "Simulation",
  },
  {
    id: "6",
    title: "Hollow Knight",
    coverImage:
      "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=600&q=80",
    originalPrice: 749.5,
    discountPercentage: 50,
    salePrice: 374.75,
    description:
      "A challenging 2D action-adventure where you explore a vast interconnected world.",
    platforms: ["PC", "PlayStation", "Xbox", "Switch"],
    genre: "Adventure",
  },
  {
    id: "7",
    title: "FIFA 24",
    coverImage:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80",
    originalPrice: 3499.5,
    discountPercentage: 30,
    salePrice: 2449.65,
    description:
      "The world's game with HyperMotionV technology and enhanced gameplay.",
    platforms: ["PC", "PlayStation", "Xbox", "Switch"],
    genre: "Sports",
  },
  {
    id: "8",
    title: "Gran Turismo 7",
    coverImage:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    originalPrice: 2999.5,
    discountPercentage: 25,
    salePrice: 2249.63,
    description:
      "The ultimate racing experience with stunning graphics and realistic physics.",
    platforms: ["PlayStation", "PC"],
    genre: "Racing",
  },
  {
    id: "9",
    title: "Portal 2",
    coverImage:
      "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=600&q=80",
    originalPrice: 999.5,
    discountPercentage: 60,
    salePrice: 399.8,
    description:
      "A mind-bending puzzle game with innovative mechanics and witty dialogue.",
    platforms: ["PC", "PlayStation", "Xbox"],
    genre: "Puzzle",
  },
  {
    id: "10",
    title: "Resident Evil 4",
    coverImage:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80",
    originalPrice: 2999.5,
    discountPercentage: 40,
    salePrice: 1799.7,
    description:
      "A survival horror masterpiece with intense action and atmospheric terror.",
    platforms: ["PC", "PlayStation", "Xbox"],
    genre: "Horror",
  },
  {
    id: "11",
    title: "Among Us",
    coverImage:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&q=80",
    originalPrice: 249.5,
    discountPercentage: 20,
    salePrice: 199.6,
    description: "A multiplayer game of teamwork and betrayal in space.",
    platforms: ["PC", "Mobile", "Switch"],
    genre: "Multiplayer",
  },
  {
    id: "12",
    title: "Half-Life: Alyx",
    coverImage:
      "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=600&q=80",
    originalPrice: 2999.5,
    discountPercentage: 50,
    salePrice: 1499.75,
    description:
      "A VR masterpiece that pushes the boundaries of virtual reality gaming.",
    platforms: ["PC VR"],
    genre: "VR",
  },
  {
    id: "13",
    title: "Cuphead",
    coverImage:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&q=80",
    originalPrice: 999.5,
    discountPercentage: 35,
    salePrice: 649.68,
    description:
      "A classic run and gun action game heavily focused on boss battles.",
    platforms: ["PC", "PlayStation", "Xbox", "Switch"],
    genre: "Indie",
  },
];

const GameGrid = ({ games = [], selectedCategory = "All" }: GameGridProps) => {
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);

  useEffect(() => {
    const gamesData = games.length > 0 ? games : defaultGames;

    if (selectedCategory && selectedCategory !== "All") {
      const filtered = gamesData.filter(
        (game) => game.genre.toLowerCase() === selectedCategory.toLowerCase(),
      );
      setFilteredGames(filtered);
    } else {
      setFilteredGames(gamesData);
    }
  }, [games, selectedCategory]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <div className="w-full bg-black py-8 px-4 md:px-8">
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredGames.length > 0 ? (
          filteredGames.map((game) => (
            <motion.div key={game.id} variants={itemVariants}>
              <GameCard
                id={game.id}
                title={game.title}
                coverImage={game.coverImage}
                originalPrice={game.originalPrice}
                discountPercentage={game.discountPercentage}
                description={game.description}
                platforms={game.platforms}
              />
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-16">
            <p className="text-gray-400 text-lg">
              No games found in this category.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default GameGrid;
