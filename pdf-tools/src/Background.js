import React from 'react'
import { motion } from "framer-motion";
import { Survices } from '../src/component/functions/functions'

export const Background = () => {
    return (
        <div className="relative w-full h-[120vh] lg:h-full pt-16">
            <div className="relative w-full h-full">
                <video className="w-full h-full object-cover" src="https://v4.cdnpk.net/videvo_files/video/free/video0455/large_watermarked/_import_609130a0a026f4.33688960_FPpreview.mp4" autoPlay loop muted />
                <div className="absolute inset-0 bg-[#0000008f]">
                    <motion.div
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.7 }}
                    >
                        <Survices />
                    </motion.div>

                </div>
            </div>
        </div>
    )
}
