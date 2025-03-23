"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Sparkles, ChevronDown } from "lucide-react"
import AIThoughtProcess from "./AIThoughtProcess"

interface AIReasoningDisplayProps {
  reasoning: string
  isDarkMode: boolean
}

const AIReasoningDisplay: React.FC<AIReasoningDisplayProps> = ({ reasoning, isDarkMode }) => {
  const [isExpanded, setIsExpanded] = useState(true)
  const [displayedText, setDisplayedText] = useState("")
  const [isThinking, setIsThinking] = useState(true)
  const [showDropdown, setShowDropdown] = useState(false)
  const reasoningRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let index = 0
    setDisplayedText("")
    setIsThinking(true)
    setIsExpanded(true)
    setShowDropdown(false)

    const typingTimer = setInterval(() => {
      if (index < reasoning.length) {
        setDisplayedText((prev) => prev + reasoning.charAt(index))
        index++

        // Auto-scroll with padding at the bottom
        if (reasoningRef.current) {
          reasoningRef.current.scrollTop = reasoningRef.current.scrollHeight
        }
      } else {
        clearInterval(typingTimer)
        setIsThinking(false)

        // Collapse reasoning box after completion
        setTimeout(() => {
          setIsExpanded(false)
          setShowDropdown(true)
        }, 2000) // Delay before collapsing
      }
    }, 8) // Faster typing speed

    return () => clearInterval(typingTimer)
  }, [reasoning])

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div
      className={`relative max-w-[100%] rounded-[20px] transition-all duration-300 ${
        isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-700"
      }`}
      style={{
        borderLeft: isDarkMode ? "4px solid #1e40af" : "4px solid #93c5fd",
        height: isExpanded ? "auto" : "50px",
        overflow: "hidden",
      }}
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <Sparkles className="text-blue-500 mr-2" size={18} />
          <span className="text-sm font-semibold">AI Reasoning</span>
        </div>

        <button onClick={toggleExpand} className="focus:outline-none">
          <ChevronDown size={18} className={`transition-transform ${isExpanded ? "rotate-180" : "rotate-0"}`} />
        </button>
      </div>

      {/* Content - Only visible when expanded */}
      <div className={`transition-all duration-300 ${isExpanded ? "opacity-100" : "opacity-0 h-0"}`}>
        {/* Show "Thinking..." until reasoning starts displaying */}
        {/* {isThinking && (
          <div className="px-4 pb-2">
            <AIThoughtProcess isGenerating={isThinking} reasoning={reasoning} isDarkMode={isDarkMode} />
          </div>
        )} */}

        {/* Reasoning Text with Hidden Scrollbar */}
        <div
          ref={reasoningRef}
          className="text-sm whitespace-pre-wrap overflow-y-auto px-4 pb-4"
          style={{
            maxHeight: "150px",
            msOverflowStyle: "none" /* IE and Edge */,
            scrollbarWidth: "none" /* Firefox */,
            overflowX: "hidden",
            wordBreak: "break-word",
          }}
        >
          {/* Hide scrollbar for Chrome, Safari and Opera */}
          <style>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {displayedText.split("").map((char, i) => {
            // Calculate if this is part of the most recently typed text
            const isNewest = i > displayedText.length - 10
            const isRecent = i > displayedText.length - 30 && !isNewest

            // Apply different styling based on how recent the character is
            return (
              <span
                key={i}
                style={{
                  opacity: isNewest ? 1 : isRecent ? 0.8 : 0.6,
                  color: isNewest ? (isDarkMode ? "#ffffff" : "#000000") : "inherit",
                  backgroundColor: isNewest
                    ? isDarkMode
                      ? "rgba(59, 130, 246, 0.3)"
                      : "rgba(59, 130, 246, 0.2)"
                    : "transparent",
                  fontWeight: isNewest ? "medium" : "normal",
                  padding: isNewest ? "0 1px" : "0",
                  borderRadius: "2px",
                  transition: "all 0.3s ease-out",
                }}
              >
                {char}
              </span>
            )
          })}
        </div>
      </div>

      {/* Removed the preview text section that was here before */}
    </div>
  )
}

export default AIReasoningDisplay

