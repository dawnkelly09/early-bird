This is an extension of the Early Bird Game build for the Celestia Infinite Space Bazaar hackathon which was started here: https://github.com/dawnkelly09/robin-game

Early Bird

A game where you hunt for birds. As a worm.

Built for: Celestia Infinite Space Bazaar hackathon

Background: Last summer I was watching the American Robins hop around in my backyard and realized they move as if powered by an algorithm while hunting for worms. I had the idea to make a silly game to imitate their process. This is that game. 

Tech used:

Game: Version 1 of the game is built using the HTML5 canvas element & javascript with images stored on IPFS & pinned by Pinata. I am now migrating to Next.js to allow for easier fullstack integration, etc. 

Blockchain things:

1) $WRM token: 0xdfBc6d30DB8cA564D93a1c37f78eA1D1A0d312Cf
deployed on a custom L3 using Mode, Optimism, and Celestia as the data layer. Chain graciously deployed by CryptoFede who was kind enough to let me use it to deploy my contracts: https://app.conduit.xyz/published/view/hello-l3-world-g5x787qets

2) EarlyBird.sol: 0x9AfE69F67958F2186864D98D1fEe3ca3D880004D
Simple smart contract to receive totalWormsFound from the game, transfer a matching number of $WRM token to the user's wallet, and emit an event worms were claimed by the player. This is deployed on the same custom L3 as $WRM token.

