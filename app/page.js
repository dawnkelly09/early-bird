"use client"
import { useState, useEffect } from 'react';
import Image from "next/image";
import styles from "./globals.css";
import Canvas from "./components/Canvas"


export default function Home() {
  useEffect(() => {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    // add load images here
    
    // add drawing logic here
  })

  return (
    <main>
      <section className="game-intro">
      <div className="rules">
                <h1>Early Bird 🪱🐦</h1>
                <h2>Can you find & catch the worms?</h2>
                <p>1) Use arrow keys or buttons to pick the bird's direction</p>
                <p>2) The bird decides how many steps to move</p>
                <p>3) If the bird finds a worm, it collects it and adds to your total</p>
            </div>
            <div>
              score board here
              claim worms button here
            </div>
            <div>
              claimed-toast
            </div>
            <div>
              <Canvas />
            </div>

      </section>
    </main>
  );
}
