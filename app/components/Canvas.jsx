import { useRef, useState, useEffect } from 'react'
import styles from "../globals.css";


const contractAddress = '0x9afe69f67958f2186864d98d1fee3ca3d880004d';
const contractABI = [[ { "inputs": [ { "internalType": "uint256", "name": "totalWormsFound", "type": "uint256" } ], "name": "claimWorms", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_tokenContractAddress", "type": "address" } ], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "player", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "worms", "type": "uint256" } ], "name": "WormsClaimed", "type": "event" }, { "inputs": [], "name": "tokenContractAddress", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" } ]];

const Canvas = () => {

    const canvasRef = useRef();
    const ctx = canvasRef.current?.getContext('2d');
    const [modalVisible, setModalVisible] = useState(false);
    const [robinPosition, setRobinPosition] = useState({ x: 0, y: 0 });
    const [background, setBackground] = useState(null);
    const [worms, setWorms] = useState([]); // Holds worm positions
    const [totalWormsFound, setTotalWormsFound] = useState(0); // Counts found worms
    
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

    // Initialize worms positions
    useEffect(() => {
        const generateWorms = () => {
            let newWorms = [];
            for (let i = 0; i < 20; i++) {
                const wormX = Math.floor(Math.random() * (600 / 50)) * 50;
                const wormY = Math.floor(Math.random() * (600 / 50)) * 50;
                newWorms.push({ x: wormX, y: wormY });
                console.log(`Generated worm at position (${wormX}, ${wormY})`)
            }
            setWorms(newWorms);
        };
        generateWorms();
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
    
    
    // draws a worm above the robin if worm is found
        const drawWorm = () => {
            const ctx = canvasRef.current.getContext('2d');
            ctx.drawImage(wormImage, robinPosition.x, robinPosition.y - 50, 50, 50);
        };
    
    // draws a sad face above the robin if no worm is found
    const drawSadFace = () => {
        const ctx = canvasRef.current.getContext('2d');
        ctx.drawImage(sadFaceImage, robinPosition.x, robinPosition.y - 50, 50, 50);
    };
    
    // Check for worms when "Yes" is clicked in the modal
    const checkForWorms = () => {
        const { x, y } = robinPosition;
        console.log(`Checking for worms at position (${x}, ${y})`);
        const foundIndex = worms.findIndex(worm => worm.x === x && worm.y === y);
        if (foundIndex !== -1) {
            console.log("worm found!");
            // Found a worm, remove it and increase count
            setWorms(currentWorms => currentWorms.filter((_, index) => index !== foundIndex));
            setTotalWormsFound(currentCount => currentCount + 1);
            drawWorm();
        } else {
            console.log('sorry, no worm found')
            drawSadFace();
        }
    };

    const handleClaimWorms = async () => {
        if (!signer) {
            alert('Please connect your wallet first.');
            return;
        }

        try {
            const transactionResponse = await contract.claimWorms(totalWormsFound);
            await transactionResponse.wait();  // Wait for the transaction to be mined
            console.log('Worms claimed successfully');
            // Reset worms count or handle other UI updates
        } catch (error) {
            console.error('Failed to claim worms:', error);
            alert('Failed to claim worms. See console for more details.');
        }
    };

    
    useEffect(() => {
        
            console.log("Total worms found:", totalWormsFound);
        
    }, [totalWormsFound]); // This effect runs whenever totalWormsFound changes.
    
    
    return (
        <div className='game-intro'>
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
                    <button onClick={() => {
                        checkForWorms(); 
                        setModalVisible(false);
                    }}>Yes</button>
                    <button onClick={() => setModalVisible(false)}>No</button>
                </div>
            )}
            <div class="score-box">
                <p>Total worms found: <span>{totalWormsFound}</span></p>
                <button onClick={handleClaimWorms}>Claim Worms</button>
            </div>
            <div className="button-row">
                <button onClick={() => {
                    setRobinPosition(prev => ({ x: prev.x, y: Math.max(0, prev.y - 50) }));
                    setTimeout(() => setModalVisible(true), 100); // Optional delay
                }}>UP ⬆️</button>
                <button onClick={() => {
                    setRobinPosition(prev => ({ x: Math.max(0, prev.x - 50), y: prev.y }));
                    setTimeout(() => setModalVisible(true), 100);
                }}>LEFT ⬅️</button>
                <button onClick={() => {
                    setRobinPosition(prev => ({ x: Math.min(canvasWidth - 50, prev.x + 50), y: prev.y }));
                    setTimeout(() => setModalVisible(true), 100);
                }}>RIGHT ➡️</button>
                <button onClick={() => {
                    setRobinPosition(prev => ({ x: prev.x, y: Math.min(canvasHeight - 50, prev.y + 50) }));
                    setTimeout(() => setModalVisible(true), 100);
                }}>DOWN ⬇️</button>
            </div>
            <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />
        </div>
    );
}

export default Canvas
