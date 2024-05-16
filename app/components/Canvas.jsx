import { useRef, useEffect } from 'react';

function Canvas() {
  const canvasRef = useRef(null);
  const canvasWidth = 600;
  const canvasHeight = 600;
  const ctx = canvasRef.current?.getContext('2d');

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
    }, [ctx]); // Trigger the effect only when the context changes

  return <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight}></canvas>;
}

export default Canvas;