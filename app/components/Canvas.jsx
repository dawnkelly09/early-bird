import { useRef, useState, useEffect } from 'react'

const Canvas = () => {
    const canvasRef = useRef();
    const ctx = canvasRef.current?.getContext('2d');
    const [modalVisible, setModalVisible] = useState(false);
    const [robinPosition, setRobinPosition] = useState({ x: 0, y: 0 });
    const [background, setBackground] = useState(null);
    
    // define canvas size
    const canvasWidth = 600;
    const canvasHeight = 600;
    // preload background image
    useEffect(() => {
      const img = new Image();
      img.src = "https://cyan-interesting-takin-110.mypinata.cloud/ipfs/QmVMKXtK3HPaVzjxnA7uM7PXsxhf9y9Cd7a9jKbkJ1tYor"
      img.onload = function(){
        const ctx = canvasRef.current?.getContext('2d');
        //draw the background
        ctx.drawImage(img,0,0);
        setBackground(img);
      };
    }, []);
    
    // Handle key presses and move robin
    useEffect(() => {
        const handleKeyDown = (event) => {
            let dx = 0;
            let dy = 0;
            const randomMoves = Math.floor(Math.random() * 5) + 2; // Random moves between 2 and 6

            switch (event.keyCode) {
                case 37: dx = -randomMoves * 50; break; // Left
                case 38: dy = -randomMoves * 50; break; // Up
                case 39: dx = randomMoves * 50; break;  // Right
                case 40: dy = randomMoves * 50; break;  // Down
            }

            const newRobinX = Math.max(0, Math.min(canvasWidth - 50, robinPosition.x + dx));
            const newRobinY = Math.max(0, Math.min(canvasHeight - 50, robinPosition.y + dy));

            setRobinPosition({ x: newRobinX, y: newRobinY });
            // Delay to trigger modal after move
            setTimeout(() => {
                setModalVisible(true);
            }, 100);
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [robinPosition]);

    // Redraw canvas whenever robin moves
    useEffect(() => {
        const ctx = canvasRef.current.getContext('2d');
        if (background) {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            ctx.drawImage(background, 0, 0);
            drawRobin(robinPosition.x, robinPosition.y, ctx);
        }
    }, [robinPosition, background]);

    const drawRobin = (x, y, ctx) => {
        const robinImg = new Image();
        robinImg.src = "https://cyan-interesting-takin-110.mypinata.cloud/ipfs/QmaKqEGonantGEUkEQszqoS5v6Yy3VBwZJ7f5hjHSiYCr5";
        robinImg.onload = () => {
            ctx.drawImage(robinImg, x, y, 50, 50);
        };
    };
    
    
    // load images for worm and sad face
    const wormImage = new Image();
    wormImage.src = "https://cyan-interesting-takin-110.mypinata.cloud/ipfs/QmPn5sKKGL9pDv4qmTfe4HEvf37exJchnRAo8ygjKbhmNd";
    
    const sadFaceImage = new Image();
    sadFaceImage.src = "https://cyan-interesting-takin-110.mypinata.cloud/ipfs/QmfZHhYKx6D2zgkfyXKpvPwRPxR9yaeyBbtFNP6jRt9xfb";
    
    
    //define array to store worm positions
    let worms = [];
    
    // define variable to track total worms found
    let totalWormsFound = 0;
    
    //function to generate random worm positions
    // set your condition check to equal desired # worms 
        // i < 10 = 10 worms vs 1 < 20 = 20 worms, etc
    // works similar to random move distance function but
        // multiplies decimal x canvasWidth or canvasHeight to 
        // assign coordinates for worms, then push (x,y) to array
    function generateWorms() {
        for (let i = 0; i < 20; i++) { // Generate 20 worms
            // 50 is the pixel increment for moves. change as needed
            const wormX = Math.floor(Math.random() * (canvasWidth / 50)) * 50;
            const wormY = Math.floor(Math.random() * (canvasHeight / 50)) * 50;
            worms.push({ x: wormX, y: wormY }); // Add worm position to the worms array
            console.log(`Generated worm at position (${wormX}, ${wormY})`)
        }
    }
    
    // call generateWorms to populate the array of worm positions
    generateWorms();
    
    // draws a worm above the robin if worm is found
    function drawWorm() {
        const ctx = canvasRef.current?.getContext('2d');
        ctx.drawImage(wormImage, robinX, robinY - 50, 50, 50);
    }
    // draws a sad face above the robin if no worm is found
    function drawSadFace() {
        const ctx = canvasRef.current?.getContext('2d');
        ctx.drawImage(sadFaceImage, robinX, robinY - 50, 50, 50); 
    }
    
    
    function checkForWorms(x, y) {
        console.log(`Checking for worms at position (${x}, ${y})`);
        // serves as a flag variable to indicate if a worm is found
        let wormFound = false;
        //for each position in array of worm positions
        for (let i = 0; i < worms.length; i++) {
            // use to test if position being check is expected coordinates
            // console.log(`Checking worm at position (${worms[i].x}, ${worms[i].y})`);
            //check if robin position matches a worm position
            if (x === worms[i].x && y === worms[i].y) {
                console.log("Found a worm!");
                // remove the found worm from the array of worm positions
                worms.splice(i, 1);
                //increment player's total worms found
                totalWormsFound++;
                //update UI to display players total worms found
                updateUI();
                // set flag to true since worm is found
                wormFound = true;
                drawWorm();
                // exit loop since can only collect one worm per move
                break;
            } 
        }
        // if no worm is found
        if (!wormFound) {
            drawSadFace();
        }
    }
    
    function updateUI() {
        // update UI element to display player's total worms found
        document.getElementById('worms-found').innerText = totalWormsFound
    }


    return (
        <div>
            {modalVisible && (
                <div style={{ position: 'absolute', 
                              top: '75%', 
                              left: '50%', 
                              transform: 'translate(-50%, -50%)', 
                              zIndex: 1000, 
                              backgroundColor: "#e0fbfc",
                              borderRadius: "12px",
                              padding: "8px",
                            }}>
                    <p>Do you want to check here for worms?</p>
                    <button onClick={() => setModalVisible(false)}>Yes</button>
                    <button onClick={() => setModalVisible(false)}>No</button>
                </div>
            )}
            <div className="button-row">
                <button onClick={() => setRobinPosition(prev => ({ x: prev.x, y: Math.max(0, prev.y - 50) }))}>UP ⬆️</button>
                <button onClick={() => setRobinPosition(prev => ({ x: Math.max(0, prev.x - 50), y: prev.y }))}>LEFT ⬅️</button>
                <button onClick={() => setRobinPosition(prev => ({ x: Math.min(canvasWidth - 50, prev.x + 50), y: prev.y }))}>RIGHT ➡️</button>
                <button onClick={() => setRobinPosition(prev => ({ x: prev.x, y: Math.min(canvasHeight - 50, prev.y + 50) }))}>DOWN ⬇️</button>
            </div>
            <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />
        </div>
    );
}

export default Canvas
