import { useRef, useEffect } from 'react';

function Canvas() {
  const canvasRef = useRef(null);
  const canvasWidth = 600;
  const canvasHeight = 600;
  const ctx = canvasRef.current?.getContext('2d');
  // define intial (x,y) position of robin
    let robinX = 0;
    let robinY = 0;

  const drawRobin = (robinX, robinY) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const robinImg = new Image();
    robinImg.src = robinImg.src = "https://cyan-interesting-takin-110.mypinata.cloud/ipfs/QmaKqEGonantGEUkEQszqoS5v6Yy3VBwZJ7f5hjHSiYCr5";

    robinImg.onload = function () {
        ctx.drawImage(robinImg, robinX, robinY, 50, 50);
    };
  }

  // Load the background image when the component mounts
    useEffect(() => {
        const backgroundSrc = "https://cyan-interesting-takin-110.mypinata.cloud/ipfs/QmVMKXtK3HPaVzjxnA7uM7PXsxhf9y9Cd7a9jKbkJ1tYor";

        // Function to draw the background image
        const drawBackground = () => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
        
            // Create a new Image object
            const background = new Image();
            // Set the source of the image
            background.src = backgroundSrc;
        
            // When the image is loaded, draw it on the canvas
            background.onload = () => {
                ctx.drawImage(background, 0, 0);
            };
        };

        // Draw the background image
        drawBackground();
        drawRobin(0, 0);
    }, [ctx]); // Trigger the effect only when the context changes

  return <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight}></canvas>;
}

export default Canvas;