import React, { useEffect, useMemo, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import styles from '../styles/NodeNetworkLoader.module.css';

const NodeNetworkLoader = ({ onComplete }) => {
    const textLines = [
        "So… portfolio tour",
        "or just here for the vibes?"
    ];

    const nodeControls = useAnimation();
    const lineControls = useAnimation();
    const textControls = useAnimation();
    const skipButtonControls = useAnimation();

    const completionTimer = useRef(null);


    // --- Configuration & Timings ---
    const numRows = 6; // Number of rows in the node grid
    const numCols = 8; // Number of columns in the node grid
    const nodeSize = 6; // Size of individual nodes (in pixels) - will be scaled by CSS
    const spacing = 30; // Spacing between node centers (in pixels)

    const nodeFadeInDuration = 0.6;
    const nodeFadeInStagger = 0.02; // Delay between each node appearing
    const nodePulseDuration = 1.5; // Time for a subtle pulse animation after appearing

    const lineDrawDuration = 0.5;
    const lineDrawStagger = 0.01; // Delay between each line segment appearing across all lines
    const lineDelayAfterNodes = 0.2; // Delay after nodes finish appearing before lines start

    const textRevealDuration = 0.6;
    const textRevealDelay = 0.4; // Delay after lines finish animating

    const holdDuration = 1.5; // Time to display message before transition out


    // --- Combined Memo for Nodes and Lines ---
    // Calculate nodes and lines together to ensure dependencies are met sequentially
     const { nodes, lines } = useMemo(() => {
        const nodesArray = [];
         const linesArray = [];

         // Calculate total grid dimensions for centering
         const totalWidth = (numCols - 1) * spacing;
         const totalHeight = (numRows - 1) * spacing;

         // --- 1. Generate Nodes with initial positions ---
        for (let r = 0; r < numRows; r++) {
            for (let c = 0; c < numCols; c++) {
                nodesArray.push({
                    id: `node-${r}-${c}`,
                    row: r,
                    col: c,
                     x: c * spacing - totalWidth / 2, // Position relative to grid center (0,0)
                     y: r * spacing - totalHeight / 2,
                    // Linear index for staggering nodes will be added later after collecting all
                });
            }
        }

         // --- 2. Generate Lines, referencing node positions ---
         // Horizontal lines between nodes
        for (let r = 0; r < numRows; r++) {
             for (let c = 0; c < numCols - 1; c++) {
                 // Find the starting node for this line segment
                const startNode = nodesArray.find(n => n.row === r && n.col === c);
                if (startNode) { // Add safety check
                     linesArray.push({
                         id: `h-line-${r}-${c}`,
                         type: 'horizontal',
                         startX: startNode.x + nodeSize / 2, // Start position for the line (offset by half node size)
                         startY: startNode.y,
                         width: spacing - nodeSize,
                        height: 1, // Visual thickness (styled in CSS)
                     });
                 }
             }
         }
         // Vertical lines between nodes
        for (let c = 0; c < numCols; c++) {
            for (let r = 0; r < numRows - 1; r++) {
                 // Find the starting node for this line segment
                const startNode = nodesArray.find(n => n.row === r && n.col === c);
                if (startNode) { // Add safety check
                    linesArray.push({
                         id: `v-line-${r}-${c}`,
                        type: 'vertical',
                        startX: startNode.x,
                        startY: startNode.y + nodeSize / 2, // Start position for the line (offset by half node size)
                        width: 1, // Visual thickness (styled in CSS)
                         height: spacing - nodeSize,
                    });
                }
            }
        }

        // --- 3. Add Linear Indexes for staggering ---
         const finalNodes = nodesArray.map((node, index) => ({...node, index }));
         const finalLines = linesArray.map((line, index) => ({...line, index }));


        return { nodes: finalNodes, lines: finalLines };
     }, [numRows, numCols, spacing, nodeSize]); // Dependencies for the combined memo


     // Calculate delay for the skip button based on overall animation progress
     const skipButtonDelay = (
         (nodeFadeInDuration + nodeFadeInStagger * (nodes.length - 1)) + // Approx time for all nodes to fade in
         lineDelayAfterNodes +
         (lineDrawDuration + lineDrawStagger * (lines.length - 1)) + // Approx time for all lines to draw
         textRevealDelay + textRevealDuration + 0.3 // After text is visible, add a small buffer
     );


    // --- Animation Definitions ---

     // Variants for individual nodes - Stagger delay uses the 'custom' prop (index)
     const nodeVariants = {
        hidden: { opacity: 0, scale: 0 }, // Start small and invisible
         visible: (i) => ({ // `i` here is the value from the `custom` prop on motion.div
             opacity: 1,
             scale: 1,
             transition: {
                 duration: nodeFadeInDuration,
                 ease: "easeOut",
                 delay: i * nodeFadeInStagger // Stagger delay based on the node's linear index
             }
         })
         // Optional pulse animation state
         /*
         pulse: {
             // ... pulse animation properties ...
         }
         */
     };

     // Variants for individual lines - Stagger delay uses the 'custom' prop (index)
     const lineVariants = {
         hidden: { opacity: 0 /* , potential scale/transform origin setup if 'drawing' differently */}, // Lines start invisible
         visible: (i) => ({ // `i` here is the value from the `custom` prop on motion.div
             opacity: 0.5, // Appear semi-transparent
             transition: {
                duration: lineDrawDuration,
                ease: "easeOut",
                 delay: i * lineDrawStagger // Stagger delay based on the line's linear index
             }
         })
     }

     // Variants for the text container (fade/scale/y animation)
     const textVariants = {
         hidden: { opacity: 0, scale: 0.98, y: 20 },
         visible: { opacity: 1, scale: 1, y: 0, transition: { duration: textRevealDuration, ease: "easeOut" } }
     };

     // Skip button variants (fade in from bottom right) - Delay orchestrated in useEffect start call
     const skipButtonVariants = {
         hidden: { opacity: 0, y: 20 },
         visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } // Delay applied via controls.start below
     };


    // --- Orchestration with useEffect ---
    useEffect(() => {
        const networkSequence = async () => {
            // Phase 0: Initial state - Elements are hidden via initial prop or set
             await textControls.set("hidden");
             await skipButtonControls.set("hidden");

            // Phase 1: Nodes appear staggered
             // Triggers the "visible" variant for all nodes using nodeControls
            await nodeControls.start("visible");
             // Await waits until the LAST animation started by this call is complete.


            // Phase 2: Pause & Lines appear staggered after nodes
            // Calculate actual time waited based on node stagger sequence end
            const totalNodeAnimationTime = nodeFadeInDuration + nodeFadeInStagger * (nodes.length - 1);
            await new Promise(resolve => setTimeout(resolve, totalNodeAnimationTime * 1000 + lineDelayAfterNodes * 1000));


             // Trigger skip button reveal
             // Start this animation. It will use the variants, and the delay is applied below in .start
             skipButtonControls.start("visible", { delay: 0 }); // Use calculated skipButtonDelay constant directly below?


             // Animate lines in staggering, starting AFTER the delayFromNodes pause
             // Triggers the "visible" variant for all lines using lineControls
             await lineControls.start("visible");
             // Waits for the last line animation started by this call to complete.


            // Phase 3: Text Reveal after network forms and lines draw
             // Calculate actual time waited based on line stagger sequence end
            const totalLineAnimationTime = lineDrawDuration + lineDrawStagger * (lines.length - 1);
             await new Promise(resolve => setTimeout(resolve, totalLineAnimationTime * 1000 + textRevealDelay * 1000));

             textControls.start("visible"); // Trigger text animation. Waits for this animation.


            // Phase 4: Hold and Trigger Completion
             // Calculate when to call onComplete: After the text reveal animation finishes, PLUS the hold duration.
             const timeToComplete = textRevealDuration * 1000 + holdDuration * 1000;

             completionTimer.current = setTimeout(() => { // Store timeout ID in ref
                onComplete(); // Signal parent (App.jsx)
            }, timeToComplete);


        }; // End networkSequence async function

        // Start the sequence on component mount
        networkSequence();

        // --- Component Unmount Cleanup ---
        // Cleans up timers and other side effects when the component is unmounted
        return () => {
            // Clear the completion timer to prevent it firing after unmount
             if (completionTimer.current) {
                 clearTimeout(completionTimer.current);
             }
             // Framer Motion cleans up its own animations internally.
         };

        // Dependencies: include all values from config/timing that orchestrate the sequence
        // Use the derived 'nodes' and 'lines' for calculating durations based on counts.
    }, [onComplete, nodeControls, lineControls, textControls, skipButtonControls, nodes, lines,
        numRows, numCols, spacing, nodeSize, nodeFadeInDuration, nodeFadeInStagger,
        lineDrawDuration, lineDrawStagger, lineDelayAfterNodes, textRevealDuration,
        textRevealDelay, holdDuration
     ]); // Omitted skipButtonDelay as dependency since it's only used as value in start call, not variant timing

    // Trigger skip button appearance directly in effect after some cumulative delay
     useEffect(() => {
        skipButtonControls.start("visible", { delay: skipButtonDelay });
         // Only dependency is the calculated delay and controls
     }, [skipButtonControls, skipButtonDelay]);


    // --- Render Logic ---
    return (
        // Overall loader container (covers screen, handles exit fade via App.jsx)
        // motion.div root allows AnimatePresence in App.jsx to handle exit transition
        <motion.div
            className={styles.loaderContainer}
            initial={{ opacity: 1 }} // Starts fully opaque on mount
             exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeOut' } }} // Fades out when App.jsx unmounts this component
        >

            {/* Network Area: Container for nodes and lines, centered on screen */}
            <motion.div className={styles.networkArea}>
                 {/* Render Line Segments */}
                 {/* Added initial={{opacity: 0.0}} for lines specifically here */}
                {lines.map(line => (
                    <motion.div
                        key={line.id}
                        className={`${styles.networkLine} ${styles[line.type]}`}
                         initial="hidden"          // Lines start hidden per variants
                        animate={lineControls}    // Animations controlled by lineControls
                         custom={line.index}       // Pass linear index to variants for staggering
                         style={{ // Inline styles for positioning and dimensions
                            left: line.startX,
                            top: line.startY,
                            width: line.width,
                             height: line.height,
                             // If animating width/height/scale, need transform-origin:
                             // transform-origin: line.type === 'horizontal' ? '0% 50%' : '50% 0%'; // Example based on type
                         }}
                    />
                 ))}

                 {/* Render Nodes */}
                {/* Added initial={{opacity: 0}} for nodes specifically here */}
                 {nodes.map(node => (
                     <motion.div
                         key={node.id}
                         className={styles.networkNode}
                         initial="hidden"          // Nodes start hidden per variants
                         animate={nodeControls}    // Animations controlled by nodeControls
                         custom={node.index}       // Pass linear index to variants for staggering
                        style={{ // Inline styles for positioning and dimensions
                            left: node.x, // Position nodes relative to networkArea's center (0,0)
                             top: node.y,
                            width: nodeSize,   // Use JS calculated size
                            height: nodeSize, // Use JS calculated size
                             transform: 'translate(-50%, -50%)' // Adjust position so (left,top) is the node's center
                        }}
                     />
                 ))}
             </motion.div>


            {/* Greeting Text Container - Appears centered over the network */}
            {/* Controlled by textControls, using variants for appearance */}
             <motion.div
                 className={styles.greetingTextContainer}
                 variants={textVariants} // Defines "hidden" and "visible" states and transitions
                 initial="hidden"          // Component starts in the "hidden" state from variants
                 animate={textControls}    // textControls triggers transitions to other states ("visible")
             >
                 {/* Text content - uses standard p tags, styled by CSS */ }
                 <p className={styles.greetingLine}>{textLines[0]}</p>
                 <p className={styles.greetingLine}>{textLines[1]}</p>
             </motion.div>

             {/* Skip Button */}
             {/* Controlled by skipButtonControls, using variants for appearance */}
             <motion.button
                 className={styles.skipButton}
                 variants={skipButtonVariants} // Defines "hidden" and "visible" states and transitions
                 initial="hidden"          // Button starts hidden
                 animate={skipButtonControls} // skipButtonControls triggers state changes ("visible")
                onClick={onComplete} // When clicked, bypass animations and trigger App state change
             >
                 Skip
             </motion.button>


        </motion.div>
    );
};

export default NodeNetworkLoader;