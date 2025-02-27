"use client"
import Image from "next/image";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from '@clerk/nextjs'
import { useEffect, useState } from 'react';

export default function Home() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [points, setPoints] = useState(0);
  const [coins, setCoins] = useState(0);

  // Load saved points when component mounts or user signs in
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      const savedPoints = localStorage.getItem(`points_${user.id}`) || '0';
      const pointsNum = parseInt(savedPoints);
      setPoints(pointsNum);
      setCoins((pointsNum / 80).toFixed(2));
    }
  }, [isLoaded, isSignedIn, user]);

  const handleClick = () => {
    const newPoints = points + 1;
    const newCoins = (newPoints / 80).toFixed(2);
    setPoints(newPoints);
    setCoins(newCoins);
    
    if (isSignedIn) {
      localStorage.setItem(`points_${user.id}`, newPoints.toString());
    }
  };

  return (
    <div>
      <nav className="bg-purple-100 p-4 fixed w-full top-0 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-purple-950 text-2xl font-bold">
            PPCoin
          </div>
          <div className="flex items-center gap-4">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-purple-950 text-white px-6 py-2 rounded-full hover:bg-purple-800 transition duration-300">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </nav>
      
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-100 pt-20 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full mx-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-purple-950 mb-4">
              🚀 New Crypto Coin
            </h1>
            <h2 className="text-2xl font-semibold text-purple-800 mb-6">
              Launching Soon!
            </h2>
            <p className="text-purple-700 mb-8">
              Get ready for the next revolution in cryptocurrency. Join us on this exciting journey.
            </p>
            <button className="inline-block bg-purple-950 hover:bg-purple-800 text-white font-bold py-3 px-6 rounded-full transition duration-300">
              Stay Tuned
            </button>
            <div>
              <div className="mt-8 p-4 border-2 border-purple-200 rounded-xl">
                <h3 className="text-xl font-semibold text-purple-800 mb-4">
                  Earn PPCoins by Clicking!
                </h3>
                <div className="flex flex-col items-center gap-4">
                  <button 
                    onClick={handleClick}
                    className="bg-purple-600 hover:bg-purple-500 text-white w-12 h-12 rounded-full text-2xl flex items-center justify-center transition duration-300"
                  >
                    +
                  </button>
                  <div className="text-center">
                    <p className="text-purple-700">
                      Points: <span className="font-mono">{points}</span>
                    </p>
                    <p className="text-purple-700">
                      PPCoins: <span className="font-mono">{coins}</span>
                    </p>
                    <p className="text-sm text-purple-500 mt-2">
                      (80 points = 1 PPCoin)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
